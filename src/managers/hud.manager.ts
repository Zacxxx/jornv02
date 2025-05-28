import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { HUD, PlayerStats } from '../components/HUD';
import { BehaviourSubject } from '../utils';

class HUDManager {
  private root: Root | null = null;
  private container: HTMLElement | null = null;
  private playerStats: BehaviourSubject<PlayerStats>;
  private hudVisible: BehaviourSubject<boolean>;

  constructor() {
    // Initialisation avec des valeurs par défaut
    this.playerStats = new BehaviourSubject<PlayerStats>({
      hp: { current: 100, max: 100 },
      mp: { current: 50, max: 50 },
      energy: { current: 75, max: 100 },
      level: 1,
      name: "Player",
      portraitSrc: "/assets/characters/portrait/default-portrait.png"
    });

    this.hudVisible = new BehaviourSubject<boolean>(true);
  }

  init() {
    // Use the existing HUD container from UI manager
    this.container = document.getElementById('hud-container');
    
    if (!this.container) {
      // Create fallback container
      this.container = this.createFallbackContainer();
    }
    
    // Configure for container-relative positioning
    this.configureContainerPositioning();

    // Créer le root React
    this.root = createRoot(this.container);

    // S'abonner aux changements et rendre le HUD
    this.playerStats.subscribe(() => this.render());
    this.hudVisible.subscribe(() => this.render());

    // Rendu initial
    this.render();
  }

  private createFallbackContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'hud-fallback';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1000';
    document.body.appendChild(container);
    return container;
  }

  private configureContainerPositioning() {
    if (!this.container) return;
    
    // Ensure container is positioned relative to game, not viewport
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.pointerEvents = 'none';
    this.container.style.zIndex = '1001';
  }

  private render() {
    if (!this.root) return;

    const hudElement = React.createElement(HUD, {
      playerStats: this.playerStats.current(),
      visible: this.hudVisible.current()
    });

    this.root.render(hudElement);
  }

  // Méthodes pour mettre à jour les stats du joueur
  updateHP(current: number, max?: number) {
    const stats = this.playerStats.current();
    stats.hp.current = Math.max(0, Math.min(current, stats.hp.max));
    if (max !== undefined) {
      stats.hp.max = Math.max(1, max);
    }
    this.playerStats.next(stats);
  }

  updateMP(current: number, max?: number) {
    const stats = this.playerStats.current();
    stats.mp.current = Math.max(0, Math.min(current, stats.mp.max));
    if (max !== undefined) {
      stats.mp.max = Math.max(1, max);
    }
    this.playerStats.next(stats);
  }

  updateEnergy(current: number, max?: number) {
    const stats = this.playerStats.current();
    stats.energy.current = Math.max(0, Math.min(current, stats.energy.max));
    if (max !== undefined) {
      stats.energy.max = Math.max(1, max);
    }
    this.playerStats.next(stats);
  }

  updateLevel(level: number) {
    const stats = this.playerStats.current();
    stats.level = Math.max(1, level);
    this.playerStats.next(stats);
  }

  updatePlayerName(name: string) {
    const stats = this.playerStats.current();
    stats.name = name;
    this.playerStats.next(stats);
  }

  updatePortrait(portraitSrc: string) {
    const stats = this.playerStats.current();
    stats.portraitSrc = portraitSrc;
    this.playerStats.next(stats);
  }

  // Méthodes pour contrôler la visibilité
  showHUD() {
    this.hudVisible.next(true);
  }

  hideHUD() {
    this.hudVisible.next(false);
  }

  toggleHUD() {
    this.hudVisible.next(!this.hudVisible.current());
  }

  // Getters pour les stats actuelles
  getCurrentStats(): PlayerStats {
    return { ...this.playerStats.current() };
  }

  isVisible(): boolean {
    return this.hudVisible.current();
  }

  // Nettoyage
  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }
}

export const hudManager = new HUDManager(); 