import { Scene, Engine, Timer } from "excalibur";
import { Player } from "../actors/player.actor";
import { Orc } from "../actors/NPC/orc.actor";
import { combatManager } from "../managers/combat.manager";
import { floatingHealthBarManager } from "../managers/floating-health-bar.manager";
import { COMBAT_EVENT } from "../models";

/**
 * Test scene for validating the combat system implementation
 * Phase 1.5: Basic combat mechanics with floating health bars and axe animations
 */
export class TestCombatScene extends Scene {
  private player!: Player;
  private testOrc!: Orc;
  private combatLog: string[] = [];

  onInitialize(_engine: Engine): void {
    console.log("Test Combat Scene: Initializing combat test environment with floating health bars");

    // Create player in the center
    this.player = new Player({
      x: 200,
      y: 200,
      map_bounds: { right: 400, bottom: 400 }
    });

    // Create a test orc nearby for combat testing
    this.testOrc = new Orc({
      x: 250, // Close enough for combat range testing
      y: 200,
      dialog_id: "TEST_ORC"
    });

    // Add actors to scene
    this.add(this.player);
    this.add(this.testOrc);

    // Set up camera to follow player
    this.camera.clearAllStrategies();
    this.camera.strategy.lockToActor(this.player);

    // Set camera reference for floating health bars
    floatingHealthBarManager.setCamera(this.camera);

    // Set up combat event listeners for testing
    this.setupCombatEventListeners();

    // Setup test instructions
    this.displayTestInstructions();

    console.log("Test Combat Scene: Setup complete with floating health bars");
  }

  private setupCombatEventListeners(): void {
    console.log("Test Combat Scene: Setting up combat event listeners");

    // Listen to combat events for testing feedback
    const eventBus = (globalThis as any).eventBus; // Access global event bus

    if (eventBus) {
      eventBus.on(COMBAT_EVENT.ATTACK_START, (data: any) => {
        const message = `ATTACK_START: ${data.attacker?.name} attacking with ${data.weaponType}`;
        this.addToCombatLog(message);
        console.log(`Test Combat Scene: ${message}`);
      });

      eventBus.on(COMBAT_EVENT.ATTACK_HIT, (data: any) => {
        const message = `ATTACK_HIT: ${data.target?.name} hit for ${data.damage} damage`;
        this.addToCombatLog(message);
        console.log(`Test Combat Scene: ${message}`);
      });

      eventBus.on(COMBAT_EVENT.ATTACK_END, (data: any) => {
        const message = `ATTACK_END: ${data.attacker?.name} attack completed`;
        this.addToCombatLog(message);
        console.log(`Test Combat Scene: ${message}`);
      });

      eventBus.on(COMBAT_EVENT.DAMAGE_DEALT, (data: any) => {
        const message = `DAMAGE_DEALT: ${data.target?.name} health: ${data.newHealth}/${data.maxHealth}`;
        this.addToCombatLog(message);
        console.log(`Test Combat Scene: ${message}`);
        
        // Check if target was defeated
        if (data.newHealth === 0) {
          this.addToCombatLog(`${data.target?.name} was defeated!`);
          this.onCombatVictory();
        }
      });
    }
  }

  private addToCombatLog(message: string): void {
    this.combatLog.push(`[${Date.now()}] ${message}`);
    
    // Keep only last 10 entries
    if (this.combatLog.length > 10) {
      this.combatLog = this.combatLog.slice(-10);
    }
  }

  private displayTestInstructions(): void {
    console.log("=== COMBAT SYSTEM TEST INSTRUCTIONS (Phase 1.5) ===");
    console.log("1. Use WASD or Arrow Keys to move the player");
    console.log("2. Press X to attack (when near the orc)");
    console.log("3. Watch the floating health bar above the orc");
    console.log("4. Observe axe attack animations in all directions");
    console.log("5. Watch the console for combat event messages");
    console.log("6. Test attacking from different positions");
    console.log("7. Test attacking when out of range (air swing)");
    console.log("====================================================");
  }

  private onCombatVictory(): void {
    console.log("Test Combat Scene: Combat victory achieved!");
    
    // Spawn a new orc after 3 seconds for continued testing
    const respawnTimer = new Timer({
      fcn: () => {
        this.spawnNewTestOrc();
      },
      interval: 3000,
      repeats: false
    });
    
    this.add(respawnTimer);
    respawnTimer.start();
  }

  private spawnNewTestOrc(): void {
    console.log("Test Combat Scene: Spawning new test orc");
    
    // Remove old orc if it still exists
    if (this.testOrc && this.actors.includes(this.testOrc)) {
      this.remove(this.testOrc);
    }

    // Create new orc at a random position near the player
    const playerPos = this.player.pos;
    const randomOffset = 50 + Math.random() * 50; // 50-100 pixels away
    const randomAngle = Math.random() * Math.PI * 2;
    
    const orcX = playerPos.x + Math.cos(randomAngle) * randomOffset;
    const orcY = playerPos.y + Math.sin(randomAngle) * randomOffset;

    this.testOrc = new Orc({
      x: orcX,
      y: orcY,
      dialog_id: "TEST_ORC_RESPAWN"
    });

    this.add(this.testOrc);
    this.addToCombatLog("New test orc spawned for continued testing");
  }

  onActivate(): void {
    console.log("Test Combat Scene: Scene activated");
    console.log("Current combat log:", this.combatLog);
    
    // Ensure floating health bar system is active
    floatingHealthBarManager.setVisible(true);
  }

  onDeactivate(): void {
    console.log("Test Combat Scene: Scene deactivated");
    
    // Hide floating health bars when scene is not active
    floatingHealthBarManager.setVisible(false);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    
    // Update floating health bar system
    floatingHealthBarManager.update();
    
    // Optional: Display debug information
    this.updateDebugInfo();
  }

  private updateDebugInfo(): void {
    // This could be used to display combat statistics on screen
    // For Phase 1.5, we'll just log to console periodically
    
    const player = this.player;
    const orc = this.testOrc;
    
    if (player && orc) {
      const distance = player.pos.distance(orc.pos);
      
      // Only log occasionally to avoid spam
      if (Math.random() < 0.005) { // 0.5% chance per frame
        console.log(`Test Combat Scene: Player-Orc distance: ${distance.toFixed(1)}`);
        
        // Check combat targets status
        const playerCombat = combatManager.getCombatTarget(player);
        const orcCombat = combatManager.getCombatTarget(orc);
        
        if (playerCombat && orcCombat) {
          console.log(`Player HP: ${playerCombat.health}/${playerCombat.maxHealth}, Orc HP: ${orcCombat.health}/${orcCombat.maxHealth}`);
        }
      }
    }
  }

  onPostUpdate(engine: Engine, delta: number): void {
    super.onPostUpdate(engine, delta);
    
    // Update camera reference in case it changed
    floatingHealthBarManager.setCamera(this.camera);
  }
} 