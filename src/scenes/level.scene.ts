import { BoundingBox, Color, Engine, Scene, Sound, Vector, ImageSource, Actor } from "excalibur";
import { createPixelPerfectTileCollider } from "../managers/tile-collision.manager";
import { Player } from "../actors/player.actor";
import { assetManager } from "../managers/asset.manager";
import {
  ACTOR_TYPE,
  NPC_TYPE,
  PLAYER_STATE,
  SCENE_EVENTS,
  SONGS,
  TILED_OBJECT,
  TILED_OBJECT_PROPS,
} from "../models";
import { eventBus } from "../managers/game.manager";
import { Chicken } from "../actors/NPC/chicken.actor";
import { Cow } from "../actors/NPC/cow.actor";
import { get_dialog_id } from "../managers/dialog.manager";
import { SceneArea } from "../actors/Areas/scene-area.actor";
import { Orc } from "../actors/NPC/orc.actor";

export class Level extends Scene {
  name: string;
  map_name: string;
  song: SONGS;
  map: any;
  player?: Player;
  player_initial_pos: any;
  player_last_pos: any;
  music!: Sound;
  areas: any;
  dialogues = [];
  constructor(config: any) {
    super();
    this.name = config.name;
    this.map_name = config.map;
    this.song = config.song;
    this.dialogues = config.dialogues;
  }
  onInitialize(engine: Engine): void {
    this.init(engine);
  }
  onDeactivate(): void {
    this.player?.set_state(PLAYER_STATE.IDLE);
  }
  init(engine: Engine) {
    this.backgroundColor = Color.Black;
    this.map = assetManager.maps[this.map_name];
    
    try {
      this.map.addTiledMapToScene(engine);
      console.log(`✅ Map loaded successfully: ${this.map_name}`);
      // Remove all default Tiled collision actors (unnamed or generic)
      const toRemove = this.actors.filter(a => !a.name || a.name === "" || a.name === "collision" || a.name === "Solid" || a.name.startsWith("Tiled") || a.name.startsWith("Tile"));
      toRemove.forEach(a => {
        this.remove(a);
        console.log("Removed default Tiled collision actor", a);
      });
    } catch (error) {
      console.error(`❌ Failed to load map: ${this.map_name}`, error);
    }

    // --- Begin: Add pixel-perfect collision actors for each wall tile ---
    (async () => {
      const tilesets = this.map.data.tilesets || [];
      for (const tileset of tilesets) {
        const firstgid = tileset.firstgid || 0;
        // Find the corresponding ImageSource for this tileset
        const tilesetImageKey = Object.keys(assetManager.images).find(key => assetManager.images[key].path && assetManager.images[key].path.includes(tileset.image));
        if (!tilesetImageKey) continue;
        const tilesetImage = assetManager.images[tilesetImageKey];
        const tileWidth = this.map.data.tileWidth;
        const tileHeight = this.map.data.tileHeight;
        (this.map.data.layers || []).forEach((layer: any) => {
          // Only process the 'walls' layer for collision
          if (layer.type !== "tilelayer" || layer.name !== "walls") return;
          for (let y = 0; y < layer.height; y++) {
            for (let x = 0; x < layer.width; x++) {
              const idx = x + y * layer.width;
              const gid = layer.data[idx];
              if (!gid || gid < firstgid) continue;
              const localId = gid - firstgid;
              // Compute tile's pixel position in the tileset
              const tilesPerRow = Math.floor(tileset.imagewidth / tileWidth);
              const sx = (localId % tilesPerRow) * tileWidth;
              const sy = Math.floor(localId / tilesPerRow) * tileHeight;
              // Create a temp ImageSource for this tile
              const tileCanvas = document.createElement('canvas');
              tileCanvas.width = tileWidth;
              tileCanvas.height = tileHeight;
              const ctx = tileCanvas.getContext('2d')!;
              ctx.drawImage(tilesetImage.image, sx, sy, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
              const tileImageSource = new ImageSource(tileCanvas.toDataURL());
              createPixelPerfectTileCollider(x * tileWidth, y * tileHeight, tileImageSource)
                .then((actor: Actor | undefined) => {
                  if (actor) {
                    this.add(actor);
                    console.log(`Added pixel-perfect wall collider at (${x},${y}) in 'walls' layer`);
                  }
                });
            }
          }
        });
      }
    })();
    // --- End: Add pixel-perfect collision actors for each wall tile ---
    
    const map_width = this.map.data.width * this.map.data.tileWidth;
    const map_height = this.map.data.height * this.map.data.tileHeight;

    this.create_scene_areas();
    this.create_chickens();
    this.create_cows();
    this.create_orcs();
    this.create_player(map_width, map_height);
    this.setup_camera(map_width, map_height);
  }
  reset() {
    if (this.player && this.player_initial_pos) {
      this.player.pos.x = this.player_initial_pos.x;
      this.player.pos.y = this.player_initial_pos.y;
    }
  }
  //
  private create_scene_areas() {
    //
    const switch_scene_area = this.map.data.getObjectLayerByName(
      TILED_OBJECT.SCENE_AREA
    );
    if (switch_scene_area) {
      switch_scene_area.objects.forEach((zone: any) => {
        //
        const scene = zone.properties.find(
          (prop: any) => prop.name === TILED_OBJECT_PROPS.SCENE
        );
        // console.log({ scene });
        const newZone = new SceneArea({
          x: zone.x + zone.width / 2,
          y: zone.y + zone.height / 2,
          name: ACTOR_TYPE.SCENE_NEXT,
          width: zone.width,
          height: zone.height,
          toScene: scene.value,
          // color: Color.Green,
        });
        this.add(newZone);
      });
    }
  }
  private create_chickens() {
    const chicken_layer = this.map.data.getObjectLayerByName("chickens");
    if (chicken_layer) {
      chicken_layer.objects.forEach((mark: any, i: number) => {
        const dialog_id = `${NPC_TYPE.CHICKEN}_${get_dialog_id(mark)}`;
        const chicken = new Chicken({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          color: Color.White,
          dialog_id,
        });
        chicken.graphics.flipHorizontal = i % 2 === 0;

        this.add(chicken);
      });
    }
  }
  private create_cows() {
    const cows_layer = this.map.data.getObjectLayerByName("cows");
    if (cows_layer) {
      cows_layer.objects.forEach((mark: any, i: number) => {
        const dialog_id = `${NPC_TYPE.COW}_${get_dialog_id(mark)}`;
        const cow = new Cow({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          color: Color.Chartreuse,
          dialog_id,
        });
        cow.graphics.flipHorizontal = i % 2 === 0;
        this.add(cow);
      });
    }
  }
  private create_orcs() {
    const orcs_layer = this.map.data.getObjectLayerByName(TILED_OBJECT.ORCS);
    if (orcs_layer) {
      orcs_layer.objects.forEach((mark: any) => {
        const dialog_id = `${NPC_TYPE.ORC}_${get_dialog_id(mark)}`;
        const orc = new Orc({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          dialog_id,
        });
        this.add(orc);
      });
    }
  }
  private create_player(map_width: number, map_height: number) {
    const player_layer = this.map.data.getObjectLayerByName("player");
    if (player_layer) {
      this.player_initial_pos = player_layer.objects[0];
      this.player = new Player({
        x: this.player_initial_pos.x,
        y: this.player_initial_pos.y,
        map_bounds: { right: map_width, bottom: map_height },
      });
      eventBus.emit(SCENE_EVENTS.SWITCH_TOOL, this.player.current_tool);
      this.add(this.player);
      this.camera.strategy.lockToActor(this.player);
    }
  }
  private setup_camera(map_width: number, map_height: number) {
    const map_bounds = BoundingBox.fromDimension(
      map_width,
      map_height,
      Vector.Zero,
      this.map.pos
    );
    this.camera.strategy.limitCameraBounds(map_bounds);
    
    // Enhanced camera settings for better gameplay experience
    this.camera.zoom = 4.0; // Increased zoom for a closer view
    
    // Lock camera to player with enhanced positioning
    if (this.player) {
      this.camera.strategy.lockToActor(this.player);
      
      // Add forward offset to center the character better in the view
      this.camera.pos = this.camera.pos.add(new Vector(0, -48));
      
      // Enable smooth camera movement
      this.camera.strategy.elasticToActor(this.player, 0.1, 0.1);
    }
  }
}
