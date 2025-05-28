import { Animation, CollisionType, SpriteSheet, range, Engine } from "excalibur";
import { assetManager } from "../../managers/asset.manager";
import { NPC_TYPE } from "../../models";
import { BaseNPC, NPCConfig } from "./base-npc.actor";

enum COW_ANIM {
  IDLE = "COW_IDLE",
  WALK = "COW_WALK",
}

export class Cow extends BaseNPC {
  type: NPC_TYPE;

  // Override base health for cows (they're stronger than chickens)
  public health = { current: 50, max: 50 };
  public defense = 1;

  constructor(config: NPCConfig) {
    super({
      ...config,
      name: config.name || "Cow",
    });
    
    this.type = NPC_TYPE.COW;
    this.body.collisionType = CollisionType.Fixed;
  }

  protected onNPCInitialize(_engine: Engine): void {
    this.setup_graphics();
    console.log(`Cow ${this.npcName} (Level ${this.npcLevel}) initialized with behavior: ${this.npcBehavior}`);
  }

  private setup_graphics() {
    const cow_sprite = SpriteSheet.fromImageSource({
      image: assetManager.images.cow,
      grid: {
        rows: 2,
        columns: 3,
        spriteWidth: 32,
        spriteHeight: 32,
      },
    });
    // Use single frame for stable idle animation (no blinking)
    const cow_anim_idle = Animation.fromSpriteSheet(
      cow_sprite,
      [0], // Single frame instead of range to prevent blinking
      1000 // Longer duration for stable display
    );
    const cow_anim_walk = Animation.fromSpriteSheet(
      cow_sprite,
      range(4, 5),
      300
    );
    this.graphics.add(COW_ANIM.IDLE, cow_anim_idle);
    this.graphics.add(COW_ANIM.WALK, cow_anim_walk);
    
    // Ensure sprite remains visible and stable
    this.graphics.use(COW_ANIM.IDLE);
    this.graphics.visible = true;
    this.graphics.opacity = 1;
  }
}
