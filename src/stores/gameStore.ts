import { create } from 'zustand';

export interface PlayerStats {
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  energy: { current: number; max: number };
  level: number;
  name: string;
  portraitSrc: string;
}

interface GameState {
  playerStats: PlayerStats;
  hudVisible: boolean;
  currentScene: string;
  
  // Actions
  updatePlayerHP: (current: number, max?: number) => void;
  updatePlayerMP: (current: number, max?: number) => void;
  updatePlayerEnergy: (current: number, max?: number) => void;
  updatePlayerLevel: (level: number) => void;
  updatePlayerName: (name: string) => void;
  updatePortrait: (portraitSrc: string) => void;
  toggleHUD: () => void;
  showHUD: () => void;
  hideHUD: () => void;
  setCurrentScene: (scene: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  playerStats: {
    hp: { current: 100, max: 100 },
    mp: { current: 50, max: 50 },
    energy: { current: 75, max: 100 },
    level: 1,
    name: "Player",
    portraitSrc: "/assets/characters/portrait/default-portrait.png"
  },
  hudVisible: true,
  currentScene: 'main-menu',
  
  updatePlayerHP: (current, max) => set((state) => ({
    playerStats: {
      ...state.playerStats,
      hp: {
        current: Math.max(0, Math.min(current, max ?? state.playerStats.hp.max)),
        max: max ?? state.playerStats.hp.max
      }
    }
  })),
  
  updatePlayerMP: (current, max) => set((state) => ({
    playerStats: {
      ...state.playerStats,
      mp: {
        current: Math.max(0, Math.min(current, max ?? state.playerStats.mp.max)),
        max: max ?? state.playerStats.mp.max
      }
    }
  })),
  
  updatePlayerEnergy: (current, max) => set((state) => ({
    playerStats: {
      ...state.playerStats,
      energy: {
        current: Math.max(0, Math.min(current, max ?? state.playerStats.energy.max)),
        max: max ?? state.playerStats.energy.max
      }
    }
  })),
  
  updatePlayerLevel: (level) => set((state) => ({
    playerStats: {
      ...state.playerStats,
      level: Math.max(1, level)
    }
  })),
  
  updatePlayerName: (name) => set((state) => ({
    playerStats: {
      ...state.playerStats,
      name
    }
  })),
  
  updatePortrait: (portraitSrc) => set((state) => ({
    playerStats: {
      ...state.playerStats,
      portraitSrc
    }
  })),
  
  toggleHUD: () => set((state) => ({ hudVisible: !state.hudVisible })),
  showHUD: () => set({ hudVisible: true }),
  hideHUD: () => set({ hudVisible: false }),
  setCurrentScene: (scene) => set({ currentScene: scene }),
})); 