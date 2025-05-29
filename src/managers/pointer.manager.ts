import { Engine, Actor, PointerEvent, Vector } from 'excalibur';

/**
 * Interface for objects that can handle hover events
 */
export interface IHoverable {
  onHoverStart(): void;
  onHoverEnd(): void;
  isPointInside(point: Vector): boolean;
}

/**
 * Interface for tooltip data
 */
export interface TooltipData {
  title: string;
  subtitle?: string;
  position: Vector;
}

/**
 * PointerManager - Singleton class for handling all pointer/mouse interactions
 * Follows the project's architecture pattern for managers
 */
class PointerManager {
  private static instance: PointerManager;
  private engine: Engine | null = null;
  private hoveredActors: Set<IHoverable> = new Set();
  private tooltipElement: HTMLElement | null = null;
  private currentTooltip: TooltipData | null = null;
  private isInitialized: boolean = false;

  private constructor() {
    console.log('🖱️ PointerManager: Initializing...');
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): PointerManager {
    if (!PointerManager.instance) {
      PointerManager.instance = new PointerManager();
    }
    return PointerManager.instance;
  }

  /**
   * Initialize the pointer manager with the Excalibur engine
   */
  public initialize(engine: Engine): void {
    if (this.isInitialized) {
      console.warn('🖱️ PointerManager: Already initialized');
      return;
    }

    this.engine = engine;
    this.setupPointerEvents();
    this.createTooltipElement();
    this.isInitialized = true;
    
    console.log('🖱️ PointerManager: Initialized successfully');
  }

  /**
   * Set up global pointer event handlers
   */
  private setupPointerEvents(): void {
    if (!this.engine) return;

    // Global pointer move handler for tooltip positioning
    this.engine.input.pointers.primary.on('move', (evt: PointerEvent) => {
      this.updateTooltipPosition(evt.worldPos);
      
      // Debug: Log mouse position occasionally
      if (Math.random() < 0.01) { // 1% chance to log
        console.log(`🖱️ Mouse at world position: (${evt.worldPos.x.toFixed(1)}, ${evt.worldPos.y.toFixed(1)})`);
      }
    });

    // Global pointer down handler (can be extended for global click handling)
    this.engine.input.pointers.primary.on('down', (evt: PointerEvent) => {
      console.log('🖱️ Global pointer down at:', evt.worldPos);
    });

    // Additional debugging events
    this.engine.input.pointers.primary.on('up', (evt: PointerEvent) => {
      console.log('🖱️ Global pointer up at:', evt.worldPos);
    });

    console.log('🖱️ PointerManager: Global pointer events set up');
  }

  /**
   * Register an actor for hover events
   */
  public registerHoverableActor(actor: Actor & IHoverable): void {
    if (!this.engine) {
      console.warn('🖱️ PointerManager: Engine not initialized, cannot register actor');
      return;
    }

    // Enable pointer events on the actor
    actor.pointer.useGraphicsBounds = true;

    // Set up hover events
    actor.on('pointerenter', () => {
      console.log(`🖱️ Pointer enter: ${actor.name || 'Unknown Actor'} at (${actor.pos.x.toFixed(1)}, ${actor.pos.y.toFixed(1)})`);
      this.hoveredActors.add(actor);
      actor.onHoverStart();
    });

    actor.on('pointerleave', () => {
      console.log(`🖱️ Pointer leave: ${actor.name || 'Unknown Actor'}`);
      this.hoveredActors.delete(actor);
      actor.onHoverEnd();
    });

    // Additional debug event for testing
    actor.on('pointerdown', () => {
      console.log(`🖱️ Pointer down on: ${actor.name || 'Unknown Actor'}`);
    });

    console.log(`🖱️ PointerManager: Registered hoverable actor: ${actor.name || 'Unknown'} with bounds: ${actor.pointer.useGraphicsBounds ? 'graphics' : 'default'}`);
  }

  /**
   * Unregister an actor from hover events
   */
  public unregisterHoverableActor(actor: Actor & IHoverable): void {
    this.hoveredActors.delete(actor);
    
    // Remove event listeners
    actor.off('pointerenter');
    actor.off('pointerleave');
    
    console.log(`🖱️ PointerManager: Unregistered actor: ${actor.name || 'Unknown'}`);
  }

  /**
   * Show tooltip with given data
   */
  public showTooltip(data: TooltipData): void {
    this.currentTooltip = data;
    
    if (this.tooltipElement) {
      this.tooltipElement.style.display = 'block';
      this.updateTooltipContent();
      this.updateTooltipPosition(data.position);
    }
    
    console.log(`🖱️ PointerManager: Showing tooltip: ${data.title}`);
  }

  /**
   * Hide the current tooltip
   */
  public hideTooltip(): void {
    this.currentTooltip = null;
    
    if (this.tooltipElement) {
      this.tooltipElement.style.display = 'none';
    }
    
    console.log('🖱️ PointerManager: Hiding tooltip');
  }

  /**
   * Create HTML tooltip element
   */
  private createTooltipElement(): void {
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.id = 'game-tooltip';
    this.tooltipElement.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: 'Arial', sans-serif;
      font-size: 12px;
      line-height: 1.4;
      pointer-events: none;
      z-index: 1000;
      display: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      max-width: 200px;
      word-wrap: break-word;
    `;

    document.body.appendChild(this.tooltipElement);
    console.log('🖱️ PointerManager: Tooltip element created');
  }

  /**
   * Update tooltip content
   */
  private updateTooltipContent(): void {
    if (!this.tooltipElement || !this.currentTooltip) return;

    const { title, subtitle } = this.currentTooltip;
    let content = `<div style="font-weight: bold;">${title}</div>`;
    
    if (subtitle) {
      content += `<div style="font-size: 10px; opacity: 0.8; margin-top: 2px;">${subtitle}</div>`;
    }
    
    this.tooltipElement.innerHTML = content;
  }

  /**
   * Update tooltip position based on world coordinates
   */
  private updateTooltipPosition(worldPos: Vector): void {
    if (!this.tooltipElement || !this.currentTooltip || !this.engine) return;

    // Convert world position to screen position
    const screenPos = this.engine.worldToScreenCoordinates(worldPos);
    
    // Offset tooltip to avoid cursor overlap
    const offsetX = 15;
    const offsetY = -10;
    
    this.tooltipElement.style.left = `${screenPos.x + offsetX}px`;
    this.tooltipElement.style.top = `${screenPos.y + offsetY}px`;
  }

  /**
   * Get current hover state
   */
  public isHovering(): boolean {
    return this.hoveredActors.size > 0;
  }

  /**
   * Get currently hovered actors
   */
  public getHoveredActors(): IHoverable[] {
    return Array.from(this.hoveredActors);
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
    
    this.hoveredActors.clear();
    this.currentTooltip = null;
    this.engine = null;
    this.isInitialized = false;
    
    console.log('🖱️ PointerManager: Destroyed');
  }
}

// Export singleton instance following project pattern
export const pointerManager = PointerManager.getInstance(); 