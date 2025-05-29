import React, { useState } from 'react';
import { dataManager } from '../../managers/data.manager';
import { updateInventoryUI } from './inventory-grid';
import './crafting-menu.css';

// Types
interface Material {
  name: string;
  qty: number;
  has: boolean;
}

interface Recipe {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: number;
  materials: Material[];
  description: string;
  available: boolean;
  stats?: { [stat: string]: number | string };
  effect?: string;
}

interface Category {
  name: string;
  icon: string;
  key: string;
}

// Dummy data for demonstration, replace with real data/integration
const CATEGORIES: Category[] = [
  { name: 'All', icon: '📚', key: 'all' },
  { name: 'Consumables', icon: '🧃', key: 'consumables' },
  { name: 'Tools', icon: '🔧', key: 'tools' },
  { name: 'Weapons', icon: '⚔️', key: 'weapons' },
  { name: 'Armor', icon: '🛡️', key: 'armor' },
];

const RECIPES: Recipe[] = [
  {
    id: 'wooden-sword',
    name: 'Wooden Sword',
    category: 'weapons',
    icon: '⚔️',
    level: 1,
    materials: [
      { name: 'Wood', qty: 3, has: true },
      { name: 'Rope', qty: 1, has: true },
    ],
    description: 'A basic sword made of wood.',
    available: true,
    stats: { 'Attack': 4, 'Durability': 25 },
    effect: 'None',
  },
  {
    id: 'iron-pickaxe',
    name: 'Iron Pickaxe',
    category: 'tools',
    icon: '⛏️',
    level: 3,
    materials: [
      { name: 'Iron Ingot', qty: 2, has: true },
      { name: 'Oak Wood', qty: 1, has: true },
    ],
    description: 'A sturdy pickaxe for mining.',
    available: true,
    stats: { 'Mining Power': 8, 'Durability': 40 },
    effect: 'Can break iron ore nodes',
  },
  {
    id: 'enchanted-staff',
    name: 'Enchanted Staff',
    category: 'weapons',
    icon: '🔮',
    level: 10,
    materials: [
      { name: 'Mystical Wood', qty: 1, has: false },
      { name: 'Magic Crystal', qty: 3, has: false },
      { name: 'Gold Wire', qty: 2, has: false },
    ],
    description: 'A staff imbued with magical power.',
    available: false,
    stats: { 'Attack': 15, 'Magic Power': 25, 'Durability': 60 },
    effect: 'Casts a fireball that burns enemies',
  },
  // ...add more recipes
  {
    id: 'health-potion',
    name: 'Health Potion',
    category: 'consumables',
    icon: '🧪',
    level: 1,
    materials: [
      { name: 'Herb', qty: 2, has: true },
      { name: 'Water Flask', qty: 1, has: true },
    ],
    description: 'Restores a small amount of health.',
    available: true,
    stats: { 'Heal': 25 },
    effect: 'Restores HP',
  },
];

export function CraftingMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const filteredRecipes = RECIPES.filter((r) =>
    (selectedCategory === 'all' || r.category === selectedCategory) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const canCraft = selectedRecipe && selectedRecipe.available && selectedRecipe.materials.every((m) => m.has);

  return (
    <div className="crafting-menu-root">
      <div className="crafting-left-panel">
        <div className="crafting-categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={selectedCategory === cat.key ? 'active' : ''}
              onClick={() => setSelectedCategory(cat.key)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label" style={{fontSize: '13px', marginTop: '2px'}}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="crafting-main-panel">
        <input
          className="crafting-search"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{marginBottom: 16}}
        />
        <div className="crafting-recipe-list">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`crafting-recipe-item ${selectedRecipe && selectedRecipe.id === recipe.id ? 'selected' : ''} ${recipe.available ? '' : 'locked'}`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <span className="recipe-icon">{recipe.icon}</span>
              <span className="recipe-name">{recipe.name}</span>
              <span className="recipe-level">Lvl {recipe.level}</span>
            </div>
          ))}
        </div>
        <div className="crafting-details-panel">
          {selectedRecipe ? (
            <div className="recipe-detail recipe-detail-grid">
              <div className="detail-col detail-preview-col">
                <div className="detail-icon-large">{selectedRecipe.icon}</div>
                <div className="detail-name-large">{selectedRecipe.name}</div>
                <div className="detail-level-large">Level {selectedRecipe.level}</div>
                <div className="detail-desc-large">{selectedRecipe.description}</div>
                {selectedRecipe.stats && (
                  <div className="detail-stats">
                    <h4>Stats</h4>
                    <ul>
                      {Object.entries(selectedRecipe.stats).map(([stat, value]) => (
                        <li key={stat}><strong>{stat}:</strong> {value}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedRecipe.effect && selectedRecipe.effect !== 'None' && (
                  <div className="detail-effect">
                    <h4>Effect</h4>
                    <div className="effect-desc">{selectedRecipe.effect}</div>
                  </div>
                )}
              </div>
              <div className="detail-col detail-materials-col">
                <div className="detail-materials">
                  <h4>Materials</h4>
                  <ul>
                    {selectedRecipe.materials.map((mat) => (
                      <li key={mat.name} className={mat.has ? 'has' : 'missing'}>
                        {mat.name} x{mat.qty} {mat.has ? '✓' : '✗'}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="detail-actions">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    disabled={!selectedRecipe.available}
                  />
                  <button
                    className="craft-btn"
                    disabled={!canCraft}
                    onClick={() => {
                      if (!selectedRecipe) return;
                      let invCategory = selectedRecipe.category;
                      dataManager.addItemToInventory({
                        name: selectedRecipe.name,
                        icon: selectedRecipe.icon,
                        qty: quantity,
                        category: invCategory
                      });
                      updateInventoryUI();
                    }}
                  >
                    <span>🔨 Craft</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="crafting-placeholder">Select a recipe to see details</div>
          )}
        </div>
      </div>
    </div>
  );
}
