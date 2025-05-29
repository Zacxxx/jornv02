import './inventory-grid.css';
import { dataManager } from '../../managers/data.manager';

const CATEGORIES = [
  { key: 'consumables', label: 'Consumables', icon: '🧃' },
  { key: 'weapons', label: 'Weapons', icon: '⚔️' },
  { key: 'armor', label: 'Armor', icon: '🛡️' },
  { key: 'tools', label: 'Tools', icon: '🔧' },
];

export function createInventoryContent(selectedCategory: string = 'consumables', search: string = ''): string {
  const inv = dataManager.getInventory();
  if (!inv || inv.length === 0) {
    return `<div class="inventory-empty">Inventory is empty</div>`;
  }

  // Group items by category
  const grouped: { [cat: string]: any[] } = {};
  for (const cat of CATEGORIES) {
    grouped[cat.key] = [];
  }
  for (const item of inv) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  // Filter items by search
  let filtered = grouped[selectedCategory] || [];
  if (search.trim()) {
    filtered = filtered.filter(item => item.name.toLowerCase().includes(search.trim().toLowerCase()));
  }

  // Sidebar buttons
  const sidebar = `
    <div class="inventory-sidebar">
      ${CATEGORIES.map(cat => `
        <button class="cat-btn${cat.key === selectedCategory ? ' active' : ''}" data-cat="${cat.key}">
          <span class="cat-icon">${cat.icon}</span>
          <span class="cat-label">${cat.label}</span>
        </button>
      `).join('')}
    </div>
  `;

  // Main area with search and grid
  const main = `
    <div class="inventory-main">
      <input class="inventory-search" placeholder="Search..." value="${search}" />
      <div class="inventory-category-header">
        <span class="category-icon">${CATEGORIES.find(c => c.key === selectedCategory)?.icon || ''}</span>
        <span class="category-label">${CATEGORIES.find(c => c.key === selectedCategory)?.label || ''}</span>
        <span class="category-count">(${filtered.length})</span>
      </div>
      <div class="inventory-grid">
        ${filtered.map(item => `
          <div class="inventory-slot">
            <span class="item-icon">${item.icon}</span>
            <span class="item-name">${item.name}</span>
            <span class="item-qty">x${item.qty}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Use sidebar and main in the return value to avoid unused variable warnings
  return `<div class="inventory-root">${sidebar}${main}</div>`;
}

// Allow UI refresh from outside (e.g., after crafting)
export function updateInventoryUI() {
  const content = document.getElementById('character_window_content');
  if (content) {
    content.innerHTML = createInventoryContent();
    // Enable mouse wheel scrolling for inventory-categories
    const categories = content.querySelector('.inventory-categories');
    if (categories) {
      categories.addEventListener('wheel', (e) => {
        const evt = e as WheelEvent;
        evt.preventDefault();
        categories.scrollTop += evt.deltaY;
      }, { passive: false });
    }
  }
}