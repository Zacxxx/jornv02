// import { DevTool } from '@excaliburjs/dev-tools';
import { Color, Engine, EngineOptions } from "excalibur";
import { assetManager } from "./asset.manager";
import { levelManager } from "./level.manager";
import { Subject } from "../utils";
import {
  GAME_STATES,
  MAPS,
  PLAYER_STATE,
  SCENE_EVENTS,
  SCENE_STATE,
  SONGS,
} from "../models";
import { audioManager } from "./audio.manager";
import { uiManager } from "./ui.manager";
import { dialogManager } from "./dialog.manager";
import { Player } from "../actors/player.actor";
import { BaseNPC } from "../actors/NPC/base-npc.actor";
import { dataManager } from "./data.manager";
import { textManager } from "./text.manager";

interface ViewportInfo {
  width: number;
  height: number;
  scale: number;
  devicePixelRatio: number;
}

class GameManager {
  game!: Engine;
  game_state!: Subject;
  scene_state!: Subject;
  player!: Player;
  
  private currentViewport: ViewportInfo = {
    width: 0,
    height: 0,
    scale: 1,
    devicePixelRatio: 1
  };

  constructor(engine: Engine) {
    this.game = engine;
    this.game_state = new Subject();
    this.scene_state = new Subject();
    
    // Initialize viewport tracking
    this.updateViewportInfo();
    
    // Add window resize handler
    this.setupResizeHandler();
    
    // Prevent page scrolling
    this.preventPageScrolling();
    
    // Add debug commands for viewport coordination
    this.addViewportDebugCommands();
  }

  private preventPageScrolling() {
    // Prevent wheel scrolling
    document.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    
    // Prevent touch scrolling
    document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    
    // Prevent keyboard scrolling
    document.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    });
  }

  private updateViewportInfo() {
    const { width, height } = getGameDimensions();
    
    this.currentViewport = {
      width,
      height,
      scale: this.calculateOptimalScale(),
      devicePixelRatio: window.devicePixelRatio || 1
    };
    
    // Sync viewport info with CSS variables for HUD coordination
    this.syncViewportWithCSS();
    
    console.log('Game Manager: Viewport updated:', this.currentViewport);
  }

  private calculateOptimalScale(): number {
    const baseWidth = 1920;
    const baseHeight = 1080;
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    const scaleX = currentWidth / baseWidth;
    const scaleY = currentHeight / baseHeight;
    
    // Use the smaller scale to ensure everything fits
    const scale = Math.min(scaleX, scaleY);
    
    // Clamp between reasonable bounds
    return Math.max(0.5, Math.min(3.0, scale));
  }

  private syncViewportWithCSS() {
    const root = document.documentElement;
    const { width, height, scale, devicePixelRatio } = this.currentViewport;
    
    // Set viewport-aware CSS variables
    root.style.setProperty('--viewport-width', `${width}px`);
    root.style.setProperty('--viewport-height', `${height}px`);
    root.style.setProperty('--viewport-scale', scale.toString());
    root.style.setProperty('--device-pixel-ratio', devicePixelRatio.toString());
    
    // Update existing UI scale to coordinate with canvas
    root.style.setProperty('--ui-scale', scale.toString());
    
    // Calculate responsive padding based on viewport
    const basePadding = 20;
    const responsivePadding = Math.max(10, basePadding * scale);
    root.style.setProperty('--container-padding', `${responsivePadding}px`);
    
    // Calculate responsive gap
    const baseGap = 12;
    const responsiveGap = Math.max(6, baseGap * scale);
    root.style.setProperty('--container-gap', `${responsiveGap}px`);
    
    console.log('Game Manager: CSS variables synchronized:', {
      viewportScale: scale,
      containerPadding: responsivePadding,
      containerGap: responsiveGap
    });
  }

  private setupResizeHandler() {
    let resizeTimeout: number | null = null;
    
    const handleResize = () => {
      console.log('Game Manager: Handling resize event');
      
      // Update viewport info first
      this.updateViewportInfo();
      
      const { width, height } = this.currentViewport;
      
      // Update canvas size efficiently
      this.updateCanvasSize(width, height);
      
      // Notify UI manager of viewport changes
      if (uiManager && typeof (uiManager as any).onViewportChange === 'function') {
        (uiManager as any).onViewportChange(this.currentViewport);
      }
      
      // Trigger a re-render
      this.game.currentScene?.camera.update(this.game, 0);
      
      console.log('Game Manager: Resize handling completed');
    };
    
    window.addEventListener('resize', () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(handleResize, 100); // Reduced delay for better responsiveness
    });
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 200); // Slight delay for orientation change
    });
  }
  


  private updateCanvasSize(width: number, height: number) {
    console.log(`Game Manager: Updating canvas size to ${width}x${height}`);
    
    // Update canvas size
    if (this.game.canvas) {
      this.game.canvas.width = width;
      this.game.canvas.height = height;
      this.game.canvas.style.width = `${width}px`;
      this.game.canvas.style.height = `${height}px`;
      
      // Ensure canvas maintains proper scaling
      const { devicePixelRatio } = this.currentViewport;
      const pixelRatio = devicePixelRatio;
      
      // Set canvas internal resolution for crisp rendering
      this.game.canvas.width = width * pixelRatio;
      this.game.canvas.height = height * pixelRatio;
      
      // Scale back down using CSS
      this.game.canvas.style.width = `${width}px`;
      this.game.canvas.style.height = `${height}px`;
      
      // Update canvas context scaling
      const ctx = this.game.canvas.getContext('2d');
      if (ctx) {
        ctx.scale(pixelRatio, pixelRatio);
      }
    }
    
    // Update engine screen dimensions
    if (this.game.screen) {
      this.game.screen.resolution = { width, height };
      this.game.screen.viewport = { width, height };
    }
    
    console.log('Game Manager: Canvas size updated successfully');
  }

  private addViewportDebugCommands() {
    (window as any).gameDebug = {
      viewport: () => {
        console.log('Current viewport info:', this.currentViewport);
        return this.currentViewport;
      },
      canvas: () => {
        const canvas = this.game.canvas;
        if (canvas) {
          console.log('Canvas info:', {
            width: canvas.width,
            height: canvas.height,
            styleWidth: canvas.style.width,
            styleHeight: canvas.style.height,
            clientWidth: canvas.clientWidth,
            clientHeight: canvas.clientHeight
          });
        }
      },
      cssVars: () => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        console.log('Game CSS Variables:', {
          viewportWidth: computedStyle.getPropertyValue('--viewport-width'),
          viewportHeight: computedStyle.getPropertyValue('--viewport-height'),
          viewportScale: computedStyle.getPropertyValue('--viewport-scale'),
          uiScale: computedStyle.getPropertyValue('--ui-scale'),
          containerPadding: computedStyle.getPropertyValue('--container-padding'),
          containerGap: computedStyle.getPropertyValue('--container-gap')
        });
      },
      forceResize: () => {
        console.log('Forcing resize...');
        this.updateViewportInfo();
        const { width, height } = this.currentViewport;
        this.updateCanvasSize(width, height);
      },
      testScale: (scale: number) => {
        console.log(`Testing scale: ${scale}`);
        const root = document.documentElement;
        root.style.setProperty('--ui-scale', scale.toString());
        root.style.setProperty('--viewport-scale', scale.toString());
      }
    };
    
    console.log('Game Manager: Debug commands available at window.gameDebug');
  }

  // Getter for current viewport info
  getViewportInfo(): ViewportInfo {
    return { ...this.currentViewport };
  }

  init() {
    console.log('🎮 Game Manager: Starting initialization...');
    
    dataManager.init();
    console.log('✅ Data Manager initialized');
    
    audioManager.init();
    console.log('✅ Audio Manager initialized');
    
    assetManager.init();
    console.log('✅ Asset Manager initialized');
    
    levelManager.init();
    console.log('✅ Level Manager initialized');
    
    dialogManager.init();
    console.log('✅ Dialog Manager initialized');
    
    textManager.init();
    console.log('✅ Text Manager initialized');

    uiManager.init();
    console.log('✅ UI Manager initialized');
    
    //
    levelManager.load_levels(this.game);
    console.log('✅ Levels loaded into game engine');

    eventBus.on(SCENE_EVENTS.SWITCH_TOOL, (new_tool: string) => {
      uiManager.update_tools(new_tool);
    });

    this.game_state.subscribe((new_game_state: GAME_STATES) => {
      console.log(`🎮 Game State: [${new_game_state}]`);
      switch (new_game_state) {
        case GAME_STATES.LOADING:
          console.log('🔄 Starting asset loading...');
          this.game.start(assetManager.loader).then(() => {
            console.log('✅ Assets loaded successfully');
            this.game_state.next(GAME_STATES.READY);
          }).catch((error) => {
            console.error('❌ Asset loading failed:', error);
            this.game_state.next(GAME_STATES.ERROR);
          });
          break;
        case GAME_STATES.READY:
          console.log('🎯 Game ready - setting up main menu');
          // Skip loading main menu scene to use fixed background
          // this.game.goToScene(MAPS.MAIN_MENU);
          uiManager.update_state(SCENE_STATE.READY);
          audioManager.play_bg(SONGS.SHEPPERD_DOG);
          break;
        case GAME_STATES.PLAYING:
          console.log('🎮 Game playing state');
          uiManager.update_state(SCENE_STATE.PLAYING);
          break;
        case GAME_STATES.COMPLETED:
          break;
        case GAME_STATES.ERROR:
          console.error('❌ Game entered error state');
          break;
      }
    });
    this.scene_state.subscribe((new_scene_state: SCENE_STATE) => {
      console.log(`🎬 Scene State: [${this.game_state.current()}]/[${new_scene_state}]`);
      switch (new_scene_state) {
        case SCENE_STATE.LOADING:
          break;
        case SCENE_STATE.READY:
          break;
        case SCENE_STATE.PLAYING:
          break;
        case SCENE_STATE.TALKING:
          break;
        case SCENE_STATE.PAUSED:
          break;
        case SCENE_STATE.MENU:
          this.player.set_state(PLAYER_STATE.MENU);
          break;
        case SCENE_STATE.COMPLETED:
          break;
        case SCENE_STATE.GAMEOVER:
          break;
        case SCENE_STATE.ERROR:
          break;
      }

      uiManager.update_state(new_scene_state);
    });
    
    console.log('🚀 Starting game state machine...');
    this.game_state.next(GAME_STATES.LOADING);
  }
  start_game(slot_id: number) {
    console.log(`🎮 Starting game with slot ${slot_id}`);
    dataManager.set_slot(slot_id);
    // TODO: send to checkpoint based on data
    // TODO: get music from scene

    audioManager.play_bg(SONGS.APPLE_CIDER);
    this.game_state.next(GAME_STATES.PLAYING);
    console.log(`🗺️ Loading map: ${MAPS.INDOOR_PLAYER_HOUSE}`);
    this.go_to(MAPS.INDOOR_PLAYER_HOUSE);
  }

  go_to(scene: string) {
    console.log(`🚀 go_to called with scene: ${scene}`);

    switch (scene) {
      case MAPS.MAIN_MENU:
        console.log(`📋 Loading main menu`);
        levelManager.reset_levels();
        this.game_state.next(GAME_STATES.READY);
        break;
      default:
        console.log(`🗺️ Loading scene: ${scene}`);
        dataManager.set_current_map(scene);
        console.log(`🎬 Calling game.goToScene(${scene})`);
        this.game.goToScene(scene);
        break;
    }
  }
  // dialogues
  start_talk(npc: BaseNPC) {
    this.scene_state.next(SCENE_STATE.TALKING);
    const { dialogues }: any = game.currentScene;
    dialogManager.start(dialogues, npc.dialog_id);
  }
  continue_talking() {
    dialogManager.continue();
  }
  stop_talking() {
    this.player.set_state(PLAYER_STATE.IDLE);
    this.scene_state.next(SCENE_STATE.PLAYING);
  }
}
class EventBus {
  events: Record<string, any> = {};

  constructor() {}
  on(event: string, callback: any) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
  }
  emit(event: string, data: any = {}) {
    if (this.events[event]) {
      this.events[event].forEach((callback: any) => {
        callback(data);
      });
    }
  }
}

// Calculate fullscreen game dimensions
const getGameDimensions = () => {
  // Use full viewport dimensions for fullscreen experience
  const gameWidth = window.innerWidth;
  const gameHeight = window.innerHeight;
  
  return { width: gameWidth, height: gameHeight };
};

const { width, height } = getGameDimensions();

const options: EngineOptions = {
  width,
  height,
  canvasElementId: "main-canvas",
  backgroundColor: Color.Transparent,
  suppressConsoleBootMessage: true,
  antialiasing: false,
};

console.log('🎮 Game Manager: Creating engine with options:', options);

//
const game = new Engine(options);

// Debug canvas creation
setTimeout(() => {
  const canvas = document.getElementById('main-canvas');
  console.log('🖼️ Canvas element:', canvas);
  console.log('🖼️ Canvas dimensions:', {
    width: canvas?.getAttribute('width'),
    height: canvas?.getAttribute('height'),
    styleWidth: (canvas as HTMLCanvasElement)?.style.width,
    styleHeight: (canvas as HTMLCanvasElement)?.style.height,
    clientWidth: (canvas as HTMLCanvasElement)?.clientWidth,
    clientHeight: (canvas as HTMLCanvasElement)?.clientHeight,
  });
  console.log('🖼️ Canvas visibility:', {
    display: getComputedStyle(canvas as Element).display,
    visibility: getComputedStyle(canvas as Element).visibility,
    opacity: getComputedStyle(canvas as Element).opacity,
  });
}, 1000);

// const devtool = new DevTool(game);
const gameManager = new GameManager(game);
const eventBus = new EventBus();
export { gameManager, eventBus, getGameDimensions };
