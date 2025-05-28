export function createQuestLogContent(): string {
  return `
    <div class="quest-log-content">
      <div class="quest-header">
        <h4>Quest Log</h4>
        <div class="quest-stats">
          <span>Active: 3/10</span>
          <span>Completed: 12</span>
        </div>
      </div>
      
      <div class="quest-categories">
        <button class="quest-category active" data-category="active">Active</button>
        <button class="quest-category" data-category="completed">Completed</button>
        <button class="quest-category" data-category="available">Available</button>
      </div>
      
      <div class="quest-list">
        <div class="quest-item active main-quest" data-quest="main-story">
          <div class="quest-icon">📜</div>
          <div class="quest-info">
            <h5>The Ancient Ruins</h5>
            <p class="quest-description">Explore the mysterious ruins discovered near the village</p>
            <div class="quest-objectives">
              <div class="objective completed">✓ Talk to the Village Elder</div>
              <div class="objective completed">✓ Gather exploration supplies</div>
              <div class="objective active">→ Enter the Ancient Ruins (0/1)</div>
              <div class="objective pending">• Investigate the central chamber</div>
            </div>
            <div class="quest-reward">
              <span>Reward: 500 XP, Ancient Key</span>
            </div>
          </div>
          <div class="quest-type">Main Quest</div>
        </div>
        
        <div class="quest-item active side-quest" data-quest="farming-help">
          <div class="quest-icon">🌱</div>
          <div class="quest-info">
            <h5>Help the Farmer</h5>
            <p class="quest-description">Assist the local farmer with his crop problems</p>
            <div class="quest-objectives">
              <div class="objective completed">✓ Clear the field of weeds</div>
              <div class="objective active">→ Plant 20 seeds (15/20)</div>
              <div class="objective pending">• Water the crops</div>
            </div>
            <div class="quest-reward">
              <span>Reward: 100 XP, 50 Gold, Seeds x10</span>
            </div>
          </div>
          <div class="quest-type">Side Quest</div>
        </div>
        
        <div class="quest-item active daily-quest" data-quest="daily-mining">
          <div class="quest-icon">⛏️</div>
          <div class="quest-info">
            <h5>Daily Mining</h5>
            <p class="quest-description">Mine resources for the village blacksmith</p>
            <div class="quest-objectives">
              <div class="objective active">→ Mine 10 Iron Ore (7/10)</div>
              <div class="objective active">→ Mine 5 Coal (3/5)</div>
            </div>
            <div class="quest-reward">
              <span>Reward: 75 XP, 30 Gold</span>
            </div>
            <div class="quest-timer">Resets in: 18h 42m</div>
          </div>
          <div class="quest-type">Daily</div>
        </div>
      </div>
      
      <div class="quest-details">
        <h5>Quest Details</h5>
        <p>Select a quest from the list above to view detailed information, objectives, and rewards.</p>
      </div>
    </div>
  `;
} 