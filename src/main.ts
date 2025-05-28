import { gameManager } from './managers/game.manager';

console.log('🚀 Main.ts: Starting game initialization...');

// Add debugging for game state
(window as any).debugGame = {
  gameManager,
  checkState: () => {
    console.log('Game State:', gameManager.game_state?.current());
    console.log('Scene State:', gameManager.scene_state?.current());
    console.log('Current Scene:', gameManager.game?.currentScene);
    console.log('Game Container Class:', document.getElementById('game')?.className);
  },
  forceReady: () => {
    console.log('Forcing game to READY state...');
    gameManager.game_state.next('READY');
  }
};

try {
  gameManager.init();
  console.log('✅ Main.ts: Game manager initialized successfully');
} catch (error) {
  console.error('❌ Main.ts: Game initialization failed:', error);
}

// Check game state after a short delay
setTimeout(() => {
  console.log('🔍 Main.ts: Checking game state after 2 seconds...');
  (window as any).debugGame.checkState();
}, 2000);
