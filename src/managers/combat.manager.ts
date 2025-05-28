import { Actor } from "excalibur";
import { eventBus } from "./game.manager";
import { COMBAT_EVENT } from "../models";
// import { WEAPON_TYPE, ATTACK_TYPE } from "../models"; // TODO: Used in Phase 2
import { CombatTarget, AttackData, CombatEventData } from "../models/combat.models";

/**
 * CombatManager handles all combat-related logic including damage calculation,
 * hit detection, and combat state management following the singleton pattern.
 */
class CombatManager {
  private activeCombats: Map<string, AttackData> = new Map();
  private combatTargets: Map<string, CombatTarget> = new Map();

  /**
   * Register an actor as a combat participant
   * @param actor The actor to register
   * @param health Current health points
   * @param maxHealth Maximum health points
   * @param defense Defense value (default: 0)
   */
  registerCombatant(actor: Actor, health: number, maxHealth: number, defense: number = 0): void {
    const key = this.getActorKey(actor);
    this.combatTargets.set(key, {
      actor,
      health,
      maxHealth,
      defense
    });
    
    console.log(`Combat Manager: Registered ${actor.name} with ${health}/${maxHealth} HP, ${defense} DEF`);
  }

  /**
   * Initiate an attack sequence
   * @param attackData Complete attack configuration
   * @returns Unique attack ID for tracking
   */
  startAttack(attackData: AttackData): string {
    const attackId = this.generateAttackId();
    this.activeCombats.set(attackId, attackData);
    
    const eventData: CombatEventData = {
      attackId,
      attacker: attackData.attacker,
      weaponType: attackData.weaponType
    };
    
    eventBus.emit(COMBAT_EVENT.ATTACK_START, eventData);
    console.log(`Combat Manager: Attack started - ${attackData.attacker.name} attacking with ${attackData.weaponType}`);
    
    return attackId;
  }

  /**
   * Process hit during animation sequence
   * @param attackId The attack ID to process
   * @returns true if hit was successful, false otherwise
   */
  processHit(attackId: string): boolean {
    const attack = this.activeCombats.get(attackId);
    if (!attack) {
      console.warn(`Combat Manager: Attack ${attackId} not found`);
      return false;
    }

    const targetKey = this.getActorKey(attack.target);
    const target = this.combatTargets.get(targetKey);
    if (!target) {
      console.warn(`Combat Manager: Target ${attack.target.name} not registered for combat`);
      return false;
    }

    // Check if target is in attack range/hitbox
    if (this.isTargetInRange(attack)) {
      const damage = this.calculateDamage(attack, target);
      this.applyDamage(target, damage);
      
      const eventData: CombatEventData = {
        attackId,
        target: attack.target,
        damage
      };
      
      eventBus.emit(COMBAT_EVENT.ATTACK_HIT, eventData);
      console.log(`Combat Manager: Hit! ${attack.target.name} took ${damage} damage`);
      
      return true;
    }

    console.log(`Combat Manager: Attack missed - target out of range`);
    return false;
  }

  /**
   * End attack sequence and cleanup
   * @param attackId The attack ID to end
   */
  endAttack(attackId: string): void {
    const attack = this.activeCombats.get(attackId);
    if (attack) {
      const eventData: CombatEventData = {
        attackId,
        attacker: attack.attacker
      };
      
      eventBus.emit(COMBAT_EVENT.ATTACK_END, eventData);
      this.activeCombats.delete(attackId);
      
      console.log(`Combat Manager: Attack ended - ${attack.attacker.name}`);
    }
  }

  /**
   * Get combat target information for an actor
   * @param actor The actor to get info for
   * @returns CombatTarget or undefined if not registered
   */
  getCombatTarget(actor: Actor): CombatTarget | undefined {
    const key = this.getActorKey(actor);
    return this.combatTargets.get(key);
  }

  /**
   * Calculate damage based on attack and target stats
   * @param attack Attack data
   * @param target Target data
   * @returns Final damage amount
   */
  private calculateDamage(attack: AttackData, target: CombatTarget): number {
    const baseDamage = attack.damage;
    const defense = target.defense;
    const finalDamage = Math.max(1, baseDamage - defense); // Minimum 1 damage
    
    return finalDamage;
  }

  /**
   * Apply damage to a target and emit events
   * @param target The target to damage
   * @param damage Amount of damage to apply
   */
  private applyDamage(target: CombatTarget, damage: number): void {
    const oldHealth = target.health;
    target.health = Math.max(0, target.health - damage);
    
    const eventData: CombatEventData = {
      target: target.actor,
      damage,
      newHealth: target.health,
      maxHealth: target.maxHealth
    };
    
    eventBus.emit(COMBAT_EVENT.DAMAGE_DEALT, eventData);
    
    if (oldHealth > 0 && target.health === 0) {
      console.log(`Combat Manager: ${target.actor.name} was defeated!`);
    }
  }

  /**
   * Check if target is within attack range/hitbox
   * @param attack Attack data containing hitbox information
   * @returns true if target is in range
   */
  private isTargetInRange(attack: AttackData): boolean {
    // For Phase 1, use simple distance check
    // TODO: Phase 2 will implement proper hitbox collision
    const distance = attack.attacker.pos.distance(attack.target.pos);
    const maxRange = 32; // Basic range check
    
    return distance <= maxRange;
  }

  /**
   * Generate unique key for actor identification
   * @param actor The actor to generate key for
   * @returns Unique string key
   */
  private getActorKey(actor: Actor): string {
    return `${actor.name}_${actor.id}`;
  }

  /**
   * Generate unique attack ID
   * @returns Unique attack identifier
   */
  private generateAttackId(): string {
    return `attack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const combatManager = new CombatManager(); 