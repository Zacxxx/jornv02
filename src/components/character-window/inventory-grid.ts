export function createInventoryContent(): string {
  return `
    <div class="inventory-content">
      <div class="inventory-header">
        <h4>Inventory</h4>
        <div class="inventory-stats">
          <span class="weight">Weight: 15/50</span>
          <span class="slots">Slots: 12/30</span>
        </div>
      </div>
      
      <div class="inventory-grid">
        ${Array.from({ length: 30 }, (_, i) => `
          <div class="inventory-slot ${i < 12 ? 'occupied' : 'empty'}" data-slot="${i}">
            ${i < 12 ? `
              <div class="item" data-item="item-${i}">
                <div class="item-icon">📦</div>
                <div class="item-quantity">${Math.floor(Math.random() * 10) + 1}</div>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
      
      <div class="inventory-footer">
        <div class="quick-actions">
          <button class="btn-sort">Sort Items</button>
          <button class="btn-auto-stack">Auto Stack</button>
        </div>
      </div>
    </div>
  `;
} 