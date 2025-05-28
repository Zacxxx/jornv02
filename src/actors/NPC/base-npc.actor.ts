import { Actor, Engine } from "excalibur";
import { NPC_BEHAVIOR } from "../../models";
import { floatingHealthBarManager } from "../../managers/floating-health-bar.manager";
import { combatManager } from "../../managers/combat.manager";

export interface NPCConfig {
  x: number;
  y: number;
  width?: number;
  height?: number;
  dialog_id?: string;
  behavior?: NPC_BEHAVIOR;
  level?: number;
  name?: string;
  color?: any;
}

export abstract class BaseNPC extends Actor {
  // Core NPC properties
  public npcBehavior: NPC_BEHAVIOR = NPC_BEHAVIOR.PASSIVE;
  public npcLevel: number = 1;
  public npcName: string = "Unknown";
  public dialog_id: string = "";
  
  // Health properties (can be overridden by subclasses)
  public health = { current: 30, max: 30 };
  public defense = 0;

  constructor(config: NPCConfig) {
    super({
      x: config.x,
      y: config.y,
      width: config.width || 16,
      height: config.height || 16,
      color: config.color,
    });

    // Set NPC properties from config
    this.npcBehavior = config.behavior || NPC_BEHAVIOR.PASSIVE;
    this.npcLevel = config.level || 1;
    this.npcName = config.name || "Unknown";
    this.dialog_id = config.dialog_id || "";

    // Scale health and defense based on level
    this.scaleStatsForLevel();
  }

  onInitialize(engine: Engine): void {
    // Register for combat system
    combatManager.registerCombatant(this, this.health.current, this.health.max, this.defense);
    
    // Initialize floating health bar manager if not already initialized
    try {
      if (!floatingHealthBarManager['isInitialized']) {
        floatingHealthBarManager.initialize();
      }
      
      // Register for floating health bar with name display
      floatingHealthBarManager.registerActor(this, this.npcName, true);
    } catch (error) {
      console.warn(`Failed to register floating health bar for ${this.npcName}:`, error);
    }
    
    // Call subclass initialization
    this.onNPCInitialize(engine);
  }

  /**
   * Abstract method for subclasses to implement their specific initialization
   */
  protected abstract onNPCInitialize(engine: Engine): void;

  /**
   * Scale NPC stats based on level
   */
  private scaleStatsForLevel(): void {
    // Base scaling formula - can be adjusted
    const levelMultiplier = 1 + (this.npcLevel - 1) * 0.2; // 20% increase per level
    
    this.health.max = Math.floor(this.health.max * levelMultiplier);
    this.health.current = this.health.max;
    this.defense = Math.floor(this.defense * levelMultiplier);
  }

  /**
   * Get behavior-specific AI parameters
   */
  protected getBehaviorConfig() {
    switch (this.npcBehavior) {
      case NPC_BEHAVIOR.AGGRESSIVE:
        return {
          detectionRadius: 80,
          attackRange: 32,
          moveSpeed: 1.2,
          aggroTime: 10000, // 10 seconds
        };
      case NPC_BEHAVIOR.DEFENSIVE:
        return {
          detectionRadius: 48,
          attackRange: 24,
          moveSpeed: 0.8,
          aggroTime: 5000, // 5 seconds
        };
      case NPC_BEHAVIOR.SAVAGE:
        return {
          detectionRadius: 96,
          attackRange: 40,
          moveSpeed: 1.5,
          aggroTime: 15000, // 15 seconds
        };
      case NPC_BEHAVIOR.LOGIC:
        return {
          detectionRadius: 64,
          attackRange: 32,
          moveSpeed: 1.0,
          aggroTime: 8000, // 8 seconds
        };
      case NPC_BEHAVIOR.PASSIVE:
      default:
        return {
          detectionRadius: 32,
          attackRange: 16,
          moveSpeed: 0.6,
          aggroTime: 3000, // 3 seconds
        };
    }
  }

  /**
   * Get display information for UI
   */
  public getDisplayInfo() {
    return {
      name: this.npcName,
      level: this.npcLevel,
      behavior: this.npcBehavior,
      health: this.health,
      defense: this.defense,
    };
  }
} 