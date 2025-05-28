import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Actor } from 'excalibur';
import FloatingHealthBar from '../components/FloatingHealthBar/FloatingHealthBar';
import { combatManager } from './combat.manager';

interface FloatingHealthBarData {
  id: string;
  actor: Actor;
  health: number;
  maxHealth: number;
  name: string;
  visible: boolean;
  showName: boolean;
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
      this.container = this.getOrCreateContainer();
      this.root = createRoot(this.container);
      this.isInitialized = true;
      this.render();
      
      console.log('Floating Health Bar Manager: Initialized successfully');
    } catch (error) {
      console.error('Floating Health Bar Manager: Initialization failed:', error);
    }
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
    const healthBarData: FloatingHealthBarData = {
      id,
      actor,
      health: combatTarget.health,
      maxHealth: combatTarget.maxHealth,
      name: name || actor.name || 'Unknown',
      visible: true,
      showName
    };

    this.healthBars.set(id, healthBarData);
    console.log(`Floating Health Bar Manager: Registered ${healthBarData.name}`);
    
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
  }

  /**
   * Update all health bars (call this in game loop)
   */
  update(): void {
    if (!this.isInitialized || !this.camera) return;

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

    // Basic camera transformation (adjust based on your camera system)
    const screenX = worldPos.x - this.camera.pos.x + (this.camera.viewport?.width || 800) / 2;
    const screenY = worldPos.y - this.camera.pos.y + (this.camera.viewport?.height || 600) / 2;

    return { x: screenX, y: screenY };
  }

  /**
   * Render all floating health bars
   */
  private render(): void {
    if (!this.root || !this.isInitialized) return;

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
          />
        );
      });

    this.root.render(
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
      
      // Try to append to game container, fallback to body
      const gameContainer = document.getElementById('game') || document.body;
      gameContainer.appendChild(container);
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
}

// Export singleton instance
export const floatingHealthBarManager = new FloatingHealthBarManager(); 