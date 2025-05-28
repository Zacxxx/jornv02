export function createCraftingContent(): string {
  return `
    <div class="crafting-content">
      <div class="crafting-header">
        <h4>Crafting Station</h4>
        <div class="crafting-level">
          <span>Crafting Level: 5</span>
        </div>
      </div>
      
      <div class="crafting-layout">
        <div class="recipe-list">
          <h5>Available Recipes</h5>
          <div class="recipe-categories">
            <button class="category-btn active" data-category="tools">Tools</button>
            <button class="category-btn" data-category="weapons">Weapons</button>
            <button class="category-btn" data-category="armor">Armor</button>
            <button class="category-btn" data-category="consumables">Consumables</button>
          </div>
          <div class="recipe-items">
            <div class="recipe-item" data-recipe="wooden-sword">
              <div class="recipe-icon">⚔️</div>
              <div class="recipe-info">
                <span class="recipe-name">Wooden Sword</span>
                <span class="recipe-materials">Wood x3, Rope x1</span>
              </div>
            </div>
            <div class="recipe-item" data-recipe="iron-pickaxe">
              <div class="recipe-icon">⛏️</div>
              <div class="recipe-info">
                <span class="recipe-name">Iron Pickaxe</span>
                <span class="recipe-materials">Iron x2, Wood x1</span>
              </div>
            </div>
            <div class="recipe-item" data-recipe="health-potion">
              <div class="recipe-icon">🧪</div>
              <div class="recipe-info">
                <span class="recipe-name">Health Potion</span>
                <span class="recipe-materials">Herbs x2, Water x1</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="crafting-station">
          <h5>Crafting Grid</h5>
          <div class="crafting-grid">
            ${Array.from({ length: 9 }, (_, i) => `
              <div class="crafting-slot" data-slot="${i}"></div>
            `).join('')}
          </div>
          <div class="crafting-result">
            <div class="result-slot"></div>
            <button class="craft-btn" disabled>Craft Item</button>
          </div>
        </div>
      </div>
    </div>
  `;
} 