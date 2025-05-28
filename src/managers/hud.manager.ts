import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { HUD, PlayerStats } from '../components/HUD';
import { BehaviourSubject } from '../utils';

class HUDManager {
  private root: Root | null = null;
  private container: HTMLElement | null = null;
  private playerStats: BehaviourSubject<PlayerStats>;
  private hudVisible: BehaviourSubject<boolean>;
  private initialized = false;
  private initializationAttempts = 0;
  private maxInitializationAttempts = 15;

  constructor() {
    // Initialisation avec des valeurs par défaut
    this.playerStats = new BehaviourSubject<PlayerStats>({
      hp: { current: 100, max: 100 },
      mp: { current: 50, max: 50 },
      energy: { current: 75, max: 100 },
      level: 1,
      name: "Player",
      portraitSrc: "/assets/characters/portrait/default-portrait.png"
    });

    this.hudVisible = new BehaviourSubject<boolean>(true);
  }

  init() {
    console.log('HUD Manager: Starting initialization...');
    // Ensure CSS variables are set before initializing
    this.ensureCSSVariables();
    
    // Wait for DOM to be ready and retry container initialization
    this.initializeWithRetry();
  }

  private ensureCSSVariables() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    // Check if CSS variables are defined, if not set defaults
    if (!computedStyle.getPropertyValue('--ui-scale').trim()) {
      console.warn('HUD: CSS variables not found, setting defaults');
      root.style.setProperty('--ui-scale', '1');
      root.style.setProperty('--container-padding', '20px');
      root.style.setProperty('--container-gap', '12px');
    }
    
    console.log('HUD: CSS variables ensured:', {
      uiScale: computedStyle.getPropertyValue('--ui-scale').trim() || '1',
      containerPadding: computedStyle.getPropertyValue('--container-padding').trim() || '20px',
      containerGap: computedStyle.getPropertyValue('--container-gap').trim() || '12px'
    });
  }

  private initializeWithRetry() {
    this.initializationAttempts++;
    console.log(`HUD: Initialization attempt ${this.initializationAttempts}/${this.maxInitializationAttempts}`);
    
    // Use the existing HUD container from UI manager
    this.container = document.getElementById('hud-container');
    
    if (!this.container && this.initializationAttempts < this.maxInitializationAttempts) {
      // Retry after a longer delay for production builds
      const delay = this.initializationAttempts < 5 ? 100 : 200;
      setTimeout(() => {
        this.initializeWithRetry();
      }, delay);
      return;
    }
    
    if (!this.container) {
      console.warn('HUD: Could not find hud-container after maximum attempts, creating fallback');
      // Create fallback container
      this.container = this.createFallbackContainer();
    } else {
      console.log('HUD: Successfully found hud-container');
    }
    
    // Configure for container-relative positioning
    this.configureContainerPositioning();

    try {
      // Ensure React is available
      if (typeof React === 'undefined' || typeof createRoot === 'undefined') {
        console.error('HUD: React or createRoot not available, using fallback');
        this.createFallbackHUD();
        return;
      }

      // Créer le root React
      this.root = createRoot(this.container);
      console.log('HUD: React root created successfully');

      // S'abonner aux changements et rendre le HUD
      this.playerStats.subscribe(() => this.render());
      this.hudVisible.subscribe(() => this.render());

      // Rendu initial
      this.render();
      this.initialized = true;
      console.log('HUD: Initial render completed successfully');
      
      // Add debug console commands for production testing
      this.addDebugCommands();
      
    } catch (error) {
      console.error('HUD: Failed to initialize React root:', error);
      // Fallback to creating a simple DOM-based HUD
      this.createFallbackHUD();
    }
  }

  private addDebugCommands() {
    // Add global debug commands for testing in production
    (window as any).hudDebug = {
      show: () => this.showHUD(),
      hide: () => this.hideHUD(),
      toggle: () => this.toggleHUD(),
      stats: () => console.log('Current HUD stats:', this.getCurrentStats()),
      visible: () => console.log('HUD visible:', this.isVisible()),
      initialized: () => console.log('HUD initialized:', this.isInitialized()),
      container: () => {
        console.log('HUD container:', this.container);
        console.log('Container parent:', this.container?.parentElement);
        console.log('Container styles:', this.container ? getComputedStyle(this.container) : 'No container');
      },
      cssVars: () => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        console.log('CSS Variables:', {
          uiScale: computedStyle.getPropertyValue('--ui-scale'),
          containerPadding: computedStyle.getPropertyValue('--container-padding'),
          containerGap: computedStyle.getPropertyValue('--container-gap')
        });
      },
      react: () => {
        console.log('React root:', this.root);
        console.log('React available:', typeof React !== 'undefined');
        console.log('createRoot available:', typeof createRoot !== 'undefined');
      },
      reinit: () => {
        console.log('Reinitializing HUD...');
        this.destroy();
        this.init();
      },
      testUpdate: () => {
        console.log('Testing HUD update...');
        this.updateHP(Math.floor(Math.random() * 100), 100);
        this.updateMP(Math.floor(Math.random() * 50), 50);
        this.updateEnergy(Math.floor(Math.random() * 100), 100);
      },
      forceShow: () => {
        console.log('Force showing HUD...');
        if (this.container) {
          this.container.style.display = 'block';
          this.container.style.visibility = 'visible';
          this.container.style.opacity = '1';
        }
        this.showHUD();
      },
      diagnose: () => {
        console.log('=== HUD DIAGNOSTIC REPORT ===');
        console.log('Initialized:', this.isInitialized());
        console.log('Visible:', this.isVisible());
        console.log('Container exists:', !!this.container);
        console.log('React root exists:', !!this.root);
        console.log('Current stats:', this.getCurrentStats());
        
        if (this.container) {
          const rect = this.container.getBoundingClientRect();
          console.log('Container dimensions:', {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
          });
          console.log('Container computed styles:', {
            display: getComputedStyle(this.container).display,
            visibility: getComputedStyle(this.container).visibility,
            opacity: getComputedStyle(this.container).opacity,
            transform: getComputedStyle(this.container).transform,
            zIndex: getComputedStyle(this.container).zIndex
          });
        }
        
        const hudLayout = document.querySelector('.hud-layout');
        if (hudLayout) {
          const layoutRect = hudLayout.getBoundingClientRect();
          console.log('HUD Layout dimensions:', {
            width: layoutRect.width,
            height: layoutRect.height,
            top: layoutRect.top,
            left: layoutRect.left
          });
          console.log('HUD Layout computed styles:', {
            display: getComputedStyle(hudLayout).display,
            transform: getComputedStyle(hudLayout).transform,
            opacity: getComputedStyle(hudLayout).opacity
          });
        } else {
          console.log('HUD Layout element not found');
        }
        
        console.log('=== END DIAGNOSTIC REPORT ===');
      }
    };
    console.log('HUD: Debug commands available at window.hudDebug');
    console.log('HUD: Use hudDebug.diagnose() for full diagnostic report');
  }

  private createFallbackContainer(): HTMLElement {
    console.log('HUD: Creating fallback container');
    const container = document.createElement('div');
    container.id = 'hud-fallback';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1000';
    
    // Find the best parent container
    const gameContainer = document.getElementById('game');
    const playingContainer = document.getElementById('playing');
    const parentContainer = playingContainer || gameContainer || document.body;
    
    parentContainer.appendChild(container);
    console.log('HUD: Fallback container created and appended to:', parentContainer.id || 'body');
    return container;
  }

  private createFallbackHUD() {
    if (!this.container) return;
    
    console.log('HUD: Creating fallback DOM-based HUD');
    
    // Create a simple DOM-based HUD as fallback
    this.container.innerHTML = `
      <div style="
        position: absolute;
        top: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 1000;
        border: 1px solid #444;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      ">
        <div id="fallback-portrait" style="margin-bottom: 10px;">
          <div style="
            width: 40px; 
            height: 40px; 
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%); 
            border: 1px solid #666; 
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            border-radius: 2px;
          ">P</div>
          <div id="fallback-name" style="font-size: 10px; text-align: center;">Player</div>
          <div id="fallback-level" style="font-size: 10px; text-align: center;">Level: 1</div>
        </div>
        <div id="fallback-bars">
          <div style="margin-bottom: 5px;">
            <div style="font-size: 10px;">HP: <span id="fallback-hp">100/100</span></div>
            <div style="width: 100px; height: 8px; background: #333; border: 1px solid #666; border-radius: 2px; overflow: hidden;">
              <div id="fallback-hp-bar" style="width: 100%; height: 100%; background: linear-gradient(90deg, #dc2626 0%, #991b1b 100%); transition: width 0.3s ease;"></div>
            </div>
          </div>
          <div style="margin-bottom: 5px;">
            <div style="font-size: 10px;">MP: <span id="fallback-mp">50/50</span></div>
            <div style="width: 100px; height: 8px; background: #333; border: 1px solid #666; border-radius: 2px; overflow: hidden;">
              <div id="fallback-mp-bar" style="width: 100%; height: 100%; background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%); transition: width 0.3s ease;"></div>
            </div>
          </div>
          <div>
            <div style="font-size: 10px;">EN: <span id="fallback-energy">75/100</span></div>
            <div style="width: 100px; height: 8px; background: #333; border: 1px solid #666; border-radius: 2px; overflow: hidden;">
              <div id="fallback-energy-bar" style="width: 75%; height: 100%; background: linear-gradient(90deg, #ca8a04 0%, #a16207 100%); transition: width 0.3s ease;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Subscribe to updates for fallback HUD
    this.playerStats.subscribe(() => this.updateFallbackHUD());
    this.hudVisible.subscribe(() => this.updateFallbackHUD());
    
    // Initial update
    this.updateFallbackHUD();
    this.initialized = true;
    console.log('HUD: Fallback HUD created and initialized');
  }

  private updateFallbackHUD() {
    if (!this.container || this.root) return; // Only update if using fallback
    
    const stats = this.playerStats.current();
    const visible = this.hudVisible.current();
    
    const hudElement = this.container.querySelector('div') as HTMLElement;
    if (hudElement) {
      hudElement.style.display = visible ? 'block' : 'none';
    }
    
    // Update name and level
    const nameEl = document.getElementById('fallback-name');
    const levelEl = document.getElementById('fallback-level');
    if (nameEl) nameEl.textContent = stats.name;
    if (levelEl) levelEl.textContent = `Level: ${stats.level}`;
    
    // Update HP
    const hpEl = document.getElementById('fallback-hp');
    const hpBarEl = document.getElementById('fallback-hp-bar');
    if (hpEl) hpEl.textContent = `${stats.hp.current}/${stats.hp.max}`;
    if (hpBarEl) hpBarEl.style.width = `${(stats.hp.current / stats.hp.max) * 100}%`;
    
    // Update MP
    const mpEl = document.getElementById('fallback-mp');
    const mpBarEl = document.getElementById('fallback-mp-bar');
    if (mpEl) mpEl.textContent = `${stats.mp.current}/${stats.mp.max}`;
    if (mpBarEl) mpBarEl.style.width = `${(stats.mp.current / stats.mp.max) * 100}%`;
    
    // Update Energy
    const energyEl = document.getElementById('fallback-energy');
    const energyBarEl = document.getElementById('fallback-energy-bar');
    if (energyEl) energyEl.textContent = `${stats.energy.current}/${stats.energy.max}`;
    if (energyBarEl) energyBarEl.style.width = `${(stats.energy.current / stats.energy.max) * 100}%`;
  }

  private configureContainerPositioning() {
    if (!this.container) return;
    
    // Ensure container is positioned relative to game, not viewport
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.pointerEvents = 'none';
    this.container.style.zIndex = '1001';
    
    console.log('HUD: Container positioning configured');
  }

  private render() {
    if (!this.root) {
      console.warn('HUD: Cannot render - React root not available, using fallback if available');
      return;
    }

    try {
      const stats = this.playerStats.current();
      const visible = this.hudVisible.current();
      
      console.log('HUD: Rendering with stats:', {
        hp: `${stats.hp.current}/${stats.hp.max}`,
        mp: `${stats.mp.current}/${stats.mp.max}`,
        energy: `${stats.energy.current}/${stats.energy.max}`,
        level: stats.level,
        name: stats.name,
        visible,
        portraitSrc: stats.portraitSrc
      });

      const hudElement = React.createElement(HUD, {
        playerStats: stats,
        visible: visible
      });

      this.root.render(hudElement);
      console.log('HUD: React render completed successfully');
    } catch (error) {
      console.error('HUD: Render error:', error);
      // Try to use fallback HUD if React fails
      if (!this.container?.querySelector('#fallback-portrait')) {
        console.log('HUD: React render failed, switching to fallback');
        this.root = null; // Clear the failed React root
        this.createFallbackHUD();
      }
    }
  }

  // Méthodes pour mettre à jour les stats du joueur
  updateHP(current: number, max?: number) {
    const stats = this.playerStats.current();
    stats.hp.current = Math.max(0, Math.min(current, stats.hp.max));
    if (max !== undefined) {
      stats.hp.max = Math.max(1, max);
    }
    this.playerStats.next(stats);
  }

  updateMP(current: number, max?: number) {
    const stats = this.playerStats.current();
    stats.mp.current = Math.max(0, Math.min(current, stats.mp.max));
    if (max !== undefined) {
      stats.mp.max = Math.max(1, max);
    }
    this.playerStats.next(stats);
  }

  updateEnergy(current: number, max?: number) {
    const stats = this.playerStats.current();
    stats.energy.current = Math.max(0, Math.min(current, stats.energy.max));
    if (max !== undefined) {
      stats.energy.max = Math.max(1, max);
    }
    this.playerStats.next(stats);
  }

  updateLevel(level: number) {
    const stats = this.playerStats.current();
    stats.level = Math.max(1, level);
    this.playerStats.next(stats);
  }

  updatePlayerName(name: string) {
    const stats = this.playerStats.current();
    stats.name = name;
    this.playerStats.next(stats);
  }

  updatePortrait(portraitSrc: string) {
    const stats = this.playerStats.current();
    stats.portraitSrc = portraitSrc;
    this.playerStats.next(stats);
  }

  // Méthodes pour contrôler la visibilité
  showHUD() {
    this.hudVisible.next(true);
  }

  hideHUD() {
    this.hudVisible.next(false);
  }

  toggleHUD() {
    this.hudVisible.next(!this.hudVisible.current());
  }

  // Getters pour les stats actuelles
  getCurrentStats(): PlayerStats {
    return { ...this.playerStats.current() };
  }

  isVisible(): boolean {
    return this.hudVisible.current();
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  // Nettoyage
  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }
}

export const hudManager = new HUDManager(); 