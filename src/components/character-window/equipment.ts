export function createEquipmentContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Equipment Interface -->
      <div class="flex-1 flex flex-col">
        <!-- Equipment Header with Tabs -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-red-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-red-500/30 to-red-600/30 border border-red-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-red-300">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <h2 class="text-red-200 text-lg font-bold uppercase tracking-wider">Equipment</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Item Level -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">ilvl 245</span>
                <span class="text-white/70 text-xs">average</span>
              </div>
              <!-- Durability -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">98%</span>
                <span class="text-white/70 text-xs">durability</span>
              </div>
            </div>
          </div>

          <!-- Equipment Tabs -->
          <div class="flex gap-2 mb-4">
            <button class="equipment-tab active px-4 py-2 bg-gradient-to-r from-red-500/80 to-red-600/80 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" data-tab="equipment">
              ⚔️ Equipment
            </button>
            <button class="equipment-tab px-4 py-2 bg-black/30 border border-white/20 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-tab="transmog">
              ✨ Transmog
            </button>
            <button class="equipment-tab px-4 py-2 bg-black/30 border border-white/20 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-tab="sets">
              📦 Equipment Sets
            </button>
          </div>
        </div>

        <!-- Equipment Content -->
        <div class="flex-1 flex" id="equipment-content">
          <!-- Equipment Tab Content -->
          <div class="equipment-tab-content active flex-1 flex" data-content="equipment">
            <!-- WoW-Style Equipment Overview -->
            <div class="flex-1 p-6">
              <div class="max-w-7xl mx-auto">
                <!-- Equipment Grid - WoW Style Layout -->
                <div class="relative grid grid-cols-7 grid-rows-5 gap-4 p-8 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10 rounded-xl">
                  <!-- Left Side Equipment Slots -->
                  <!-- Head Slot (Top Center) -->
                  <div class="col-start-4 row-start-1">
                    ${createWoWEquipmentSlot('head', '🎩', 'Arcane Crown', 'epic', 'Head')}
                  </div>
                  
                  <!-- Neck Slot (Top Left) -->
                  <div class="col-start-2 row-start-1">
                    ${createWoWEquipmentSlot('neck', '📿', 'Mystic Amulet', 'rare', 'Neck')}
                  </div>
                  
                  <!-- Shoulders Slot (Left Upper) -->
                  <div class="col-start-1 row-start-2">
                    ${createWoWEquipmentSlot('shoulders', '🏺', 'Mage Shoulders', 'epic', 'Shoulders')}
                  </div>
                  
                  <!-- Back Slot (Top Right) -->
                  <div class="col-start-6 row-start-1">
                    ${createWoWEquipmentSlot('back', '🧥', 'Cloak of Wisdom', 'rare', 'Back')}
                  </div>
                  
                  <!-- Chest Slot (Left Center) -->
                  <div class="col-start-1 row-start-3">
                    ${createWoWEquipmentSlot('chest', '👘', 'Robes of Power', 'legendary', 'Chest')}
                  </div>
                  
                  <!-- Shirt Slot (Left Lower) -->
                  <div class="col-start-1 row-start-4">
                    ${createWoWEquipmentSlot('shirt', '👔', 'Noble Shirt', 'common', 'Shirt')}
                  </div>
                  
                  <!-- Tabard Slot (Left Bottom) -->
                  <div class="col-start-1 row-start-5">
                    ${createWoWEquipmentSlot('tabard', '🏛️', 'Guild Tabard', 'rare', 'Tabard')}
                  </div>
                  
                  <!-- Wrists Slot (Left of Center) -->
                  <div class="col-start-2 row-start-3">
                    ${createWoWEquipmentSlot('wrists', '⌚', 'Bracers of Mana', 'rare', 'Wrists')}
                  </div>
                  
                  <!-- Main Hand Slot (Left of Character) -->
                  <div class="col-start-2 row-start-4">
                    ${createWoWEquipmentSlot('mainhand', '🗡️', 'Blade of Power', 'legendary', 'Main Hand')}
                  </div>
                  
                  <!-- Character Model (Center) -->
                  <div class="col-start-3 col-span-3 row-start-2 row-span-3 flex items-center justify-center">
                    <div class="relative">
                      <!-- Character Display -->
                      <div class="w-48 h-64 bg-gradient-to-b from-slate-700/30 to-slate-800/60 border-2 border-white/20 rounded-xl flex flex-col items-center justify-center p-4">
                        <div class="text-8xl mb-2">🧙‍♂️</div>
                        <div class="text-center">
                          <h3 class="text-white font-bold text-lg mb-1">Arcane Warrior</h3>
                          <p class="text-white/70 text-sm">Level 45 Human Mage</p>
                          <div class="mt-2 flex items-center justify-center gap-2">
                            <div class="text-xs text-yellow-400">ilvl 245</div>
                            <div class="text-xs text-green-400">98% Durability</div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Character Stats Overlay -->
                      <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 border border-white/20 rounded-lg px-3 py-1">
                        <div class="flex gap-4 text-xs">
                          <span class="text-red-400">ATK: 1,245</span>
                          <span class="text-blue-400">DEF: 890</span>
                          <span class="text-green-400">HP: 12,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Right Side Equipment Slots -->
                  <!-- Hands Slot (Right of Center) -->
                  <div class="col-start-6 row-start-3">
                    ${createWoWEquipmentSlot('hands', '🧤', 'Gloves of Casting', 'epic', 'Hands')}
                  </div>
                  
                  <!-- Off Hand Slot (Right of Character) -->
                  <div class="col-start-6 row-start-4">
                    ${createWoWEquipmentSlot('offhand', '🛡️', 'Arcane Shield', 'epic', 'Off Hand')}
                  </div>
                  
                  <!-- Waist Slot (Right Upper) -->
                  <div class="col-start-7 row-start-2">
                    ${createWoWEquipmentSlot('waist', '🎀', 'Belt of Wisdom', 'rare', 'Waist')}
                  </div>
                  
                  <!-- Legs Slot (Right Center) -->
                  <div class="col-start-7 row-start-3">
                    ${createWoWEquipmentSlot('legs', '👖', 'Leggings of Power', 'epic', 'Legs')}
                  </div>
                  
                  <!-- Feet Slot (Right Lower) -->
                  <div class="col-start-7 row-start-4">
                    ${createWoWEquipmentSlot('feet', '👠', 'Boots of Speed', 'rare', 'Feet')}
                  </div>
                  
                  <!-- Ranged Slot (Right Bottom) -->
                  <div class="col-start-7 row-start-5">
                    ${createWoWEquipmentSlot('ranged', '🏹', 'Crystal Wand', 'rare', 'Ranged')}
                  </div>
                  
                  <!-- Ring Slots (Bottom) -->
                  <div class="col-start-2 row-start-5">
                    ${createWoWEquipmentSlot('ring1', '💍', 'Ring of Intellect', 'epic', 'Ring')}
                  </div>
                  
                  <div class="col-start-6 row-start-5">
                    ${createWoWEquipmentSlot('ring2', '💍', 'Band of Mana', 'rare', 'Ring')}
                  </div>
                  
                  <!-- Trinket Slots (Bottom Center) -->
                  <div class="col-start-3 row-start-5">
                    ${createWoWEquipmentSlot('trinket1', '🔱', 'Arcane Trinket', 'legendary', 'Trinket')}
                  </div>
                  
                  <div class="col-start-5 row-start-5">
                    ${createWoWEquipmentSlot('trinket2', '⚡', 'Lightning Orb', 'epic', 'Trinket')}
                  </div>
                </div>
                
                <!-- Character Stats Panel -->
                <div class="mt-6 grid grid-cols-4 gap-4">
                  <div class="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg p-4 text-center">
                    <div class="text-red-400 text-2xl font-bold">1,245</div>
                    <div class="text-white/70 text-sm">Attack Power</div>
                  </div>
                  
                  <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-4 text-center">
                    <div class="text-blue-400 text-2xl font-bold">890</div>
                    <div class="text-white/70 text-sm">Defense</div>
                  </div>
                  
                  <div class="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <div class="text-green-400 text-2xl font-bold">12,500</div>
                    <div class="text-white/70 text-sm">Health Points</div>
                  </div>
                  
                  <div class="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-4 text-center">
                    <div class="text-purple-400 text-2xl font-bold">2,850</div>
                    <div class="text-white/70 text-sm">Mana Points</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Panel: Item Details -->
            <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
              <div class="p-4 border-b border-white/10">
                <h3 class="text-white text-lg font-bold uppercase tracking-wide">Item Details</h3>
              </div>
              
              <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="item-details-panel">
                <div class="text-center text-white/50 py-8">
                  <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </div>
                  <p class="text-sm">Click an equipment slot to view details</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Transmog Tab Content -->
          <div class="equipment-tab-content flex-1 p-6" data-content="transmog" style="display: none;">
            <div class="max-w-4xl mx-auto">
              <div class="text-center mb-8">
                <h3 class="text-white text-2xl font-bold mb-3">Transmogrification</h3>
                <p class="text-white/70">Change the appearance of your equipment while keeping the stats</p>
              </div>

              <div class="grid grid-cols-2 gap-8">
                <!-- Current Appearance -->
                <div class="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10 rounded-xl p-6">
                  <h4 class="text-white font-bold text-lg mb-4 text-center">Current Appearance</h4>
                  <div class="w-32 h-48 mx-auto bg-black/30 border-2 border-white/20 rounded-lg flex items-center justify-center mb-4">
                    <div class="text-6xl">🧙‍♂️</div>
                  </div>
                  <div class="text-center">
                    <p class="text-white/80 text-sm">Arcane Mage Set</p>
                    <p class="text-white/60 text-xs">Classic appearance</p>
                  </div>
                </div>

                <!-- Transmog Preview -->
                <div class="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10 rounded-xl p-6">
                  <h4 class="text-white font-bold text-lg mb-4 text-center">Transmog Preview</h4>
                  <div class="w-32 h-48 mx-auto bg-black/30 border-2 border-purple-500/50 rounded-lg flex items-center justify-center mb-4">
                    <div class="text-6xl">🧙‍♀️</div>
                  </div>
                  <div class="text-center">
                    <p class="text-white/80 text-sm">Shadow Mage Set</p>
                    <p class="text-purple-400 text-xs">Transmog applied</p>
                  </div>
                </div>
              </div>

              <!-- Transmog Collection -->
              <div class="mt-8">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-white font-bold text-lg">Appearance Collection</h4>
                  <div class="flex gap-2">
                    <select class="px-3 py-1 bg-black/40 border border-white/20 rounded text-white text-sm">
                      <option>All Slots</option>
                      <option>Head</option>
                      <option>Chest</option>
                      <option>Weapons</option>
                    </select>
                    <input type="text" placeholder="Search..." class="px-3 py-1 bg-black/40 border border-white/20 rounded text-white text-sm placeholder-white/50">
                  </div>
                </div>

                <div class="grid grid-cols-8 gap-3">
                  ${generateTransmogItems()}
                </div>
              </div>

              <!-- Transmog Actions -->
              <div class="mt-8 flex gap-4 justify-center">
                <button class="px-6 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  ✨ Apply Transmog
                </button>
                <button class="px-6 py-2 bg-gradient-to-r from-gray-500/80 to-gray-600/80 hover:from-gray-400 hover:to-gray-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  🔄 Reset Appearance
                </button>
                <button class="px-6 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  💾 Save as Set
                </button>
              </div>
            </div>
          </div>

          <!-- Equipment Sets Tab Content -->
          <div class="equipment-tab-content flex-1 p-6" data-content="sets" style="display: none;">
            <div class="max-w-4xl mx-auto">
              <div class="text-center mb-8">
                <h3 class="text-white text-2xl font-bold mb-3">Equipment Sets</h3>
                <p class="text-white/70">Save and quickly switch between different equipment configurations</p>
              </div>

              <div class="grid grid-cols-3 gap-6">
                ${generateEquipmentSets()}
              </div>

              <div class="mt-8 text-center">
                <button class="px-6 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  ➕ Create New Set
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(239, 68, 68, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(239, 68, 68, 0.8);
      }

      .equipment-slot {
        aspect-ratio: 1;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        cursor: pointer;
      }
      
      .equipment-slot:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
      }
      
      .equipment-slot.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        background: rgba(59, 130, 246, 0.1) !important;
      }

      .wow-equipment-slot {
        position: relative;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .wow-equipment-slot:hover {
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        z-index: 10;
      }
      
      .wow-equipment-slot.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
        background: rgba(59, 130, 246, 0.1) !important;
      }
      
      .wow-equipment-slot.equipped {
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
      }
      
      .wow-equipment-slot.empty {
        opacity: 0.7;
      }
      
      .wow-equipment-slot.empty:hover {
        opacity: 1;
        border-color: rgba(255, 255, 255, 0.4) !important;
      }

      .rarity-common { border-color: rgba(156, 163, 175, 0.6); }
      .rarity-uncommon { border-color: rgba(34, 197, 94, 0.6); }
      .rarity-rare { border-color: rgba(59, 130, 246, 0.6); }
      .rarity-epic { border-color: rgba(168, 85, 247, 0.6); }
      .rarity-legendary { border-color: rgba(245, 158, 11, 0.6); }

      .equipment-tab.active {
        background: linear-gradient(to right, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8)) !important;
        border-color: rgba(239, 68, 68, 0.6) !important;
        color: white !important;
      }

      .equipment-tab-content {
        display: none;
      }

      .equipment-tab-content.active {
        display: flex;
      }

      .transmog-item {
        aspect-ratio: 1;
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .transmog-item:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
      }

      .transmog-item.selected {
        border-color: rgba(168, 85, 247, 0.8) !important;
        box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
      }

      .equipment-set {
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .equipment-set:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      }

      .stat-bar {
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 2px;
        overflow: hidden;
      }

      .stat-bar-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.3s ease;
      }
    </style>

    <script>
      let selectedEquipmentSlot = null;

      document.addEventListener('DOMContentLoaded', function() {
        initializeEquipment();
      });

      function initializeEquipment() {
        // Tab functionality
        const tabBtns = document.querySelectorAll('.equipment-tab');
        tabBtns.forEach(btn => {
          btn.addEventListener('click', handleTabClick);
        });

        // Equipment slot interaction
        const equipmentSlots = document.querySelectorAll('.equipment-slot, .wow-equipment-slot');
        equipmentSlots.forEach(slot => {
          slot.addEventListener('click', handleEquipmentSlotClick);
        });

        // Transmog item interaction
        const transmogItems = document.querySelectorAll('.transmog-item');
        transmogItems.forEach(item => {
          item.addEventListener('click', handleTransmogItemClick);
        });
      }

      function handleTabClick(event) {
        const tabBtns = document.querySelectorAll('.equipment-tab');
        const tabContents = document.querySelectorAll('.equipment-tab-content');
        
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        event.target.classList.add('active');
        const targetTab = event.target.dataset.tab;
        const targetContent = document.querySelector(\`[data-content="\${targetTab}"]\`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      }

      function handleEquipmentSlotClick(event) {
        const slot = event.currentTarget;
        document.querySelectorAll('.equipment-slot, .wow-equipment-slot').forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
        showItemDetails(slot);
        selectedEquipmentSlot = slot;
      }

      function handleTransmogItemClick(event) {
        const item = event.currentTarget;
        document.querySelectorAll('.transmog-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
      }

      function showItemDetails(slot) {
        const panel = document.getElementById('item-details-panel');
        const itemData = {
          name: slot.dataset.itemName || 'Empty Slot',
          slot: slot.dataset.slotName || 'Unknown',
          rarity: slot.dataset.itemRarity || 'common',
          level: slot.dataset.itemLevel || '1',
          stats: JSON.parse(slot.dataset.itemStats || '{}'),
          description: slot.dataset.itemDescription || 'No item equipped in this slot.'
        };
        
        panel.innerHTML = generateItemDetailsContent(itemData);
      }

      function generateItemDetailsContent(item) {
        const rarityColors = {
          common: '#9CA3AF',
          uncommon: '#22C55E',
          rare: '#3B82F6',
          epic: '#A855F7',
          legendary: '#F59E0B'
        };
        
        return \`
          <div class="space-y-4">
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: \${rarityColors[item.rarity]}">
                <span>⚔️</span>
              </div>
              <h3 class="font-bold text-xl mb-1" style="color: \${rarityColors[item.rarity]}">\${item.name}</h3>
              <p class="text-white/70 text-sm">\${item.slot} • Item Level \${item.level}</p>
              <p class="text-white/50 text-xs uppercase tracking-wide">\${item.rarity}</p>
            </div>

            \${Object.keys(item.stats).length > 0 ? \`
              <div class="bg-black/20 border border-white/10 rounded-lg p-3">
                <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Item Statistics</h4>
                <div class="space-y-2">
                  \${Object.entries(item.stats).map(([stat, value]) => \`
                    <div class="flex justify-between items-center">
                      <span class="text-white/70 text-sm capitalize">\${stat.replace(/([A-Z])/g, ' $1')}</span>
                      <span class="text-green-400 font-bold">+\${value}</span>
                    </div>
                  \`).join('')}
                </div>
              </div>
            \` : ''}

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
              <p class="text-white/80 text-sm leading-relaxed">\${item.description}</p>
            </div>

            \${item.name !== 'Empty Slot' ? \`
              <div class="space-y-2">
                <button class="w-full px-4 py-2 bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-400 hover:to-red-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  🗑️ Unequip Item
                </button>
                <button class="w-full px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  ✨ Transmog Item
                </button>
                <button class="w-full px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  🔧 Repair Item
                </button>
              </div>
            \` : ''}
          </div>
        \`;
      }
    </script>
  `;
}

function createWoWEquipmentSlot(slotId: string, icon: string, itemName: string, rarity: string, slotName: string): string {
  const sampleStats = {
    head: { intellect: 45, stamina: 32, criticalStrike: 18, itemLevel: 245 },
    chest: { intellect: 65, stamina: 48, mastery: 25, itemLevel: 250 },
    mainhand: { intellect: 85, stamina: 42, spellPower: 156, itemLevel: 260 },
    offhand: { intellect: 35, stamina: 28, spellPower: 78, itemLevel: 245 },
    neck: { intellect: 28, stamina: 22, versatility: 15, itemLevel: 240 },
    shoulders: { intellect: 38, stamina: 30, haste: 20, itemLevel: 245 },
    back: { intellect: 25, stamina: 20, mastery: 18, itemLevel: 235 },
    wrists: { intellect: 22, stamina: 18, criticalStrike: 12, itemLevel: 240 },
    hands: { intellect: 32, stamina: 25, haste: 16, itemLevel: 245 },
    waist: { intellect: 30, stamina: 24, versatility: 14, itemLevel: 240 },
    legs: { intellect: 42, stamina: 35, mastery: 22, itemLevel: 248 },
    feet: { intellect: 28, stamina: 22, haste: 18, itemLevel: 242 },
    ring1: { intellect: 20, stamina: 16, criticalStrike: 25, itemLevel: 250 },
    ring2: { intellect: 18, stamina: 14, mastery: 22, itemLevel: 245 },
    trinket1: { intellect: 45, spellPower: 120, itemLevel: 255 },
    trinket2: { intellect: 40, stamina: 30, itemLevel: 250 },
    shirt: { itemLevel: 1 },
    tabard: { itemLevel: 1 },
    ranged: { intellect: 25, stamina: 20, spellPower: 85, itemLevel: 240 }
  };

  const stats = sampleStats[slotId as keyof typeof sampleStats] || { intellect: 25, stamina: 18, itemLevel: 200 };
  const hasItem = itemName !== 'Empty';

  return `
    <div class="wow-equipment-slot rarity-${rarity} bg-black/50 border-2 rounded-lg cursor-pointer relative flex items-center justify-center transition-all duration-200 hover:bg-black/70 hover:scale-105 ${hasItem ? 'equipped' : 'empty'}" 
         style="width: 64px; height: 64px;"
         data-slot-id="${slotId}"
         data-item-name="${itemName}"
         data-item-rarity="${rarity}"
         data-slot-name="${slotName}"
         data-item-level="${stats.itemLevel || 200}"
         data-item-stats='${JSON.stringify(stats)}'
         data-item-description="A powerful ${slotName.toLowerCase()} item imbued with magical properties. ${hasItem ? 'Currently equipped and providing bonuses to your character.' : 'No item equipped in this slot.'}"
         title="${hasItem ? itemName : `Empty ${slotName} Slot`}">
      
      ${hasItem ? `
        <!-- Item Icon -->
        <div class="text-2xl drop-shadow-lg">${icon}</div>
        
        <!-- Item Level Badge -->
        <div class="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
          ${stats.itemLevel || 200}
        </div>
        
        <!-- Equipped Indicator -->
        <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white shadow-lg"></div>
        
        <!-- Durability Bar (if applicable) -->
        ${['head', 'chest', 'legs', 'feet', 'hands', 'shoulders', 'wrists', 'waist', 'mainhand', 'offhand'].includes(slotId) ? `
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-black/50 rounded-b">
            <div class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-b" style="width: ${85 + Math.random() * 15}%"></div>
          </div>
        ` : ''}
      ` : `
        <!-- Empty Slot -->
        <div class="text-white/30 text-xl">+</div>
        <div class="absolute inset-0 border-2 border-dashed border-white/20 rounded-lg"></div>
      `}
      
      <!-- Hover Tooltip Trigger -->
      <div class="absolute inset-0 hover:bg-white/5 rounded-lg transition-colors duration-200"></div>
    </div>
  `;
}

function generateTransmogItems(): string {
  const transmogItems = [
    { icon: '👑', name: 'Royal Crown', rarity: 'legendary' },
    { icon: '🎩', name: 'Wizard Hat', rarity: 'epic' },
    { icon: '⛑️', name: 'Battle Helm', rarity: 'rare' },
    { icon: '🧢', name: 'Cloth Cap', rarity: 'common' },
    { icon: '👘', name: 'Mystic Robes', rarity: 'epic' },
    { icon: '🥼', name: 'Scholar Coat', rarity: 'rare' },
    { icon: '🦺', name: 'Leather Vest', rarity: 'uncommon' },
    { icon: '👔', name: 'Simple Shirt', rarity: 'common' },
  ];

  return transmogItems.map(item => `
    <div class="transmog-item rarity-${item.rarity} bg-black/40 border-2 rounded-lg cursor-pointer relative flex flex-col items-center justify-center p-2 hover:bg-black/60 transition-all duration-200" 
         data-transmog-name="${item.name}"
         data-transmog-rarity="${item.rarity}">
      <div class="text-2xl">${item.icon}</div>
      <div class="text-white text-xs text-center mt-1">${item.name}</div>
    </div>
  `).join('');
}

function generateEquipmentSets(): string {
  const equipmentSets = [
    { name: 'PvP Combat', icon: '⚔️', description: 'Optimized for player vs player combat', active: true },
    { name: 'Raid Healing', icon: '💚', description: 'Maximum healing power for raids', active: false },
    { name: 'Solo Farming', icon: '🌾', description: 'Efficient for solo content farming', active: false },
    { name: 'Dungeon Tank', icon: '🛡️', description: 'High survivability for dungeons', active: false },
    { name: 'Crafting Gear', icon: '🔧', description: 'Bonuses for crafting activities', active: false },
    { name: 'Empty Set', icon: '➕', description: 'Create a new equipment set', active: false, empty: true }
  ];

  return equipmentSets.map(set => `
    <div class="equipment-set bg-gradient-to-br from-slate-800/90 to-slate-900/90 border ${set.active ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 ${set.empty ? 'border-dashed' : ''}">
      <div class="text-center mb-3">
        <div class="w-12 h-12 mx-auto mb-2 ${set.active ? 'bg-red-500/20' : 'bg-black/30'} border ${set.active ? 'border-red-500/50' : 'border-white/20'} rounded-lg flex items-center justify-center">
          <span class="text-2xl">${set.icon}</span>
        </div>
        <h4 class="text-white font-bold text-sm">${set.name}</h4>
        <p class="text-white/60 text-xs mt-1">${set.description}</p>
      </div>
      
      ${!set.empty ? `
        <div class="space-y-2">
          <button class="w-full px-3 py-1 ${set.active ? 'bg-red-500/20 border-red-500/50' : 'bg-blue-500/20 border-blue-500/50'} border rounded text-white text-xs font-medium transition-all duration-200 hover:scale-105">
            ${set.active ? '✓ Active Set' : '🔄 Equip Set'}
          </button>
          <div class="flex gap-1">
            <button class="flex-1 px-2 py-1 bg-gray-500/20 border border-gray-500/50 rounded text-white text-xs hover:bg-gray-500/30 transition-all duration-200">
              ✏️ Edit
            </button>
            <button class="flex-1 px-2 py-1 bg-red-500/20 border border-red-500/50 rounded text-white text-xs hover:bg-red-500/30 transition-all duration-200">
              🗑️ Delete
            </button>
          </div>
        </div>
      ` : `
        <button class="w-full px-3 py-2 bg-green-500/20 border border-green-500/50 border-dashed rounded text-white text-xs font-medium hover:bg-green-500/30 transition-all duration-200">
          Create New Set
        </button>
      `}
    </div>
  `).join('');
} 