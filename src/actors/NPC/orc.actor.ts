import {
    Animation,
    CollisionType,
    Color,
    Engine,
    SpriteSheet,
    range,
    vec,
    Timer,
    Random,
    Vector,
  } from "excalibur";
  import { assetManager } from "../../managers/asset.manager";
  import { gameManager, eventBus } from "../../managers/game.manager";
  import { excaliburHealthBarManager } from "../../managers/excalibur-health-bar.manager";
  import { PLAYER_STATE, COMBAT_EVENT, NPC_BEHAVIOR } from "../../models";
  import { BaseNPC, NPCConfig } from "./base-npc.actor";
  
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

  enum OrcMood {
    CALM = "CALM",
    ALERT = "ALERT",
    SUSPICIOUS = "SUSPICIOUS",
    FRIENDLY = "FRIENDLY",
    AGITATED = "AGITATED"
  }
  
  function get_orc_animations() {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: assetManager.images.orc,
      grid: {
        rows: 4,
        columns: 4,
        spriteWidth: 48,
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
  
  export class Orc extends BaseNPC {
    type: string = "Orc";
    animations: any;
    
    // Timers for various behaviors
    private wanderTimer?: Timer;
    private idleTimer?: Timer;
    private moodTimer?: Timer;
    private alertTimer?: Timer;
    
    private isWandering!: boolean;
    private wanderDirection!: Vector;
    private originalPosition!: Vector;
    private wanderRadius!: number;
    private random!: Random;
    
    // Mood and behavior tracking
    private currentMood!: OrcMood;
    private detectionRadius!: number;
    private isPlayerNearby!: boolean;
    private lastPlayerPosition!: Vector;
    private suspicionLevel!: number;
    private patrolPoints!: Vector[];
    private currentPatrolIndex!: number;
    private isPatrolling!: boolean;
    
    // Visual mood indicator
    private moodColor!: Color;

    constructor(config: NPCConfig) {
      super({
        ...config,
        color: config.color || Color.Green,
      });
      
      console.log(`🏗️ Creating Orc with config:`, config);
      
      // Initialize properties after super call
      this.type = "Orc";
      this.isWandering = false;
      this.wanderDirection = vec(0, 0);
      this.originalPosition = vec(0, 0);
      this.wanderRadius = 32;
      this.random = new Random();
      this.currentMood = OrcMood.CALM;
      this.detectionRadius = 64;
      this.isPlayerNearby = false;
      this.lastPlayerPosition = vec(0, 0);
      this.suspicionLevel = 0;
      this.patrolPoints = [];
      this.currentPatrolIndex = 0;
      this.isPatrolling = false;
      this.moodColor = Color.Green;
      
      console.log(`✅ BaseNPC constructor completed for ${config.name || 'Unknown'}`);
      
      // Set collision type
      this.body.collisionType = CollisionType.Active;
      this.scale = vec(0.8, 0.8);
      this.originalPosition = vec(config.x, config.y);
      
      // Apply behavior-specific configurations
      this.applyBehaviorConfig();
      
      // Setup patrol points around spawn location
      this.setupPatrolPoints();
      
      console.log(`✅ Orc ${this.npcName} created successfully at (${config.x}, ${config.y})`);
    }

    private applyBehaviorConfig() {
      const behaviorConfig = this.getBehaviorConfig();
      this.detectionRadius = behaviorConfig.detectionRadius;
      this.wanderRadius = Math.floor(behaviorConfig.detectionRadius * 0.4);
      
      // Adjust mood color based on behavior
      switch (this.npcBehavior) {
        case NPC_BEHAVIOR.AGGRESSIVE:
          this.moodColor = Color.Orange;
          break;
        case NPC_BEHAVIOR.SAVAGE:
          this.moodColor = Color.Red;
          break;
        case NPC_BEHAVIOR.DEFENSIVE:
          this.moodColor = Color.Blue;
          break;
        case NPC_BEHAVIOR.LOGIC:
          this.moodColor = Color.Violet;
          break;
        case NPC_BEHAVIOR.PASSIVE:
        default:
          this.moodColor = Color.Green;
          break;
      }
      
      this.color = this.moodColor;
    }

    private setupPatrolPoints() {
      const basePoint = this.originalPosition;
      this.patrolPoints = [
        basePoint,
        basePoint.add(vec(32, 0)),
        basePoint.add(vec(32, 32)),
        basePoint.add(vec(0, 32)),
      ];
    }
  
    protected onNPCInitialize(engine: Engine) {
      this.animations = get_orc_animations();
      this.graphics.use(this.animations[ANIM.IDLE_FRONT]);
      
      // Listen to combat events for health updates
      this.setupCombatEventListeners();
      
      // Enhanced interaction with mood-based responses
      this.on("pointerdown", () => {
        if (gameManager.player.player_state === PLAYER_STATE.IDLE) {
          this.reactToPlayerInteraction();
          gameManager.start_talk(this as any);
        }
      });

      // Start advanced AI behaviors
      this.startAdvancedBehavior(engine);
      
      console.log(`${this.npcName} (Level ${this.npcLevel}) initialized with ${this.npcBehavior} behavior`);
    }

    private setupCombatEventListeners(): void {
      // Listen for damage events affecting this orc
      eventBus.on(COMBAT_EVENT.DAMAGE_DEALT, (data: any) => {
        if (data.target === this) {
          console.log(`Orc: Took ${data.damage} damage! Health: ${data.newHealth}/${data.maxHealth}`);
          
          // Update health values
          this.health.current = data.newHealth;
          this.health.max = data.maxHealth;
          
          // Health bar will be updated automatically by the manager
          
          // React to being attacked
          this.reactToAttack();
          
          // Check if defeated
          if (data.newHealth <= 0) {
            this.onDefeated();
          }
        }
      });
    }
  
    private reactToAttack(): void {
      // Change mood to agitated when attacked
      this.currentMood = OrcMood.AGITATED;
      this.moodColor = Color.Red;
      this.color = this.moodColor;
      
      // Stop current activities
      this.stopWandering();
      this.stopPatrolling();
      
      // Increase suspicion level
      this.suspicionLevel = Math.min(this.suspicionLevel + 2, 5);
      
      console.log(`Orc: Reacting to attack! Mood: ${this.currentMood}, Suspicion: ${this.suspicionLevel}`);
    }

    private onDefeated(): void {
      console.log(`Orc: Defeated!`);
      
      // Stop all AI behaviors
      this.stopWandering();
      this.stopPatrolling();
      
      // Change visual state
      this.currentMood = OrcMood.CALM;
      this.color = Color.Gray;
      
      // Stop all timers
      this.wanderTimer?.cancel();
      this.idleTimer?.cancel();
      this.moodTimer?.cancel();
      this.alertTimer?.cancel();
      
      // The floating health bar will automatically hide and remove itself
      // after a delay as handled by the floating health bar manager
    }

    private reactToPlayerInteraction() {
      this.stopWandering();
      
      // Change mood based on suspicion level
      if (this.suspicionLevel > 3) {
        this.currentMood = OrcMood.SUSPICIOUS;
        this.moodColor = Color.Orange;
      } else if (this.isPlayerNearby) {
        this.currentMood = OrcMood.ALERT;
        this.moodColor = Color.Yellow;
      } else {
        this.currentMood = OrcMood.FRIENDLY;
        this.moodColor = Color.Green;
      }
      
      // Apply mood color as tint
      this.color = this.moodColor;
    }

    private startAdvancedBehavior(engine: Engine) {
      // Wander/patrol timer
      this.wanderTimer = new Timer({
        fcn: () => this.handleMovementBehavior(),
        interval: this.random.integer(2000, 4000),
        repeats: true
      });

      // Idle periods
      this.idleTimer = new Timer({
        fcn: () => this.startMoving(),
        interval: this.random.integer(3000, 6000),
        repeats: true
      });

      // Mood changes
      this.moodTimer = new Timer({
        fcn: () => this.updateMood(),
        interval: this.random.integer(5000, 15000),
        repeats: true
      });

      // Player detection
      this.alertTimer = new Timer({
        fcn: () => this.checkForPlayer(),
        interval: 500, // Check twice per second
        repeats: true
      });

      engine.add(this.wanderTimer);
      engine.add(this.idleTimer);
      engine.add(this.moodTimer);
      engine.add(this.alertTimer);
      
      // Start with idle
      this.idleTimer.start();
      this.moodTimer.start();
      this.alertTimer.start();
    }

    private checkForPlayer() {
      const player = gameManager.player;
      if (!player) return;

      const distance = this.pos.distance(player.pos);
      const wasPlayerNearby = this.isPlayerNearby;
      this.isPlayerNearby = distance < this.detectionRadius;

      if (this.isPlayerNearby && !wasPlayerNearby) {
        // Player just entered detection range
        this.onPlayerEnterRange();
      } else if (!this.isPlayerNearby && wasPlayerNearby) {
        // Player left detection range
        this.onPlayerLeaveRange();
      }

      if (this.isPlayerNearby) {
        this.trackPlayerMovement(player.pos);
      }
    }

    private onPlayerEnterRange() {
      this.suspicionLevel++;
      this.currentMood = OrcMood.ALERT;
      this.moodColor = Color.Yellow;
      this.color = this.moodColor;
      
      // Stop current movement and face player
      this.stopWandering();
      this.facePlayer();
    }

    private onPlayerLeaveRange() {
      this.currentMood = OrcMood.CALM;
      this.moodColor = Color.Green;
      this.color = this.moodColor;
    }

    private trackPlayerMovement(playerPos: Vector) {
      const movement = playerPos.sub(this.lastPlayerPosition);
      if (movement.size > 10) { // Player moved significantly
        this.suspicionLevel = Math.min(this.suspicionLevel + 0.1, 5);
      }
      this.lastPlayerPosition = playerPos.clone();
    }

    private facePlayer() {
      const player = gameManager.player;
      if (!player) return;

      const direction = player.pos.sub(this.pos).normalize();
      
      if (Math.abs(direction.x) > Math.abs(direction.y)) {
        if (direction.x > 0) {
          this.graphics.use(this.animations[ANIM.IDLE_RIGHT]);
        } else {
          this.graphics.use(this.animations[ANIM.IDLE_LEFT]);
        }
      } else {
        if (direction.y > 0) {
          this.graphics.use(this.animations[ANIM.IDLE_FRONT]);
        } else {
          this.graphics.use(this.animations[ANIM.IDLE_BACK]);
        }
      }
    }

    private updateMood() {
      // Naturally decrease suspicion over time
      this.suspicionLevel = Math.max(this.suspicionLevel - 0.5, 0);
      
      // Random mood changes when calm
      if (this.currentMood === OrcMood.CALM && !this.isPlayerNearby) {
        const moodChance = this.random.integer(1, 10);
        if (moodChance <= 2) {
          this.currentMood = OrcMood.AGITATED;
          this.moodColor = Color.Red;
        } else if (moodChance <= 4) {
          this.currentMood = OrcMood.FRIENDLY;
          this.moodColor = Color.Cyan;
        }
        
        this.color = this.moodColor;
      }
    }

    private handleMovementBehavior() {
      if (this.isPlayerNearby && this.currentMood === OrcMood.ALERT) {
        // Stand guard when player is nearby
        this.stopWandering();
        this.facePlayer();
        return;
      }

      // Decide between wandering and patrolling
      if (this.random.integer(1, 3) === 1) {
        this.startPatrolling();
      } else {
        this.startWandering();
      }
    }

    private startPatrolling() {
      this.isPatrolling = true;
      this.isWandering = false;
      this.moveToNextPatrolPoint();
    }

    private moveToNextPatrolPoint() {
      if (!this.isPatrolling) return;

      const targetPoint = this.patrolPoints[this.currentPatrolIndex];
      const direction = targetPoint.sub(this.pos).normalize();
      
      const speed = 12; // Slower for patrol
      this.vel = direction.scale(speed);
      this.updateWalkAnimation(direction);

      // Check if reached patrol point
      if (this.pos.distance(targetPoint) < 8) {
        this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
        
        // Sometimes stop patrolling
        if (this.random.integer(1, 4) === 1) {
          this.stopPatrolling();
        }
      }
    }

    private stopPatrolling() {
      this.isPatrolling = false;
      this.vel = vec(0, 0);
      this.graphics.use(this.animations[ANIM.IDLE_FRONT]);
    }

    private startMoving() {
      if (this.random.integer(1, 2) === 1) {
        this.startWandering();
      } else {
        this.startPatrolling();
      }
    }

    private startWandering() {
      this.isWandering = true;
      this.isPatrolling = false;
      this.changeDirection();
      this.wanderTimer?.start();
      this.idleTimer?.stop();
    }

    private stopWandering() {
      this.isWandering = false;
      this.isPatrolling = false;
      this.vel = vec(0, 0);
      this.wanderTimer?.stop();
      this.idleTimer?.stop();
      this.graphics.use(this.animations[ANIM.IDLE_FRONT]);
    }

    private changeDirection() {
      if (!this.isWandering) return;

      const distanceFromHome = this.pos.distance(this.originalPosition);
      
      if (distanceFromHome > this.wanderRadius) {
        this.wanderDirection = this.originalPosition.sub(this.pos).normalize();
      } else {
        const angle = this.random.floating(0, 2 * Math.PI);
        this.wanderDirection = vec(Math.cos(angle), Math.sin(angle));
      }

      const speed = 15;
      this.vel = this.wanderDirection.scale(speed);
      this.updateWalkAnimation(this.wanderDirection);

      if (this.random.integer(1, 4) === 1) {
        this.stopWanderingForIdle();
      }
    }

    private stopWanderingForIdle() {
      this.isWandering = false;
      this.vel = vec(0, 0);
      this.graphics.use(this.animations[ANIM.IDLE_FRONT]);
      this.wanderTimer?.stop();
      
      this.idleTimer?.reset(this.random.integer(2000, 5000));
      this.idleTimer?.start();
    }

    private updateWalkAnimation(direction: Vector) {
      if (Math.abs(direction.x) > Math.abs(direction.y)) {
        if (direction.x > 0) {
          this.graphics.use(this.animations[ANIM.WALK_RIGHT]);
        } else {
          this.graphics.use(this.animations[ANIM.WALK_LEFT]);
        }
      } else {
        if (direction.y > 0) {
          this.graphics.use(this.animations[ANIM.WALK_FRONT]);
        } else {
          this.graphics.use(this.animations[ANIM.WALK_BACK]);
        }
      }
    }

    onPreUpdate(engine: Engine, delta: number): void {
      super.onPreUpdate(engine, delta);
      
      // Handle patrol movement
      if (this.isPatrolling) {
        this.moveToNextPatrolPoint();
      }
      
      // Stop at walls or other solid objects
      if ((this.isWandering || this.isPatrolling) && this.vel.size === 0) {
        this.changeDirection();
      }
    }

    kill() {
      // Unregister from floating health bar system
      excaliburHealthBarManager.unregisterActor(this);
      
      // Cancel timers
      this.wanderTimer?.cancel();
      this.idleTimer?.cancel();
      this.moodTimer?.cancel();
      this.alertTimer?.cancel();
      
      super.kill();
    }
  } 