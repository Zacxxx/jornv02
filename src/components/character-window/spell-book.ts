export function createSpellBookContent(): string {
  return `
    <div class="spellbook-content">
      <div class="spellbook-header">
        <h4>Spell Book</h4>
        <div class="mana-info">
          <span>Mana: 50/50</span>
          <span>Spell Power: 15</span>
        </div>
      </div>
      
      <div class="spell-categories">
        <button class="spell-category active" data-category="offensive">Offensive</button>
        <button class="spell-category" data-category="defensive">Defensive</button>
        <button class="spell-category" data-category="utility">Utility</button>
        <button class="spell-category" data-category="healing">Healing</button>
      </div>
      
      <div class="spell-list">
        <div class="spell-item known" data-spell="fireball">
          <div class="spell-icon">🔥</div>
          <div class="spell-info">
            <h5>Fireball</h5>
            <p class="spell-description">Launches a fiery projectile that deals fire damage</p>
            <div class="spell-stats">
              <span class="mana-cost">Cost: 10 Mana</span>
              <span class="cooldown">Cooldown: 3s</span>
              <span class="damage">Damage: 25-35</span>
            </div>
          </div>
          <div class="spell-level">Lvl 2</div>
        </div>
        
        <div class="spell-item known" data-spell="heal">
          <div class="spell-icon">✨</div>
          <div class="spell-info">
            <h5>Heal</h5>
            <p class="spell-description">Restores health to the caster or target</p>
            <div class="spell-stats">
              <span class="mana-cost">Cost: 8 Mana</span>
              <span class="cooldown">Cooldown: 2s</span>
              <span class="healing">Healing: 20-30</span>
            </div>
          </div>
          <div class="spell-level">Lvl 1</div>
        </div>
        
        <div class="spell-item unknown" data-spell="lightning">
          <div class="spell-icon">⚡</div>
          <div class="spell-info">
            <h5>Lightning Bolt</h5>
            <p class="spell-description">Strikes enemies with electrical energy</p>
            <div class="spell-stats">
              <span class="mana-cost">Cost: 15 Mana</span>
              <span class="requirement">Requires: Level 5</span>
            </div>
          </div>
          <div class="spell-level">Locked</div>
        </div>
      </div>
      
      <div class="spell-hotbar">
        <h5>Quick Cast Slots</h5>
        <div class="hotbar-slots">
          ${Array.from({ length: 6 }, (_, i) => `
            <div class="hotbar-slot" data-slot="${i}">
              ${i === 0 ? '<div class="spell-icon">🔥</div>' : ''}
              ${i === 1 ? '<div class="spell-icon">✨</div>' : ''}
              <span class="hotkey">${i + 1}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
} 