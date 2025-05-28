import { Actor, Animation } from "excalibur";
import { WEAPON_TYPE, ATTACK_TYPE } from "../models";

/**
 * Represents a combat participant with health and defense stats
 */
export interface CombatTarget {
  actor: Actor;
  health: number;
  maxHealth: number;
  defense: number;
}

/**
 * Contains all data needed for an attack action
 */
export interface AttackData {
  attacker: Actor;
  target: Actor;
  weaponType: WEAPON_TYPE;
  damage: number;
  attackType: ATTACK_TYPE;
  hitbox: { x: number; y: number; width: number; height: number };
}

/**
 * Defines the animation sequence and timing for an attack
 */
export interface AttackSequence {
  preparation: Animation;
  strike: Animation;
  recovery: Animation;
  timing: {
    preparationDuration: number;
    strikeDuration: number;
    recoveryDuration: number;
    hitFrame: number; // Frame when damage is applied
  };
}

/**
 * Complete configuration for a weapon type including all attack sequences
 */
export interface AttackConfig {
  weaponType: WEAPON_TYPE;
  attackType: ATTACK_TYPE;
  damage: number;
  range: number;
  sequences: {
    front: AttackSequence;
    back: AttackSequence;
    left: AttackSequence;
    right: AttackSequence;
  };
}

/**
 * Event data emitted during combat events
 */
export interface CombatEventData {
  attackId?: string;
  attacker?: Actor;
  target?: Actor;
  weaponType?: WEAPON_TYPE;
  damage?: number;
  newHealth?: number;
  maxHealth?: number;
}

/**
 * Configuration for registering an actor as a combatant
 */
export interface CombatantConfig {
  actor: Actor;
  health: number;
  maxHealth: number;
  defense?: number;
} 