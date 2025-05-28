import { Actor, Animation } from "excalibur";
import { combatManager } from "../managers/combat.manager";
import { WEAPON_TYPE, ATTACK_TYPE } from "../models";
import { AttackConfig, AttackSequence } from "../models/combat.models";

/**
 * Animation Integration System
 * 
 * This system provides a bridge between the existing animation system and the combat system.
 * It handles the integration of attack animations with combat timing and damage application.
 * 
 * Phase 1.5: Uses existing animations (axe) as placeholders
 * Phase 2: Will integrate with full sprite-based attack animations
 */

interface AnimationTiming {
  preparationDuration: number;
  strikeDuration: number;
  recoveryDuration: number;
  hitFrame: number; // When damage is applied during the animation
}

interface AnimationMapping {
  front: string;
  back: string;
  left: string;
  right: string;
}

interface WeaponAnimationConfig {
  weaponType: WEAPON_TYPE;
  attackType: ATTACK_TYPE;
  damage: number;
  range: number;
  timing: AnimationTiming;
  animations: AnimationMapping;
}

/**
 * AnimationIntegrationSystem manages the integration between animations and combat
 */
class AnimationIntegrationSystem {
  private weaponConfigs: Map<WEAPON_TYPE, WeaponAnimationConfig> = new Map();
  private activeAnimations: Map<string, { actor: Actor; startTime: number; config: WeaponAnimationConfig }> = new Map();

  constructor() {
    this.initializeDefaultConfigs();
  }

  /**
   * Initialize default weapon animation configurations
   */
  private initializeDefaultConfigs(): void {
    // Fists configuration (using axe animations as placeholder)
    this.registerWeaponConfig({
      weaponType: WEAPON_TYPE.FISTS,
      attackType: ATTACK_TYPE.MELEE,
      damage: 15,
      range: 32,
      timing: {
        preparationDuration: 150,
        strikeDuration: 200,
        recoveryDuration: 150,
        hitFrame: 100 // Hit occurs 100ms into the strike phase
      },
      animations: {
        front: "AXE_FRONT",
        back: "AXE_BACK",
        left: "AXE_LEFT",
        right: "AXE_RIGHT"
      }
    });

    // Sword configuration (future implementation)
    this.registerWeaponConfig({
      weaponType: WEAPON_TYPE.SWORD,
      attackType: ATTACK_TYPE.MELEE,
      damage: 20,
      range: 40,
      timing: {
        preparationDuration: 120,
        strikeDuration: 180,
        recoveryDuration: 120,
        hitFrame: 90
      },
      animations: {
        front: "SWORD_FRONT", // Will be implemented in Phase 2
        back: "SWORD_BACK",
        left: "SWORD_LEFT",
        right: "SWORD_RIGHT"
      }
    });

    // Bow configuration (future implementation)
    this.registerWeaponConfig({
      weaponType: WEAPON_TYPE.BOW,
      attackType: ATTACK_TYPE.RANGED,
      damage: 18,
      range: 80,
      timing: {
        preparationDuration: 200,
        strikeDuration: 100,
        recoveryDuration: 200,
        hitFrame: 50
      },
      animations: {
        front: "BOW_FRONT", // Will be implemented in Phase 2
        back: "BOW_BACK",
        left: "BOW_LEFT",
        right: "BOW_RIGHT"
      }
    });

    console.log("Animation Integration System: Default weapon configs initialized");
  }

  /**
   * Register a weapon animation configuration
   */
  registerWeaponConfig(config: WeaponAnimationConfig): void {
    this.weaponConfigs.set(config.weaponType, config);
    console.log(`Animation Integration System: Registered config for ${config.weaponType}`);
  }

  /**
   * Execute an attack with integrated animation and combat
   */
  async executeAttack(
    attacker: Actor,
    target: Actor | null,
    weaponType: WEAPON_TYPE,
    facing: 'front' | 'back' | 'left' | 'right'
  ): Promise<boolean> {
    const config = this.weaponConfigs.get(weaponType);
    if (!config) {
      console.warn(`Animation Integration System: No config found for weapon ${weaponType}`);
      return false;
    }

    const animationId = this.generateAnimationId();
    console.log(`Animation Integration System: Starting attack ${animationId} with ${weaponType}`);

    // Store active animation
    this.activeAnimations.set(animationId, {
      actor: attacker,
      startTime: Date.now(),
      config
    });

    try {
      // Phase 1: Preparation
      this.setActorAnimation(attacker, config.animations[facing]);
      await this.wait(config.timing.preparationDuration);

      // Phase 2: Strike with damage application
      let hitSuccess = false;
      if (target) {
        const attackId = combatManager.startAttack({
          attacker,
          target,
          weaponType,
          damage: config.damage,
          attackType: config.attackType,
          hitbox: this.calculateHitbox(attacker, facing, config.range)
        });

        // Wait for hit frame
        await this.wait(config.timing.hitFrame);
        hitSuccess = combatManager.processHit(attackId);

        // Complete strike duration
        const remainingStrike = config.timing.strikeDuration - config.timing.hitFrame;
        if (remainingStrike > 0) {
          await this.wait(remainingStrike);
        }

        combatManager.endAttack(attackId);
      } else {
        // Air swing - just wait for strike duration
        await this.wait(config.timing.strikeDuration);
      }

      // Phase 3: Recovery
      await this.wait(config.timing.recoveryDuration);

      console.log(`Animation Integration System: Attack ${animationId} completed successfully`);
      return hitSuccess;

    } catch (error) {
      console.error(`Animation Integration System: Attack ${animationId} failed:`, error);
      return false;
    } finally {
      // Cleanup
      this.activeAnimations.delete(animationId);
      this.returnActorToIdle(attacker, facing);
    }
  }

  /**
   * Set actor animation (integrates with existing animation system)
   */
  private setActorAnimation(actor: Actor, animationName: string): void {
    // This integrates with the existing actor animation system
    if (actor && typeof (actor as any).set_anim === 'function') {
      (actor as any).set_anim(animationName);
    } else {
      console.warn(`Animation Integration System: Actor ${actor.name} doesn't support set_anim method`);
    }
  }

  /**
   * Return actor to appropriate idle animation
   */
  private returnActorToIdle(actor: Actor, facing: 'front' | 'back' | 'left' | 'right'): void {
    const idleAnimations = {
      front: "IDLE_FRONT",
      back: "IDLE_BACK",
      left: "IDLE_LEFT",
      right: "IDLE_RIGHT"
    };

    this.setActorAnimation(actor, idleAnimations[facing]);
  }

  /**
   * Calculate hitbox based on facing direction and range
   */
  private calculateHitbox(attacker: Actor, facing: string, range: number) {
    const pos = attacker.pos;
    const halfRange = range / 2;

    switch (facing) {
      case 'front':
        return { x: pos.x - halfRange, y: pos.y, width: range, height: range };
      case 'back':
        return { x: pos.x - halfRange, y: pos.y - range, width: range, height: range };
      case 'left':
        return { x: pos.x - range, y: pos.y - halfRange, width: range, height: range };
      case 'right':
        return { x: pos.x, y: pos.y - halfRange, width: range, height: range };
      default:
        return { x: pos.x - halfRange, y: pos.y - halfRange, width: range, height: range };
    }
  }

  /**
   * Utility method for timing control
   */
  private wait(duration: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  /**
   * Generate unique animation ID
   */
  private generateAnimationId(): string {
    return `anim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get weapon configuration
   */
  getWeaponConfig(weaponType: WEAPON_TYPE): WeaponAnimationConfig | undefined {
    return this.weaponConfigs.get(weaponType);
  }

  /**
   * Get all registered weapon types
   */
  getRegisteredWeapons(): WEAPON_TYPE[] {
    return Array.from(this.weaponConfigs.keys());
  }

  /**
   * Check if a weapon type is registered
   */
  hasWeaponConfig(weaponType: WEAPON_TYPE): boolean {
    return this.weaponConfigs.has(weaponType);
  }

  /**
   * Get active animations count (for debugging)
   */
  getActiveAnimationsCount(): number {
    return this.activeAnimations.size;
  }

  /**
   * Convert AttackConfig to WeaponAnimationConfig for compatibility
   */
  convertToAttackConfig(weaponConfig: WeaponAnimationConfig): AttackConfig {
    // This method provides compatibility with the existing AttackConfig interface
    // It will be used when we fully integrate with the attack animation system in Phase 2
    
    const createSequence = (): AttackSequence => ({
      preparation: {} as Animation, // Will be properly implemented in Phase 2
      strike: {} as Animation,
      recovery: {} as Animation,
      timing: weaponConfig.timing
    });

    return {
      weaponType: weaponConfig.weaponType,
      attackType: weaponConfig.attackType,
      damage: weaponConfig.damage,
      range: weaponConfig.range,
      sequences: {
        front: createSequence(),
        back: createSequence(),
        left: createSequence(),
        right: createSequence()
      }
    };
  }
}

// Export singleton instance
export const animationIntegrationSystem = new AnimationIntegrationSystem(); 