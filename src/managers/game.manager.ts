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
import { Chicken } from "../actors/NPC/chicken.actor";
import { Cow } from "../actors/NPC/cow.actor";
import { dataManager } from "./data.manager";
import { textManager } from "./text.manager";


class GameManager {
  game!: Engine;
  game_state!: Subject;
  scene_state!: Subject;

  player!: Player;
  private resizeTimeout: number | null = null;

  constructor(engine: Engine) {
    this.game = engine;
    this.game_state = new Subject();
    this.scene_state = new Subject();
    
    // Add window resize handler
    this.setupResizeHandler();
  }
  
  private setupResizeHandler() {
    let resizeTimeout: number | null = null;
    let isResizing = false;
    
    const handleResize = () => {
      if (!isResizing) {
        isResizing = true;
        requestAnimationFrame(() => {
          this.handleResize();
          isResizing = false;
        });
      }
    };
    
    window.addEventListener('resize', () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(handleResize, 150);
    });
  }
  
  private handleResize() {
    const { width, height } = getGameDimensions();
    
    // Update canvas size efficiently
    this.updateCanvasSize(width, height);
    
    // Trigger a re-render
    this.game.currentScene?.camera.update(this.game, 0);
  }

  private updateCanvasSize(width: number, height: number) {
    // Update canvas size
    if (this.game.canvas) {
      this.game.canvas.width = width;
      this.game.canvas.height = height;
      this.game.canvas.style.width = `${width}px`;
      this.game.canvas.style.height = `${height}px`;
    }
    
    // Update engine screen dimensions
    if (this.game.screen) {
      this.game.screen.resolution = { width, height };
      this.game.screen.viewport = { width, height };
    }
  }
  init() {
    dataManager.init();
    audioManager.init();
    assetManager.init();
    levelManager.init();
    dialogManager.init();
    textManager.init();

    uiManager.init();
    //
    levelManager.load_levels(this.game);

    eventBus.on(SCENE_EVENTS.SWITCH_TOOL, (new_tool: string) => {
      uiManager.update_tools(new_tool);
    });

    this.game_state.subscribe((new_game_state: GAME_STATES) => {
      console.log(`[${new_game_state}]`);
      switch (new_game_state) {
        case GAME_STATES.LOADING:
          this.game.start(assetManager.loader).then(() => {
            this.game_state.next(GAME_STATES.READY);
          });
          break;
        case GAME_STATES.READY:
          this.game.goToScene(MAPS.MAIN_MENU);
          uiManager.update_state(SCENE_STATE.READY);
          audioManager.play_bg(SONGS.SHEPPERD_DOG);
          break;
        case GAME_STATES.PLAYING:
          uiManager.update_state(SCENE_STATE.PLAYING);
          break;
        case GAME_STATES.COMPLETED:
          break;
        case GAME_STATES.ERROR:
          break;
      }
    });
    this.scene_state.subscribe((new_scene_state: SCENE_STATE) => {
      console.log(`[${this.game_state.current()}]/[${new_scene_state}]`);
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
    this.game_state.next(GAME_STATES.LOADING);
  }
  start_game(slot_id: number) {
    dataManager.set_slot(slot_id);
    // TODO: send to checkpoint based on data
    // TODO: get music from scene

    audioManager.play_bg(SONGS.APPLE_CIDER);
    this.game_state.next(GAME_STATES.PLAYING);
    this.go_to(MAPS.INDOOR_PLAYER_HOUSE);
  }

  go_to(scene: string) {
    console.log(`go to: ${scene}`);

    switch (scene) {
      case MAPS.MAIN_MENU:
        levelManager.reset_levels();
        this.game_state.next(GAME_STATES.READY);
        break;
      default:
        dataManager.set_current_map(scene);
        this.game.goToScene(scene);
        break;
    }
  }
  // dialogues
  start_talk(npc: Chicken | Cow) {
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
//
const game = new Engine(options);
// const devtool = new DevTool(game);
const gameManager = new GameManager(game);
const eventBus = new EventBus();
export { gameManager, eventBus, getGameDimensions };
