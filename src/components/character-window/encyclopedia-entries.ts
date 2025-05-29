export function createEncyclopediaContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Encyclopedia Categories & Search -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Encyclopedia Header -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-emerald-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border border-emerald-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-300">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <h2 class="text-emerald-200 text-lg font-bold uppercase tracking-wider">Encyclopedia</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Total Entries -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">247/350</span>
                <span class="text-white/70 text-xs">discovered</span>
              </div>
              <!-- Completion -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">70%</span>
                <span class="text-white/70 text-xs">complete</span>
              </div>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="flex gap-3 mb-4">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search encyclopedia entries..." 
                class="w-full px-4 py-2 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
                id="encyclopedia-search"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            
            <select class="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-emerald-400/50 focus:outline-none cursor-pointer" id="encyclopedia-sort">
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="rarity">Sort by Rarity</option>
              <option value="discovered">Sort by Discovery Date</option>
            </select>
          </div>

          <!-- Category Filters -->
          <div class="flex gap-2 flex-wrap">
            <button class="filter-btn active px-3 py-1.5 bg-gradient-to-r from-emerald-500/80 to-emerald-600/80 text-white text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105" data-filter="all">
              📚 All
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="creatures">
              🐲 Creatures
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="items">
              ⚔️ Items
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="locations">
              🏰 Locations
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="lore">
              📜 Lore
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="spells">
              ✨ Spells
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="npcs">
              👥 NPCs
            </button>
          </div>
        </div>

        <!-- Encyclopedia Entries Grid -->
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-3 gap-4 max-w-full" id="encyclopedia-grid">
            ${generateEncyclopediaEntries()}
          </div>
        </div>
      </div>

      <!-- Right Panel: Entry Details -->
      <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Entry Details</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="entry-details-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <p class="text-sm">Select an entry to view details</p>
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
        background: rgba(16, 185, 129, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(16, 185, 129, 0.8);
      }

      .encyclopedia-entry {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        aspect-ratio: 1;
      }
      
      .encyclopedia-entry:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
      }
      
      .encyclopedia-entry.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        background: rgba(59, 130, 246, 0.1) !important;
      }

      .rarity-common { border-color: rgba(156, 163, 175, 0.6); }
      .rarity-uncommon { border-color: rgba(34, 197, 94, 0.6); }
      .rarity-rare { border-color: rgba(59, 130, 246, 0.6); }
      .rarity-epic { border-color: rgba(168, 85, 247, 0.6); }
      .rarity-legendary { border-color: rgba(245, 158, 11, 0.6); }
      .rarity-unknown { border-color: rgba(107, 114, 128, 0.6); }

      .filter-btn.active {
        background: linear-gradient(to right, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.8)) !important;
        border-color: rgba(16, 185, 129, 0.6) !important;
        color: white !important;
      }

      .entry-rarity {
        position: absolute;
        top: 2px;
        right: 2px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 3px;
        text-transform: uppercase;
      }

      .entry-discovered {
        position: absolute;
        bottom: 2px;
        left: 2px;
        background: rgba(16, 185, 129, 0.8);
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 1px 4px;
        border-radius: 3px;
      }

      .entry-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: rgba(0, 0, 0, 0.5);
        overflow: hidden;
      }

      .entry-progress-fill {
        height: 100%;
        background: linear-gradient(to right, #10B981, #059669);
        transition: width 0.3s ease;
      }
    </style>
  `;
}

function generateEncyclopediaEntries(): string {
  const sampleEntries = [
    {
      name: "Ancient Dragon",
      category: "creatures",
      rarity: "legendary",
      discovered: true,
      description: "A massive ancient dragon with scales that shimmer like molten gold. These magnificent creatures are among the oldest beings in the realm, possessing immense magical power and wisdom accumulated over millennia.",
      location: "Dragon's Peak",
      level: "85",
      abilities: ["Fire Breath", "Ancient Magic", "Flight"],
      lore: "Legend speaks of the Ancient Dragons as the first beings to master both elemental and arcane magic. They are said to guard the most precious treasures and knowledge of the ancient world."
    },
    {
      name: "Shadowbane Sword",
      category: "items",
      rarity: "epic",
      discovered: true,
      description: "A legendary blade forged from shadow steel and blessed by the light. This weapon is particularly effective against undead and shadow creatures.",
      location: "Found in the Tomb of Kings",
      level: "60",
      abilities: ["Shadow Resistance", "Light Damage", "Undead Bane"],
      lore: "Crafted by the legendary blacksmith Theron during the War of Shadows, this blade has been passed down through generations of heroes."
    },
    {
      name: "Mystic Moonwell",
      category: "locations",
      rarity: "rare",
      discovered: true,
      description: "A sacred pool of water that glows with ethereal moonlight. The waters are said to have powerful healing and magical properties.",
      location: "Silverleaf Forest",
      level: "25",
      abilities: ["Mana Restoration", "Healing Waters", "Moon Blessing"],
      lore: "Created by the Moon Goddess herself, these wells appear only in places of great natural beauty and magic."
    },
    {
      name: "The Lost Kingdom",
      category: "lore",
      rarity: "legendary",
      discovered: false,
      description: "Ancient texts speak of a kingdom that vanished overnight, leaving behind only ruins and mysteries.",
      location: "Unknown",
      level: "Unknown",
      abilities: [],
      lore: "Scholars believe the Lost Kingdom was consumed by a magical catastrophe, but the truth remains hidden in the mists of time."
    },
    {
      name: "Healing Light",
      category: "spells",
      rarity: "common",
      discovered: true,
      description: "A basic healing spell that restores health using pure light energy.",
      location: "Temple of Light",
      level: "5",
      abilities: ["Health Restoration", "Light Magic"],
      lore: "One of the first spells taught to aspiring clerics and paladins."
    },
    {
      name: "Master Aldric",
      category: "npcs",
      rarity: "uncommon",
      discovered: true,
      description: "A wise old mage who serves as the court wizard. Known for his vast knowledge of ancient magic and helpful nature.",
      location: "Royal Palace",
      level: "75",
      abilities: ["Arcane Knowledge", "Spell Teaching", "Magic Item Identification"],
      lore: "Aldric has served the royal family for over 40 years, becoming one of the most trusted advisors in the kingdom."
    }
  ];

  return sampleEntries.map((entry) => `
    <div class="encyclopedia-entry rarity-${entry.rarity} bg-black/40 border-2 rounded-lg p-4 cursor-pointer relative hover:bg-black/60 transition-all duration-200" 
         data-entry-name="${entry.name}"
         data-entry-category="${entry.category}"
         data-entry-rarity="${entry.rarity}"
         data-entry-discovered="${entry.discovered}"
         data-entry-description="${entry.description}"
         data-entry-location="${entry.location}"
         data-entry-level="${entry.level}"
         data-entry-abilities='${JSON.stringify(entry.abilities)}'
         data-entry-lore="${entry.lore}">
      
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-white font-semibold text-sm truncate flex-1">${entry.name}</h4>
          ${entry.discovered ? `<div class="entry-discovered">✓</div>` : ''}
        </div>
        
        <div class="flex-1 flex flex-col justify-center items-center mb-2">
          <div class="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-2xl mb-2">
            ${getCategoryIcon(entry.category)}
          </div>
          <p class="text-white/70 text-xs capitalize">${entry.category}</p>
        </div>
        
        <div class="text-white/60 text-xs line-clamp-2 mb-2">
          ${entry.discovered ? entry.description.substring(0, 80) + '...' : 'Undiscovered entry...'}
        </div>
        
        <div class="entry-rarity" style="color: ${getRarityColor(entry.rarity)}">${entry.rarity}</div>
      </div>
    </div>
  `).join('');
}

function getCategoryIcon(category: string): string {
  const icons: { [key: string]: string } = {
    creatures: '🐲',
    items: '⚔️',
    locations: '🏰',
    lore: '📜',
    spells: '✨',
    npcs: '👥'
  };
  return icons[category] || '📚';
}

function getRarityColor(rarity: string): string {
  const colors: { [key: string]: string } = {
    common: '#9CA3AF',
    uncommon: '#22C55E',
    rare: '#3B82F6',
    epic: '#A855F7',
    legendary: '#F59E0B',
    unknown: '#6B7280'
  };
  return colors[rarity] || colors.common;
}

// Initialize encyclopedia functionality - can be called after content is loaded
export function initializeEncyclopedia() {
  console.log('📚 Initializing encyclopedia functionality...');
  
  // Search functionality
  const searchInput = document.getElementById('encyclopedia-search');
  if (searchInput) {
    searchInput.addEventListener('input', handleEncyclopediaSearch);
    console.log('📚 Search functionality initialized');
  }

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', handleEncyclopediaFilter);
    });
    console.log(`📚 Filter functionality initialized (${filterBtns.length} buttons)`);
  }

  // Sort functionality
  const sortSelect = document.getElementById('encyclopedia-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleEncyclopediaSort);
    console.log('📚 Sort functionality initialized');
  }

  // Entry interaction
  const entries = document.querySelectorAll('.encyclopedia-entry');
  console.log(`📚 Found ${entries.length} encyclopedia entries`);
  
  if (entries.length > 0) {
    entries.forEach(entry => {
      entry.addEventListener('click', handleEntryClick);
      entry.addEventListener('mouseenter', handleEntryHover);
      entry.addEventListener('mouseleave', handleEntryLeave);
    });
    console.log('📚 Entry interaction events attached');
  }

  console.log('📚 Encyclopedia initialization complete');
}

function handleEncyclopediaSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const searchTerm = target.value.toLowerCase();
  const entries = document.querySelectorAll('.encyclopedia-entry');
  
  entries.forEach(entry => {
    const entryElement = entry as HTMLElement;
    const entryName = entryElement.dataset.entryName?.toLowerCase() || '';
    const entryCategory = entryElement.dataset.entryCategory?.toLowerCase() || '';
    const entryDescription = entryElement.dataset.entryDescription?.toLowerCase() || '';
    
    if (entryName.includes(searchTerm) || entryCategory.includes(searchTerm) || entryDescription.includes(searchTerm)) {
      entryElement.style.display = 'block';
    } else {
      entryElement.style.display = 'none';
    }
  });
}

function handleEncyclopediaFilter(event: Event) {
  const target = event.target as HTMLElement;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');
  
  const filter = target.dataset.filter;
  const entries = document.querySelectorAll('.encyclopedia-entry');
  
  entries.forEach(entry => {
    const entryElement = entry as HTMLElement;
    if (filter === 'all' || entryElement.dataset.entryCategory === filter) {
      entryElement.style.display = 'block';
    } else {
      entryElement.style.display = 'none';
    }
  });
}

function handleEncyclopediaSort(event: Event) {
  const target = event.target as HTMLSelectElement;
  const sortBy = target.value;
  const grid = document.getElementById('encyclopedia-grid');
  if (!grid) return;
  
  const entries = Array.from(grid.querySelectorAll('.encyclopedia-entry')) as HTMLElement[];
  
  entries.sort((a, b) => {
    const aValue = getEntrySortValue(a, sortBy);
    const bValue = getEntrySortValue(b, sortBy);
    return aValue.localeCompare(bValue);
  });
  
  // Re-append sorted entries
  entries.forEach(entry => grid.appendChild(entry));
}

function getEntrySortValue(entry: HTMLElement, sortBy: string): string {
  switch (sortBy) {
    case 'name':
      return entry.dataset.entryName || '';
    case 'category':
      return entry.dataset.entryCategory || '';
    case 'rarity':
      return entry.dataset.entryRarity || '';
    case 'discovered':
      return entry.dataset.entryDiscovered === 'true' ? 'a' : 'z';
    default:
      return entry.dataset.entryName || '';
  }
}

function handleEntryClick(event: Event) {
  const entry = event.currentTarget as HTMLElement;
  console.log('📚 Entry clicked:', entry.dataset.entryName);
  
  // Remove active class from all entries
  document.querySelectorAll('.encyclopedia-entry').forEach(e => e.classList.remove('active'));
  
  // Add active class to clicked entry
  entry.classList.add('active');
  
  // Show entry details
  showEntryDetails(entry);
}

function handleEntryHover(event: Event) {
  const entry = event.currentTarget as HTMLElement;
  if (!entry.classList.contains('active')) {
    entry.style.transform = 'translateY(-2px)';
    entry.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
  }
}

function handleEntryLeave(event: Event) {
  const entry = event.currentTarget as HTMLElement;
  if (!entry.classList.contains('active')) {
    entry.style.transform = '';
    entry.style.boxShadow = '';
  }
}

function showEntryDetails(entry: HTMLElement) {
  console.log('🔍 Showing entry details for:', entry.dataset.entryName);
  
  const panel = document.getElementById('entry-details-panel');
  if (!panel) return;
  
  const entryData = {
    name: entry.dataset.entryName || 'Unknown Entry',
    category: entry.dataset.entryCategory || 'unknown',
    rarity: entry.dataset.entryRarity || 'common',
    discovered: entry.dataset.entryDiscovered === 'true',
    description: entry.dataset.entryDescription || 'No description available.',
    location: entry.dataset.entryLocation || 'Unknown',
    level: entry.dataset.entryLevel || 'Unknown',
    abilities: JSON.parse(entry.dataset.entryAbilities || '[]'),
    lore: entry.dataset.entryLore || 'No lore available.'
  };
  
  panel.innerHTML = generateEntryDetailsContent(entryData);
}

function generateEntryDetailsContent(entry: any): string {
  const categoryColors: { [key: string]: string } = {
    creatures: '#EF4444',
    items: '#3B82F6',
    locations: '#10B981',
    lore: '#F59E0B',
    spells: '#8B5CF6',
    npcs: '#6366F1'
  };

  const categoryIcons: { [key: string]: string } = {
    creatures: '🐲',
    items: '⚔️',
    locations: '🏰',
    lore: '📜',
    spells: '✨',
    npcs: '👥'
  };

  const rarityColors: { [key: string]: string } = {
    common: '#9CA3AF',
    uncommon: '#22C55E',
    rare: '#3B82F6',
    epic: '#A855F7',
    legendary: '#F59E0B'
  };
  
  return `
    <div class="space-y-4">
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: ${categoryColors[entry.category] || categoryColors.lore}">
          <span>${categoryIcons[entry.category] || '📚'}</span>
        </div>
        <h3 class="font-bold text-xl mb-1" style="color: ${categoryColors[entry.category] || categoryColors.lore}">${entry.name}</h3>
        <p class="text-white/70 text-sm capitalize">${entry.category}</p>
        <p class="text-white/50 text-xs" style="color: ${rarityColors[entry.rarity] || rarityColors.common}">${entry.rarity} • Level ${entry.level}</p>
      </div>

      ${entry.discovered ? `
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
          <p class="text-white/80 text-sm leading-relaxed">${entry.description}</p>
        </div>

        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Location</h4>
          <p class="text-blue-400 text-sm">${entry.location}</p>
        </div>

        ${entry.abilities && entry.abilities.length > 0 ? `
          <div class="bg-black/20 border border-white/10 rounded-lg p-3">
            <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Abilities</h4>
            <div class="space-y-1">
              ${entry.abilities.map((ability: string) => `
                <div class="text-purple-400 text-sm">• ${ability}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Lore</h4>
          <p class="text-white/80 text-sm leading-relaxed italic">${entry.lore}</p>
        </div>
      ` : `
        <div class="bg-black/20 border border-red-500/20 rounded-lg p-3 text-center">
          <h4 class="text-red-400 font-semibold mb-2 text-sm uppercase tracking-wide">🔒 Undiscovered</h4>
          <p class="text-white/60 text-sm">This entry has not been discovered yet. Explore the world to unlock its secrets!</p>
        </div>
      `}

      <div class="space-y-2">
        ${entry.discovered ? `
          <button class="w-full px-4 py-2 bg-gradient-to-r from-emerald-500/80 to-emerald-600/80 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            📋 Add to Journal
          </button>
          <button class="w-full px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            📤 Share Entry
          </button>
        ` : `
          <button class="w-full px-4 py-2 bg-gradient-to-r from-gray-500/80 to-gray-600/80 text-white text-sm font-bold rounded-lg cursor-not-allowed" disabled>
            🔒 Entry Locked
          </button>
        `}
        <button class="w-full px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
          ⭐ Add to Favorites
        </button>
      </div>
    </div>
  `;
} 