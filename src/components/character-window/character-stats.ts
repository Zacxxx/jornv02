export function createCharacterStatsContent(): string {
  return `
    <div class="character-stats-content">
      <div class="stats-header">
        <div class="character-portrait">
          <div class="portrait-frame">
            <img src="/assets/characters/portrait/default-portrait.png" alt="Character Portrait" />
          </div>
          <div class="character-info">
            <h3 class="character-name">Player</h3>
            <p class="character-level">Level 1</p>
            <p class="character-class">Adventurer</p>
          </div>
        </div>
      </div>
      
      <div class="stats-grid">
        <div class="stat-category">
          <h4>Core Stats</h4>
          <div class="stat-item">
            <span class="stat-name">Health</span>
            <span class="stat-value">100 / 100</span>
          </div>
          <div class="stat-item">
            <span class="stat-name">Mana</span>
            <span class="stat-value">50 / 50</span>
          </div>
          <div class="stat-item">
            <span class="stat-name">Energy</span>
            <span class="stat-value">100 / 100</span>
          </div>
        </div>
        
        <div class="stat-category">
          <h4>Attributes</h4>
          <div class="stat-item">
            <span class="stat-name">Strength</span>
            <span class="stat-value">10</span>
          </div>
          <div class="stat-item">
            <span class="stat-name">Dexterity</span>
            <span class="stat-value">10</span>
          </div>
          <div class="stat-item">
            <span class="stat-name">Intelligence</span>
            <span class="stat-value">10</span>
          </div>
          <div class="stat-item">
            <span class="stat-name">Vitality</span>
            <span class="stat-value">10</span>
          </div>
        </div>
        
        <div class="stat-category">
          <h4>Experience</h4>
          <div class="experience-bar">
            <div class="exp-fill" style="width: 25%"></div>
            <span class="exp-text">250 / 1000 XP</span>
          </div>
          <div class="stat-item">
            <span class="stat-name">Next Level</span>
            <span class="stat-value">750 XP</span>
          </div>
        </div>
      </div>
    </div>
  `;
} 