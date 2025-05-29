export function createQuestLogContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Quest List -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Quest Log Header -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-orange-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 border border-orange-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-orange-300">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <h2 class="text-orange-200 text-lg font-bold uppercase tracking-wider">Quest Log</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Active Quests -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">12/25</span>
                <span class="text-white/70 text-xs">active</span>
              </div>
              <!-- Completed Quests -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">147</span>
                <span class="text-white/70 text-xs">completed</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 mb-4">
            <button class="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="search-quest-btn">
              🔍 Search for Quest
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="track-quest-btn">
              📍 Track Quest
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="abandon-quest-btn">
              ❌ Abandon Quest
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="share-quest-btn">
              📤 Share Quest
            </button>
          </div>

          <!-- Search and Filter Bar -->
          <div class="flex gap-3 mb-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search quests..." 
                class="w-full px-4 py-2 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
                id="quest-search"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            
            <select class="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-orange-400/50 focus:outline-none cursor-pointer" id="quest-sort">
              <option value="name">Sort by Name</option>
              <option value="level">Sort by Level</option>
              <option value="type">Sort by Type</option>
              <option value="location">Sort by Location</option>
              <option value="progress">Sort by Progress</option>
            </select>
          </div>

          <!-- Filter Categories -->
          <div class="flex gap-2 flex-wrap">
            <button class="filter-btn active px-3 py-1.5 bg-gradient-to-r from-orange-500/80 to-orange-600/80 text-white text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105" data-filter="active">
              🟢 Active Quests
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="completed">
              ✅ Completed
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="main">
              ⭐ Main Story
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="side">
              📋 Side Quests
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="daily">
              🔄 Daily
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="guild">
              🏰 Guild
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="failed">
              ❌ Failed
            </button>
          </div>
        </div>

        <!-- Quest List Container -->
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div class="space-y-3" id="quest-list">
            ${generateQuestList()}
          </div>
        </div>
      </div>

      <!-- Right Panel: Quest Details -->
      <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Quest Details</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="quest-details-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            </div>
            <p class="text-sm">Select a quest to view details</p>
          </div>
        </div>
      </div>

      <!-- Quest Search Modal -->
      <div id="quest-search-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-all duration-300">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/20 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white text-xl font-bold">Quest Database</h3>
                <button class="close-modal w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-4">
                <div class="relative">
                  <input 
                    type="text" 
                    placeholder="Search available quests..." 
                    class="w-full px-4 py-3 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                    id="quest-database-search"
                  />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                
                <div class="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto custom-scrollbar" id="available-quests">
                  ${generateAvailableQuests()}
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
        background: rgba(245, 158, 11, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(245, 158, 11, 0.8);
      }

      .quest-item {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      .quest-item:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
      }
      
      .quest-item.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        background: rgba(59, 130, 246, 0.05) !important;
      }

      .quest-type-main { border-left: 4px solid #F59E0B; }
      .quest-type-side { border-left: 4px solid #3B82F6; }
      .quest-type-daily { border-left: 4px solid #22C55E; }
      .quest-type-guild { border-left: 4px solid #8B5CF6; }

      .quest-status-active .quest-status-indicator { 
        background: #22C55E;
        animation: pulse 2s infinite;
      }
      .quest-status-completed .quest-status-indicator { background: #3B82F6; }
      .quest-status-failed .quest-status-indicator { background: #EF4444; }

      .filter-btn.active {
        background: linear-gradient(to right, rgba(245, 158, 11, 0.8), rgba(217, 119, 6, 0.8)) !important;
        border-color: rgba(245, 158, 11, 0.6) !important;
        color: white !important;
      }

      .progress-bar {
        height: 6px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        overflow: hidden;
      }

      .progress-bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s ease;
      }

      .objective-item {
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        border-left: 3px solid transparent;
        margin-bottom: 8px;
      }

      .objective-active {
        border-left-color: #F59E0B;
        background: rgba(245, 158, 11, 0.1);
      }

      .objective-completed {
        border-left-color: #22C55E;
        background: rgba(34, 197, 94, 0.1);
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    </style>
  `;
}

function generateQuestList(): string {
  const sampleQuests = [
    {
      name: "The Dragon's Lair",
      type: "main",
      status: "active",
      level: "45",
      location: "Dragonspine Mountains",
      giver: "King Aldric",
      description: "Venture into the ancient dragon's lair and retrieve the Crown of Flames. This legendary artifact is needed to unite the kingdoms against the coming darkness.",
      objectives: [
        { description: "Enter the Dragon's Lair", completed: true },
        { description: "Defeat the Ancient Dragon", completed: false, current: 0, required: 1 },
        { description: "Retrieve the Crown of Flames", completed: false, current: 0, required: 1 }
      ],
      rewards: { xp: 5000, gold: 1000, items: ["Crown of Flames", "Dragon Scale Armor"] },
      progress: "33"
    },
    {
      name: "Herb Gathering",
      type: "daily",
      status: "active",
      level: "10",
      location: "Whispering Woods",
      giver: "Alchemist Maya",
      description: "Collect rare herbs from the Whispering Woods for potion brewing. These herbs are essential for creating healing potions for the town's defenders.",
      objectives: [
        { description: "Collect Moonflower Petals", completed: true },
        { description: "Gather Silverleaf", completed: false, current: 3, required: 5 },
        { description: "Find Mystic Mushrooms", completed: false, current: 1, required: 3 }
      ],
      rewards: { xp: 500, gold: 100 },
      progress: "60"
    },
    {
      name: "The Lost Merchant",
      type: "side",
      status: "completed",
      level: "25",
      location: "Merchant's Road",
      giver: "Guard Captain",
      description: "A merchant has gone missing on the dangerous road between towns. Find him and ensure his safe return.",
      objectives: [
        { description: "Search the Merchant's Road", completed: true },
        { description: "Rescue the merchant", completed: true },
        { description: "Escort him to safety", completed: true }
      ],
      rewards: { xp: 1500, gold: 300, items: ["Merchant's Ring"] },
      progress: "100"
    },
    {
      name: "Guild Recruitment",
      type: "guild",
      status: "active",
      level: "30",
      location: "Guild Hall",
      giver: "Guild Master",
      description: "Help recruit new members for the guild by demonstrating our strength and valor in combat.",
      objectives: [
        { description: "Win 5 PvP matches", completed: false, current: 2, required: 5 },
        { description: "Complete a dungeon run", completed: true },
        { description: "Participate in guild event", completed: false, current: 0, required: 1 }
      ],
      rewards: { xp: 2000, gold: 500 },
      progress: "50"
    },
    {
      name: "The Cursed Artifact",
      type: "side",
      status: "failed",
      level: "35",
      location: "Haunted Ruins",
      giver: "Scholar Theron",
      description: "Investigate the mysterious cursed artifact that has been causing strange phenomena in the nearby ruins.",
      objectives: [
        { description: "Investigate the ruins", completed: true },
        { description: "Survive the curse", completed: false, current: 0, required: 1 }
      ],
      rewards: { xp: 2500, gold: 600 },
      progress: "50"
    }
  ];

  return sampleQuests.map((quest, _index) => `
    <div class="quest-item quest-type-${quest.type} quest-status-${quest.status} bg-black/30 border border-white/10 rounded-lg p-4 hover:bg-black/40 transition-all duration-200"
         data-quest-name="${quest.name}"
         data-quest-type="${quest.type}"
         data-quest-status="${quest.status}"
         data-quest-level="${quest.level}"
         data-quest-location="${quest.location}"
         data-quest-giver="${quest.giver}"
         data-quest-description="${quest.description}"
         data-quest-objectives='${JSON.stringify(quest.objectives)}'
         data-quest-rewards='${JSON.stringify(quest.rewards)}'
         data-quest-progress="${quest.progress}">
      
      <div class="flex items-start justify-between mb-2">
        <div class="flex-1">
          <h4 class="text-white font-semibold text-base mb-1">${quest.name}</h4>
          <div class="flex items-center gap-3 text-sm text-white/70">
            <span class="capitalize">${quest.type} Quest</span>
            <span>•</span>
            <span>Level ${quest.level}</span>
            <span>•</span>
            <span>${quest.location}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${quest.status === 'active' ? `
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-green-400 text-xs font-medium uppercase">Active</span>
          ` : quest.status === 'completed' ? `
            <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span class="text-blue-400 text-xs font-medium uppercase">Completed</span>
          ` : `
            <div class="w-2 h-2 bg-red-400 rounded-full"></div>
            <span class="text-red-400 text-xs font-medium uppercase">Failed</span>
          `}
        </div>
      </div>
      
      <p class="text-white/60 text-sm mb-3 line-clamp-2">${quest.description}</p>
      
      ${quest.status === 'active' ? `
        <div class="flex items-center justify-between">
          <span class="text-white/50 text-xs">Progress</span>
          <div class="flex items-center gap-2">
            <div class="progress-bar w-20">
              <div class="progress-bar-fill bg-orange-500" style="width: ${quest.progress}%"></div>
            </div>
            <span class="text-white/70 text-xs">${quest.progress}%</span>
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');
}

function generateAvailableQuests(): string {
  const availableQuests = [
    { name: "Bandit Cleanup", type: "side", level: "20", location: "Forest Path", giver: "Village Elder" },
    { name: "Ancient Runes", type: "main", level: "50", location: "Mystic Library", giver: "Archmage" },
    { name: "Supply Run", type: "daily", level: "15", location: "Trading Post", giver: "Merchant" },
    { name: "Guild Tournament", type: "guild", level: "40", location: "Arena", giver: "Tournament Master" }
  ];

  return availableQuests.map(quest => `
    <div class="bg-black/20 border border-white/10 rounded-lg p-3 hover:bg-black/30 transition-all duration-200 cursor-pointer">
      <div class="flex items-center justify-between mb-2">
        <h5 class="text-white font-medium">${quest.name}</h5>
        <span class="text-white/50 text-xs">Level ${quest.level}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="text-white/70 capitalize">${quest.type} Quest</span>
        <span class="text-blue-400">${quest.location}</span>
      </div>
      <div class="mt-2 pt-2 border-t border-white/10">
        <span class="text-white/60 text-xs">Quest Giver: ${quest.giver}</span>
      </div>
    </div>
  `).join('');
}

// Initialize quest functionality - can be called after content is loaded
export function initializeQuests() {
  console.log('📜 Initializing quest functionality...');
  
  // Search functionality
  const searchInput = document.getElementById('quest-search');
  if (searchInput) {
    searchInput.addEventListener('input', handleQuestSearch);
    console.log('📜 Search functionality initialized');
  }

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', handleQuestFilter);
    });
    console.log(`📜 Filter functionality initialized (${filterBtns.length} buttons)`);
  }

  // Sort functionality
  const sortSelect = document.getElementById('quest-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleQuestSort);
    console.log('📜 Sort functionality initialized');
  }

  // Quest interaction
  const questItems = document.querySelectorAll('.quest-item');
  console.log(`📜 Found ${questItems.length} quest items`);
  
  if (questItems.length > 0) {
    questItems.forEach(item => {
      item.addEventListener('click', handleQuestClick);
    });
    console.log('📜 Quest interaction events attached');
  }

  // Button functionality
  const searchQuestBtn = document.getElementById('search-quest-btn');
  const trackQuestBtn = document.getElementById('track-quest-btn');
  const abandonQuestBtn = document.getElementById('abandon-quest-btn');
  const shareQuestBtn = document.getElementById('share-quest-btn');

  if (searchQuestBtn) {
    searchQuestBtn.addEventListener('click', () => {
      console.log('📜 Opening quest search modal...');
      showQuestSearchModal();
    });
  }

  if (trackQuestBtn) {
    trackQuestBtn.addEventListener('click', () => {
      if (selectedQuest) {
        console.log('📜 Tracking quest:', selectedQuest.dataset.questName);
      } else {
        alert('Please select a quest to track');
      }
    });
  }

  if (abandonQuestBtn) {
    abandonQuestBtn.addEventListener('click', () => {
      if (selectedQuest) {
        const questName = selectedQuest.dataset.questName;
        if (confirm(`Are you sure you want to abandon "${questName}"?`)) {
          console.log('📜 Abandoning quest:', questName);
        }
      } else {
        alert('Please select a quest to abandon');
      }
    });
  }

  if (shareQuestBtn) {
    shareQuestBtn.addEventListener('click', () => {
      if (selectedQuest) {
        console.log('📜 Sharing quest:', selectedQuest.dataset.questName);
      } else {
        alert('Please select a quest to share');
      }
    });
  }

  // Modal functionality
  const modal = document.getElementById('quest-search-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  if (modal && closeModalBtns.length > 0) {
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', hideQuestSearchModal);
    });
    console.log('📜 Modal functionality initialized');
  }
  
  console.log('📜 Quest initialization complete');
}

// Global variable for quest state
let selectedQuest: HTMLElement | null = null;

function showQuestSearchModal() {
  const modal = document.getElementById('quest-search-modal');
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  }
}

function hideQuestSearchModal() {
  const modal = document.getElementById('quest-search-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
  }
}

function handleQuestSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const searchTerm = target.value.toLowerCase();
  const items = document.querySelectorAll('.quest-item');
  
  items.forEach(item => {
    const itemElement = item as HTMLElement;
    const questName = itemElement.dataset.questName?.toLowerCase() || '';
    const questType = itemElement.dataset.questType?.toLowerCase() || '';
    const questLocation = itemElement.dataset.questLocation?.toLowerCase() || '';
    
    if (questName.includes(searchTerm) || questType.includes(searchTerm) || questLocation.includes(searchTerm)) {
      itemElement.style.display = 'block';
    } else {
      itemElement.style.display = 'none';
    }
  });
}

function handleQuestFilter(event: Event) {
  const target = event.target as HTMLElement;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');
  
  const filter = target.dataset.filter;
  const items = document.querySelectorAll('.quest-item');
  
  items.forEach(item => {
    const itemElement = item as HTMLElement;
    const questStatus = itemElement.dataset.questStatus;
    const questType = itemElement.dataset.questType;
    
    if (filter === 'active' && questStatus === 'active') {
      itemElement.style.display = 'block';
    } else if (filter === 'completed' && questStatus === 'completed') {
      itemElement.style.display = 'block';
    } else if (filter === 'failed' && questStatus === 'failed') {
      itemElement.style.display = 'block';
    } else if (filter === 'main' && questType === 'main') {
      itemElement.style.display = 'block';
    } else if (filter === 'side' && questType === 'side') {
      itemElement.style.display = 'block';
    } else if (filter === 'daily' && questType === 'daily') {
      itemElement.style.display = 'block';
    } else if (filter === 'guild' && questType === 'guild') {
      itemElement.style.display = 'block';
    } else {
      itemElement.style.display = 'none';
    }
  });
}

function handleQuestSort(event: Event) {
  const target = event.target as HTMLSelectElement;
  const sortBy = target.value;
  const container = document.getElementById('quest-list');
  if (!container) return;
  
  const items = Array.from(container.querySelectorAll('.quest-item')) as HTMLElement[];
  
  items.sort((a, b) => {
    const aValue = getQuestSortValue(a, sortBy);
    const bValue = getQuestSortValue(b, sortBy);
    return aValue.localeCompare(bValue);
  });
  
  // Re-append sorted items
  items.forEach(item => container.appendChild(item));
}

function getQuestSortValue(item: HTMLElement, sortBy: string): string {
  switch (sortBy) {
    case 'name':
      return item.dataset.questName || '';
    case 'level':
      return item.dataset.questLevel || '';
    case 'type':
      return item.dataset.questType || '';
    case 'location':
      return item.dataset.questLocation || '';
    case 'progress':
      return item.dataset.questProgress || '';
    default:
      return item.dataset.questName || '';
  }
}

function handleQuestClick(event: Event) {
  const item = event.currentTarget as HTMLElement;
  console.log('📜 Quest clicked:', item.dataset.questName);
  
  // Remove active class from all items
  document.querySelectorAll('.quest-item').forEach(i => i.classList.remove('active'));
  
  // Add active class to clicked item
  item.classList.add('active');
  
  // Show quest details
  showQuestDetails(item);
  selectedQuest = item;
}

function showQuestDetails(item: HTMLElement) {
  console.log('🔍 Showing quest details for:', item.dataset.questName);
  
  const panel = document.getElementById('quest-details-panel');
  if (!panel) return;
  
  const questData = {
    name: item.dataset.questName || 'Unknown Quest',
    type: item.dataset.questType || 'side',
    status: item.dataset.questStatus || 'active',
    level: item.dataset.questLevel || '1',
    location: item.dataset.questLocation || 'Unknown',
    giver: item.dataset.questGiver || 'Unknown',
    description: item.dataset.questDescription || 'No description available.',
    objectives: JSON.parse(item.dataset.questObjectives || '[]'),
    rewards: JSON.parse(item.dataset.questRewards || '{}'),
    progress: item.dataset.questProgress || '0'
  };
  
  panel.innerHTML = generateQuestDetailsContent(questData);
}

function generateQuestDetailsContent(quest: any): string {
  const typeColors: { [key: string]: string } = {
    main: '#F59E0B',
    side: '#3B82F6',
    daily: '#22C55E',
    guild: '#8B5CF6',
    failed: '#EF4444'
  };

  const typeIcons: { [key: string]: string } = {
    main: '⭐',
    side: '📋',
    daily: '🔄',
    guild: '🏰',
    failed: '❌'
  };
  
  return \`
    <div class="space-y-4">
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: \${typeColors[quest.type] || typeColors.side}">
          <span>\${typeIcons[quest.type] || '📋'}</span>
        </div>
        <h3 class="font-bold text-xl mb-1" style="color: \${typeColors[quest.type] || typeColors.side}">\${quest.name}</h3>
        <p class="text-white/70 text-sm capitalize">\${quest.type} Quest • Level \${quest.level}</p>
        <p class="text-white/50 text-xs">\${quest.location} • \${quest.giver}</p>
      </div>

      <div class="bg-black/20 border border-white/10 rounded-lg p-3">
        <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
        <p class="text-white/80 text-sm leading-relaxed">\${quest.description}</p>
      </div>

      \${quest.objectives && quest.objectives.length > 0 ? \`
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Objectives</h4>
          <div class="space-y-2">
            \${quest.objectives.map((obj: any) => \`
              <div class="flex items-start gap-2">
                <div class="w-4 h-4 mt-0.5 rounded border-2 \${obj.completed ? 'bg-green-500 border-green-500' : 'border-white/30'} flex items-center justify-center">
                  \${obj.completed ? '<span class="text-white text-xs">✓</span>' : ''}
                </div>
                <div class="flex-1">
                  <span class="text-white/80 text-sm \${obj.completed ? 'line-through' : ''}">\${obj.description}</span>
                  \${obj.current !== undefined ? \`
                    <div class="text-white/50 text-xs mt-1">\${obj.current}/\${obj.required}</div>
                  \` : ''}
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      \` : ''}

      \${quest.rewards && Object.keys(quest.rewards).length > 0 ? \`
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Rewards</h4>
          <div class="space-y-2">
            \${quest.rewards.xp ? \`
              <div class="flex justify-between items-center">
                <span class="text-white/70 text-sm">Experience</span>
                <span class="text-blue-400 font-bold">+\${quest.rewards.xp} XP</span>
              </div>
            \` : ''}
            \${quest.rewards.gold ? \`
              <div class="flex justify-between items-center">
                <span class="text-white/70 text-sm">Gold</span>
                <span class="text-yellow-400 font-bold">+\${quest.rewards.gold}g</span>
              </div>
            \` : ''}
            \${quest.rewards.items ? \`
              <div class="space-y-1">
                <span class="text-white/70 text-sm">Items:</span>
                \${quest.rewards.items.map((item: string) => \`
                  <div class="text-blue-400 text-sm ml-4">• \${item}</div>
                \`).join('')}
              </div>
            \` : ''}
          </div>
        </div>
      \` : ''}

      \${quest.status === 'active' ? \`
        <div class="space-y-2">
          <button class="w-full px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            📍 Track Quest
          </button>
          <button class="w-full px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            📤 Share Quest
          </button>
          <button class="w-full px-4 py-2 bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-400 hover:to-red-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            ❌ Abandon Quest
          </button>
        </div>
      \` : ''}
    </div>
  \`;
} 