import { createRoot, Root } from 'react-dom/client';
import { Actor } from 'excalibur';
import FloatingHealthBar from '../components/FloatingHealthBar/FloatingHealthBar';
import { combatManager } from './combat.manager';
import { BaseNPC } from '../actors/NPC/base-npc.actor';

interface FloatingHealthBarData {
  id: string;
  actor: Actor;
  health: number;
  maxHealth: number;
  name: string;
  visible: boolean;
  showName: boolean;
  level?: number;
}

/**
 * FloatingHealthBarManager handles the display and management of floating health bars
 * for NPCs and other combatants in the game world.
 */
class FloatingHealthBarManager {
  private root: Root | null = null;
  private container: HTMLElement | null = null;
  private healthBars: Map<string, FloatingHealthBarData> = new Map();
  private isInitialized = false;
  private camera: any = null; // Will store camera reference

  /**
   * Initialize the floating health bar system
   */
  initialize(): void {
    if (this.isInitialized) {
      console.log('Floating Health Bar Manager: Already initialized');
      return;
    }

    try {
      // Check if DOM is ready
      if (document.readyState === 'loading') {
        console.log('Floating Health Bar Manager: DOM not ready, waiting...');
        document.addEventListener('DOMContentLoaded', () => {
          this.initialize();
        });
        return;
      }

      this.container = this.getOrCreateContainer();
      
      if (!this.container) {
        console.error('Floating Health Bar Manager: Failed to create container');
        return;
      }
      
      this.root = createRoot(this.container);
      this.isInitialized = true;
      this.render();
      
      // Add a simple test element to verify container is working
      this.addInitializationTest();
      
      console.log('Floating Health Bar Manager: Initialized successfully');
    } catch (error) {
      console.error('Floating Health Bar Manager: Initialization failed:', error);
    }
  }

  /**
   * Add a simple test element to verify the container is working
   */
  private addInitializationTest(): void {
    if (!this.container) return;
    
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.top = '50px';
    testElement.style.left = '50px';
    testElement.style.width = '200px';
    testElement.style.height = '30px';
    testElement.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    testElement.style.color = 'white';
    testElement.style.fontSize = '14px';
    testElement.style.display = 'flex';
    testElement.style.alignItems = 'center';
    testElement.style.justifyContent = 'center';
    testElement.style.zIndex = '1002';
    testElement.style.border = '2px solid white';
    testElement.textContent = 'HEALTH BAR CONTAINER TEST';
    testElement.id = 'health-bar-init-test';
    
    this.container.appendChild(testElement);
    
    console.log('🧪 Floating Health Bar Manager: Added initialization test element');
    
    // Remove after 5 seconds
    setTimeout(() => {
      const element = document.getElementById('health-bar-init-test');
      if (element) {
        element.remove();
        console.log('🧹 Initialization test element removed');
      }
    }, 5000);
  }

  /**
   * Register an actor for floating health bar display
   */
  registerActor(actor: Actor, name?: string, showName: boolean = false): void {
    const combatTarget = combatManager.getCombatTarget(actor);
    if (!combatTarget) {
      console.warn(`Floating Health Bar Manager: Actor ${actor.name} not registered for combat`);
      return;
    }

    const id = this.getActorId(actor);
    
    // Get level from BaseNPC if available
    const level = (actor instanceof BaseNPC) ? actor.npcLevel : undefined;
    const displayName = (actor instanceof BaseNPC) ? actor.npcName : (name || actor.name || 'Unknown');
    
    const healthBarData: FloatingHealthBarData = {
      id,
      actor,
      health: combatTarget.health,
      maxHealth: combatTarget.maxHealth,
      name: displayName,
      visible: true,
      showName,
      level
    };

    this.healthBars.set(id, healthBarData);
    console.log(`Floating Health Bar Manager: Registered ${healthBarData.name}${level ? ` (Level ${level})` : ''}`);
    
    if (this.isInitialized) {
      this.render();
    }
  }

  /**
   * Unregister an actor from floating health bar display
   */
  unregisterActor(actor: Actor): void {
    const id = this.getActorId(actor);
    if (this.healthBars.delete(id)) {
      console.log(`Floating Health Bar Manager: Unregistered ${actor.name}`);
      if (this.isInitialized) {
        this.render();
      }
    }
  }

  /**
   * Update health for a specific actor
   */
  updateActorHealth(actor: Actor): void {
    const id = this.getActorId(actor);
    const healthBarData = this.healthBars.get(id);
    
    if (!healthBarData) return;

    const combatTarget = combatManager.getCombatTarget(actor);
    if (!combatTarget) return;

    // Update health values
    healthBarData.health = combatTarget.health;
    healthBarData.maxHealth = combatTarget.maxHealth;

    // Hide health bar if actor is dead
    if (combatTarget.health <= 0) {
      healthBarData.visible = false;
      // Remove after a delay to allow death animation
      setTimeout(() => {
        this.unregisterActor(actor);
      }, 2000);
    }

    if (this.isInitialized) {
      this.render();
    }
  }

  /**
   * Set camera reference for world-to-screen coordinate conversion
   */
  setCamera(camera: any): void {
    this.camera = camera;
    console.log(`📷 Floating Health Bar Manager: Camera set, triggering render for ${this.healthBars.size} health bars`);
    
    // Trigger a render now that we have a camera
    if (this.isInitialized && this.healthBars.size > 0) {
      this.render();
    }
  }

  /**
   * Update all health bars (call this in game loop)
   */
  update(): void {
    if (!this.isInitialized) {
      console.log(`⚠️ Floating Health Bar Manager: Not initialized, skipping update`);
      return;
    }
    
    if (!this.camera) {
      console.log(`⚠️ Floating Health Bar Manager: No camera set, skipping update`);
      return;
    }

    let needsRender = false;

    // Update positions and health for all registered actors
    for (const [id, healthBarData] of this.healthBars) {
      const combatTarget = combatManager.getCombatTarget(healthBarData.actor);
      
      if (!combatTarget) {
        // Actor no longer exists in combat system, remove it
        this.healthBars.delete(id);
        needsRender = true;
        continue;
      }

      // Check if health changed
      if (healthBarData.health !== combatTarget.health || 
          healthBarData.maxHealth !== combatTarget.maxHealth) {
        this.updateActorHealth(healthBarData.actor);
        needsRender = true;
      }
    }

    if (needsRender) {
      this.render();
    }
  }

  /**
   * Show/hide health bars for all actors
   */
  setVisible(visible: boolean): void {
    for (const healthBarData of this.healthBars.values()) {
      healthBarData.visible = visible;
    }
    
    if (this.isInitialized) {
      this.render();
    }
  }

  /**
   * Convert world coordinates to screen coordinates
   */
  private worldToScreen(worldPos: { x: number; y: number }): { x: number; y: number } {
    if (!this.camera) {
      return { x: worldPos.x, y: worldPos.y };
    }

    // Get camera properties
    const cameraPos = this.camera.pos || { x: 0, y: 0 };
    const zoom = this.camera.zoom || 1;
    
    // Get viewport dimensions - try multiple sources
    let viewportWidth = 800;
    let viewportHeight = 600;
    
    if (this.camera.viewport) {
      viewportWidth = this.camera.viewport.width || this.camera.viewport.size?.width || 800;
      viewportHeight = this.camera.viewport.height || this.camera.viewport.size?.height || 600;
    } else if (this.camera.engine?.screen) {
      viewportWidth = this.camera.engine.screen.resolution?.width || this.camera.engine.screen.viewport?.width || 800;
      viewportHeight = this.camera.engine.screen.resolution?.height || this.camera.engine.screen.viewport?.height || 600;
    }

    // Transform world coordinates to screen coordinates accounting for zoom
    const screenX = (worldPos.x - cameraPos.x) * zoom + viewportWidth / 2;
    const screenY = (worldPos.y - cameraPos.y) * zoom + viewportHeight / 2;

    return { x: screenX, y: screenY };
  }

  /**
   * Render all floating health bars
   */
  private render(): void {
    if (!this.root || !this.isInitialized) {
      console.log('⚠️ Render skipped: root or initialization missing', {
        hasRoot: !!this.root,
        isInitialized: this.isInitialized
      });
      return;
    }

    const healthBarElements = Array.from(this.healthBars.values())
      .filter(data => data.visible && data.health > 0)
      .map(data => {
        // Calculate screen position (above the actor)
        const worldPos = {
          x: data.actor.pos.x,
          y: data.actor.pos.y - 30 // Offset above the actor
        };
        const screenPos = this.worldToScreen(worldPos);

        return (
          <FloatingHealthBar
            key={data.id}
            health={data.health}
            maxHealth={data.maxHealth}
            position={screenPos}
            name={data.name}
            showName={data.showName}
            visible={data.visible}
            level={data.level}
          />
        );
      });

    console.log(`🎯 Floating Health Bar Manager: Rendering ${healthBarElements.length} health bars`);
    
    if (healthBarElements.length > 0) {
      // Debug camera and coordinate transformation
      if (this.camera) {
        const cameraInfo = {
          pos: this.camera.pos,
          zoom: this.camera.zoom,
          viewport: this.camera.viewport,
          screen: this.camera.engine?.screen
        };
        console.log(`📷 Camera info:`, cameraInfo);
        
        // Log first health bar's coordinate transformation
        const firstHealthBar = Array.from(this.healthBars.values())[0];
        if (firstHealthBar) {
          const worldPos = { x: firstHealthBar.actor.pos.x, y: firstHealthBar.actor.pos.y - 30 };
          const screenPos = this.worldToScreen(worldPos);
          console.log(`🎯 Coordinate transformation example:`, {
            actorName: firstHealthBar.name,
            worldPos,
            screenPos,
            cameraPos: this.camera.pos,
            zoom: this.camera.zoom
          });
        }
      }
      
      console.log(`📊 Health bar data:`, Array.from(this.healthBars.values()).map(data => ({
        name: data.name,
        level: data.level,
        health: `${data.health}/${data.maxHealth}`,
        visible: data.visible,
        showName: data.showName,
        position: { x: data.actor.pos.x, y: data.actor.pos.y }
      })));
    }

    const containerElement = (
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999
      }}>
        {healthBarElements}
      </div>
    );

    console.log(`🔄 React render: Rendering container with ${healthBarElements.length} children`);
    console.log(`📦 Container element:`, containerElement);
    console.log(`🎯 Container DOM element:`, this.container);
    console.log(`🎯 Container parent:`, this.container?.parentElement);
    console.log(`🎯 Container bounding rect:`, this.container?.getBoundingClientRect());

    try {
      this.root.render(containerElement);
      console.log(`✅ React render completed successfully`);
      
      // Check if React actually rendered anything
      setTimeout(() => {
        if (this.container) {
          console.log(`🔍 Post-render container children:`, this.container.children.length);
          console.log(`🔍 Container innerHTML length:`, this.container.innerHTML.length);
          if (this.container.children.length > 0) {
            console.log(`🔍 First child:`, this.container.children[0]);
          }
        }
      }, 100);
    } catch (error) {
      console.error(`❌ React render failed:`, error);
    }
  }

  /**
   * Get or create the container for floating health bars
   */
  private getOrCreateContainer(): HTMLElement {
    let container = document.getElementById('floating-health-bars');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'floating-health-bars';
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '999';
      
      // Try to append to game container first, then fallback to body
      const gameContainer = document.getElementById('game');
      if (gameContainer) {
        gameContainer.appendChild(container);
        console.log('Floating Health Bar Manager: Added container to game container');
      } else {
        document.body.appendChild(container);
        console.log('Floating Health Bar Manager: Added container to body (fallback)');
      }
      
      // Debug container positioning
      console.log('Floating Health Bar Manager: Container created with styles:', {
        position: container.style.position,
        top: container.style.top,
        left: container.style.left,
        width: container.style.width,
        height: container.style.height,
        zIndex: container.style.zIndex,
        parent: container.parentElement?.id || 'unknown'
      });
    }

    return container;
  }

  /**
   * Generate unique ID for an actor
   */
  private getActorId(actor: Actor): string {
    return `${actor.name}_${actor.id}`;
  }

  /**
   * Cleanup and destroy the manager
   */
  destroy(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }

    this.healthBars.clear();
    this.isInitialized = false;
    this.camera = null;

    console.log('Floating Health Bar Manager: Destroyed');
  }
  
  /**
   * Debug method to check current state
   */
  debug(): void {
    console.log('🔍 Floating Health Bar Manager Debug:', {
      isInitialized: this.isInitialized,
      hasCamera: !!this.camera,
      hasRoot: !!this.root,
      hasContainer: !!this.container,
      healthBarsCount: this.healthBars.size,
      healthBars: Array.from(this.healthBars.values()).map(data => ({
        name: data.name,
        level: data.level,
        health: `${data.health}/${data.maxHealth}`,
        visible: data.visible,
        showName: data.showName
      }))
    });
    
    // Additional debug info
    if (this.camera) {
      console.log('📷 Camera Debug:', {
        position: this.camera.pos,
        zoom: this.camera.zoom,
        viewport: this.camera.viewport,
        engine: !!this.camera.engine
      });
    }
    
    if (this.container) {
      console.log('📦 Container Debug:', {
        id: this.container.id,
        parent: this.container.parentElement?.id,
        styles: {
          position: this.container.style.position,
          top: this.container.style.top,
          left: this.container.style.left,
          width: this.container.style.width,
          height: this.container.style.height,
          zIndex: this.container.style.zIndex
        },
        boundingRect: this.container.getBoundingClientRect(),
        children: this.container.children.length
      });
    }
    
    // Test coordinate transformation for all health bars
    if (this.healthBars.size > 0) {
      console.log('🎯 Coordinate Transformation Test:');
      Array.from(this.healthBars.values()).forEach(data => {
        const worldPos = { x: data.actor.pos.x, y: data.actor.pos.y - 30 };
        const screenPos = this.worldToScreen(worldPos);
        console.log(`  ${data.name}: World(${worldPos.x}, ${worldPos.y}) -> Screen(${screenPos.x}, ${screenPos.y})`);
      });
    }
  }
  
  /**
   * Force a manual render for testing
   */
  forceRender(): void {
    console.log('🔄 Forcing manual render...');
    this.render();
  }
  
  /**
   * Test health bar visibility by creating a simple test element
   */
  testVisibility(): void {
    if (!this.container) {
      console.error('❌ No container available for visibility test');
      return;
    }
    
    console.log('🧪 Testing health bar visibility...');
    
    // Create a test element
    const testElement = document.createElement('div');
    testElement.style.position = 'absolute';
    testElement.style.top = '100px';
    testElement.style.left = '100px';
    testElement.style.width = '100px';
    testElement.style.height = '20px';
    testElement.style.backgroundColor = 'red';
    testElement.style.color = 'white';
    testElement.style.fontSize = '12px';
    testElement.style.display = 'flex';
    testElement.style.alignItems = 'center';
    testElement.style.justifyContent = 'center';
    testElement.style.zIndex = '1000';
    testElement.textContent = 'TEST HEALTH BAR';
    testElement.id = 'test-health-bar';
    
    // Remove any existing test element
    const existing = document.getElementById('test-health-bar');
    if (existing) {
      existing.remove();
    }
    
    this.container.appendChild(testElement);
    
    console.log('✅ Test element added. It should appear as a red bar at position (100, 100)');
    
    // Remove after 5 seconds
    setTimeout(() => {
      testElement.remove();
      console.log('🧹 Test element removed');
    }, 5000);
  }
  
  /**
   * Test coordinate transformation with actual NPC positions
   */
  testCoordinateTransformation(): void {
    if (!this.camera || this.healthBars.size === 0) {
      console.error('❌ No camera or health bars available for coordinate test');
      return;
    }
    
    console.log('🧪 Testing coordinate transformation with actual NPCs...');
    
    // Create test elements for each NPC using their actual world positions
    Array.from(this.healthBars.values()).forEach((data, index) => {
      const worldPos = { x: data.actor.pos.x, y: data.actor.pos.y - 30 };
      const screenPos = this.worldToScreen(worldPos);
      
      const testElement = document.createElement('div');
      testElement.style.position = 'absolute';
      testElement.style.top = `${screenPos.y}px`;
      testElement.style.left = `${screenPos.x}px`;
      testElement.style.width = '80px';
      testElement.style.height = '16px';
      testElement.style.backgroundColor = 'lime';
      testElement.style.color = 'black';
      testElement.style.fontSize = '10px';
      testElement.style.display = 'flex';
      testElement.style.alignItems = 'center';
      testElement.style.justifyContent = 'center';
      testElement.style.zIndex = '1001';
      testElement.style.transform = 'translate(-50%, -100%)';
      testElement.textContent = `${data.name} (${data.health}/${data.maxHealth})`;
      testElement.className = `test-coord-${index}`;
      
      // Remove any existing test element for this NPC
      const existing = document.querySelector(`.test-coord-${index}`);
      if (existing) {
        existing.remove();
      }
      
      if (this.container) {
        this.container.appendChild(testElement);
      }
      
      console.log(`📍 ${data.name}: World(${worldPos.x}, ${worldPos.y}) -> Screen(${screenPos.x}, ${screenPos.y})`);
    });
    
    console.log('✅ Test elements added. They should appear above each NPC');
    
    // Remove after 10 seconds
    setTimeout(() => {
      Array.from(this.healthBars.values()).forEach((_, index) => {
        const testElement = document.querySelector(`.test-coord-${index}`);
        if (testElement) {
          testElement.remove();
        }
      });
      console.log('🧹 All test elements removed');
    }, 10000);
  }
}

// Export singleton instance
export const floatingHealthBarManager = new FloatingHealthBarManager();

// Add debug method to window for testing
(window as any).debugFloatingHealthBars = () => {
  floatingHealthBarManager.debug();
};

(window as any).testFloatingHealthBars = () => {
  floatingHealthBarManager.testVisibility();
};

(window as any).testCoordinateTransformation = () => {
  floatingHealthBarManager.testCoordinateTransformation();
};

(window as any).forceRenderHealthBars = () => {
  floatingHealthBarManager.forceRender();
}; 