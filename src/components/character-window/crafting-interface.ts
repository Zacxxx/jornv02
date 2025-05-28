import './crafting-interface.css';

export function createCraftingContent(): string {
  return `
    <div class="crafting-content">
      <div class="crafting-header">
        <div class="crafting-title-section">
        <h4>Crafting Station</h4>
          <div class="crafting-stats">
            <div class="stat-badge">
              <span class="stat-label">Level</span>
              <span class="stat-value">5</span>
            </div>
            <div class="stat-badge">
              <span class="stat-label">XP</span>
              <span class="stat-value">1,250/2,000</span>
            </div>
          </div>
        </div>
        <div class="crafting-exp-bar">
          <div class="exp-fill" style="width: 62.5%"></div>
          <span class="exp-text">62.5% to Level 6</span>
        </div>
      </div>
      
      <div class="crafting-main-layout">
        <!-- Left Panel: Recipe Browser -->
        <div class="recipe-browser">
          <div class="browser-header">
            <h5>Recipe Book</h5>
            <div class="search-section">
              <input type="text" placeholder="Search recipes..." class="recipe-search">
            </div>
          </div>
          
          <div class="recipe-categories">
            <button class="category-btn active" data-category="all">
              <span class="category-icon">📚</span>
              <span class="category-name">All</span>
              <span class="category-count">24</span>
            </button>
            <button class="category-btn" data-category="tools">
              <span class="category-icon">🔧</span>
              <span class="category-name">Tools</span>
              <span class="category-count">8</span>
            </button>
            <button class="category-btn" data-category="weapons">
              <span class="category-icon">⚔️</span>
              <span class="category-name">Weapons</span>
              <span class="category-count">6</span>
            </button>
            <button class="category-btn" data-category="armor">
              <span class="category-icon">🛡️</span>
              <span class="category-name">Armor</span>
              <span class="category-count">5</span>
            </button>
            <button class="category-btn" data-category="consumables">
              <span class="category-icon">🧪</span>
              <span class="category-name">Potions</span>
              <span class="category-count">5</span>
            </button>
          </div>
          
          <div class="recipe-list">
            <div class="recipe-item available" data-recipe="wooden-sword">
              <div class="recipe-icon">⚔️</div>
              <div class="recipe-details">
                <div class="recipe-name">Wooden Sword</div>
                <div class="recipe-materials">
                  <span class="material has-enough">Wood x3</span>
                  <span class="material has-enough">Rope x1</span>
                </div>
                <div class="recipe-level">Level 1</div>
              </div>
              <div class="recipe-status available">✓</div>
            </div>
            
            <div class="recipe-item available" data-recipe="iron-pickaxe">
              <div class="recipe-icon">⛏️</div>
              <div class="recipe-details">
                <div class="recipe-name">Iron Pickaxe</div>
                <div class="recipe-materials">
                  <span class="material has-enough">Iron Ingot x2</span>
                  <span class="material has-enough">Oak Wood x1</span>
                </div>
                <div class="recipe-level">Level 3</div>
              </div>
              <div class="recipe-status available">✓</div>
            </div>
            
            <div class="recipe-item missing-materials" data-recipe="steel-blade">
              <div class="recipe-icon">🗡️</div>
              <div class="recipe-details">
                <div class="recipe-name">Steel Blade</div>
                <div class="recipe-materials">
                  <span class="material has-enough">Steel Ingot x1</span>
                  <span class="material missing">Dragon Scale x1</span>
                  <span class="material has-enough">Leather x2</span>
                </div>
                <div class="recipe-level">Level 7</div>
              </div>
              <div class="recipe-status missing">⚠</div>
            </div>
            
            <div class="recipe-item locked" data-recipe="enchanted-staff">
              <div class="recipe-icon">🔮</div>
              <div class="recipe-details">
                <div class="recipe-name">Enchanted Staff</div>
                <div class="recipe-materials">
                  <span class="material">Mystical Wood x1</span>
                  <span class="material">Magic Crystal x3</span>
                  <span class="material">Gold Wire x2</span>
                </div>
                <div class="recipe-level">Level 10</div>
              </div>
              <div class="recipe-status locked">🔒</div>
            </div>
            
            <div class="recipe-item available" data-recipe="health-potion">
              <div class="recipe-icon">🧪</div>
              <div class="recipe-details">
                <div class="recipe-name">Health Potion</div>
                <div class="recipe-materials">
                  <span class="material has-enough">Red Herbs x2</span>
                  <span class="material has-enough">Spring Water x1</span>
                  <span class="material has-enough">Glass Vial x1</span>
                </div>
                <div class="recipe-level">Level 2</div>
              </div>
              <div class="recipe-status available">✓</div>
            </div>
          </div>
        </div>
        
        <!-- Right Panel: Crafting Station -->
        <div class="crafting-station">
          <div class="station-header">
          <h5>Crafting Grid</h5>
            <div class="station-info">
              <span class="selected-recipe">Select a recipe to craft</span>
            </div>
          </div>
          
          <div class="crafting-area">
          <div class="crafting-grid">
            ${Array.from({ length: 9 }, (_, i) => `
                <div class="crafting-slot" data-slot="${i}">
                  <div class="slot-highlight"></div>
                  <div class="slot-content"></div>
                </div>
            `).join('')}
            </div>
            
            <div class="crafting-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
            
            <div class="crafting-result">
              <div class="result-slot">
                <div class="result-preview"></div>
                <div class="result-quantity">1</div>
              </div>
              <div class="craft-controls">
                <button class="craft-btn" disabled>
                  <span class="btn-icon">🔨</span>
                  <span class="btn-text">Craft Item</span>
                </button>
                <div class="craft-quantity">
                  <label>Quantity:</label>
                  <div class="quantity-controls">
                    <button class="quantity-btn" disabled>-</button>
                    <input type="number" value="1" min="1" max="10" class="quantity-input" disabled>
                    <button class="quantity-btn" disabled>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="crafting-materials">
            <h6>Required Materials</h6>
            <div class="materials-list">
              <div class="material-placeholder">
                Select a recipe to see required materials
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recipe Details Modal (when a recipe is selected) -->
      <div class="recipe-details" style="display: none;">
        <div class="details-header">
          <h5>Recipe Details</h5>
          <button class="close-details">×</button>
        </div>
        <div class="details-content">
          <!-- Content populated by JavaScript -->
        </div>
      </div>
    </div>
  `;
} 