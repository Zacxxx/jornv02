# Epic: Add New Orc Character

## Description

Introduce a new Non-Player Character (NPC), the Orc, into the game. This Orc will initially share behaviors with the existing Chicken NPC but will have its own unique spritesheet and the potential for future unique interactions, dialogues, and AI. This will enrich the game world and provide more diverse characters for players to encounter.

## Goals

*   Visually integrate the Orc character into the game using its custom spritesheet.
*   Allow level designers to easily place Orcs in various game maps using the Tiled editor.
*   Enable basic player interaction with Orcs, such as initiating a default dialogue.
*   Establish a foundational Orc actor class that can be easily extended with more complex and unique behaviors in subsequent development phases.
*   Ensure the new character type is consistently managed across game systems (assets, models, scene loading).

## User Stories

**US1: Orc Visual Presence**
*   **As a Player,** I want to see Orc characters in the game world with their unique appearance derived from the Orc spritesheet,
*   **So that** the game world feels more diverse and visually interesting.

**US2: Orc Placement by Level Designers**
*   **As a Level Designer,** I want to be able to place Orcs in any map using the Tiled editor, by creating objects on a dedicated "orcs" object layer,
*   **So that** I can easily populate levels with this new NPC type and control their initial locations.

**US3: Basic Orc Interaction**
*   **As a Player,** I want to be able to interact with Orcs (e.g., approach them and initiate a default dialogue),
*   **So that** they feel like responsive parts of the game world, similar to other simple NPCs.

**US4: Extensible Orc Actor**
*   **As a Developer,** I want the Orc actor code to be structured clearly, using the new spritesheet for animations, and initially mimicking Chicken behavior,
*   **So that** it forms a solid base that can be easily extended with unique Orc-specific AI, actions, and more complex dialogues in the future.

## Acceptance Criteria

**AC1: Orc Asset and Actor Setup**
*   AC1.1: The `Orc Character Spritesheet.png` is correctly saved in the project's asset directory (e.g., `public/assets/characters/`).
*   AC1.2: The `AssetManager` loads the Orc spritesheet.
*   AC1.3: An `Orc` actor class (`orc.actor.ts`) is created within the `src/actors/NPC/` directory.
*   AC1.4: The `Orc` actor class utilizes the Orc spritesheet to define its animations (e.g., idle and walking animations for 4 directions, assuming a 4x4 grid similar to `Basic Charakter Spritesheet.png`).
*   AC1.5: `NPC_TYPE.ORC` is defined in the `NPC_TYPE` enum in `src/models.ts`.
*   AC1.6: A corresponding object type (e.g., `TILED_OBJECT.ORCS` with value "orcs") is defined in the `TILED_OBJECT` enum in `src/models.ts`.

**AC2: Tiled Integration and Spawning**
*   AC2.1: The `Level` scene class (`src/scenes/level.scene.ts`) includes a method (e.g., `create_orcs()`) to parse an "orcs" object layer from Tiled map data.
*   AC2.2: This `create_orcs()` method is called during the level initialization process.
*   AC2.3: When a Tiled map containing an "orcs" object layer with placed Orc objects is loaded, Orc NPCs spawn at the specified locations in the game.

**AC3: Basic Interaction and Behavior**
*   AC3.1: Orcs, when spawned, exhibit basic behavior similar to Chickens (e.g., simple collision, no complex movement patterns initially).
*   AC3.2: A default dialogue ID (e.g., `ORC_DEFAULT`) is associated with Orcs.
*   AC3.3: The `DialogManager` (or `levels_config` for the specific map) contains a default dialogue tree for `ORC_DEFAULT`.
*   AC3.4: Players can approach an Orc and trigger this default dialogue.

**AC4: Code Quality and Extensibility**
*   AC4.1: The `orc.actor.ts` code is clean, well-commented where necessary, and follows the project's existing coding conventions.
*   AC4.2: The initial implementation clearly separates sprite/animation setup from behavior logic, facilitating future expansion of Orc-specific behaviors.

## Out of Scope (for initial implementation)

*   Complex Orc-specific AI or combat behavior.
*   Unique Orc abilities or complex interactions beyond basic dialogue.
*   Multiple Orc variants or advanced animation states (e.g., attack, special actions).
*   Custom sound effects for Orcs.
