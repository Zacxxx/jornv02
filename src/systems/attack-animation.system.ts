import { Actor } from "excalibur";
// import { Animation, Engine, Timer } from "excalibur"; // TODO: Phase 2
import { combatManager } from "../managers/combat.manager";
import { WEAPON_TYPE } from "../models";
// import { ATTACK_TYPE } from "../models"; // TODO: Phase 2
import { AttackSequence, AttackConfig } from "../models/combat.models";

/**
 * AttackAnimationSystem handles the sequencing and timing of attack animations,
 * coordinating with the combat manager for damage application.
 */
class AttackAnimationSystem {
  private attackConfigs: Map<WEAPON_TYPE, AttackConfig> = new Map();
  // private activeAttacks: Map<string, { actor: Actor; timer: Timer; config: AttackConfig }> = new Map(); // TODO: Phase 2

  /**
   * Register an attack configuration for a weapon type
   * @param config Complete attack configuration
   */
  registerAttackConfig(config: AttackConfig): void {
    this.attackConfigs.set(config.weaponType, config);
    console.log(`Attack Animation System: Registered config for ${config.weaponType}`);
  }

  /**
   * Execute an attack sequence
   * @param attacker The attacking actor
   * @param target The target actor
   * @param weaponType Type of weapon being used
   * @param facing Direction the attacker is facing
   * @returns Promise<boolean> resolving to true if attack was successful
   */
  executeAttack(
    attacker: Actor,
    target: Actor,
    weaponType: WEAPON_TYPE,
    facing: 'front' | 'back' | 'left' | 'right'
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const config = this.attackConfigs.get(weaponType);
      if (!config) {
        console.warn(`Attack Animation System: No config found for weapon ${weaponType}`);
        resolve(false);
        return;
      }

      const sequence = config.sequences[facing];
      if (!sequence) {
        console.warn(`Attack Animation System: No sequence found for facing ${facing}`);
        resolve(false);
        return;
      }

      const attackId = combatManager.startAttack({
        attacker,
        target,
        weaponType,
        damage: config.damage,
        attackType: config.attackType,
        hitbox: this.calculateHitbox(attacker, facing, config.range)
      });

      console.log(`Attack Animation System: Executing attack ${attackId} - ${attacker.name} vs ${target.name}`);

      this.playAttackSequence(attacker, attackId, sequence, config)
        .then(() => {
          console.log(`Attack Animation System: Attack ${attackId} completed successfully`);
          resolve(true);
        })
        .catch((error) => {
          console.error(`Attack Animation System: Attack ${attackId} failed:`, error);
          resolve(false);
        });
    });
  }

  /**
   * Play the complete attack animation sequence
   * @param actor The attacking actor
   * @param attackId Unique attack identifier
   * @param sequence Animation sequence to play
   * @param config Attack configuration
   */
  private async playAttackSequence(
    actor: Actor,
    attackId: string,
    sequence: AttackSequence,
    _config: AttackConfig
  ): Promise<void> {
    try {
      // Preparation phase
      console.log(`Attack Animation System: ${attackId} - Preparation phase`);
      actor.graphics.use(sequence.preparation);
      await this.wait(sequence.timing.preparationDuration);

      // Strike phase
      console.log(`Attack Animation System: ${attackId} - Strike phase`);
      actor.graphics.use(sequence.strike);
      
      // Wait for hit frame
      await this.wait(sequence.timing.hitFrame);
      console.log(`Attack Animation System: ${attackId} - Processing hit`);
      combatManager.processHit(attackId);
      
      // Complete strike duration
      const remainingStrikeTime = sequence.timing.strikeDuration - sequence.timing.hitFrame;
      if (remainingStrikeTime > 0) {
        await this.wait(remainingStrikeTime);
      }

      // Recovery phase
      console.log(`Attack Animation System: ${attackId} - Recovery phase`);
      actor.graphics.use(sequence.recovery);
      await this.wait(sequence.timing.recoveryDuration);

      // End attack
      combatManager.endAttack(attackId);
      
      // Return to idle
      this.returnToIdle(actor);
      
    } catch (error) {
      console.error(`Attack Animation System: Error in attack sequence ${attackId}:`, error);
      combatManager.endAttack(attackId);
      this.returnToIdle(actor);
      throw error;
    }
  }

  /**
   * Calculate hitbox based on attacker position and facing direction
   * @param attacker The attacking actor
   * @param facing Direction of attack
   * @param range Attack range
   * @returns Hitbox coordinates and dimensions
   */
  private calculateHitbox(attacker: Actor, facing: string, range: number) {
    const pos = attacker.pos;
    switch (facing) {
      case 'front':
        return { x: pos.x - range/2, y: pos.y, width: range, height: range };
      case 'back':
        return { x: pos.x - range/2, y: pos.y - range, width: range, height: range };
      case 'left':
        return { x: pos.x - range, y: pos.y - range/2, width: range, height: range };
      case 'right':
        return { x: pos.x, y: pos.y - range/2, width: range, height: range };
      default:
        return { x: pos.x - range/2, y: pos.y - range/2, width: range, height: range };
    }
  }

  /**
   * Utility method for waiting/timing control
   * @param duration Duration to wait in milliseconds
   * @returns Promise that resolves after the specified duration
   */
  private wait(duration: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  /**
   * Return actor to idle state after attack
   * TODO: Phase 2 will integrate with existing animation system
   * @param actor The actor to return to idle
   */
  private returnToIdle(actor: Actor): void {
    // Placeholder implementation for Phase 1
    // In Phase 2, this will properly integrate with existing animation systems
    console.log(`Attack Animation System: Returning ${actor.name} to idle state`);
    
    // For now, we'll just log this action
    // The actual implementation will depend on the actor type (Player vs NPC)
    // and their existing animation management systems
  }

  /**
   * Get registered attack config for a weapon type
   * @param weaponType The weapon type to get config for
   * @returns AttackConfig or undefined if not registered
   */
  getAttackConfig(weaponType: WEAPON_TYPE): AttackConfig | undefined {
    return this.attackConfigs.get(weaponType);
  }

  /**
   * Check if a weapon type has been registered
   * @param weaponType The weapon type to check
   * @returns true if registered, false otherwise
   */
  hasAttackConfig(weaponType: WEAPON_TYPE): boolean {
    return this.attackConfigs.has(weaponType);
  }

  /**
   * Get all registered weapon types
   * @returns Array of registered weapon types
   */
  getRegisteredWeapons(): WEAPON_TYPE[] {
    return Array.from(this.attackConfigs.keys());
  }
}

// Export singleton instance
export const attackAnimationSystem = new AttackAnimationSystem(); 