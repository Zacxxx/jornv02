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

    <script>
      let selectedEntry = null;

      document.addEventListener('DOMContentLoaded', function() {
        initializeEncyclopedia();
      });

      function initializeEncyclopedia() {
        // Search functionality
        const searchInput = document.getElementById('encyclopedia-search');
        if (searchInput) {
          searchInput.addEventListener('input', handleEncyclopediaSearch);
        }

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
          btn.addEventListener('click', handleEncyclopediaFilter);
        });

        // Entry interaction
        const entries = document.querySelectorAll('.encyclopedia-entry');
        entries.forEach(entry => {
          entry.addEventListener('click', handleEntryClick);
        });
      }

      function handleEncyclopediaSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const entries = document.querySelectorAll('.encyclopedia-entry');
        
        entries.forEach(entry => {
          const entryName = entry.dataset.entryName?.toLowerCase() || '';
          const entryCategory = entry.dataset.entryCategory?.toLowerCase() || '';
          
          if (entryName.includes(searchTerm) || entryCategory.includes(searchTerm)) {
            entry.style.display = 'flex';
          } else {
            entry.style.display = 'none';
          }
        });
      }

      function handleEncyclopediaFilter(event) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const filter = event.target.dataset.filter;
        const entries = document.querySelectorAll('.encyclopedia-entry');
        
        entries.forEach(entry => {
          if (filter === 'all' || entry.dataset.entryCategory === filter) {
            entry.style.display = 'flex';
          } else {
            entry.style.display = 'none';
          }
        });
      }

      function handleEntryClick(event) {
        const entry = event.currentTarget;
        if (entry.dataset.discovered === 'true') {
          document.querySelectorAll('.encyclopedia-entry').forEach(e => e.classList.remove('active'));
          entry.classList.add('active');
          showEntryDetails(entry);
          selectedEntry = entry;
        }
      }

      function showEntryDetails(entry) {
        const panel = document.getElementById('entry-details-panel');
        const entryData = {
          name: entry.dataset.entryName || 'Unknown Entry',
          category: entry.dataset.entryCategory || 'misc',
          rarity: entry.dataset.entryRarity || 'common',
          description: entry.dataset.entryDescription || 'No description available.',
          lore: entry.dataset.entryLore || 'No additional lore available.',
          stats: JSON.parse(entry.dataset.entryStats || '{}'),
          location: entry.dataset.entryLocation || 'Unknown',
          discovered: entry.dataset.discovered === 'true'
        };
        
        panel.innerHTML = generateEntryDetailsContent(entryData);
      }

      function generateEntryDetailsContent(entry) {
        const rarityColors = {
          common: '#9CA3AF',
          uncommon: '#22C55E',
          rare: '#3B82F6',
          epic: '#A855F7',
          legendary: '#F59E0B',
          unknown: '#6B7280'
        };

        const categoryIcons = {
          creatures: '🐲',
          items: '⚔️',
          locations: '🏰',
          lore: '📜',
          spells: '✨',
          npcs: '👥'
        };
        
        return \`
          <div class="space-y-4">
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: \${rarityColors[entry.rarity]}">
                <span>\${categoryIcons[entry.category] || '📖'}</span>
              </div>
              <h3 class="font-bold text-xl mb-1" style="color: \${rarityColors[entry.rarity]}">\${entry.name}</h3>
              <p class="text-white/70 text-sm capitalize">\${entry.category}</p>
              <p class="text-white/50 text-xs uppercase tracking-wide" style="color: \${rarityColors[entry.rarity]}">\${entry.rarity}</p>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
              <p class="text-white/80 text-sm leading-relaxed">\${entry.description}</p>
            </div>

            \${entry.location !== 'Unknown' ? \`
              <div class="bg-black/20 border border-white/10 rounded-lg p-3">
                <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Location</h4>
                <p class="text-blue-400 text-sm">\${entry.location}</p>
              </div>
            \` : ''}

            \${Object.keys(entry.stats).length > 0 ? \`
              <div class="bg-black/20 border border-white/10 rounded-lg p-3">
                <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Statistics</h4>
                <div class="space-y-2">
                  \${Object.entries(entry.stats).map(([stat, value]) => \`
                    <div class="flex justify-between items-center">
                      <span class="text-white/70 text-sm capitalize">\${stat.replace(/([A-Z])/g, ' $1')}</span>
                      <span class="text-green-400 font-bold">\${value}</span>
                    </div>
                  \`).join('')}
                </div>
              </div>
            \` : ''}

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Lore</h4>
              <p class="text-white/80 text-sm leading-relaxed italic">\${entry.lore}</p>
            </div>

            <div class="space-y-2">
              <button class="w-full px-4 py-2 bg-gradient-to-r from-emerald-500/80 to-emerald-600/80 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                📌 Pin Entry
              </button>
              <button class="w-full px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                📤 Share Discovery
              </button>
            </div>
          </div>
        \`;
      }
    </script>
  `;
}

function generateEncyclopediaEntries(): string {
  const sampleEntries = [
    {
      name: "Ancient Dragon",
      category: "creatures",
      rarity: "legendary",
      discovered: true,
      description: "A massive, ancient dragon that has lived for centuries. Its scales shimmer with magical energy and its roar can shatter stone.",
      lore: "The Ancient Dragons are the oldest and most powerful of their kind, said to have witnessed the creation of the world itself.",
      stats: { level: 85, health: 50000, damage: 1200, armor: 800 },
      location: "Dragonspine Mountains"
    },
    {
      name: "Excalibur",
      category: "items",
      rarity: "legendary",
      discovered: true,
      description: "The legendary sword of kings, said to grant its wielder the power to unite kingdoms and command respect from all who see it.",
      lore: "Forged in the heart of a dying star by the gods themselves, Excalibur chooses its wielder and appears only to those deemed worthy.",
      stats: { damage: 450, criticalChance: 25, durability: 1000 },
      location: "Stone of Destiny"
    },
    {
      name: "Arcane Tower",
      category: "locations",
      rarity: "epic",
      discovered: true,
      description: "A towering spire of crystalline magic that pierces the clouds. Home to the most powerful mages in the realm.",
      lore: "Built by the Archmage Meridian centuries ago, the tower serves as both a sanctuary for magical learning and a beacon of power.",
      stats: { floors: 99, magicalEnergy: 9999, occupants: 50 },
      location: "Mystic Highlands"
    },
    {
      name: "The Great Sundering",
      category: "lore",
      rarity: "epic",
      discovered: true,
      description: "The cataclysmic event that split the world into separate realms, forever changing the nature of magic and reality.",
      lore: "When the gods themselves went to war, their battle tore reality asunder, creating the multiple planes of existence we know today.",
      stats: {},
      location: "Historical Event"
    },
    {
      name: "Meteor Strike",
      category: "spells",
      rarity: "epic",
      discovered: true,
      description: "Summons a massive meteor from the heavens to crash down upon enemies, dealing devastating area damage.",
      lore: "This spell was first discovered by observing actual meteor impacts and learning to replicate their destructive force through magic.",
      stats: { manaCost: 150, damage: 800, areaOfEffect: 15, castTime: 5 },
      location: "Learned from Ancient Tomes"
    },
    {
      name: "Mysterious Goblin",
      category: "creatures",
      rarity: "common",
      discovered: false,
      description: "???",
      lore: "???",
      stats: {},
      location: "???"
    }
  ];

  return sampleEntries.map((entry, _index) => {
    const categoryIcons = {
      creatures: '🐲',
      items: '⚔️',
      locations: '🏰',
      lore: '📜',
      spells: '✨',
      npcs: '👥'
    };

    return `
      <div class="encyclopedia-entry rarity-${entry.rarity} bg-black/40 border-2 rounded-lg cursor-pointer relative flex flex-col items-center justify-center p-4 hover:bg-black/60 transition-all duration-200 ${!entry.discovered ? 'opacity-50' : ''}" 
           data-entry-name="${entry.name}"
           data-entry-category="${entry.category}"
           data-entry-rarity="${entry.rarity}"
           data-entry-description="${entry.description}"
           data-entry-lore="${entry.lore}"
           data-entry-stats='${JSON.stringify(entry.stats)}'
           data-entry-location="${entry.location}"
           data-discovered="${entry.discovered}">
        
        <div class="text-4xl mb-3 ${!entry.discovered ? 'filter grayscale' : ''}">${entry.discovered ? categoryIcons[entry.category as keyof typeof categoryIcons] || '📖' : '❓'}</div>
        <div class="text-white text-sm font-medium text-center mb-1">${entry.discovered ? entry.name : '???'}</div>
        <div class="text-white/60 text-xs capitalize">${entry.discovered ? entry.category : 'Unknown'}</div>
        
        <div class="entry-rarity" style="background-color: ${entry.discovered ? 'rgba(0,0,0,0.8)' : 'rgba(107,114,128,0.8)'}">${entry.discovered ? entry.rarity : '???'}</div>
        ${entry.discovered ? '<div class="entry-discovered">✓</div>' : ''}
        
        <div class="entry-progress">
          <div class="entry-progress-fill" style="width: ${entry.discovered ? '100%' : '0%'}"></div>
        </div>
      </div>
    `;
  }).join('');
} 