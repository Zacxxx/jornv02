export function createResearchContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Research Focus & Navigation -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Research Header -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-purple-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-purple-300">
                  <path d="M9 11H1v3h8v3l3-3.5L9 10v1z"/>
                  <path d="M22 12h-6"/>
                  <path d="M16 16h6"/>
                  <path d="M16 8h6"/>
                  <circle cx="9" cy="9" r="2"/>
                </svg>
              </div>
              <h2 class="text-purple-200 text-lg font-bold uppercase tracking-wider">Research Laboratory</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Research Points -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">1,247</span>
                <span class="text-white/70 text-xs">research pts</span>
              </div>
              <!-- Active Projects -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">3/5</span>
                <span class="text-white/70 text-xs">active</span>
              </div>
            </div>
          </div>

          <!-- Research Focus Tabs -->
          <div class="flex gap-2 mb-4">
            <button class="research-focus-btn active px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" data-focus="overview">
              📊 Research Overview
            </button>
            <button class="research-focus-btn px-3 py-2 bg-black/30 border border-white/20 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-focus="components">
              🔬 Components
            </button>
            <button class="research-focus-btn px-3 py-2 bg-black/30 border border-white/20 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-focus="areas">
              🗺️ Areas
            </button>
            <button class="research-focus-btn px-3 py-2 bg-black/30 border border-white/20 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-focus="quests">
              📜 Quests
            </button>
            <button class="research-focus-btn px-3 py-2 bg-black/30 border border-white/20 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-focus="recipes">
              📖 Recipes
            </button>
          </div>

          <!-- Search Bar -->
          <div class="flex gap-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search research projects..." 
                class="w-full px-4 py-2 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                id="research-search"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            
            <select class="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-400/50 focus:outline-none cursor-pointer" id="research-sort">
              <option value="progress">Sort by Progress</option>
              <option value="name">Sort by Name</option>
              <option value="cost">Sort by Cost</option>
              <option value="time">Sort by Time</option>
            </select>
          </div>
        </div>

        <!-- Research Content Area -->
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="research-content-area">
          ${generateResearchOverview()}
        </div>
      </div>

      <!-- Right Panel: Research Details -->
      <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Research Details</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="research-details-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 11H1v3h8v3l3-3.5L9 10v1z"/>
                <path d="M22 12h-6"/>
                <path d="M16 16h6"/>
                <path d="M16 8h6"/>
              </svg>
            </div>
            <p class="text-sm">Select research to view details</p>
          </div>
        </div>
      </div>

      <!-- New Research Modal -->
      <div id="new-research-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-all duration-300">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/20 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white text-xl font-bold">New Research Project</h3>
                <button class="close-modal w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-6" id="new-research-content">
                ${generateNewResearchContent()}
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
        background: rgba(147, 51, 234, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(147, 51, 234, 0.8);
      }

      .research-item {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      .research-item:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(147, 51, 234, 0.2);
      }
      
      .research-item.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        background: rgba(59, 130, 246, 0.05) !important;
      }

      .research-focus-btn.active {
        background: linear-gradient(to right, rgba(147, 51, 234, 0.8), rgba(126, 34, 206, 0.8)) !important;
        border-color: rgba(147, 51, 234, 0.6) !important;
        color: white !important;
      }

      .progress-bar {
        height: 8px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.3s ease;
      }

      .research-category-components { border-left: 4px solid #8B5CF6; }
      .research-category-areas { border-left: 4px solid #10B981; }
      .research-category-quests { border-left: 4px solid #F59E0B; }
      .research-category-recipes { border-left: 4px solid #EF4444; }

      .difficulty-trivial { color: #9CA3AF; }
      .difficulty-easy { color: #22C55E; }
      .difficulty-medium { color: #F59E0B; }
      .difficulty-hard { color: #EF4444; }
      .difficulty-extreme { color: #A855F7; }

      .rarity-common { border-color: rgba(156, 163, 175, 0.6); }
      .rarity-uncommon { border-color: rgba(34, 197, 94, 0.6); }
      .rarity-rare { border-color: rgba(59, 130, 246, 0.6); }
      .rarity-epic { border-color: rgba(168, 85, 247, 0.6); }
      .rarity-legendary { border-color: rgba(245, 158, 11, 0.6); }
    </style>
  `;
}

function generateResearchOverview(): string {
  const activeResearch = [
    {
      name: "Elemental Fusion",
      category: "components",
      progress: 75,
      difficulty: "medium",
      timeRemaining: "2h 30m",
      cost: 150,
      description: "Research advanced elemental combination techniques for spell crafting",
      requirements: ["Fire Essence", "Water Essence"],
      rewards: ["Elemental Fusion Component", "+50 Research Points"]
    },
    {
      name: "Ancient Ruins Survey",
      category: "areas",
      progress: 45,
      difficulty: "hard",
      timeRemaining: "6h 15m",
      cost: 200,
      description: "Investigate ancient ruins for new exploration areas",
      requirements: ["Survey Equipment", "Ancient Map"],
      rewards: ["Ruins of Eldoria Access", "Ancient Artifact"]
    },
    {
      name: "Dragon Scale Armor",
      category: "recipes",
      progress: 90,
      difficulty: "extreme",
      timeRemaining: "45m",
      cost: 500,
      description: "Develop advanced armor crafting techniques using dragon scales",
      requirements: ["Dragon Scale", "Master Blacksmithing"],
      rewards: ["Dragon Scale Armor Recipe", "Legendary Crafting Unlock"]
    }
  ];

  const completedResearch = [
    {
      name: "Basic Alchemy",
      category: "components",
      difficulty: "easy",
      description: "Fundamental alchemical research for basic potion crafting",
      rewards: ["Health Potion Component", "Mana Potion Component"]
    },
    {
      name: "Goblin Camp Investigation",
      category: "quests",
      difficulty: "trivial",
      description: "Research goblin behavior patterns for quest opportunities",
      rewards: ["Goblin Raid Quest", "Tribal Diplomacy Quest"]
    }
  ];

  return `
    <div class="space-y-6">
      <!-- Active Research Section -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-white text-lg font-bold">Active Research</h3>
          <button class="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="new-research-btn">
            + New Research
          </button>
        </div>
        
        <div class="grid grid-cols-1 gap-4">
          ${activeResearch.map(research => `
            <div class="research-item research-category-${research.category} bg-black/30 border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-black/40 transition-all duration-200" 
                 data-research-name="${research.name}"
                 data-research-category="${research.category}"
                 data-research-progress="${research.progress}"
                 data-research-difficulty="${research.difficulty}"
                 data-research-time="${research.timeRemaining}"
                 data-research-cost="${research.cost}"
                 data-research-description="${research.description}"
                 data-research-requirements='${JSON.stringify(research.requirements)}'
                 data-research-rewards='${JSON.stringify(research.rewards)}'>
              
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h4 class="text-white font-semibold text-base mb-1">${research.name}</h4>
                  <div class="flex items-center gap-3 text-sm text-white/70 mb-2">
                    <span class="capitalize">${research.category}</span>
                    <span>•</span>
                    <span class="difficulty-${research.difficulty} capitalize">${research.difficulty}</span>
                    <span>•</span>
                    <span>${research.cost} essence</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-white/80 text-sm font-medium mb-1">${research.progress}%</div>
                  <div class="text-white/60 text-xs">${research.timeRemaining}</div>
                </div>
              </div>
              
              <p class="text-white/60 text-sm mb-3 line-clamp-2">${research.description}</p>
              
              <div class="progress-bar mb-3">
                <div class="progress-bar-fill bg-purple-500" style="width: ${research.progress}%"></div>
              </div>
              
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2 text-white/50">
                  <span>Requirements:</span>
                  <span class="text-blue-400">${research.requirements.join(', ')}</span>
                </div>
                <button class="px-2 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs rounded transition-all duration-200">
                  Cancel
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Completed Research Section -->
      <div>
        <h3 class="text-white text-lg font-bold mb-4">Completed Research</h3>
        
        <div class="grid grid-cols-2 gap-4">
          ${completedResearch.map(research => `
            <div class="research-item research-category-${research.category} bg-black/20 border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-black/30 transition-all duration-200" 
                 data-research-name="${research.name}"
                 data-research-category="${research.category}"
                 data-research-difficulty="${research.difficulty}"
                 data-research-description="${research.description}"
                 data-research-rewards='${JSON.stringify(research.rewards)}'>
              
              <div class="flex items-start justify-between mb-2">
                <h4 class="text-white font-semibold text-sm">${research.name}</h4>
                <div class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
              </div>
              
              <div class="flex items-center gap-2 text-xs text-white/70 mb-2">
                <span class="capitalize">${research.category}</span>
                <span>•</span>
                <span class="difficulty-${research.difficulty} capitalize">${research.difficulty}</span>
              </div>
              
              <p class="text-white/60 text-xs line-clamp-2">${research.description}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Research Stats -->
      <div class="bg-black/20 border border-white/10 rounded-lg p-4">
        <h3 class="text-white text-lg font-bold mb-4">Research Statistics</h3>
        
        <div class="grid grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-400 mb-1">15</div>
            <div class="text-white/60 text-xs">Total Projects</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-400 mb-1">12</div>
            <div class="text-white/60 text-xs">Completed</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-400 mb-1">3</div>
            <div class="text-white/60 text-xs">Active</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-400 mb-1">2,450</div>
            <div class="text-white/60 text-xs">Total Points</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function generateNewResearchContent(): string {
  return `
    <div class="space-y-6">
      <!-- Research Type Selection -->
      <div>
        <h4 class="text-white font-semibold mb-3">Research Focus</h4>
        <div class="grid grid-cols-2 gap-3">
          <button class="research-type-btn active bg-purple-500/20 border-2 border-purple-500/50 rounded-lg p-4 text-left hover:bg-purple-500/30 transition-all duration-200" data-type="components">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                <span class="text-lg">🔬</span>
              </div>
              <h5 class="text-white font-medium">Components</h5>
            </div>
            <p class="text-white/70 text-sm">Research new components for crafting spells, enchantments, and abilities</p>
          </button>
          
          <button class="research-type-btn bg-black/20 border border-white/20 rounded-lg p-4 text-left hover:bg-white/10 transition-all duration-200" data-type="areas">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
                <span class="text-lg">🗺️</span>
              </div>
              <h5 class="text-white/70 font-medium">Areas</h5>
            </div>
            <p class="text-white/50 text-sm">Discover new areas and locations to explore</p>
          </button>
          
          <button class="research-type-btn bg-black/20 border border-white/20 rounded-lg p-4 text-left hover:bg-white/10 transition-all duration-200" data-type="quests">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center">
                <span class="text-lg">📜</span>
              </div>
              <h5 class="text-white/70 font-medium">Quests</h5>
            </div>
            <p class="text-white/50 text-sm">Research new quest opportunities and storylines</p>
          </button>
          
          <button class="research-type-btn bg-black/20 border border-white/20 rounded-lg p-4 text-left hover:bg-white/10 transition-all duration-200" data-type="recipes">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 bg-red-500/30 rounded-lg flex items-center justify-center">
                <span class="text-lg">📖</span>
              </div>
              <h5 class="text-white/70 font-medium">Recipes</h5>
            </div>
            <p class="text-white/50 text-sm">Unlock new crafting recipes and techniques</p>
          </button>
        </div>
      </div>

      <!-- Default Options -->
      <div id="default-options">
        <h4 class="text-white font-semibold mb-3">Suggested Research</h4>
        <div class="space-y-2">
          ${generateDefaultOptions('components')}
        </div>
      </div>

      <!-- Custom Research -->
      <div class="bg-black/20 border border-white/10 rounded-lg p-4">
        <h4 class="text-white font-semibold mb-3">Custom Research</h4>
        
        <div class="space-y-4">
          <div>
            <label class="block text-white/70 text-sm font-medium mb-2">Research Objective</label>
            <textarea 
              class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/20 resize-none"
              rows="3"
              placeholder="Describe what you want to research..."
              id="research-objective"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-white/70 text-sm font-medium mb-2">Difficulty Level</label>
              <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-400/50 focus:outline-none" id="research-difficulty">
                <option value="trivial">Trivial (10 essence)</option>
                <option value="easy">Easy (25 essence)</option>
                <option value="medium" selected>Medium (50 essence)</option>
                <option value="hard">Hard (100 essence)</option>
                <option value="extreme">Extreme (250 essence)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-white/70 text-sm font-medium mb-2">Based On (Optional)</label>
              <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-purple-400/50 focus:outline-none" id="research-base">
                <option value="">Select base item...</option>
                <option value="fire-essence">Fire Essence</option>
                <option value="ancient-scroll">Ancient Scroll</option>
                <option value="dragon-scale">Dragon Scale</option>
                <option value="mystic-crystal">Mystic Crystal</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-white/70 text-sm font-medium mb-2">Related Components</label>
            <div class="grid grid-cols-3 gap-2">
              ${generateRelatedComponents('components')}
            </div>
          </div>
        </div>
      </div>

      <!-- Saved Prompts -->
      <div class="bg-black/20 border border-white/10 rounded-lg p-4">
        <h4 class="text-white font-semibold mb-3">Saved Research Prompts</h4>
        
        <div class="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
          <div class="flex items-center justify-between bg-black/30 border border-white/10 rounded p-2">
            <span class="text-white/80 text-sm">Advanced Elemental Combinations</span>
            <button class="px-2 py-1 bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 text-xs rounded transition-all duration-200">
              Load
            </button>
          </div>
          
          <div class="flex items-center justify-between bg-black/30 border border-white/10 rounded p-2">
            <span class="text-white/80 text-sm">Rare Material Synthesis</span>
            <button class="px-2 py-1 bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 text-xs rounded transition-all duration-200">
              Load
            </button>
          </div>
        </div>
        
        <button class="w-full mt-3 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 text-sm rounded-lg transition-all duration-200">
          Save Current Prompt
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4 border-t border-white/10">
        <button class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105" id="start-research-btn">
          Start Research
        </button>
        <button class="px-4 py-2 bg-gray-500/20 hover:bg-gray-500/40 text-gray-400 rounded-lg transition-all duration-200">
          Cancel
        </button>
      </div>
    </div>
  `;
}

function generateDefaultOptions(type: string): string {
  const options: { [key: string]: Array<{ name: string; cost: number; time: string; description: string }> } = {
    components: [
      { name: "Basic Essence Extraction", cost: 25, time: "1h", description: "Learn to extract basic magical essences from common materials" },
      { name: "Elemental Binding", cost: 50, time: "2h", description: "Research techniques for binding elemental forces to objects" },
      { name: "Mystic Infusion", cost: 75, time: "3h", description: "Advanced infusion techniques for enhanced magical properties" }
    ],
    areas: [
      { name: "Forest Survey", cost: 30, time: "2h", description: "Survey nearby forests for new exploration opportunities" },
      { name: "Mountain Expedition", cost: 60, time: "4h", description: "Plan expedition routes through dangerous mountain passes" },
      { name: "Ancient Site Investigation", cost: 100, time: "6h", description: "Investigate rumors of ancient sites and forgotten ruins" }
    ],
    quests: [
      { name: "Local Rumors", cost: 20, time: "30m", description: "Investigate local rumors and gossip for quest opportunities" },
      { name: "Guild Contracts", cost: 40, time: "1h", description: "Research available guild contracts and bounties" },
      { name: "Ancient Prophecies", cost: 80, time: "3h", description: "Study ancient texts for prophetic quest lines" }
    ],
    recipes: [
      { name: "Basic Crafting", cost: 35, time: "1h", description: "Research basic crafting techniques and material combinations" },
      { name: "Advanced Techniques", cost: 70, time: "3h", description: "Develop advanced crafting methods and rare material usage" },
      { name: "Masterwork Creation", cost: 150, time: "6h", description: "Research legendary crafting techniques used by masters" }
    ]
  };

  return (options[type] || options.components).map(option => `
    <div class="flex items-center justify-between bg-black/30 border border-white/10 rounded-lg p-3 hover:bg-black/40 transition-all duration-200 cursor-pointer default-option" data-option="${option.name}">
      <div class="flex-1">
        <h5 class="text-white font-medium text-sm mb-1">${option.name}</h5>
        <p class="text-white/60 text-xs">${option.description}</p>
      </div>
      <div class="text-right">
        <div class="text-purple-400 font-bold text-sm">${option.cost} essence</div>
        <div class="text-white/50 text-xs">${option.time}</div>
      </div>
    </div>
  `).join('');
}

function generateRelatedComponents(type: string): string {
  const components: { [key: string]: string[] } = {
    components: ["Fire Essence", "Water Crystal", "Earth Shard", "Air Wisp", "Shadow Dust", "Light Fragment"],
    areas: ["Ancient Map", "Survey Tools", "Climbing Gear", "Navigation Compass", "Exploration Kit", "Safety Rope"],
    quests: ["Quest Journal", "Information Network", "Guild Contacts", "Local Influence", "Investigation Skills", "Reputation"],
    recipes: ["Crafting Tools", "Material Knowledge", "Technique Manual", "Master's Notes", "Rare Components", "Quality Materials"]
  };

  return (components[type] || components.components).map(component => `
    <label class="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" class="w-4 h-4 text-purple-500 bg-black/40 border-white/20 rounded focus:ring-purple-500/20">
      <span class="text-white/70 text-sm">${component}</span>
    </label>
  `).join('');
}

// Global variables for research state
let currentResearchFocus: string = 'overview';

// Initialize research functionality - can be called after content is loaded
export function initializeResearch() {
  console.log('🔬 Initializing research functionality...');
  
  // Search functionality
  const searchInput = document.getElementById('research-search');
  if (searchInput) {
    searchInput.addEventListener('input', handleResearchSearch);
    console.log('🔬 Search functionality initialized');
  }

  // Sort functionality
  const sortSelect = document.getElementById('research-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleResearchSort);
    console.log('🔬 Sort functionality initialized');
  }

  // Research focus switching
  const focusBtns = document.querySelectorAll('.research-focus-btn');
  if (focusBtns.length > 0) {
    focusBtns.forEach(btn => {
      btn.addEventListener('click', handleResearchFocusSwitch);
    });
    console.log(`🔬 Focus switching initialized (${focusBtns.length} buttons)`);
  }

  // Research item interaction
  const researchItems = document.querySelectorAll('.research-item');
  console.log(`🔬 Found ${researchItems.length} research items`);
  
  if (researchItems.length > 0) {
    researchItems.forEach(item => {
      item.addEventListener('click', handleResearchClick);
      item.addEventListener('mouseenter', handleResearchHover);
      item.addEventListener('mouseleave', handleResearchLeave);
    });
    console.log('🔬 Research interaction events attached');
  }

  // New research button
  const newResearchBtn = document.getElementById('new-research-btn');
  if (newResearchBtn) {
    newResearchBtn.addEventListener('click', showNewResearchModal);
    console.log('🔬 New research button initialized');
  }

  // Modal functionality
  const modal = document.getElementById('new-research-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  if (modal && closeModalBtns.length > 0) {
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', hideNewResearchModal);
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideNewResearchModal();
      }
    });
    console.log('🔬 Modal functionality initialized');
  }

  // Research type buttons in modal
  const researchTypeBtns = document.querySelectorAll('.research-type-btn');
  if (researchTypeBtns.length > 0) {
    researchTypeBtns.forEach(btn => {
      btn.addEventListener('click', handleResearchTypeSelection);
    });
    console.log('🔬 Research type selection initialized');
  }

  // Default option selection
  const defaultOptions = document.querySelectorAll('.default-option');
  if (defaultOptions.length > 0) {
    defaultOptions.forEach(option => {
      option.addEventListener('click', handleDefaultOptionSelection);
    });
    console.log('🔬 Default options initialized');
  }

  // Start research button
  const startResearchBtn = document.getElementById('start-research-btn');
  if (startResearchBtn) {
    startResearchBtn.addEventListener('click', handleStartResearch);
    console.log('🔬 Start research button initialized');
  }

  console.log('🔬 Research initialization complete');
}

function handleResearchSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const searchTerm = target.value.toLowerCase();
  const items = document.querySelectorAll('.research-item');
  
  items.forEach(item => {
    const itemElement = item as HTMLElement;
    const researchName = itemElement.dataset.researchName?.toLowerCase() || '';
    const researchCategory = itemElement.dataset.researchCategory?.toLowerCase() || '';
    const researchDescription = itemElement.dataset.researchDescription?.toLowerCase() || '';
    
    if (researchName.includes(searchTerm) || researchCategory.includes(searchTerm) || researchDescription.includes(searchTerm)) {
      itemElement.style.display = 'block';
    } else {
      itemElement.style.display = 'none';
    }
  });
}

function handleResearchSort(event: Event) {
  const target = event.target as HTMLSelectElement;
  const sortBy = target.value;
  const contentArea = document.getElementById('research-content-area');
  if (!contentArea) return;
  
  const items = Array.from(contentArea.querySelectorAll('.research-item')) as HTMLElement[];
  
  items.sort((a, b) => {
    const aValue = getResearchSortValue(a, sortBy);
    const bValue = getResearchSortValue(b, sortBy);
    
    if (sortBy === 'progress' || sortBy === 'cost') {
      return parseInt(bValue) - parseInt(aValue); // Descending for numbers
    }
    return aValue.localeCompare(bValue); // Ascending for strings
  });
  
  // Re-append sorted items to their respective containers
  const activeSection = contentArea.querySelector('.grid.grid-cols-1');
  const completedSection = contentArea.querySelector('.grid.grid-cols-2');
  
  items.forEach(item => {
    if (item.dataset.researchProgress) {
      // Active research item
      if (activeSection) activeSection.appendChild(item);
    } else {
      // Completed research item
      if (completedSection) completedSection.appendChild(item);
    }
  });
}

function getResearchSortValue(item: HTMLElement, sortBy: string): string {
  switch (sortBy) {
    case 'name':
      return item.dataset.researchName || '';
    case 'progress':
      return item.dataset.researchProgress || '100'; // Completed items get 100%
    case 'cost':
      return item.dataset.researchCost || '0';
    case 'time':
      return item.dataset.researchTime || '';
    default:
      return item.dataset.researchName || '';
  }
}

function handleResearchFocusSwitch(event: Event) {
  const target = event.target as HTMLElement;
  const focus = target.dataset.focus;
  
  if (!focus || focus === currentResearchFocus) return;
  
  console.log('🔬 Switching research focus to:', focus);
  
  // Update active button
  document.querySelectorAll('.research-focus-btn').forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');
  
  currentResearchFocus = focus;
  
  // Update content area
  const contentArea = document.getElementById('research-content-area');
  if (contentArea) {
    if (focus === 'overview') {
      contentArea.innerHTML = generateResearchOverview();
    } else {
      contentArea.innerHTML = generateFocusContent(focus);
    }
    
    // Re-initialize event listeners for new content
    setTimeout(() => {
      initializeContentEventListeners();
    }, 100);
  }
}

function generateFocusContent(focus: string): string {
  const focusData: { [key: string]: { icon: string; title: string; description: string; color: string } } = {
    components: {
      icon: '🔬',
      title: 'Component Research',
      description: 'Research new components for crafting spells, enchantments, traits, and abilities',
      color: 'purple'
    },
    areas: {
      icon: '🗺️',
      title: 'Area Discovery',
      description: 'Discover new areas and locations to explore and fight in',
      color: 'green'
    },
    quests: {
      icon: '📜',
      title: 'Quest Research',
      description: 'Research new quest opportunities and storylines',
      color: 'orange'
    },
    recipes: {
      icon: '📖',
      title: 'Recipe Development',
      description: 'Unlock new crafting recipes and techniques',
      color: 'red'
    }
  };

  const data = focusData[focus] || focusData.components;
  
  return `
    <div class="space-y-6">
      <!-- Focus Header -->
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-${data.color}-500/20 border-2 border-${data.color}-500/50 rounded-full flex items-center justify-center">
          <span class="text-3xl">${data.icon}</span>
        </div>
        <h3 class="text-white text-xl font-bold mb-2">${data.title}</h3>
        <p class="text-white/70 text-sm max-w-md mx-auto">${data.description}</p>
      </div>

      <!-- Quick Actions -->
      <div class="flex gap-3 justify-center">
        <button class="px-4 py-2 bg-gradient-to-r from-${data.color}-500/80 to-${data.color}-600/80 hover:from-${data.color}-400 hover:to-${data.color}-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="new-research-btn">
          + New ${data.title.split(' ')[0]} Research
        </button>
        <button class="px-4 py-2 bg-black/30 border border-white/20 text-white/70 text-sm font-medium rounded-lg hover:bg-white/10 transition-all duration-200">
          View ${data.title.split(' ')[0]} Library
        </button>
      </div>

      <!-- Focus-specific content -->
      <div class="bg-black/20 border border-white/10 rounded-lg p-6">
        <h4 class="text-white font-semibold mb-4">Available Research Options</h4>
        <div class="space-y-3">
          ${generateDefaultOptions(focus)}
        </div>
      </div>

      <!-- Research History for this focus -->
      <div class="bg-black/20 border border-white/10 rounded-lg p-6">
        <h4 class="text-white font-semibold mb-4">Recent ${data.title}</h4>
        <div class="text-center text-white/50 py-8">
          <p class="text-sm">No recent research in this category</p>
        </div>
      </div>
    </div>
  `;
}

function initializeContentEventListeners() {
  // Re-initialize research items
  const researchItems = document.querySelectorAll('.research-item');
  researchItems.forEach(item => {
    item.addEventListener('click', handleResearchClick);
    item.addEventListener('mouseenter', handleResearchHover);
    item.addEventListener('mouseleave', handleResearchLeave);
  });

  // Re-initialize new research button
  const newResearchBtn = document.getElementById('new-research-btn');
  if (newResearchBtn) {
    newResearchBtn.addEventListener('click', showNewResearchModal);
  }

  // Re-initialize default options
  const defaultOptions = document.querySelectorAll('.default-option');
  defaultOptions.forEach(option => {
    option.addEventListener('click', handleDefaultOptionSelection);
  });
}

function handleResearchClick(event: Event) {
  const item = event.currentTarget as HTMLElement;
  console.log('🔬 Research clicked:', item.dataset.researchName);
  
  // Remove active class from all items
  document.querySelectorAll('.research-item').forEach(i => i.classList.remove('active'));
  
  // Add active class to clicked item
  item.classList.add('active');
  
  // Show research details
  showResearchDetails(item);
}

function handleResearchHover(event: Event) {
  const item = event.currentTarget as HTMLElement;
  if (!item.classList.contains('active')) {
    item.style.transform = 'translateY(-1px)';
    item.style.boxShadow = '0 4px 12px rgba(147, 51, 234, 0.2)';
  }
}

function handleResearchLeave(event: Event) {
  const item = event.currentTarget as HTMLElement;
  if (!item.classList.contains('active')) {
    item.style.transform = '';
    item.style.boxShadow = '';
  }
}

function showResearchDetails(item: HTMLElement) {
  console.log('🔍 Showing research details for:', item.dataset.researchName);
  
  const panel = document.getElementById('research-details-panel');
  if (!panel) return;
  
  const researchData = {
    name: item.dataset.researchName || 'Unknown Research',
    category: item.dataset.researchCategory || 'misc',
    progress: item.dataset.researchProgress || null,
    difficulty: item.dataset.researchDifficulty || 'medium',
    time: item.dataset.researchTime || 'Unknown',
    cost: item.dataset.researchCost || '0',
    description: item.dataset.researchDescription || 'No description available.',
    requirements: JSON.parse(item.dataset.researchRequirements || '[]'),
    rewards: JSON.parse(item.dataset.researchRewards || '[]')
  };
  
  panel.innerHTML = generateResearchDetailsContent(researchData);
}

function generateResearchDetailsContent(research: any): string {
  const categoryColors: { [key: string]: string } = {
    components: '#8B5CF6',
    areas: '#10B981',
    quests: '#F59E0B',
    recipes: '#EF4444'
  };

  const categoryIcons: { [key: string]: string } = {
    components: '🔬',
    areas: '🗺️',
    quests: '📜',
    recipes: '📖'
  };

  const difficultyColors: { [key: string]: string } = {
    trivial: '#9CA3AF',
    easy: '#22C55E',
    medium: '#F59E0B',
    hard: '#EF4444',
    extreme: '#A855F7'
  };
  
  return `
    <div class="space-y-4">
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: ${categoryColors[research.category] || categoryColors.components}">
          <span>${categoryIcons[research.category] || '🔬'}</span>
        </div>
        <h3 class="font-bold text-xl mb-1" style="color: ${categoryColors[research.category] || categoryColors.components}">${research.name}</h3>
        <p class="text-white/70 text-sm capitalize">${research.category} Research</p>
        <p class="text-white/50 text-xs" style="color: ${difficultyColors[research.difficulty] || difficultyColors.medium}">${research.difficulty} difficulty • ${research.cost} essence</p>
      </div>

      ${research.progress ? `
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Progress</h4>
          <div class="flex justify-between items-center mb-2">
            <span class="text-white/70 text-sm">Completion</span>
            <span class="text-purple-400 font-bold">${research.progress}%</span>
          </div>
          <div class="w-full bg-black/30 rounded-full h-3">
            <div class="h-3 rounded-full bg-purple-500 transition-all duration-300" style="width: ${research.progress}%"></div>
          </div>
          <div class="text-center mt-2">
            <span class="text-white/60 text-xs">Time remaining: ${research.time}</span>
          </div>
        </div>
      ` : `
        <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
          <h4 class="text-green-400 font-semibold mb-2 text-sm uppercase tracking-wide">✅ Completed</h4>
          <p class="text-white/60 text-sm">This research has been completed successfully</p>
        </div>
      `}

      <div class="bg-black/20 border border-white/10 rounded-lg p-3">
        <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
        <p class="text-white/80 text-sm leading-relaxed">${research.description}</p>
      </div>

      ${research.requirements.length > 0 ? `
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Requirements</h4>
          <div class="space-y-1">
            ${research.requirements.map((req: string) => `
              <div class="text-blue-400 text-sm">• ${req}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${research.rewards.length > 0 ? `
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Rewards</h4>
          <div class="space-y-1">
            ${research.rewards.map((reward: string) => `
              <div class="text-green-400 text-sm">• ${reward}</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="space-y-2">
        ${research.progress ? `
          <button class="w-full px-4 py-2 bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-400 hover:to-red-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            Cancel Research
          </button>
          <button class="w-full px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            Speed Up Research
          </button>
        ` : `
          <button class="w-full px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            Research Again
          </button>
          <button class="w-full px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            View Rewards
          </button>
        `}
        <button class="w-full px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
          ⭐ Bookmark Research
        </button>
      </div>
    </div>
  `;
}

function showNewResearchModal() {
  const modal = document.getElementById('new-research-modal');
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  }
}

function hideNewResearchModal() {
  const modal = document.getElementById('new-research-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
  }
}

function handleResearchTypeSelection(event: Event) {
  const target = event.target as HTMLElement;
  const button = target.closest('.research-type-btn') as HTMLElement;
  if (!button) return;
  
  const type = button.dataset.type;
  console.log('🔬 Research type selected:', type);
  
  // Update active state
  document.querySelectorAll('.research-type-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('bg-black/20', 'border-white/20');
    btn.classList.remove('bg-purple-500/20', 'border-purple-500/50');
  });
  
  button.classList.add('active');
  button.classList.remove('bg-black/20', 'border-white/20');
  button.classList.add('bg-purple-500/20', 'border-purple-500/50');
  
  // Update default options
  const defaultOptionsContainer = document.getElementById('default-options');
  if (defaultOptionsContainer && type) {
    const optionsDiv = defaultOptionsContainer.querySelector('.space-y-2');
    if (optionsDiv) {
      optionsDiv.innerHTML = generateDefaultOptions(type);
      
      // Re-initialize event listeners for new options
      setTimeout(() => {
        const newOptions = optionsDiv.querySelectorAll('.default-option');
        newOptions.forEach(option => {
          option.addEventListener('click', handleDefaultOptionSelection);
        });
      }, 100);
    }
  }
  
  // Update related components
  const relatedComponentsContainer = document.querySelector('.grid.grid-cols-3.gap-2');
  if (relatedComponentsContainer && type) {
    relatedComponentsContainer.innerHTML = generateRelatedComponents(type);
  }
}

function handleDefaultOptionSelection(event: Event) {
  const target = event.target as HTMLElement;
  const option = target.closest('.default-option') as HTMLElement;
  if (!option) return;
  
  const optionName = option.dataset.option;
  console.log('🔬 Default option selected:', optionName);
  
  // Update active state
  document.querySelectorAll('.default-option').forEach(opt => {
    opt.classList.remove('bg-purple-500/20', 'border-purple-500/50');
    opt.classList.add('bg-black/30', 'border-white/10');
  });
  
  option.classList.remove('bg-black/30', 'border-white/10');
  option.classList.add('bg-purple-500/20', 'border-purple-500/50');
  
  // Pre-fill research objective
  const objectiveTextarea = document.getElementById('research-objective') as HTMLTextAreaElement;
  if (objectiveTextarea) {
    objectiveTextarea.value = `Research: ${optionName}`;
  }
}

function handleStartResearch() {
  const objectiveTextarea = document.getElementById('research-objective') as HTMLTextAreaElement;
  const difficultySelect = document.getElementById('research-difficulty') as HTMLSelectElement;
  const baseSelect = document.getElementById('research-base') as HTMLSelectElement;
  
  const objective = objectiveTextarea?.value || '';
  const difficulty = difficultySelect?.value || 'medium';
  const baseItem = baseSelect?.value || '';
  
  if (!objective.trim()) {
    alert('Please enter a research objective');
    return;
  }
  
  console.log('🔬 Starting research:', {
    objective,
    difficulty,
    baseItem
  });
  
  // Here you would normally send the research request to the backend
  alert(`Research started: ${objective} (${difficulty} difficulty)`);
  
  hideNewResearchModal();
} 