import { Animation, CollisionType, SpriteSheet, range, Engine, Color } from "excalibur";
import { assetManager } from "../../managers/asset.manager";
import { NPC_TYPE } from "../../models";
import { BaseNPC, NPCConfig } from "./base-npc.actor";

enum CHICKEN_ANIM {
  IDLE = "CHICKEN_IDLE",
  WALK = "CHICKEN_WALK",
}

export class Chicken extends BaseNPC {
  type: NPC_TYPE;

  // Override base health for chickens (they're weaker)
  public health = { current: 10, max: 10 };
  public defense = 0;

  constructor(config: NPCConfig) {
    super({
      ...config,
      name: config.name || "Chicken",
      color: Color.White,
    });
    
    this.type = NPC_TYPE.CHICKEN;
    this.body.collisionType = CollisionType.Fixed;
  }

  protected onNPCInitialize(_engine: Engine): void {
    this.setup_graphics();
    console.log(`Chicken ${this.npcName} (Level ${this.npcLevel}) initialized with behavior: ${this.npcBehavior}`);
  }

  private setup_graphics() {
    const chicken_sprite = SpriteSheet.fromImageSource({
      image: assetManager.images.chicken,
      grid: {
        rows: 2,
        columns: 4,
        spriteWidth: 16,
        spriteHeight: 16,
      },
    });
    
    // Use single frame for stable idle animation (no blinking)
    const chicken_anim_idle = Animation.fromSpriteSheet(
      chicken_sprite,
      [0], // Single frame instead of range to prevent blinking
      1000 // Longer duration for stable display
    );
    const chicken_anim_walk = Animation.fromSpriteSheet(
      chicken_sprite,
      range(4, 7),
      300
    );
    
    this.graphics.add(CHICKEN_ANIM.IDLE, chicken_anim_idle);
    this.graphics.add(CHICKEN_ANIM.WALK, chicken_anim_walk);
    
    // Ensure sprite remains visible and stable
    this.graphics.use(CHICKEN_ANIM.IDLE);
    this.graphics.visible = true;
    this.graphics.opacity = 1;
  }
}
