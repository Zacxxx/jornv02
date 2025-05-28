export function createAbilityListContent(): string {
  return `
    <div class="ability-list-content">
      <div class="ability-header">
        <h4>Special Abilities</h4>
        <div class="ability-info">
          <span>Active Abilities: 3/5</span>
          <span>Cooldown Reduction: 10%</span>
        </div>
      </div>
      
      <div class="ability-categories">
        <button class="ability-category active" data-category="active">Active</button>
        <button class="ability-category" data-category="passive">Passive</button>
        <button class="ability-category" data-category="ultimate">Ultimate</button>
      </div>
      
      <div class="ability-list">
        <div class="ability-item unlocked" data-ability="dash">
          <div class="ability-icon">💨</div>
          <div class="ability-info">
            <h5>Dash</h5>
            <p class="ability-description">Quickly move forward, avoiding obstacles and enemies</p>
            <div class="ability-stats">
              <span class="cooldown">Cooldown: 8s</span>
              <span class="range">Range: 5 tiles</span>
              <span class="energy-cost">Energy: 20</span>
            </div>
            <div class="ability-hotkey">Hotkey: Shift</div>
          </div>
          <div class="ability-status">Ready</div>
        </div>
        
        <div class="ability-item unlocked" data-ability="shield">
          <div class="ability-icon">🛡️</div>
          <div class="ability-info">
            <h5>Energy Shield</h5>
            <p class="ability-description">Creates a protective barrier that absorbs damage</p>
            <div class="ability-stats">
              <span class="cooldown">Cooldown: 15s</span>
              <span class="duration">Duration: 10s</span>
              <span class="absorption">Absorbs: 50 damage</span>
            </div>
            <div class="ability-hotkey">Hotkey: Q</div>
          </div>
          <div class="ability-status">Ready</div>
        </div>
        
        <div class="ability-item unlocked" data-ability="harvest">
          <div class="ability-icon">🌾</div>
          <div class="ability-info">
            <h5>Mass Harvest</h5>
            <p class="ability-description">Instantly harvest all crops in a 3x3 area</p>
            <div class="ability-stats">
              <span class="cooldown">Cooldown: 30s</span>
              <span class="area">Area: 3x3</span>
              <span class="energy-cost">Energy: 40</span>
            </div>
            <div class="ability-hotkey">Hotkey: E</div>
          </div>
          <div class="ability-status">Ready</div>
        </div>
        
        <div class="ability-item locked" data-ability="teleport">
          <div class="ability-icon">🌀</div>
          <div class="ability-info">
            <h5>Teleport</h5>
            <p class="ability-description">Instantly travel to any visible location</p>
            <div class="ability-stats">
              <span class="requirement">Requires: Level 10</span>
              <span class="cooldown">Cooldown: 60s</span>
            </div>
          </div>
          <div class="ability-status">Locked</div>
        </div>
      </div>
      
      <div class="ability-hotbar">
        <h5>Ability Hotbar</h5>
        <div class="hotbar-slots">
          ${Array.from({ length: 5 }, (_, i) => `
            <div class="hotbar-slot" data-slot="${i}">
              ${i === 0 ? '<div class="ability-icon">💨</div>' : ''}
              ${i === 1 ? '<div class="ability-icon">🛡️</div>' : ''}
              ${i === 2 ? '<div class="ability-icon">🌾</div>' : ''}
              <span class="hotkey">${['Shift', 'Q', 'E', 'R', 'T'][i]}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
} 