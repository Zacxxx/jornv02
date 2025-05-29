import { Actor, Scene } from 'excalibur';
import { ExcaliburHealthBar } from '../components/HealthBar/ExcaliburHealthBar';
import { combatManager } from './combat.manager';
import { BaseNPC } from '../actors/NPC/base-npc.actor';

interface HealthBarData {
  id: string;
  actor: Actor;
  healthBar: ExcaliburHealthBar;
  lastHealth: number;
  lastMaxHealth: number;
}

/**
 * ExcaliburHealthBarManager handles native Excalibur health bars
 * that render directly in the game world without DOM/React overhead
 */
class ExcaliburHealthBarManager {
  private healthBars: Map<string, HealthBarData> = new Map();
  private currentScene: Scene | null = null;

  /**
   * Set the current scene for adding/removing health bar actors
   */
  setScene(scene: Scene): void {
    this.currentScene = scene;
    console.log('Excalibur Health Bar Manager: Scene set');
  }

  /**
   * Register an actor for native health bar display
   */
  registerActor(actor: Actor, showName: boolean = false): void {
    if (!this.currentScene) {
      console.warn('Excalibur Health Bar Manager: No scene set, cannot register actor');
      return;
    }

    const combatTarget = combatManager.getCombatTarget(actor);
    if (!combatTarget) {
      console.warn(`Excalibur Health Bar Manager: Actor ${actor.name} not registered for combat`);
      return;
    }

    const id = this.getActorId(actor);
    
    // Remove existing health bar if any
    this.unregisterActor(actor);

    // Get actor info
    const level = (actor instanceof BaseNPC) ? actor.npcLevel : undefined;
    const displayName = (actor instanceof BaseNPC) ? actor.npcName : (actor.name || 'Unknown');

    // Create native Excalibur health bar
    const healthBar = new ExcaliburHealthBar(actor, {
      width: 60,
      height: 8,
      showText: true,
      showName,
      name: displayName,
      level,
      offsetY: 40
    });

    // Set initial health
    healthBar.updateHealth(combatTarget.health, combatTarget.maxHealth);

    // Add to scene
    this.currentScene.add(healthBar);

    // Store reference
    const healthBarData: HealthBarData = {
      id,
      actor,
      healthBar,
      lastHealth: combatTarget.health,
      lastMaxHealth: combatTarget.maxHealth
    };

    this.healthBars.set(id, healthBarData);
    
    console.log(`Excalibur Health Bar Manager: Registered ${displayName}${level ? ` (Level ${level})` : ''}`);
  }

  /**
   * Unregister an actor from health bar display
   */
  unregisterActor(actor: Actor): void {
    const id = this.getActorId(actor);
    const healthBarData = this.healthBars.get(id);
    
    if (healthBarData) {
      // Remove from scene
      healthBarData.healthBar.destroy();
      
      // Remove from our tracking
      this.healthBars.delete(id);
      
      console.log(`Excalibur Health Bar Manager: Unregistered ${actor.name}`);
    }
  }

  /**
   * Update all health bars (call this in game loop)
   */
  update(): void {
    for (const [, healthBarData] of this.healthBars) {
      const combatTarget = combatManager.getCombatTarget(healthBarData.actor);
      
      if (!combatTarget) {
        // Actor no longer exists in combat system, remove it
        this.unregisterActor(healthBarData.actor);
        continue;
      }

      // Check if health changed
      if (healthBarData.lastHealth !== combatTarget.health || 
          healthBarData.lastMaxHealth !== combatTarget.maxHealth) {
        
        // Update health bar
        healthBarData.healthBar.updateHealth(combatTarget.health, combatTarget.maxHealth);
        
        // Update our tracking
        healthBarData.lastHealth = combatTarget.health;
        healthBarData.lastMaxHealth = combatTarget.maxHealth;

        // Remove health bar if actor is dead
        if (combatTarget.health <= 0) {
          setTimeout(() => {
            this.unregisterActor(healthBarData.actor);
          }, 2000); // Delay to allow death animation
        }
      }
    }
  }

  /**
   * Show/hide all health bars
   */
  setVisible(visible: boolean): void {
    for (const healthBarData of this.healthBars.values()) {
      if (visible) {
        healthBarData.healthBar.show();
      } else {
        healthBarData.healthBar.hide();
      }
    }
  }

  /**
   * Get count of active health bars
   */
  getHealthBarCount(): number {
    return this.healthBars.size;
  }

  /**
   * Generate unique ID for an actor
   */
  private getActorId(actor: Actor): string {
    return `${actor.name}_${actor.id}`;
  }

  /**
   * Cleanup all health bars
   */
  destroy(): void {
    for (const healthBarData of this.healthBars.values()) {
      healthBarData.healthBar.destroy();
    }
    this.healthBars.clear();
    this.currentScene = null;
    console.log('Excalibur Health Bar Manager: Destroyed');
  }

  /**
   * Debug method
   */
  debug(): void {
    console.log('🔍 Excalibur Health Bar Manager Debug:', {
      hasScene: !!this.currentScene,
      healthBarsCount: this.healthBars.size,
      healthBars: Array.from(this.healthBars.values()).map(data => ({
        actorName: data.actor.name,
        health: `${data.lastHealth}/${data.lastMaxHealth}`,
        position: { x: data.actor.pos.x, y: data.actor.pos.y },
        healthBarPosition: { x: data.healthBar.pos.x, y: data.healthBar.pos.y }
      }))
    });
  }
}

// Export singleton instance
export const excaliburHealthBarManager = new ExcaliburHealthBarManager();

// Add debug method to window for testing
(window as any).debugExcaliburHealthBars = () => {
  excaliburHealthBarManager.debug();
}; 