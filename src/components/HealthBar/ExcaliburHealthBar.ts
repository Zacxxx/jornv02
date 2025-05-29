import { Actor, Color, Rectangle, Text, Font, Vector, Engine } from 'excalibur';

interface HealthBarConfig {
  width: number;
  height: number;
  showText: boolean;
  showName: boolean;
  name?: string;
  level?: number;
  offsetY: number;
}

export class ExcaliburHealthBar extends Actor {
  private config: HealthBarConfig;
  private currentHealth: number = 100;
  private maxHealth: number = 100;
  private targetActor: Actor;
  
  private backgroundRect!: Rectangle;
  private healthRect!: Rectangle;
  private borderRect!: Rectangle;
  private healthText?: Text;
  private nameText?: Text;

  constructor(targetActor: Actor, config: Partial<HealthBarConfig> = {}) {
    super({
      x: targetActor.pos.x,
      y: targetActor.pos.y - (config.offsetY || 40),
      width: config.width || 60,
      height: config.height || 8,
      anchor: Vector.Half
    });

    this.targetActor = targetActor;
    this.config = {
      width: 60,
      height: 8,
      showText: true,
      showName: false,
      offsetY: 40,
      ...config
    };

    this.setupGraphics();
  }

  private setupGraphics(): void {
    // Background (dark)
    this.backgroundRect = new Rectangle({
      width: this.config.width,
      height: this.config.height,
      color: Color.fromRGB(20, 20, 20, 0.9)
    });

    // Health fill (red to green based on percentage)
    this.healthRect = new Rectangle({
      width: this.config.width,
      height: this.config.height,
      color: Color.Red
    });

    // Border
    this.borderRect = new Rectangle({
      width: this.config.width + 2,
      height: this.config.height + 2,
      color: Color.fromRGB(255, 255, 255, 0.3)
    });

    // Add graphics in order (border, background, health fill)
    this.graphics.add('border', this.borderRect);
    this.graphics.add('background', this.backgroundRect);
    this.graphics.add('health', this.healthRect);

    // Text for health values
    if (this.config.showText) {
      this.healthText = new Text({
        text: `${this.currentHealth}/${this.maxHealth}`,
        font: new Font({
          family: 'monospace',
          size: 8,
          color: Color.White,
          strokeColor: Color.Black
        })
      });
      this.graphics.add('healthText', this.healthText);
    }

    // Name and level text
    if (this.config.showName && this.config.name) {
      const nameDisplay = this.config.level 
        ? `${this.config.name} (Lv.${this.config.level})`
        : this.config.name;
        
      this.nameText = new Text({
        text: nameDisplay,
        font: new Font({
          family: 'monospace',
          size: 10,
          color: Color.White,
          strokeColor: Color.Black
        })
      });
      
      // Create a separate actor for the name text positioned above
      const nameActor = new Actor({
        x: 0,
        y: -this.config.height - 12,
        anchor: Vector.Half
      });
      nameActor.graphics.add('text', this.nameText);
      this.addChild(nameActor);
    }

    this.updateHealthDisplay();
  }

  public updateHealth(current: number, max: number): void {
    this.currentHealth = Math.max(0, current);
    this.maxHealth = Math.max(1, max);
    this.updateHealthDisplay();
  }

  private updateHealthDisplay(): void {
    const percentage = this.currentHealth / this.maxHealth;
    
    // Update health bar width
    this.healthRect.width = this.config.width * percentage;
    
    // Update health bar color based on percentage
    if (percentage > 0.6) {
      this.healthRect.color = Color.Green;
    } else if (percentage > 0.3) {
      this.healthRect.color = Color.Yellow;
    } else {
      this.healthRect.color = Color.Red;
    }

    // Update text
    if (this.healthText) {
      this.healthText.text = `${this.currentHealth}/${this.maxHealth}`;
    }

    // Hide if dead
    this.graphics.visible = this.currentHealth > 0;
  }

  public onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    
    // Follow the target actor
    this.pos.x = this.targetActor.pos.x;
    this.pos.y = this.targetActor.pos.y - this.config.offsetY;
    
    // Face the camera (always visible)
    this.rotation = 0;
  }

  public show(): void {
    this.graphics.visible = true;
  }

  public hide(): void {
    this.graphics.visible = false;
  }

  public destroy(): void {
    this.kill();
  }
} 