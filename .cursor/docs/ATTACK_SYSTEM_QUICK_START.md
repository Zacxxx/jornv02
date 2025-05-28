# Attack System Quick Start Guide

## 🚀 Getting Started with the Attack System

This guide helps developers quickly understand and work with the attack system.

## 📁 Key Files Overview

### Core System Files
- [`src/managers/combat.manager.ts`](mdc:src/managers/combat.manager.ts) - Central combat logic
- [`src/systems/attack-animation.system.ts`](mdc:src/systems/attack-animation.system.ts) - Animation sequencing
- [`src/models/combat.models.ts`](mdc:src/models/combat.models.ts) - TypeScript interfaces
- [`src/models.ts`](mdc:src/models.ts) - Combat enums and types

### Actor Integration
- [`src/actors/player.actor.ts`](mdc:src/actors/player.actor.ts) - Player combat integration
- [`src/actors/NPC/orc.actor.ts`](mdc:src/actors/NPC/orc.actor.ts) - NPC combat example

### Testing
- [`src/scenes/test-combat.scene.ts`](mdc:src/scenes/test-combat.scene.ts) - Combat testing environment

## ⚡ Quick Testing

### 1. Test the Current System
```typescript
// Load the test scene to see combat in action
// Press X to attack when near an orc
// Watch console for combat events
```

### 2. Key Test Commands
- **Movement**: WASD or Arrow Keys
- **Attack**: X key (when near enemy)
- **Monitor**: Check browser console for combat logs

## 🔧 Common Development Tasks

### Adding a New Weapon Type

1. **Update Enums** in [`src/models.ts`](mdc:src/models.ts):
```typescript
export enum WEAPON_TYPE {
  SWORD = "SWORD",
  BOW = "BOW", 
  STAFF = "STAFF",
  FISTS = "FISTS",
  YOUR_NEW_WEAPON = "YOUR_NEW_WEAPON", // Add here
}
```

2. **Create Attack Config**:
```typescript
const newWeaponConfig: AttackConfig = {
  weaponType: WEAPON_TYPE.YOUR_NEW_WEAPON,
  attackType: ATTACK_TYPE.MELEE,
  damage: 15,
  range: 40,
  sequences: {
    // Define for each direction
    front: { /* AttackSequence */ },
    back: { /* AttackSequence */ },
    left: { /* AttackSequence */ },
    right: { /* AttackSequence */ }
  }
};

attackAnimationSystem.registerAttackConfig(newWeaponConfig);
```

### Adding Combat to New NPC

1. **Add Combat Properties**:
```typescript
export class YourNPC extends Actor {
  // Combat properties
  public health = { current: 40, max: 40 };
  public defense = 3;
}
```

2. **Register as Combatant**:
```typescript
onInitialize(engine: Engine) {
  // Register for combat
  combatManager.registerCombatant(this, this.health.current, this.health.max, this.defense);
}
```

### Listening to Combat Events

```typescript
import { COMBAT_EVENT } from "../models";

// Listen for damage events
eventBus.on(COMBAT_EVENT.DAMAGE_DEALT, (data) => {
  console.log(`${data.target.name} took ${data.damage} damage!`);
  
  // Update UI, play sounds, etc.
  if (data.newHealth === 0) {
    // Handle death
  }
});
```

## 🐛 Debugging Tips

### Check Combat Registration
```typescript
const target = combatManager.getCombatTarget(actor);
if (!target) {
  console.error("Actor not registered for combat!");
}
```

### Monitor Attack Range
```typescript
// Current attack range is 32 pixels
const distance = player.pos.distance(enemy.pos);
console.log(`Distance: ${distance}, Range: 32`);
```

### Validate Player State
```typescript
// Attacks only work when player is IDLE
console.log(`Player State: ${player.player_state}`);
console.log(`Is Attacking: ${player.isAttacking}`);
```

## 📈 Next Steps for Phase 2

### Animation Integration Points
- Replace `simulateAttack()` with real animation sequences
- Add sprite-based attack animations in [`src/actors/player.actor.ts`](mdc:src/actors/player.actor.ts)
- Implement `returnToIdle()` in [`src/systems/attack-animation.system.ts`](mdc:src/systems/attack-animation.system.ts)

### Mouse Input Addition
- Add left-click detection in [`src/actors/player.actor.ts`](mdc:src/actors/player.actor.ts) `onPreUpdate()`
- Use Excalibur's pointer event system
- Combine with existing X key input

### Visual Feedback
- Add damage numbers floating text
- Implement screen shake on hit
- Add particle effects for attacks
- Create hit impact animations

## 🔗 Related Documentation

- See [`ATTACK_SYSTEM_DOCUMENTATION.md`](mdc:.cursor/docs/ATTACK_SYSTEM_DOCUMENTATION.md) for comprehensive details
- Check [`05-addingattackanimation.md`](mdc:05-addingattackanimation.md) for the complete epic plan
- Review existing [`CHARACTER_PANEL_FIX_DOCUMENTATION.md`](mdc:.cursor/docs/CHARACTER_PANEL_FIX_DOCUMENTATION.md) for UI integration patterns

## 💡 Pro Tips

1. **Always test in TestCombatScene first** before integrating into main game
2. **Check console logs** for combat events during development
3. **Use TypeScript interfaces** for type safety when extending
4. **Follow singleton patterns** for system managers
5. **Keep combat logic in managers**, not in individual actors 