export function createSpellBookContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Spell Grid -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Spell Book Header -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-purple-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-purple-300">
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/>
                  <path d="m14 7 3 3"/>
                  <path d="M5 6v4"/>
                  <path d="M19 14v4"/>
                  <path d="M10 2v2"/>
                  <path d="M7 8H3"/>
                  <path d="M21 16h-4"/>
                  <path d="M11 3H9"/>
                </svg>
              </div>
              <h2 class="text-purple-200 text-lg font-bold uppercase tracking-wider">Spell Book</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Mana Display -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">850/1000</span>
                <span class="text-white/70 text-xs">mana</span>
              </div>
              <!-- Known Spells -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">24/50</span>
                <span class="text-white/70 text-xs">spells</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 mb-4">
            <button class="px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="create-spell-btn">
              ✨ Create New Spell
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="search-components-btn">
              🔍 Search Components
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="edit-spell-btn">
              ✏️ Edit Spell
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="combine-spell-btn">
              🔮 Combine Spells
            </button>
          </div>

          <!-- Search and Filter Bar -->
          <div class="flex gap-3 mb-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search spells..." 
                class="w-full px-4 py-2 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                id="spell-search"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            
            <select class="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-400/50 focus:outline-none cursor-pointer" id="spell-sort">
              <option value="name">Sort by Name</option>
              <option value="school">Sort by School</option>
              <option value="level">Sort by Level</option>
              <option value="manaCost">Sort by Mana Cost</option>
              <option value="damage">Sort by Damage</option>
            </select>
          </div>

          <!-- Filter Categories -->
          <div class="flex gap-2 flex-wrap">
            <button class="filter-btn active px-3 py-1.5 bg-gradient-to-r from-purple-500/80 to-purple-600/80 text-white text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105" data-filter="all">
              All Spells
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="fire">
              🔥 Fire
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="ice">
              ❄️ Ice
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="lightning">
              ⚡ Lightning
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="healing">
              💚 Healing
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="utility">
              🔧 Utility
            </button>
          </div>
        </div>

        <!-- Spell Grid Container -->
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-8 gap-3 max-w-full" id="spell-grid">
            ${generateSpellSlots()}
          </div>
        </div>
      </div>

      <!-- Right Panel: Spell Details -->
      <div class="w-80 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Spell Details</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="spell-details-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/>
                <path d="m14 7 3 3"/>
              </svg>
            </div>
            <p class="text-sm">Click a spell to view details</p>
          </div>
        </div>
      </div>

      <!-- Spell Creation Modal -->
      <div id="spell-creation-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-all duration-300">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/20 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white text-xl font-bold">Create New Spell</h3>
                <button class="close-modal w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-white/80 text-sm font-medium mb-2">Spell Name</label>
                  <input type="text" class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400/50 focus:outline-none" placeholder="Enter spell name...">
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-white/80 text-sm font-medium mb-2">School</label>
                    <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-400/50 focus:outline-none">
                      <option value="fire">Fire</option>
                      <option value="ice">Ice</option>
                      <option value="lightning">Lightning</option>
                      <option value="healing">Healing</option>
                      <option value="utility">Utility</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-white/80 text-sm font-medium mb-2">Level</label>
                    <input type="number" min="1" max="10" class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-400/50 focus:outline-none" value="1">
                  </div>
                </div>
                
                <div>
                  <label class="block text-white/80 text-sm font-medium mb-2">Description</label>
                  <textarea class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400/50 focus:outline-none h-24 resize-none" placeholder="Describe your spell..."></textarea>
                </div>
                
                <div class="flex gap-3 pt-4">
                  <button class="flex-1 px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white font-bold rounded-lg transition-all duration-200">
                    Create Spell
                  </button>
                  <button class="close-modal px-4 py-2 bg-gradient-to-r from-gray-500/80 to-gray-600/80 hover:from-gray-400 hover:to-gray-500 text-white font-bold rounded-lg transition-all duration-200">
                    Cancel
                  </button>
                </div>
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
        background: rgba(168, 85, 247, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(168, 85, 247, 0.8);
      }

      .spell-slot {
        aspect-ratio: 1;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }
      
      .spell-slot:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(168, 85, 247, 0.3);
      }
      
      .spell-slot.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        background: rgba(59, 130, 246, 0.1) !important;
      }

      .school-fire { border-color: rgba(239, 68, 68, 0.6); }
      .school-ice { border-color: rgba(59, 130, 246, 0.6); }
      .school-lightning { border-color: rgba(245, 158, 11, 0.6); }
      .school-healing { border-color: rgba(34, 197, 94, 0.6); }
      .school-utility { border-color: rgba(156, 163, 175, 0.6); }

      .filter-btn.active {
        background: linear-gradient(to right, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 0.8)) !important;
        border-color: rgba(168, 85, 247, 0.6) !important;
        color: white !important;
      }

      .spell-level {
        position: absolute;
        top: 2px;
        left: 2px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 1px 4px;
        border-radius: 3px;
        min-width: 16px;
        text-align: center;
      }

      .spell-mana-cost {
        position: absolute;
        bottom: 2px;
        right: 2px;
        background: rgba(59, 130, 246, 0.8);
        color: white;
        font-size: 9px;
        font-weight: bold;
        padding: 1px 3px;
        border-radius: 3px;
        min-width: 14px;
        text-align: center;
      }

      @keyframes spellCast {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(180deg); box-shadow: 0 0 30px rgba(168, 85, 247, 0.6); }
        100% { transform: scale(1) rotate(360deg); }
      }

      .spell-casting {
        animation: spellCast 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
    </style>
  `;
}

function generateSpellSlots(): string {
  const sampleSpells = [
    { name: "Fireball", school: "fire", level: "3", manaCost: "25", damage: "45", cooldown: "2", description: "Launches a blazing fireball that explodes on impact, dealing fire damage to enemies in the area." },
    { name: "Ice Shard", school: "ice", level: "2", manaCost: "15", damage: "30", cooldown: "1.5", description: "Fires a sharp ice projectile that pierces through enemies and slows their movement." },
    { name: "Lightning Bolt", school: "lightning", level: "4", manaCost: "35", damage: "60", cooldown: "3", description: "Strikes the target with a powerful bolt of lightning, with a chance to chain to nearby enemies." },
    { name: "Heal", school: "healing", level: "2", manaCost: "20", damage: "0", cooldown: "1", description: "Restores health to the target, providing immediate healing and a small regeneration effect." },
    { name: "Teleport", school: "utility", level: "5", manaCost: "40", damage: "0", cooldown: "10", description: "Instantly transports the caster to a target location within range." },
    { name: "Meteor", school: "fire", level: "8", manaCost: "80", damage: "120", cooldown: "15", description: "Calls down a massive meteor from the sky, dealing devastating area damage after a short delay." },
    { name: "Frost Armor", school: "ice", level: "3", manaCost: "30", damage: "0", cooldown: "5", description: "Encases the caster in protective ice, reducing damage taken and slowing attackers." },
    { name: "Chain Lightning", school: "lightning", level: "6", manaCost: "50", damage: "40", cooldown: "4", description: "Unleashes lightning that jumped between multiple enemies, dealing reduced damage with each jump." },
    { name: "Greater Heal", school: "healing", level: "5", manaCost: "45", damage: "0", cooldown: "3", description: "Provides powerful healing over time and removes negative status effects." },
    { name: "Invisibility", school: "utility", level: "4", manaCost: "35", damage: "0", cooldown: "20", description: "Renders the caster invisible for a short duration, breaking on attack or spell casting." },
    { name: "Flame Wall", school: "fire", level: "5", manaCost: "40", damage: "25", cooldown: "8", description: "Creates a wall of flames that damages enemies who pass through it." },
    { name: "Blizzard", school: "ice", level: "7", manaCost: "70", damage: "35", cooldown: "12", description: "Summons a devastating blizzard over a large area, dealing continuous ice damage." },
  ];

  let slots = '';
  
  for (let i = 0; i < 64; i++) { // 8x8 = 64 spell slots
    const hasSpell = i < sampleSpells.length;
    const spell = hasSpell ? sampleSpells[i] : null;
    
    if (hasSpell && spell) {
      const schoolIcons = {
        fire: '🔥',
        ice: '❄️',
        lightning: '⚡',
        healing: '💚',
        utility: '🔧'
      };

      slots += `
        <div class="spell-slot school-${spell.school} bg-black/40 border-2 rounded-lg cursor-pointer relative flex items-center justify-center text-2xl hover:bg-black/60 transition-all duration-200" 
             data-spell="true"
             data-spell-name="${spell.name}"
             data-spell-school="${spell.school}"
             data-spell-level="${spell.level}"
             data-spell-mana-cost="${spell.manaCost}"
             data-spell-damage="${spell.damage}"
             data-spell-cooldown="${spell.cooldown}"
             data-spell-description="${spell.description}">
          <span class="drop-shadow-lg">${schoolIcons[spell.school as keyof typeof schoolIcons] || '✨'}</span>
          <div class="spell-level">${spell.level}</div>
          <div class="spell-mana-cost">${spell.manaCost}</div>
        </div>
      `;
    } else {
      slots += `
        <div class="spell-slot bg-black/20 border-2 border-white/10 rounded-lg cursor-pointer relative flex items-center justify-center hover:bg-black/30 transition-all duration-200">
          <div class="w-6 h-6 border border-white/20 rounded border-dashed opacity-30"></div>
        </div>
      `;
    }
  }
  
  return slots;
}

// Initialize spell functionality - can be called after content is loaded
export function initializeSpells() {
  console.log('🪄 Initializing spell functionality...');
  
  // Search functionality
  const searchInput = document.getElementById('spell-search');
  if (searchInput) {
    searchInput.addEventListener('input', handleSpellSearch);
    console.log('🪄 Search functionality initialized');
  }

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', handleSpellFilter);
    });
    console.log(`🪄 Filter functionality initialized (${filterBtns.length} buttons)`);
  }

  // Sort functionality
  const sortSelect = document.getElementById('spell-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleSpellSort);
    console.log('🪄 Sort functionality initialized');
  }

  // Spell interaction
  const spellSlots = document.querySelectorAll('.spell-slot');
  console.log(`🪄 Found ${spellSlots.length} spell slots`);
  
  if (spellSlots.length > 0) {
    spellSlots.forEach(slot => {
      slot.addEventListener('click', handleSpellClick);
    });
    console.log('🪄 Spell interaction events attached');
  }

  // Button functionality
  const createSpellBtn = document.getElementById('create-spell-btn');
  const searchComponentsBtn = document.getElementById('search-components-btn');
  const editSpellBtn = document.getElementById('edit-spell-btn');
  const combineSpellBtn = document.getElementById('combine-spell-btn');

  if (createSpellBtn) {
    createSpellBtn.addEventListener('click', () => {
      console.log('🪄 Opening spell creation modal...');
      showSpellCreationModal();
    });
  }

  if (searchComponentsBtn) {
    searchComponentsBtn.addEventListener('click', () => {
      console.log('🪄 Opening component search...');
    });
  }

  if (editSpellBtn) {
    editSpellBtn.addEventListener('click', () => {
      if (selectedSpell) {
        console.log('🪄 Editing spell:', selectedSpell.dataset.spellName);
      } else {
        alert('Please select a spell to edit');
      }
    });
  }

  if (combineSpellBtn) {
    combineSpellBtn.addEventListener('click', () => {
      console.log('🪄 Opening spell combination interface...');
    });
  }

  // Modal functionality
  const modal = document.getElementById('spell-creation-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  if (modal && closeModalBtns.length > 0) {
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', hideSpellCreationModal);
    });
    console.log('🪄 Modal functionality initialized');
  }
  
  console.log('🪄 Spell initialization complete');
}

// Global variable for spell state
let selectedSpell: HTMLElement | null = null;

function showSpellCreationModal() {
  const modal = document.getElementById('spell-creation-modal');
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  }
}

function hideSpellCreationModal() {
  const modal = document.getElementById('spell-creation-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
  }
}

function handleSpellSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const searchTerm = target.value.toLowerCase();
  const slots = document.querySelectorAll('.spell-slot[data-spell]');
  
  slots.forEach(slot => {
    const slotElement = slot as HTMLElement;
    const spellName = slotElement.dataset.spellName?.toLowerCase() || '';
    const spellSchool = slotElement.dataset.spellSchool?.toLowerCase() || '';
    
    if (spellName.includes(searchTerm) || spellSchool.includes(searchTerm)) {
      slotElement.style.display = 'block';
    } else {
      slotElement.style.display = 'none';
    }
  });
}

function handleSpellFilter(event: Event) {
  const target = event.target as HTMLElement;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');
  
  const filter = target.dataset.filter;
  const slots = document.querySelectorAll('.spell-slot');
  
  slots.forEach(slot => {
    const slotElement = slot as HTMLElement;
    if (filter === 'all' || slotElement.dataset.spellSchool === filter || !slotElement.dataset.spell) {
      slotElement.style.display = 'block';
    } else {
      slotElement.style.display = 'none';
    }
  });
}

function handleSpellSort(event: Event) {
  const target = event.target as HTMLSelectElement;
  const sortBy = target.value;
  const grid = document.getElementById('spell-grid');
  if (!grid) return;
  
  const slots = Array.from(grid.querySelectorAll('.spell-slot[data-spell]')) as HTMLElement[];
  
  slots.sort((a, b) => {
    const aValue = getSpellSortValue(a, sortBy);
    const bValue = getSpellSortValue(b, sortBy);
    return aValue.localeCompare(bValue);
  });
  
  // Re-append sorted spells
  slots.forEach(slot => grid.appendChild(slot));
}

function getSpellSortValue(slot: HTMLElement, sortBy: string): string {
  switch (sortBy) {
    case 'name':
      return slot.dataset.spellName || '';
    case 'school':
      return slot.dataset.spellSchool || '';
    case 'level':
      return slot.dataset.spellLevel || '';
    case 'manaCost':
      return slot.dataset.spellManaCost || '';
    case 'damage':
      return slot.dataset.spellDamage || '';
    default:
      return slot.dataset.spellName || '';
  }
}

function handleSpellClick(event: Event) {
  const slot = event.currentTarget as HTMLElement;
  console.log('🪄 Spell clicked:', slot.dataset.spellName);
  
  if (slot.dataset.spell) {
    // Remove active class from all slots
    document.querySelectorAll('.spell-slot').forEach(s => s.classList.remove('active'));
    
    // Add active class to clicked slot
    slot.classList.add('active');
    
    // Show spell details
    showSpellDetails(slot);
    selectedSpell = slot;
  }
}

function showSpellDetails(slot: HTMLElement) {
  console.log('🔍 Showing spell details for:', slot.dataset.spellName);
  
  const panel = document.getElementById('spell-details-panel');
  if (!panel) return;
  
  const spellData = {
    name: slot.dataset.spellName || 'Unknown Spell',
    school: slot.dataset.spellSchool || 'utility',
    level: slot.dataset.spellLevel || '1',
    manaCost: slot.dataset.spellManaCost || '0',
    damage: slot.dataset.spellDamage || '0',
    description: slot.dataset.spellDescription || 'No description available.',
    cooldown: slot.dataset.spellCooldown || '0'
  };
  
  panel.innerHTML = generateSpellDetailsContent(spellData);
}

function generateSpellDetailsContent(spell: any): string {
  const schoolColors: { [key: string]: string } = {
    fire: '#EF4444',
    ice: '#3B82F6',
    lightning: '#F59E0B',
    healing: '#22C55E',
    utility: '#9CA3AF'
  };

  const schoolIcons: { [key: string]: string } = {
    fire: '🔥',
    ice: '❄️',
    lightning: '⚡',
    healing: '💚',
    utility: '🔧'
  };
  
  return `
    <div class="space-y-4">
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: ${schoolColors[spell.school] || schoolColors.utility}">
          <span>${schoolIcons[spell.school] || '✨'}</span>
        </div>
        <h3 class="font-bold text-xl mb-1" style="color: ${schoolColors[spell.school] || schoolColors.utility}">${spell.name}</h3>
        <p class="text-white/70 text-sm capitalize">${spell.school} • Level ${spell.level}</p>
      </div>

      <div class="bg-black/20 border border-white/10 rounded-lg p-3">
        <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Spell Properties</h4>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-white/70 text-sm">Mana Cost</span>
            <span class="text-blue-400 font-bold">${spell.manaCost}</span>
          </div>
          ${spell.damage !== '0' ? `
            <div class="flex justify-between items-center">
              <span class="text-white/70 text-sm">Damage</span>
              <span class="text-red-400 font-bold">${spell.damage}</span>
            </div>
          ` : ''}
          <div class="flex justify-between items-center">
            <span class="text-white/70 text-sm">Cooldown</span>
            <span class="text-yellow-400 font-bold">${spell.cooldown}s</span>
          </div>
        </div>
      </div>

      <div class="bg-black/20 border border-white/10 rounded-lg p-3">
        <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
        <p class="text-white/80 text-sm leading-relaxed">${spell.description}</p>
      </div>

      <div class="space-y-2">
        <button class="w-full px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
          ✨ Cast Spell
        </button>
        <button class="w-full px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
          📚 Study Spell
        </button>
        <button class="w-full px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
          ✏️ Edit Spell
        </button>
      </div>
    </div>
  `;
} 