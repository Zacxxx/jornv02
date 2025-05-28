export function createTraitTreeContent(): string {
  return `
    <div class="trait-tree-content">
      <div class="trait-header">
        <h4>Character Traits</h4>
        <div class="trait-points">
          <span>Available Points: 3</span>
          <span>Total Points: 7</span>
        </div>
      </div>
      
      <div class="trait-categories">
        <button class="trait-category active" data-category="combat">Combat</button>
        <button class="trait-category" data-category="survival">Survival</button>
        <button class="trait-category" data-category="crafting">Crafting</button>
        <button class="trait-category" data-category="magic">Magic</button>
      </div>
      
      <div class="trait-tree">
        <div class="trait-branch combat-branch">
          <div class="trait-node unlocked" data-trait="weapon-mastery">
            <div class="trait-icon">⚔️</div>
            <div class="trait-info">
              <h5>Weapon Mastery</h5>
              <p>+10% weapon damage</p>
              <div class="trait-level">2/5</div>
            </div>
          </div>
          
          <div class="trait-connection"></div>
          
          <div class="trait-node available" data-trait="critical-strike">
            <div class="trait-icon">💥</div>
            <div class="trait-info">
              <h5>Critical Strike</h5>
              <p>+5% critical hit chance</p>
              <div class="trait-level">0/3</div>
            </div>
          </div>
          
          <div class="trait-connection"></div>
          
          <div class="trait-node locked" data-trait="berserker">
            <div class="trait-icon">🔥</div>
            <div class="trait-info">
              <h5>Berserker</h5>
              <p>Attack speed increases when health is low</p>
              <div class="trait-level">0/1</div>
            </div>
          </div>
        </div>
        
        <div class="trait-branch survival-branch">
          <div class="trait-node unlocked" data-trait="health-boost">
            <div class="trait-icon">❤️</div>
            <div class="trait-info">
              <h5>Health Boost</h5>
              <p>+20 maximum health</p>
              <div class="trait-level">1/3</div>
            </div>
          </div>
          
          <div class="trait-connection"></div>
          
          <div class="trait-node available" data-trait="regeneration">
            <div class="trait-icon">🌿</div>
            <div class="trait-info">
              <h5>Regeneration</h5>
              <p>Slowly regenerate health over time</p>
              <div class="trait-level">0/2</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="trait-footer">
        <button class="reset-traits-btn">Reset All Traits</button>
        <span class="reset-cost">Cost: 100 Gold</span>
      </div>
    </div>
  `;
} 