# Epic 05: Adding Attack Animation System

## Overview

This epic focuses on implementing a comprehensive and reusable attack animation system that integrates seamlessly with the existing game architecture. The system will handle combat animations for both the player and NPCs, provide visual feedback, damage calculation, and be extensible for different weapon types and combat scenarios.

## Goals

- Create a reusable attack animation system following the existing project patterns
- Implement combat mechanics with proper state management
- Add visual feedback and effects for attacks
- Support multiple weapon types and attack patterns
- Ensure NPCs can use the same system for their attacks
- Maintain consistency with existing tool animation patterns

## Technical Architecture

### 1. Core Components

#### 1.1 Combat System Manager (`src/managers/combat.manager.ts`)
A new manager following the existing singleton pattern that will:
- Manage combat state and timing
- Handle damage calculations
- Coordinate between attackers and targets
- Manage combat effects and visual feedback
- Provide combat event system integration

#### 1.2 Attack Animation System (`src/systems/attack-animation.system.ts`)
A reusable system that will:
- Handle animation sequencing and timing
- Manage weapon-specific attack patterns
- Coordinate with combat manager for damage application
- Provide callbacks for animation events (start, hit, end)
- Support chaining attacks and combos

#### 1.3 Weapon Types and Combat Models (`src/models/combat.models.ts`)
Extensions to existing models that will include:
- Weapon types and their properties
- Attack patterns and animation sequences
- Damage calculations and effects
- Combat states and events

### 2. Implementation Details

#### 2.1 Models Extension (`src/models.ts`)

```typescript
// Add to existing PLAYER_STATE enum
export enum PLAYER_STATE {
  IDLE = "IDLE",
  TALKING = "TALKING",
  IN_ACTION = "IN_ACTION",
  ATTACKING = "ATTACKING", // New state
  MENU = "MENU",
}

// Add new enums for combat
export enum WEAPON_TYPE {
  SWORD = "SWORD",
  BOW = "BOW",
  STAFF = "STAFF",
  FISTS = "FISTS",
}

export enum ATTACK_TYPE {
  MELEE = "MELEE",
  RANGED = "RANGED",
  MAGIC = "MAGIC",
}

export enum COMBAT_EVENT {
  ATTACK_START = "COMBAT_EVENT__ATTACK_START",
  ATTACK_HIT = "COMBAT_EVENT__ATTACK_HIT",
  ATTACK_END = "COMBAT_EVENT__ATTACK_END",
  DAMAGE_DEALT = "COMBAT_EVENT__DAMAGE_DEALT",
  HEALTH_CHANGED = "COMBAT_EVENT__HEALTH_CHANGED",
}
```

#### 2.2 Combat Manager Implementation

```typescript
// src/managers/combat.manager.ts
import { Actor, Timer, Engine } from "excalibur";
import { eventBus } from "./game.manager";
import { COMBAT_EVENT, WEAPON_TYPE, ATTACK_TYPE } from "../models/combat.models";

interface CombatTarget {
  actor: Actor;
  health: number;
  maxHealth: number;
  defense: number;
}

interface AttackData {
  attacker: Actor;
  target: Actor;
  weaponType: WEAPON_TYPE;
  damage: number;
  attackType: ATTACK_TYPE;
  hitbox: { x: number, y: number, width: number, height: number };
}

class CombatManager {
  private activeCombats: Map<string, AttackData> = new Map();
  private combatTargets: Map<string, CombatTarget> = new Map();

  // Register an actor as a combat participant
  registerCombatant(actor: Actor, health: number, maxHealth: number, defense: number = 0) {
    const key = this.getActorKey(actor);
    this.combatTargets.set(key, {
      actor,
      health,
      maxHealth,
      defense
    });
  }

  // Initiate an attack
  startAttack(attackData: AttackData): string {
    const attackId = this.generateAttackId();
    this.activeCombats.set(attackId, attackData);
    
    eventBus.emit(COMBAT_EVENT.ATTACK_START, {
      attackId,
      attacker: attackData.attacker,
      weaponType: attackData.weaponType
    });

    return attackId;
  }

  // Process hit during animation
  processHit(attackId: string): boolean {
    const attack = this.activeCombats.get(attackId);
    if (!attack) return false;

    const targetKey = this.getActorKey(attack.target);
    const target = this.combatTargets.get(targetKey);
    if (!target) return false;

    // Check if target is in attack range/hitbox
    if (this.isTargetInRange(attack)) {
      const damage = this.calculateDamage(attack, target);
      this.applyDamage(target, damage);
      
      eventBus.emit(COMBAT_EVENT.ATTACK_HIT, {
        attackId,
        target: attack.target,
        damage
      });

      return true;
    }

    return false;
  }

  // End attack sequence
  endAttack(attackId: string) {
    const attack = this.activeCombats.get(attackId);
    if (attack) {
      eventBus.emit(COMBAT_EVENT.ATTACK_END, {
        attackId,
        attacker: attack.attacker
      });
      this.activeCombats.delete(attackId);
    }
  }

  private calculateDamage(attack: AttackData, target: CombatTarget): number {
    const baseDamage = attack.damage;
    const defense = target.defense;
    return Math.max(1, baseDamage - defense);
  }

  private applyDamage(target: CombatTarget, damage: number) {
    target.health = Math.max(0, target.health - damage);
    eventBus.emit(COMBAT_EVENT.DAMAGE_DEALT, {
      target: target.actor,
      damage,
      newHealth: target.health,
      maxHealth: target.maxHealth
    });
  }

  private isTargetInRange(attack: AttackData): boolean {
    // Implementation for range/hitbox checking
    const distance = attack.attacker.pos.distance(attack.target.pos);
    return distance <= 32; // Basic range check
  }

  private getActorKey(actor: Actor): string {
    return `${actor.name}_${actor.id}`;
  }

  private generateAttackId(): string {
    return `attack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const combatManager = new CombatManager();
```

#### 2.3 Attack Animation System

```typescript
// src/systems/attack-animation.system.ts
import { Actor, Animation, Timer, Engine } from "excalibur";
import { combatManager } from "../managers/combat.manager";
import { WEAPON_TYPE, ATTACK_TYPE } from "../models/combat.models";

interface AttackSequence {
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

interface AttackConfig {
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

class AttackAnimationSystem {
  private attackConfigs: Map<WEAPON_TYPE, AttackConfig> = new Map();
  private activeAttacks: Map<string, { actor: Actor; timer: Timer; config: AttackConfig }> = new Map();

  registerAttackConfig(config: AttackConfig) {
    this.attackConfigs.set(config.weaponType, config);
  }

  executeAttack(
    attacker: Actor,
    target: Actor,
    weaponType: WEAPON_TYPE,
    facing: 'front' | 'back' | 'left' | 'right'
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const config = this.attackConfigs.get(weaponType);
      if (!config) {
        resolve(false);
        return;
      }

      const sequence = config.sequences[facing];
      const attackId = combatManager.startAttack({
        attacker,
        target,
        weaponType,
        damage: config.damage,
        attackType: config.attackType,
        hitbox: this.calculateHitbox(attacker, facing, config.range)
      });

      this.playAttackSequence(attacker, attackId, sequence, config)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  private async playAttackSequence(
    actor: Actor,
    attackId: string,
    sequence: AttackSequence,
    config: AttackConfig
  ) {
    // Preparation phase
    actor.graphics.use(sequence.preparation);
    await this.wait(sequence.timing.preparationDuration);

    // Strike phase
    actor.graphics.use(sequence.strike);
    
    // Wait for hit frame
    await this.wait(sequence.timing.hitFrame);
    combatManager.processHit(attackId);
    
    // Complete strike duration
    await this.wait(sequence.timing.strikeDuration - sequence.timing.hitFrame);

    // Recovery phase
    actor.graphics.use(sequence.recovery);
    await this.wait(sequence.timing.recoveryDuration);

    // End attack
    combatManager.endAttack(attackId);
    
    // Return to idle
    this.returnToIdle(actor);
  }

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

  private wait(duration: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  private returnToIdle(actor: Actor) {
    // This should integrate with existing animation system
    // Implementation depends on actor type (Player vs NPC)
  }
}

export const attackAnimationSystem = new AttackAnimationSystem();
```

#### 2.4 Player Integration

```typescript
// Addition to src/actors/player.actor.ts

// Add attack animations to existing ANIM enum
const ANIM = {
  // ... existing animations
  SWORD_ATTACK_FRONT: "SWORD_ATTACK_FRONT",
  SWORD_ATTACK_BACK: "SWORD_ATTACK_BACK",
  SWORD_ATTACK_LEFT: "SWORD_ATTACK_LEFT",
  SWORD_ATTACK_RIGHT: "SWORD_ATTACK_RIGHT",
  // Add more weapon types as needed
};

// In Player class, add attack functionality
export class Player extends Actor {
  // ... existing properties
  public currentWeapon: WEAPON_TYPE = WEAPON_TYPE.FISTS;
  public isAttacking: boolean = false;

  // Add to onPreUpdate method
  onPreUpdate(engine: Engine): void {
    // ... existing input handling

    // Add attack input (e.g., left mouse button or specific key)
    const attackPressed = keyboard.wasPressed(Input.Keys.X) || /* mouse button */;
    
    if (attackPressed && this.player_state === PLAYER_STATE.IDLE && !this.isAttacking) {
      this.performAttack();
    }
  }

  private async performAttack() {
    if (this.isAttacking) return;

    this.isAttacking = true;
    this.set_state(PLAYER_STATE.ATTACKING);

    // Find nearby targets
    const nearbyEnemies = this.findNearbyEnemies();
    const target = nearbyEnemies[0]; // Attack first found enemy

    if (target) {
      const success = await attackAnimationSystem.executeAttack(
        this,
        target,
        this.currentWeapon,
        this.facing.toLowerCase() as any
      );
    }

    this.isAttacking = false;
    this.set_state(PLAYER_STATE.IDLE);
  }

  private findNearbyEnemies(): Actor[] {
    // Implementation to find enemies within attack range
    return [];
  }
}
```

#### 2.5 NPC Integration

```typescript
// Addition to src/actors/NPC/orc.actor.ts

export class Orc extends Actor {
  // ... existing properties
  private canAttack: boolean = true;
  private attackCooldown: number = 2000; // 2 seconds
  private attackRange: number = 32;

  // Add attack behavior to existing AI
  private checkForAttackOpportunity() {
    if (!this.canAttack || !this.isPlayerNearby) return;

    const player = gameManager.player;
    if (!player) return;

    const distance = this.pos.distance(player.pos);
    if (distance <= this.attackRange) {
      this.performAttack(player);
    }
  }

  private async performAttack(target: Actor) {
    if (!this.canAttack) return;

    this.canAttack = false;
    this.stopWandering();

    // Determine facing direction
    const direction = target.pos.sub(this.pos);
    const facing = this.getFacingFromDirection(direction);

    await attackAnimationSystem.executeAttack(
      this,
      target,
      WEAPON_TYPE.FISTS, // Or whatever weapon the orc has
      facing
    );

    // Set cooldown
    setTimeout(() => {
      this.canAttack = true;
    }, this.attackCooldown);
  }

  private getFacingFromDirection(direction: Vector): 'front' | 'back' | 'left' | 'right' {
    if (Math.abs(direction.x) > Math.abs(direction.y)) {
      return direction.x > 0 ? 'right' : 'left';
    } else {
      return direction.y > 0 ? 'front' : 'back';
    }
  }
}
```

### 3. Asset Requirements

#### 3.1 New Sprite Sheets
- Combat animation sprites for player (sword, bow, staff attacks)
- Combat animation sprites for NPCs (orc attacks, guard attacks)
- Visual effects sprites (slash effects, magic particles, hit impacts)

#### 3.2 Asset Manager Updates

```typescript
// Addition to src/managers/asset.manager.ts
private setup_images() {
  this.images = {
    // ... existing images
    character_combat: new ImageSource(
      "/assets/characters/Character Combat Animations.png",
      false,
      ImageFiltering.Pixel
    ),
    orc_combat: new ImageSource(
      "/assets/characters/Orc Combat Animations.png",
      false,
      ImageFiltering.Pixel
    ),
    combat_effects: new ImageSource(
      "/assets/effects/Combat Effects.png",
      false,
      ImageFiltering.Pixel
    ),
  };
}

private setup_sounds() {
  this.sounds = {
    // ... existing sounds
    sword_swing: new Sound("/assets/audio/sword_swing.wav"),
    sword_hit: new Sound("/assets/audio/sword_hit.wav"),
    magic_cast: new Sound("/assets/audio/magic_cast.wav"),
    bow_shoot: new Sound("/assets/audio/bow_shoot.wav"),
  };
}
```

### 4. Implementation Phases

#### Phase 1: Core System Setup
1. Extend models with combat enums and interfaces
2. Implement CombatManager with basic functionality
3. Create AttackAnimationSystem foundation
4. Add basic attack state to Player

#### Phase 1 - Detailed Task List

##### Task 1.1: Extend Models (`src/models.ts`)
- [x] Add `ATTACKING` state to existing `PLAYER_STATE` enum
- [x] Create new `WEAPON_TYPE` enum with `SWORD`, `BOW`, `STAFF`, `FISTS`
- [x] Create new `ATTACK_TYPE` enum with `MELEE`, `RANGED`, `MAGIC`
- [x] Create new `COMBAT_EVENT` enum for event system integration
- [x] Update TypeScript exports to include new enums

##### Task 1.2: Create Combat Models File (`src/models/combat.models.ts`)
- [x] Create `CombatTarget` interface for health/defense tracking
- [x] Create `AttackData` interface for attack configurations  
- [x] Create `AttackSequence` interface for animation timing
- [x] Create `AttackConfig` interface for weapon configurations
- [x] Create `CombatEventData` interface for event system
- [x] Create `CombatantConfig` interface for registration
- [x] Add comprehensive TypeScript documentation

##### Task 1.3: Implement Combat Manager (`src/managers/combat.manager.ts`)
- [x] Create singleton CombatManager class
- [x] Implement `registerCombatant()` method
- [x] Implement `startAttack()` method with event emission
- [x] Implement `processHit()` method with damage calculation
- [x] Implement `endAttack()` method with cleanup
- [x] Implement `getCombatTarget()` method for status queries
- [x] Add damage calculation with defense consideration
- [x] Add range/hitbox checking (basic distance for Phase 1)
- [x] Add comprehensive logging for debugging

##### Task 1.4: Create Attack Animation System (`src/systems/attack-animation.system.ts`)
- [x] Create singleton AttackAnimationSystem class
- [x] Implement `registerAttackConfig()` method
- [x] Implement `executeAttack()` method with Promise-based flow
- [x] Implement `playAttackSequence()` private method
- [x] Implement `calculateHitbox()` method for different directions
- [x] Add timing control with `wait()` utility method
- [x] Add `returnToIdle()` placeholder for Phase 2 integration
- [x] Add configuration query methods

##### Task 1.5: Extend Player Actor (`src/actors/player.actor.ts`)
- [x] Add combat-related imports (`WEAPON_TYPE`, `ATTACK_TYPE`, `combatManager`)
- [x] Add combat properties (`currentWeapon`, `isAttacking`)
- [x] Register player as combatant in `onInitialize()`
- [x] Add attack input handling in `onPreUpdate()` (X key for Phase 1)
- [x] Implement `performAttack()` method with enemy detection
- [x] Implement `findNearbyEnemies()` method with basic range checking
- [x] Implement `simulateAttack()` method for Phase 1 testing
- [x] Add `ATTACKING` state handling in input processing

##### Task 1.6: Register Orcs as Combatants (`src/actors/NPC/orc.actor.ts`)
- [x] Add combat manager import
- [x] Add combat properties (health, defense)
- [x] Register orc as combatant in `onInitialize()`

##### Task 1.7: Create Test Scene (`src/scenes/test-combat.scene.ts`)
- [x] Create TestCombatScene class extending Scene
- [x] Set up player and orc actors for testing
- [x] Implement combat event listeners for validation
- [x] Add combat logging system
- [x] Add test instructions display
- [x] Implement victory handling with orc respawning
- [x] Add debug information and status monitoring

## Phase 1 Implementation Summary ✅

**Status: COMPLETED**

Phase 1 has been successfully implemented with all core combat system foundations in place:

### ✅ What's Working:
- **Combat Models**: All interfaces and enums properly defined
- **Combat Manager**: Fully functional singleton with event system integration
- **Attack Animation System**: Foundation ready for Phase 2 animation integration
- **Player Combat**: X key attack input with enemy detection and range checking
- **NPC Integration**: Orcs registered as combatants with health/defense stats
- **Event System**: Combat events properly emitted and can be monitored
- **Test Environment**: Dedicated test scene for validation and debugging

### ✅ Key Features Implemented:
- Player can attack using X key
- Basic enemy detection within attack range (32 pixels)
- Damage calculation with defense consideration
- Health tracking and combat state management
- Event-driven architecture for extensibility
- Comprehensive logging for debugging
- Test scene for validation

### ✅ Technical Achievements:
- TypeScript compilation successful
- Proper singleton patterns implemented
- Clean separation of concerns
- Event bus integration
- Extensible architecture for Phase 2

### 🎯 Ready for Phase 2:
- Animation system foundation in place
- All interfaces designed for full animation support
- Comment placeholders indicate Phase 2 integration points
- Left-click input can be easily added in Phase 2

#### Phase 2: Player Combat Implementation
1. Add attack input handling to Player
2. Implement basic sword attack animations
3. Create attack sequences and timing
4. Add visual feedback and sound effects

#### Phase 3: NPC Combat Integration
1. Extend Orc NPC with attack capability
2. Implement AI decision making for attacks
3. Add attack patterns and behaviors
4. Test combat interactions between Player and NPCs

#### Phase 4: Advanced Features
1. Add multiple weapon types (bow, staff, etc.)
2. Implement combo system and attack chaining
3. Add special effects and screen shake
4. Create damage numbers and health bars
5. Add knockback and status effects

#### Phase 5: Polish and Balance
1. Fine-tune animation timing and feel
2. Balance damage values and combat pacing
3. Add particle effects and impact feedback
4. Implement combat audio and music integration
5. Create comprehensive testing scenarios

### 5. Testing Strategy

#### 5.1 Unit Tests
- Combat calculation accuracy
- Animation timing consistency
- State management correctness
- Event system reliability

#### 5.2 Integration Tests
- Player-NPC combat interactions
- Multi-actor combat scenarios
- Performance under multiple simultaneous combats
- Animation system integration with existing tools

#### 5.3 Gameplay Tests
- Combat feel and responsiveness
- Balance between different weapon types
- AI behavior in combat situations
- Visual clarity and feedback

### 6. Future Extensions

#### 6.1 Advanced Combat Features
- Blocking and parrying system
- Critical hits and damage variance
- Equipment and weapon upgrading
- Special abilities and magic spells

#### 6.2 AI Enhancements
- Group combat tactics
- Different NPC combat styles
- Dynamic difficulty adjustment
- Procedural attack pattern generation

#### 6.3 Multiplayer Considerations
- Combat synchronization
- Hit detection validation
- Lag compensation
- Combat replay system

## Success Criteria

1. **Functional**: Players can successfully attack NPCs with visual feedback
2. **Reusable**: System can be easily extended for new weapons and actors
3. **Performant**: No noticeable impact on game performance during combat
4. **Integrated**: Seamlessly works with existing animation and state systems
5. **Polished**: Attacks feel responsive and visually satisfying
6. **Balanced**: Combat is challenging but fair for players

## Timeline Estimation

- **Phase 1-2**: 2-3 weeks (Core system + Player implementation)
- **Phase 3**: 1-2 weeks (NPC integration)
- **Phase 4**: 2-3 weeks (Advanced features)
- **Phase 5**: 1-2 weeks (Polish and balance)

**Total Estimated Time**: 6-10 weeks

This epic provides a comprehensive foundation for implementing a robust, reusable attack animation system that follows the existing project architecture while being extensible for future combat features. 