export function createEncyclopediaContent(): string {
  return `
    <div class="encyclopedia-content">
      <div class="encyclopedia-header">
        <h4>Encyclopedia</h4>
        <div class="search-bar">
          <input type="text" placeholder="Search entries..." class="search-input">
          <button class="search-btn">🔍</button>
        </div>
      </div>
      
      <div class="encyclopedia-categories">
        <button class="encyclopedia-category active" data-category="creatures">Creatures</button>
        <button class="encyclopedia-category" data-category="items">Items</button>
        <button class="encyclopedia-category" data-category="locations">Locations</button>
        <button class="encyclopedia-category" data-category="lore">Lore</button>
      </div>
      
      <div class="encyclopedia-layout">
        <div class="entry-list">
          <div class="entry-item discovered" data-entry="forest-rabbit">
            <div class="entry-icon">🐰</div>
            <div class="entry-info">
              <h5>Forest Rabbit</h5>
              <p class="entry-type">Peaceful Creature</p>
            </div>
            <div class="discovery-status">✓</div>
          </div>
          
          <div class="entry-item discovered" data-entry="iron-ore">
            <div class="entry-icon">⛏️</div>
            <div class="entry-info">
              <h5>Iron Ore</h5>
              <p class="entry-type">Resource</p>
            </div>
            <div class="discovery-status">✓</div>
          </div>
          
          <div class="entry-item discovered" data-entry="ancient-tree">
            <div class="entry-icon">🌳</div>
            <div class="entry-info">
              <h5>Ancient Tree</h5>
              <p class="entry-type">Landmark</p>
            </div>
            <div class="discovery-status">✓</div>
          </div>
          
          <div class="entry-item undiscovered" data-entry="shadow-wolf">
            <div class="entry-icon">❓</div>
            <div class="entry-info">
              <h5>???</h5>
              <p class="entry-type">Unknown Creature</p>
            </div>
            <div class="discovery-status">?</div>
          </div>
          
          <div class="entry-item undiscovered" data-entry="crystal-cave">
            <div class="entry-icon">❓</div>
            <div class="entry-info">
              <h5>???</h5>
              <p class="entry-type">Unknown Location</p>
            </div>
            <div class="discovery-status">?</div>
          </div>
        </div>
        
        <div class="entry-details">
          <div class="detail-content">
            <h5>Forest Rabbit</h5>
            <div class="detail-image">🐰</div>
            <div class="detail-info">
              <p><strong>Type:</strong> Peaceful Creature</p>
              <p><strong>Habitat:</strong> Forest areas, meadows</p>
              <p><strong>Behavior:</strong> Timid, flees when approached</p>
              <p><strong>Drops:</strong> Rabbit Hide, Raw Meat</p>
            </div>
            <div class="detail-description">
              <p>Small, harmless creatures commonly found throughout the forest regions. 
              Forest Rabbits are known for their quick reflexes and ability to disappear 
              into thick underbrush when threatened. They are an important food source 
              for many predators in the ecosystem.</p>
            </div>
            <div class="discovery-info">
              <p><strong>First Discovered:</strong> Day 3, Spring</p>
              <p><strong>Times Encountered:</strong> 15</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="encyclopedia-stats">
        <div class="stat-item">
          <span class="stat-label">Discovered:</span>
          <span class="stat-value">23/45</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Completion:</span>
          <span class="stat-value">51%</span>
        </div>
      </div>
    </div>
  `;
} 