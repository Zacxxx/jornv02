import { Actor, Animation, CollisionType, SpriteSheet, range } from "excalibur";
import { assetManager } from "../../managers/asset.manager";
import { ACTOR_TYPE, NPC_TYPE } from "../../models";

enum CHICKEN_ANIM {
  IDLE = "CHICKEN_IDLE",
  WALK = "CHICKEN_WALK",
}
export class Chicken extends Actor {
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
    this.type = NPC_TYPE.CHICKEN;
    this.dialog_id = dialog_id;
  }
  onInitialize(): void {
    this.setup_graphics();
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
