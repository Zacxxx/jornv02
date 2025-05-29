import { BoundingBox, Color, Engine, Scene, Sound, Vector, ImageSource, Actor } from "excalibur";
import { createPixelPerfectTileCollider } from "../managers/tile-collision.manager";
import { Player } from "../actors/player.actor";
import { assetManager } from "../managers/asset.manager";
import {
  ACTOR_TYPE,
  NPC_TYPE,
  NPC_BEHAVIOR,
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
import { getNPCBehavior, getNPCLevel, getNPCName } from "../utils/tiled.utils";
import { excaliburHealthBarManager } from "../managers/excalibur-health-bar.manager";

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
  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    
    // Update native health bars
    excaliburHealthBarManager.update();
  }
  init(engine: Engine) {
    this.backgroundColor = Color.Black;
    this.map = assetManager.maps[this.map_name];
    
    // Set scene for native health bar manager
    excaliburHealthBarManager.setScene(this);
    
    console.log(`🔄 Initializing level: ${this.name} (${this.map_name})`);
    console.log(`📍 Map object:`, this.map);
    console.log(`📋 Available maps:`, Object.keys(assetManager.maps));
    
    if (!this.map) {
      console.error(`❌ Map not found: ${this.map_name}`);
      console.log(`📋 Available maps:`, Object.keys(assetManager.maps));
      return;
    }
    
    let mapLoadSuccess = false;
    try {
      console.log(`🗺️ Adding map to scene...`);
      this.map.addTiledMapToScene(engine);
      console.log(`✅ Map loaded successfully: ${this.map_name}`);
 main
      // Remove all default Tiled collision actors (unnamed or generic)
      const toRemove = this.actors.filter(a => !a.name || a.name === "" || a.name === "collision" || a.name === "Solid" || a.name.startsWith("Tiled") || a.name.startsWith("Tile"));
      toRemove.forEach(a => {
        this.remove(a);
        console.log("Removed default Tiled collision actor", a);
      });

      mapLoadSuccess = true;
 main
    } catch (error) {
      console.error(`❌ Failed to load map: ${this.map_name}`, error);
      console.log(`⚠️ Continuing with fallback mode...`);
      // Don't return here - try to continue with fallback
    }
    
    if (!this.map.data && mapLoadSuccess) {
      console.error(`❌ Map data not available: ${this.map_name}`);
      return;
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
    
    let map_width = 1600; // Fallback dimensions
    let map_height = 1600;
    
    if (this.map.data && mapLoadSuccess) {
      console.log(`📊 Map data structure:`, {
        width: this.map.data.width,
        height: this.map.data.height,
        tileWidth: this.map.data.tileWidth,
        tileHeight: this.map.data.tileHeight,
        objectLayers: this.map.data.objectLayers?.map((layer: any) => ({
          name: layer.name,
          objectCount: layer.objects?.length || 0
        }))
      });
      
      map_width = this.map.data.width * this.map.data.tileWidth;
      map_height = this.map.data.height * this.map.data.tileHeight;
    } else {
      console.log(`⚠️ Using fallback map dimensions: ${map_width}x${map_height}`);
    }
    
    console.log(`📏 Map dimensions: ${map_width}x${map_height}`);

    if (mapLoadSuccess) {
      try {
        console.log(`🏗️ Creating scene areas...`);
        this.create_scene_areas();
        console.log(`✅ Scene areas created`);
      } catch (error) {
        console.error(`❌ Failed to create scene areas:`, error);
      }

      try {
        console.log(`🐔 Creating chickens...`);
        this.create_chickens();
        console.log(`✅ Chickens created`);
      } catch (error) {
        console.error(`❌ Failed to create chickens:`, error);
      }

      try {
        console.log(`🐄 Creating cows...`);
        this.create_cows();
        console.log(`✅ Cows created`);
      } catch (error) {
        console.error(`❌ Failed to create cows:`, error);
      }

      try {
        console.log(`👹 Creating orcs...`);
        this.create_orcs();
        console.log(`✅ Orcs created`);
      } catch (error) {
        console.error(`❌ Failed to create orcs:`, error);
      }
    } else {
      console.log(`⚠️ Skipping NPC creation due to map loading failure`);
      // Create test orcs manually for debugging
      this.create_test_orcs();
    }

    try {
      console.log(`🎮 Creating player...`);
      this.create_player(map_width, map_height);
      console.log(`✅ Player created`);
    } catch (error) {
      console.error(`❌ Failed to create player:`, error);
    }

    try {
      console.log(`📷 Setting up camera...`);
      this.setup_camera(map_width, map_height);
      console.log(`✅ Camera setup complete`);
    } catch (error) {
      console.error(`❌ Failed to setup camera:`, error);
    }
    
    console.log(`✅ Level initialization complete: ${this.name}`);
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
        
        // Parse custom Tiled properties
        const behavior = getNPCBehavior(mark);
        const level = getNPCLevel(mark);
        const name = getNPCName(mark, "Chicken");
        
        const chicken = new Chicken({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          dialog_id,
          behavior,
          level,
          name,
        });
        chicken.graphics.flipHorizontal = i % 2 === 0;

        console.log(`Created ${name} (Level ${level}, ${behavior}) at (${mark.x}, ${mark.y})`);
        this.add(chicken);
      });
    }
  }
  private create_cows() {
    const cows_layer = this.map.data.getObjectLayerByName("cows");
    if (cows_layer) {
      cows_layer.objects.forEach((mark: any, i: number) => {
        const dialog_id = `${NPC_TYPE.COW}_${get_dialog_id(mark)}`;
        
        // Parse custom Tiled properties
        const behavior = getNPCBehavior(mark);
        const level = getNPCLevel(mark);
        const name = getNPCName(mark, "Cow");
        
        const cow = new Cow({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          dialog_id,
          behavior,
          level,
          name,
        });
        cow.graphics.flipHorizontal = i % 2 === 0;
        
        console.log(`Created ${name} (Level ${level}, ${behavior}) at (${mark.x}, ${mark.y})`);
        this.add(cow);
      });
    }
  }
  private create_orcs() {
    console.log(`🔍 Looking for orcs layer in map: ${this.map_name}`);
    const orcs_layer = this.map.data.getObjectLayerByName(TILED_OBJECT.ORCS);
    
    if (orcs_layer) {
      console.log(`✅ Found orcs layer with ${orcs_layer.objects.length} objects`);
      orcs_layer.objects.forEach((mark: any, index: number) => {
        console.log(`🔍 Processing orc ${index + 1}:`, {
          x: mark.x,
          y: mark.y,
          properties: mark.properties
        });
        
        const dialog_id = `${NPC_TYPE.ORC}_${get_dialog_id(mark)}`;
        
        // Parse custom Tiled properties
        const behavior = getNPCBehavior(mark);
        const level = getNPCLevel(mark);
        const name = getNPCName(mark, "Orc");
        
        console.log(`📊 Parsed properties:`, { behavior, level, name });
        
        const orc = new Orc({
          x: mark.x,
          y: mark.y,
          width: 16,
          height: 16,
          dialog_id,
          behavior,
          level,
          name,
        });
        
        console.log(`✅ Created ${name} (Level ${level}, ${behavior}) at (${mark.x}, ${mark.y})`);
        this.add(orc);
      });
    } else {
      console.log(`❌ No orcs layer found in map: ${this.map_name}`);
      console.log(`📋 Available object layers:`, this.map.data.objectLayers?.map((layer: any) => layer.name) || 'No object layers found');
    }
  }
  private create_test_orcs() {
    console.log(`🧪 Creating test orcs for debugging...`);
    
    // Create a few test orcs with different behaviors
    const testOrcs = [
      {
        x: 400,
        y: 400,
        behavior: NPC_BEHAVIOR.AGGRESSIVE,
        level: 2,
        name: "Test Gobelin 1"
      },
      {
        x: 500,
        y: 400,
        behavior: NPC_BEHAVIOR.AGGRESSIVE,
        level: 3,
        name: "Test Gobelin 2"
      },
      {
        x: 600,
        y: 400,
        behavior: NPC_BEHAVIOR.SAVAGE,
        level: 5,
        name: "Test OoLee Gan"
      }
    ];
    
    testOrcs.forEach((orcData, index) => {
      try {
        console.log(`🧪 Creating test orc ${index + 1}:`, orcData);
        
        const dialog_id = `${NPC_TYPE.ORC}_test_${index}`;
        
        const orc = new Orc({
          x: orcData.x,
          y: orcData.y,
          width: 16,
          height: 16,
          dialog_id,
          behavior: orcData.behavior,
          level: orcData.level,
          name: orcData.name,
        });
        
        console.log(`✅ Created test ${orcData.name} (Level ${orcData.level}, ${orcData.behavior}) at (${orcData.x}, ${orcData.y})`);
        this.add(orc);
      } catch (error) {
        console.error(`❌ Failed to create test orc ${index + 1}:`, error);
      }
    });
  }
  private create_player(map_width: number, map_height: number) {
    let playerX = 800; // Fallback position
    let playerY = 800;
    
    if (this.map.data) {
      const player_layer = this.map.data.getObjectLayerByName("player");
      if (player_layer && player_layer.objects.length > 0) {
        this.player_initial_pos = player_layer.objects[0];
        playerX = this.player_initial_pos.x;
        playerY = this.player_initial_pos.y;
      } else {
        console.log(`⚠️ No player spawn point found, using fallback position`);
      }
    } else {
      console.log(`⚠️ No map data available, using fallback player position`);
    }
    
    this.player = new Player({
      x: playerX,
      y: playerY,
      map_bounds: { right: map_width, bottom: map_height },
    });
    
    eventBus.emit(SCENE_EVENTS.SWITCH_TOOL, this.player.current_tool);
    this.add(this.player);
    this.camera.strategy.lockToActor(this.player);
    
    console.log(`✅ Player created at (${playerX}, ${playerY})`);
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
    
    console.log(`📷 Camera setup complete`);
  }
}
