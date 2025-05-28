import {
    Actor,
    Animation,
    CollisionType,
    Color,
    Engine,
    SpriteSheet,
    range,
    vec,
  } from "excalibur";
  import { assetManager } from "../../managers/asset.manager";
  import { gameManager } from "../../managers/game.manager";
  import { NPC_TYPE, PLAYER_STATE } from "../../models";
  
  const ANIM = {
    IDLE_FRONT: "IDLE_FRONT",
    IDLE_LEFT: "IDLE_LEFT",
    IDLE_RIGHT: "IDLE_RIGHT",
    IDLE_BACK: "IDLE_BACK",
    WALK_FRONT: "WALK_FRONT",
    WALK_BACK: "WALK_BACK",
    WALK_LEFT: "WALK_LEFT",
    WALK_RIGHT: "WALK_RIGHT",
  };
  
  function get_orc_animations() {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: assetManager.images.orc, // Using the orc spritesheet
      grid: {
        rows: 4,
        columns: 4,
        spriteWidth: 48, // Assuming 48x48 sprites like player
        spriteHeight: 48,
      },
    });
  
    return {
      [ANIM.IDLE_FRONT]: Animation.fromSpriteSheet(spriteSheet, range(0, 1), 400),
      [ANIM.IDLE_BACK]: Animation.fromSpriteSheet(spriteSheet, range(4, 5), 400),
      [ANIM.IDLE_LEFT]: Animation.fromSpriteSheet(spriteSheet, range(8, 9), 400),
      [ANIM.IDLE_RIGHT]: Animation.fromSpriteSheet(spriteSheet, range(12, 13), 400),
      [ANIM.WALK_FRONT]: Animation.fromSpriteSheet(spriteSheet, range(0, 3), 200),
      [ANIM.WALK_BACK]: Animation.fromSpriteSheet(spriteSheet, range(4, 7), 200),
      [ANIM.WALK_LEFT]: Animation.fromSpriteSheet(spriteSheet, range(8, 11), 200),
      [ANIM.WALK_RIGHT]: Animation.fromSpriteSheet(spriteSheet, range(12, 15), 200),
    };
  }
  
  export class Orc extends Actor {
    type = NPC_TYPE.ORC;
    dialog_id!: string;
    animations: any;
  
    constructor(config: any) {
      super({
        name: "Orc",
        x: config.x,
        y: config.y,
        width: 16, // Adjust as needed
        height: 16, // Adjust as needed
        color: config.color || Color.Green, // Default to green if not specified
        collisionType: CollisionType.Fixed, // Or Active if they should move
      });
      this.dialog_id = config.dialog_id || `${NPC_TYPE.ORC}_DEFAULT`;
      this.scale = vec(0.8, 0.8); // Match player scale initially
    }
  
    onInitialize(_engine: Engine) {
      this.animations = get_orc_animations();
      this.graphics.use(this.animations[ANIM.IDLE_FRONT]);
      // Basic interaction similar to Chicken - can be expanded later
      this.on("pointerdown", () => {
        if (gameManager.player.player_state === PLAYER_STATE.IDLE) {
          gameManager.start_talk(this as any); // Cast as any to satisfy start_talk
        }
      });
    }
  
    // Placeholder for future unique Orc behavior
    // onPreUpdate(engine: Engine, delta: number): void {
    //   // Orc specific logic here
    // }
  } 