# Attack System Documentation

## Overview

The attack system is a comprehensive combat framework implemented in Phase 1 of Epic 05. It provides a reusable, event-driven architecture for handling combat interactions between players and NPCs.

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│   Player Input  │───▶│  Combat Manager      │───▶│ Attack Animation    │
│   (X key)       │    │  (Singleton)         │    │ System (Singleton)  │
└─────────────────┘    └──────────────────────┘    └─────────────────────┘
                                │                            │
                                ▼                            ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Event Bus (Global)                               │
│  - ATTACK_START, ATTACK_HIT, ATTACK_END, DAMAGE_DEALT                  │
└─────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────────┐
│   Player Actor  │    │   NPC Actors     │    │   UI/HUD Systems        │
│   (Combatant)   │    │   (Combatants)   │    │   (Event Listeners)     │
└─────────────────┘    └──────────────────┘    └─────────────────────────┘
```

## Core Components

### 1. Combat Manager (`src/managers/combat.manager.ts`)

**Purpose**: Central hub for all combat logic and state management.

**Key Responsibilities**:
- Register actors as combat participants
- Manage attack sequences and timing
- Calculate damage and apply effects
- Emit combat events for system integration
- Handle range checking and hit detection

**Key Methods**:
```typescript
registerCombatant(actor: Actor, health: number, maxHealth: number, defense: number): void
startAttack(attackData: AttackData): string
processHit(attackId: string): boolean
endAttack(attackId: string): void
getCombatTarget(actor: Actor): CombatTarget | undefined
```

**Usage Pattern**:
```typescript
// Register an actor for combat
combatManager.registerCombatant(this, 100, 100, 5);

// Start an attack sequence
const attackId = combatManager.startAttack({
  attacker: this,
  target: enemy,
  weaponType: WEAPON_TYPE.FISTS,
  damage: 10,
  attackType: ATTACK_TYPE.MELEE,
  hitbox: { x: 0, y: 0, width: 32, height: 32 }
});
```

### 2. Attack Animation System (`src/systems/attack-animation.system.ts`)

**Purpose**: Handles animation sequencing and timing for attack sequences.

**Key Responsibilities**:
- Register weapon-specific attack configurations
- Execute complete attack sequences with proper timing
- Calculate hitboxes based on facing direction
- Coordinate with Combat Manager for damage application
- Return actors to idle state after attacks

**Phase 1 Implementation**: Foundation ready for Phase 2 animation integration
**Phase 2 Ready**: All interfaces and timing systems prepared for full animations

### 3. Combat Models (`src/models/combat.models.ts`)

**Purpose**: Define TypeScript interfaces and types for the combat system.

**Key Interfaces**:
```typescript
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
  hitbox: { x: number; y: number; width: number; height: number };
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
```

### 4. Player Integration (`src/actors/player.actor.ts`)

**Combat Properties**:
```typescript
public currentWeapon: WEAPON_TYPE = WEAPON_TYPE.FISTS;
public isAttacking: boolean = false;
```

**Attack Flow**:
1. Input detection (X key in Phase 1)
2. State validation (must be IDLE and not already attacking)
3. Enemy detection within range (32 pixels)
4. Attack execution via simulateAttack() method
5. State management (IDLE → ATTACKING → IDLE)

### 5. NPC Integration (`src/actors/NPC/orc.actor.ts`)

**Combat Properties**:
```typescript
public health = { current: 30, max: 30 };
public defense = 2;
```

**Integration**: Orcs are automatically registered as combatants in `onInitialize()`

## Event System Integration

### Combat Events

| Event | Purpose | Data Payload |
|-------|---------|--------------|
| `ATTACK_START` | Attack sequence initiated | `{ attackId, attacker, weaponType }` |
| `ATTACK_HIT` | Successful hit registered | `{ attackId, target, damage }` |
| `ATTACK_END` | Attack sequence completed | `{ attackId, attacker }` |
| `DAMAGE_DEALT` | Damage applied to target | `{ target, damage, newHealth, maxHealth }` |

### Event Usage Example

```typescript
// Listen for combat events
eventBus.on(COMBAT_EVENT.ATTACK_HIT, (data) => {
  console.log(`${data.target.name} took ${data.damage} damage!`);
});

eventBus.on(COMBAT_EVENT.DAMAGE_DEALT, (data) => {
  if (data.newHealth === 0) {
    console.log(`${data.target.name} was defeated!`);
  }
});
```

## Testing and Validation

### Test Scene (`src/scenes/test-combat.scene.ts`)

**Purpose**: Dedicated testing environment for combat system validation.

**Features**:
- Player and Orc setup for combat testing
- Real-time combat event monitoring
- Automatic orc respawning after defeat
- Distance and health status logging
- Combat log with message history

**Usage**:
1. Load TestCombatScene
2. Use WASD to move player
3. Press X to attack when near orc
4. Monitor console for combat events

## Phase 1 vs Phase 2 Implementation

### Phase 1 (Current) ✅
- **Foundation**: All core systems and interfaces implemented
- **Basic Combat**: X key attacks with damage calculation
- **Event System**: Full event emission and monitoring
- **Testing**: Comprehensive test environment
- **Input**: Keyboard only (X key)

### Phase 2 (Next) 🎯
- **Full Animations**: Integration with sprite-based attack animations
- **Mouse Input**: Left-click attack functionality
- **Visual Feedback**: Attack effects, damage numbers, screen shake
- **Sound Integration**: Attack sounds and audio feedback
- **Enhanced Timing**: Frame-perfect hit detection

## How to Extend the System

### Adding New Weapon Types

1. **Add to Enums** (`src/models.ts`):
```typescript
export enum WEAPON_TYPE {
  SWORD = "SWORD",
  BOW = "BOW",
  STAFF = "STAFF",
  FISTS = "FISTS",
  DAGGER = "DAGGER", // New weapon
}
```

2. **Create Attack Config**:
```typescript
const daggerConfig: AttackConfig = {
  weaponType: WEAPON_TYPE.DAGGER,
  attackType: ATTACK_TYPE.MELEE,
  damage: 8,
  range: 24,
  sequences: {
    // Define animation sequences for each direction
  }
};

attackAnimationSystem.registerAttackConfig(daggerConfig);
```

### Adding New NPC Combatants

1. **Register in `onInitialize()`**:
```typescript
combatManager.registerCombatant(this, health, maxHealth, defense);
```

2. **Add Combat Properties**:
```typescript
public health = { current: 50, max: 50 };
public defense = 3;
```

### Adding Combat AI

```typescript
private checkForAttackOpportunity() {
  if (!this.canAttack || !this.isPlayerNearby) return;
  
  const player = gameManager.player;
  const distance = this.pos.distance(player.pos);
  
  if (distance <= this.attackRange) {
    this.performAttack(player);
  }
}
```

## Performance Considerations

### Current Optimizations
- **Singleton Patterns**: Combat Manager and Attack Animation System
- **Event-Driven**: Loose coupling between components
- **Range Checking**: Simple distance calculations for Phase 1
- **Memory Management**: Attack IDs and cleanup on completion

### Phase 2 Optimizations
- **Animation Pooling**: Reuse animation objects
- **Hitbox Caching**: Cache calculated hitboxes
- **Event Throttling**: Limit event emission frequency
- **Spatial Partitioning**: Optimize enemy detection

## Debugging and Monitoring

### Logging System
- All combat actions logged to console
- Attack IDs for tracking sequences
- Health/damage changes monitored
- Distance and range validation logged

### Debug Commands
```typescript
// Check combat target status
const target = combatManager.getCombatTarget(actor);
console.log(`Health: ${target.health}/${target.maxHealth}`);

// Monitor active attacks
console.log(`Active attacks: ${activeCombats.size}`);
```

## Integration Points

### Existing Systems
- **Game Manager**: Player reference and scene management
- **Event Bus**: Global event system for combat events
- **HUD Manager**: Health display integration ready
- **Asset Manager**: Prepared for combat sprites and sounds

### Future Integrations
- **Particle System**: Attack effects and impacts
- **Audio System**: Combat sounds and music
- **UI System**: Damage numbers and combat feedback
- **Save System**: Combat statistics and progression

## Best Practices

### Code Organization
- Keep combat logic in dedicated managers
- Use TypeScript interfaces for type safety
- Follow singleton patterns for system managers
- Maintain clear separation of concerns

### Testing
- Use TestCombatScene for validation
- Monitor console logs during development
- Test edge cases (out of range attacks, multiple enemies)
- Validate event system integration

### Performance
- Use object pooling for frequently created objects
- Cache calculations when possible
- Minimize event emission frequency
- Profile combat-heavy scenarios

## Troubleshooting Common Issues

### Attack Not Triggering
- Check player state (must be IDLE)
- Verify not already attacking (isAttacking = false)
- Confirm enemy within range (32 pixels in Phase 1)
- Check console for error messages

### Events Not Firing
- Verify eventBus is accessible globally
- Check event listener registration
- Confirm correct event names (COMBAT_EVENT enum)
- Monitor combat manager registrations

### Damage Not Applied
- Verify target is registered as combatant
- Check combat target health values
- Confirm hit detection logic
- Monitor processHit() return values

## Future Roadmap

### Phase 2: Full Animation Integration
- Sprite-based attack animations
- Frame-perfect timing system
- Visual feedback and effects
- Mouse input integration

### Phase 3: Advanced Combat Features
- Blocking and parrying
- Critical hits and damage variance
- Status effects and buffs
- Combo system

### Phase 4: AI Enhancement
- Group combat tactics
- Attack pattern variations
- Dynamic difficulty adjustment
- Behavioral state machines

### Phase 5: Polish and Balance
- Audio integration
- Particle effects
- Screen shake and camera effects
- Performance optimization 