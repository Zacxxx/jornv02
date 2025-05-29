import { Actor, Engine, Color, Vector } from "excalibur";
import { NPC_BEHAVIOR } from "../../models";
import { excaliburHealthBarManager } from "../../managers/excalibur-health-bar.manager";
import { combatManager } from "../../managers/combat.manager";
import { pointerManager, IHoverable, TooltipData } from "../../managers/pointer.manager";

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

export abstract class BaseNPC extends Actor implements IHoverable {
  // Core NPC properties
  public npcBehavior: NPC_BEHAVIOR = NPC_BEHAVIOR.PASSIVE;
  public npcLevel: number = 1;
  public npcName: string = "Unknown";
  public dialog_id: string = "";
  
  // Health properties (can be overridden by subclasses)
  public health = { current: 100, max: 100 };
  public defense: number = 0;
  
  // Hover highlighting properties
  private isHovered: boolean = false;
  private originalTint: Color | undefined;

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

    // Set the actor's name property for Excalibur's internal systems
    this.name = this.npcName;

    // Scale health and defense based on level
    this.scaleStatsForLevel();
  }

  /**
   * Scale NPC stats based on level
   */
  private scaleStatsForLevel(): void {
    const baseHealth = 100;
    const baseDefense = 0;
    
    this.health.max = Math.floor(baseHealth * (1 + (this.npcLevel - 1) * 0.5));
    this.health.current = this.health.max;
    this.defense = Math.floor(baseDefense + (this.npcLevel - 1) * 2);
  }

  onInitialize(engine: Engine): void {
    // Register for combat system
    combatManager.registerCombatant(this, this.health.current, this.health.max, this.defense);
    
    // Register for native health bar with name display
    try {
      excaliburHealthBarManager.registerActor(this, true);
    } catch (error) {
      console.warn(`Failed to register health bar for ${this.npcName}:`, error);
    }
    
    // Call subclass initialization FIRST so graphics are available
    this.onNPCInitialize(engine);
    
    // Debug pointer bounds setup
    this.setupPointerDetection();
    
    // Register with pointer manager for hover events AFTER graphics are set up
    try {
      pointerManager.registerHoverableActor(this);
      console.log(`🖱️ Registered ${this.npcName} with pointer manager`);
    } catch (error) {
      console.error(`❌ Failed to register ${this.npcName} with pointer manager:`, error);
    }
    
    console.log(`✅ BaseNPC initialized: ${this.npcName} (Level ${this.npcLevel})`);
  }

  /**
   * Setup pointer detection with multiple fallback methods
   */
  private setupPointerDetection(): void {
    // Method 1: Try graphics bounds
    this.pointer.useGraphicsBounds = true;
    
    // Method 2: Ensure we have a collision box for pointer detection
    if (!this.collider.bounds || this.collider.bounds.width === 0 || this.collider.bounds.height === 0) {
      // Set a default collision box if none exists
      this.collider.useBoxCollider(this.width || 32, this.height || 32);
      console.log(`🔧 Set collision box for ${this.npcName}: ${this.width || 32}x${this.height || 32}`);
    }
    
    // Method 3: Log current bounds for debugging
    console.log(`🔍 ${this.npcName} bounds:`, {
      graphics: this.graphics.current?.length > 0,
      collision: this.collider.bounds,
      position: { x: this.pos.x, y: this.pos.y },
      size: { width: this.width, height: this.height }
    });
  }

  kill(): void {
    // Unregister from pointer manager
    pointerManager.unregisterHoverableActor(this);
    
    // Hide any active tooltip
    if (this.isHovered) {
      pointerManager.hideTooltip();
    }
    
    super.kill();
  }

  // IHoverable interface implementation
  onHoverStart(): void {
    if (this.isHovered) return; // Already hovering
    
    this.isHovered = true;
    
    // Apply visual highlight effect
    this.applyHoverHighlight();
    
    // Show tooltip using pointer manager
    const tooltipData: TooltipData = {
      title: this.npcName,
      subtitle: `Level ${this.npcLevel} ${this.getTypeDisplayName()}`,
      position: this.pos
    };
    
    pointerManager.showTooltip(tooltipData);
    
    console.log(`🎯 Hovering over ${this.npcName} (Level ${this.npcLevel})`);
  }

  onHoverEnd(): void {
    if (!this.isHovered) return; // Not hovering
    
    this.isHovered = false;
    
    // Remove visual highlight effect
    this.removeHoverHighlight();
    
    // Hide tooltip
    pointerManager.hideTooltip();
    
    console.log(`🎯 Stopped hovering over ${this.npcName}`);
  }

  isPointInside(point: Vector): boolean {
    // Use actor's built-in collision bounds
    return this.collider.bounds.contains(point);
  }

  /**
   * Get the display name for this NPC type
   */
  private getTypeDisplayName(): string {
    // Try to get type from subclass property first
    const npcType = (this as any).type;
    if (npcType && typeof npcType === 'string') {
      return npcType;
    }
    
    // Fall back to constructor name
    return this.constructor.name || "NPC";
  }

  /**
   * Apply visual hover highlight effect
   */
  private applyHoverHighlight(): void {
    try {
      // Method 1: Try to get the current animation/sprite and apply tint
      const graphics = this.graphics;
      
      if (graphics && graphics.current) {
        // Get the current graphic (could be an animation or sprite)
        const currentGraphics = graphics.current;
        
        if (currentGraphics.length > 0) {
          const currentGraphic = currentGraphics[0];
          
          // Store original tint if not already stored
          if (!this.originalTint) {
            this.originalTint = currentGraphic.graphic.tint ? currentGraphic.graphic.tint.clone() : Color.White;
            console.log(`💾 Stored original tint for ${this.npcName}:`, this.originalTint);
          }
          
          // Apply bright highlight tint - using a more noticeable yellow-white
          currentGraphic.graphic.tint = Color.fromRGB(255, 255, 200, 1);
          console.log(`✨ Applied graphic tint hover highlight to ${this.npcName}`);
          return;
        }
      }
      
      // Method 2: Try using graphics show/use method to force re-render with tint
      if (graphics && graphics.visible) {
        // Store original color
        if (!this.originalTint) {
          this.originalTint = this.color.clone();
        }
        
        // Apply color-based highlight as fallback
        this.color = Color.fromRGB(255, 255, 150, 1);
        console.log(`✨ Applied color-based hover highlight to ${this.npcName}`);
        return;
      }
      
      console.warn(`⚠️ Could not apply hover highlight to ${this.npcName} - no graphics found`);
      
    } catch (error) {
      console.warn(`❌ Failed to apply hover highlight to ${this.npcName}:`, error);
    }
  }

  /**
   * Remove hover highlight and restore original appearance
   */
  private removeHoverHighlight(): void {
    try {
      // Method 1: Try to restore graphic tint
      const graphics = this.graphics;
      
      if (graphics && graphics.current && this.originalTint) {
        const currentGraphics = graphics.current;
        
        if (currentGraphics.length > 0) {
          const currentGraphic = currentGraphics[0];
          currentGraphic.graphic.tint = this.originalTint;
          console.log(`🔄 Restored graphic tint for ${this.npcName}`);
          return;
        }
      }
      
      // Method 2: Fallback to actor color restoration
      if (this.originalTint) {
        this.color = this.originalTint;
        console.log(`🔄 Restored actor color for ${this.npcName}`);
      }
      
    } catch (error) {
      console.warn(`❌ Failed to remove hover highlight from ${this.npcName}:`, error);
    }
  }

  /**
   * Abstract method that subclasses must implement for their specific initialization
   */
  protected abstract onNPCInitialize(engine: Engine): void;

  /**
   * Get NPC stats for display or combat calculations
   */
  public getStats() {
    return {
      name: this.npcName,
      level: this.npcLevel,
      health: this.health,
      defense: this.defense,
      behavior: this.npcBehavior,
    };
  }

  /**
   * Update NPC health (used by combat system)
   */
  public updateHealth(newHealth: number): void {
    this.health.current = Math.max(0, Math.min(newHealth, this.health.max));
    
    // Health bar updates are handled automatically by the health bar manager
    // via its update() method called in the scene's onPreUpdate
  }

  /**
   * Check if NPC is defeated
   */
  public isDefeated(): boolean {
    return this.health.current <= 0;
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
} 