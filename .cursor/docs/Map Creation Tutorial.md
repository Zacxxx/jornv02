---
description: 
globs: 
alwaysApply: false
---

Okay, I can guide you through creating a new level for your game using Tiled and integrating it into your existing project structure.

Here’s a personalized tutorial:

## Personalized Tiled Level Creation Tutorial

This tutorial will walk you through creating a new map in Tiled, adding elements your game engine understands, and integrating it into your project.

**Phase 1: Setting Up Tiled and Your New Map**

1.  **Install Tiled (if you haven't already):**
    *   Download and install Tiled from [mapeditor.org](https://www.mapeditor.org/).

2.  **Create a New Map in Tiled:**
    *   Open Tiled.
    *   Go to `File > New > New Map...`
    *   **Orientation:** `Orthogonal`
    *   **Tile layer format:** `CSV` (or `Base64`, CSV is often simpler for debugging)
    *   **Tile render order:** `Right Down`
    *   **Map size:** Choose a width and height in tiles (e.g., 30 tiles wide, 20 tiles high).
    *   **Tile size:** This should match your game's visual style and assets. A common size like **16x16 pixels** or **32x32 pixels** is a good start. Your game seems to use various sprite sizes, but game objects are often placed on a grid. Your `level.scene.ts` uses `this.map.data.tileWidth` and `this.map.data.tileHeight`, so the `.tmx` file will store this.
    *   Click `Save As...` and save your map (e.g., `my_new_level.tmx`) inside your project's **`public/maps/`** directory. (Note: your `asset.manager.ts` refers to `/maps/...`, which implies it's served from a root, likely `public` in a Vite setup).

3.  **Import/Create Tilesets:**
    *   A tileset is a collection of sprites/images used to draw your map.
    *   In Tiled, in the "Tilesets" panel (usually on the right), click the "New Tileset" button (small icon).
    *   Select `Based on Tileset Image...`.
    *   **Name:** Give your tileset a name (e.g., "terrain", "buildings").
    *   **Source:** Browse to your tileset image file. You'll need to have some tileset images (e.g., `.png` files with multiple tiles). If you don't have any yet, you can find free ones online (e.g., on itch.io) or create your own.
    *   **Tile dimensions:** Set the `Tile width` and `Tile height` to match the individual tiles within your image.
    *   **Margin/Spacing:** Adjust if your tileset image has margins or spacing between tiles.
    *   Click `Save As...` to save the tileset definition (e.g., `terrain.tsx`) usually in the same `public/maps/` or a subfolder like `public/maps/tilesets/`.

**Phase 2: Designing Your Level in Tiled**

1.  **Create Tile Layers:**
    *   Your game defines tile layers in `src/models.ts` under `TILED_LAYERS` (e.g., `GROUND`, `WATER`). It's good practice to match these.
    *   In the "Layers" panel (usually on the left):
        *   Click the "New Layer" icon and select "Tile Layer".
        *   Name your first layer (e.g., `GROUND` if that's your base layer from the enum).
        *   Add more tile layers as needed (e.g., `WATER`, `DECORATIONS_BELOW_PLAYER`, `DECORATIONS_ABOVE_PLAYER`). Layer order matters: layers at the top of the list are drawn on top of layers below them.
    *   Select a tile layer, then select your tileset and a tile from it. Click on the map to draw.

2.  **Add Game Objects (Object Layers):**
    *   This is how you tell your game where to place the player, NPCs, and interactive areas. Your `level.scene.ts` looks for specific object layers by name.
    *   In the "Layers" panel, click "New Layer" and select "Object Layer".

    *   **A. Player Start Position:**
        *   Create an Object Layer named **`player`** (matches `TILED_OBJECT.PLAYER` from `src/models.ts`).
        *   Select this layer. Select the "Insert Rectangle" tool (or "Insert Point") from the Tiled toolbar.
        *   Click on the map where you want the player to start. You only need one such object on this layer.

    *   **B. NPCs (e.g., Chickens, Cows):**
        *   For Chickens: Create an Object Layer named **`chickens`** (`TILED_OBJECT.CHICKEN`).
        *   For Cows: Create an Object Layer named **`cows`** (`TILED_OBJECT.COW`).
        *   Select the appropriate layer. Use the "Insert Rectangle" or "Insert Point" tool to place NPCs.
        *   **CRITICAL:** For each NPC object you place:
            *   Select the object.
            *   In the "Properties" panel (usually on the left, below Layers), click the "+" button to add a Custom Property.
            *   **Name:** `dialog_id` (matches `TILED_OBJECT_PROPS.DIALOG_ID`).
            *   **Type:** `string`.
            *   **Value:** This must be an ID that your `DialogManager` or `level.manager.ts` (dialogues in `levels_config`) understands. For example:
                *   `CHICKEN_RESEARCH`
                *   `COW_MOZART`
                *   `CHICKEN_DEFAULT` (if you want a generic chicken dialogue)

    *   **C. Scene Transition Areas:**
        *   Create an Object Layer named **`scene_area`** (`TILED_OBJECT.SCENE_AREA`).
        *   Select this layer. Use the "Insert Rectangle" tool to draw an area. When the player enters this area, the game will transition to another map.
        *   **CRITICAL:** For each scene area object:
            *   Select the object.
            *   Add a Custom Property:
                *   **Name:** `scene` (matches `TILED_OBJECT_PROPS.SCENE`).
                *   **Type:** `string`.
                *   **Value:** This must be one of the map identifiers from your `MAPS` enum in `src/models.ts` (e.g., `farm`, `town`, `indoor_player_house`). This is the map the player will go to.

3.  **Save Your Map in Tiled:**
    *   Frequently save your work (`File > Save`).

**Phase 3: Integrating Your New Level into the Game**

1.  **Update `src/models.ts`:**
    *   Add an entry for your new map to the `MAPS` enum:
        ```typescript
        export enum MAPS {
          MAIN_MENU = "main_menu",
          FARM = "farm",
          TOWN = "town",
          PORT = "port",
          FOREST = "forest",
          INDOOR_PLAYER_HOUSE = "indoor_player_house",
          INDOOR_FIXED_HOUSE = "indoor_fixed_house",
          INDOOR_WORKOHOLIC_HOUSE = "indoor_workoholic_house",
          MY_NEW_LEVEL = "my_new_level", // <-- Add this (use the filename without .tmx)
        }
        ```

2.  **Update `src/managers/asset.manager.ts`:**
    *   Tell the `AssetManager` to load your new `.tmx` file. In the `setup_maps()` method, add:
        ```typescript
        // ... inside setup_maps() method
        this.maps = {
          main_menu: new TiledMapResource("/maps/main_menu.tmx"),
          farm: new TiledMapResource("/maps/farm.tmx"),
          // ... other maps
          port: new TiledMapResource("/maps/port.tmx"),
          my_new_level: new TiledMapResource("/maps/my_new_level.tmx"), // <-- Add this
        };
        // ...
        ```

3.  **Update `src/managers/level.manager.ts`:**
    *   Add a configuration for your new level to the `levels_config` array:
        ```typescript
        const levels_config = [
          // ... existing level configs
          {
            name: "My Awesome New Level", // Display name for the level
            map: MAPS.MY_NEW_LEVEL,      // Use the enum key you added
            song: SONGS.APPLE_CIDER,     // Choose a background song
            dialogues: [                 // Optional: Add dialogues specific to this level
              // {
              //   id: `${NPC_TYPE.CHICKEN}_MY_NEW_DIALOGUE`,
              //   dialogues: [
              //     { text: "Welcome to my new level!" },
              //   ],
              // },
            ],
          },
        ];
        ```

**Phase 4: Testing Your New Level**

1.  **Accessing Your Level:**
    *   **Option A (Easiest for quick testing):** Modify an existing map's `scene_area` object in Tiled. Change its `scene` property to point to your `MY_NEW_LEVEL` identifier.
    *   **Option B (Code change):** In `src/managers/game.manager.ts`:
        *   Temporarily change the initial scene in the `start_game()` method:
            ```typescript
            // ... in start_game(slot_id: number)
            // this.go_to(MAPS.INDOOR_PLAYER_HOUSE);
            this.go_to(MAPS.MY_NEW_LEVEL); // <-- Temporary change
            ```
        *   Or, change the scene loaded after assets are ready:
            ```typescript
            // ... in this.game_state.subscribe, case GAME_STATES.READY:
            // this.game.goToScene(MAPS.MAIN_MENU);
            this.game.goToScene(MAPS.MY_NEW_LEVEL); // <-- Temporary change
            ```
    *   Remember to revert these temporary changes later.

2.  **Run Your Game:**
    *   Start your game as usual. Navigate to your new level (if using Option A for access) or it should load directly (if using Option B).
    *   Check if:
        *   The map visuals are correct.
        *   The player spawns at the intended location.
        *   NPCs appear and their `dialog_id` properties work (try talking to them).
        *   Scene transition areas take you to the correct map.

This detailed walkthrough should help you create and integrate new levels using Tiled with your project's structure. Remember to match the names of object layers and custom properties exactly as your code expects them (referencing your enums in `src/models.ts`). Good luck!
