import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import HUD from '../components/HUD/HUD';
import { useGameStore } from '../stores/gameStore';
import { cn } from '../utils/cn';

// Wrapper component to connect Zustand store to HUD
const HUDWrapper: React.FC<{ visible: boolean }> = ({ visible }) => {
  const playerStats = useGameStore((state) => state.playerStats);
  
  return <HUD playerStats={playerStats} visible={visible} />;
};

class HUDManager {
  private hudContainer: HTMLElement | null = null;
  private reactRoot: Root | null = null;
  private isInitialized = false;
  private isHUDDisplayed = true;
  private retryCount = 0;
  private maxRetries = 15;

  init() {
    console.log('HUD Manager: Starting initialization');
    this.attemptInitialization();
  }

  private attemptInitialization() {
    if (this.isInitialized) {
      console.log('HUD Manager: Already initialized');
      return;
    }

    try {
      // Get or create HUD container
      this.hudContainer = this.getOrCreateHUDContainer();
      
      if (!this.hudContainer) {
        throw new Error('Could not create HUD container');
      }

      // Set up CSS variables
      this.ensureCSSVariables();

      // Initialize React root
      this.initializeReactRoot();

      // Render initial HUD
      this.renderHUD();

      // Mark as initialized
      this.isInitialized = true;
      this.retryCount = 0;
      
      console.log('HUD Manager: Successfully initialized');
      
      // Add debug commands
      this.addDebugCommands();

    } catch (error) {
      console.error('HUD Manager: Initialization failed:', error);
      this.handleInitializationFailure();
    }
  }

  private getOrCreateHUDContainer(): HTMLElement {
    // Try to find existing container first
    let container = document.getElementById('hud-container');
    
    if (!container) {
      console.log('HUD Manager: Creating new HUD container');
      
      // Create new container
      container = document.createElement('div');
      container.id = 'hud-container';
      container.className = cn(
        'fixed top-0 left-0 z-[1000] pointer-events-none',
        'w-full h-full'
      );
      
      // Find the best place to insert it
      const gameContainer = document.getElementById('game');
      const playingContainer = document.getElementById('playing');
      const uiContainer = document.getElementById('ui');
      
      if (playingContainer) {
        playingContainer.appendChild(container);
        console.log('HUD Manager: Added container to playing container');
      } else if (uiContainer) {
        uiContainer.appendChild(container);
        console.log('HUD Manager: Added container to UI container');
      } else if (gameContainer) {
        gameContainer.appendChild(container);
        console.log('HUD Manager: Added container to game container');
      } else {
        document.body.appendChild(container);
        console.log('HUD Manager: Added container to body');
      }
    } else {
      console.log('HUD Manager: Using existing HUD container');
    }

    return container;
  }

  private ensureCSSVariables() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    // Check and set essential CSS variables with fallbacks
    const requiredVars = {
      '--ui-scale': '1',
      '--viewport-scale': '1',
      '--container-padding': '20px',
      '--container-gap': '12px',
      '--device-pixel-ratio': '1'
    };

    Object.entries(requiredVars).forEach(([variable, fallback]) => {
      const currentValue = computedStyle.getPropertyValue(variable);
      if (!currentValue || currentValue.trim() === '') {
        root.style.setProperty(variable, fallback);
        console.log(`HUD Manager: Set fallback ${variable}: ${fallback}`);
      }
    });
  }

  private initializeReactRoot() {
    if (!this.hudContainer) {
      throw new Error('HUD container not available for React root');
    }

    if (this.reactRoot) {
      console.log('HUD Manager: Cleaning up existing React root');
      this.reactRoot.unmount();
    }

    try {
      this.reactRoot = createRoot(this.hudContainer);
      console.log('HUD Manager: React root created successfully');
    } catch (error) {
      console.error('HUD Manager: Failed to create React root:', error);
      throw error;
    }
  }

  private renderHUD() {
    if (!this.reactRoot) {
      throw new Error('React root not initialized');
    }

    try {
      this.reactRoot.render(
        React.createElement(HUDWrapper, { 
          visible: this.isHUDDisplayed,
          key: 'hud-wrapper'
        })
      );
      console.log('HUD Manager: HUD rendered successfully');
    } catch (error) {
      console.error('HUD Manager: Failed to render HUD:', error);
      throw error;
    }
  }

  private handleInitializationFailure() {
    this.retryCount++;
    
    if (this.retryCount <= this.maxRetries) {
      const delay = Math.min(100 * Math.pow(2, this.retryCount - 1), 2000);
      console.log(`HUD Manager: Retrying initialization (${this.retryCount}/${this.maxRetries}) in ${delay}ms`);
      
      setTimeout(() => {
        this.attemptInitialization();
      }, delay);
    } else {
      console.error('HUD Manager: Max retries exceeded, falling back to DOM-based HUD');
      this.createFallbackHUD();
    }
  }

  private createFallbackHUD() {
    try {
      console.log('HUD Manager: Creating fallback DOM-based HUD');
      
      if (!this.hudContainer) {
        this.hudContainer = this.getOrCreateHUDContainer();
      }

      // Create a simple DOM-based HUD as fallback
      this.hudContainer.innerHTML = `
        <div class="hud-layout fallback">
          <div class="portrait-frame">
            <div class="portrait-fallback">P</div>
            <div class="portrait-level">1</div>
          </div>
          <div class="bar-menu">
            <div class="stat-bar-container">
              <div class="stat-bar-info">
                <span class="stat-label">HP</span>
                <span class="stat-values">100/100</span>
              </div>
              <div class="stat-bar-track">
                <div class="stat-bar-fill stat-bar-hp" style="width: 100%"></div>
              </div>
            </div>
            <div class="stat-bar-container">
              <div class="stat-bar-info">
                <span class="stat-label">MP</span>
                <span class="stat-values">50/50</span>
              </div>
              <div class="stat-bar-track">
                <div class="stat-bar-fill stat-bar-mp" style="width: 100%"></div>
              </div>
            </div>
            <div class="stat-bar-container">
              <div class="stat-bar-info">
                <span class="stat-label">EN</span>
                <span class="stat-values">75/100</span>
              </div>
              <div class="stat-bar-track">
                <div class="stat-bar-fill stat-bar-energy" style="width: 75%"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      this.isInitialized = true;
      console.log('HUD Manager: Fallback HUD created successfully');
      
    } catch (error) {
      console.error('HUD Manager: Fallback HUD creation failed:', error);
    }
  }

  // Public methods for HUD control
  showHUD() {
    console.log('HUD Manager: Showing HUD');
    this.isHUDDisplayed = true;
    
    if (this.isInitialized) {
      if (this.reactRoot) {
        this.renderHUD();
      } else if (this.hudContainer) {
        this.hudContainer.style.display = 'block';
        this.hudContainer.style.opacity = '1';
      }
    } else {
      this.init();
    }
  }

  hideHUD() {
    console.log('HUD Manager: Hiding HUD');
    this.isHUDDisplayed = false;
    
    if (this.hudContainer) {
      if (this.reactRoot) {
        this.renderHUD(); // Re-render with visible: false
      } else {
        this.hudContainer.style.display = 'none';
      }
    }
  }

  toggleHUD() {
    if (this.isHUDDisplayed) {
      this.hideHUD();
    } else {
      this.showHUD();
    }
  }

  isHUDVisible(): boolean {
    return this.isHUDDisplayed && this.isInitialized;
  }

  // Getter for backward compatibility
  isVisible(): boolean {
    return this.isHUDVisible();
  }

  // Update player stats via Zustand store
  updatePlayerStats(stats: Partial<any>) {
    const store = useGameStore.getState();
    
    if (stats.hp !== undefined) {
      if (typeof stats.hp === 'object') {
        store.updatePlayerHP(stats.hp.current, stats.hp.max);
      } else {
        store.updatePlayerHP(stats.hp);
      }
    }
    
    if (stats.mp !== undefined) {
      if (typeof stats.mp === 'object') {
        store.updatePlayerMP(stats.mp.current, stats.mp.max);
      } else {
        store.updatePlayerMP(stats.mp);
      }
    }
    
    if (stats.energy !== undefined) {
      if (typeof stats.energy === 'object') {
        store.updatePlayerEnergy(stats.energy.current, stats.energy.max);
      } else {
        store.updatePlayerEnergy(stats.energy);
      }
    }
    
    if (stats.level !== undefined) {
      store.updatePlayerLevel(stats.level);
    }
    
    if (stats.name !== undefined) {
      store.updatePlayerName(stats.name);
    }
    
    if (stats.portraitSrc !== undefined) {
      store.updatePortrait(stats.portraitSrc);
    }
  }

  private addDebugCommands() {
    (window as any).hudDebug = {
      diagnose: () => {
        console.log('HUD Diagnostic Report:', {
          isInitialized: this.isInitialized,
          isVisible: this.isHUDDisplayed,
          containerExists: !!this.hudContainer,
          containerInDOM: this.hudContainer ? document.contains(this.hudContainer) : false,
          reactRootExists: !!this.reactRoot,
          retryCount: this.retryCount,
          hudContainerHTML: this.hudContainer?.innerHTML.substring(0, 200) + '...',
          cssVariables: this.getCSSVariables()
        });
      },
      
      forceShow: () => {
        console.log('HUD Debug: Force showing HUD');
        this.showHUD();
        if (this.hudContainer) {
          this.hudContainer.style.display = 'block !important';
          this.hudContainer.style.opacity = '1 !important';
          this.hudContainer.style.visibility = 'visible !important';
        }
      },
      
      container: () => {
        if (this.hudContainer) {
          console.log('HUD Container Info:', {
            element: this.hudContainer,
            styles: getComputedStyle(this.hudContainer),
            children: Array.from(this.hudContainer.children)
          });
        } else {
          console.log('HUD Container: Not found');
        }
      },
      
      cssVars: () => {
        console.log('HUD CSS Variables:', this.getCSSVariables());
      },
      
      reinit: () => {
        console.log('HUD Debug: Reinitializing HUD');
        this.isInitialized = false;
        this.retryCount = 0;
        this.init();
      },
      
      testUpdate: () => {
        console.log('HUD Debug: Testing stat updates');
        this.updatePlayerStats({
          hp: { current: 75, max: 100 },
          mp: { current: 25, max: 50 },
          energy: { current: 50, max: 100 }
        });
      }
    };
    
    console.log('HUD Manager: Debug commands available at window.hudDebug');
  }

  private getCSSVariables() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return {
      uiScale: computedStyle.getPropertyValue('--ui-scale'),
      viewportScale: computedStyle.getPropertyValue('--viewport-scale'),
      containerPadding: computedStyle.getPropertyValue('--container-padding'),
      containerGap: computedStyle.getPropertyValue('--container-gap'),
      devicePixelRatio: computedStyle.getPropertyValue('--device-pixel-ratio')
    };
  }

  // Cleanup method
  destroy() {
    console.log('HUD Manager: Cleaning up');
    
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    
    if (this.hudContainer && this.hudContainer.parentNode) {
      this.hudContainer.parentNode.removeChild(this.hudContainer);
    }
    
    this.hudContainer = null;
    this.isInitialized = false;
    this.isHUDDisplayed = true;
    this.retryCount = 0;
    
    // Clean up debug commands
    if ((window as any).hudDebug) {
      delete (window as any).hudDebug;
    }
  }
}

export const hudManager = new HUDManager(); 