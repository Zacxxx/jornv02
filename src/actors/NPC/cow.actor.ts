import { Actor, Animation, CollisionType, SpriteSheet, range } from "excalibur";
import { assetManager } from "../../managers/asset.manager";
import { ACTOR_TYPE, NPC_TYPE } from "../../models";

enum COW_ANIM {
  IDLE = "COW_IDLE",
  WALK = "COW_WALK",
}
export class Cow extends Actor {
  type: NPC_TYPE;
  dialog_id: string;
  constructor({ x, y, z, width, height, dialog_id }: any) {
    super({
      x,
      y,
      z,
      width,
      height,
      name: ACTOR_TYPE.NPC,
      collisionType: CollisionType.Fixed,
    });
    this.type = NPC_TYPE.COW;
    this.dialog_id = dialog_id;
  }
  onInitialize(): void {
    this.setup_graphics();
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
