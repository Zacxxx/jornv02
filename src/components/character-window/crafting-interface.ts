import './crafting-interface.css';

export function createCraftingContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Recipe Browser -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Crafting Header -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-amber-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-amber-500/30 to-amber-600/30 border border-amber-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-amber-300">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                </svg>
              </div>
              <h2 class="text-amber-200 text-lg font-bold uppercase tracking-wider">Crafting Station</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Crafting Level -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">Level 15</span>
                <span class="text-white/70 text-xs">crafting</span>
              </div>
              <!-- Known Recipes -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">47/120</span>
                <span class="text-white/70 text-xs">recipes</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 mb-4">
            <button class="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="search-recipe-btn">
              🔍 Search for Recipe
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="learn-recipe-btn">
              📚 Learn Recipe
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="auto-craft-btn">
              🤖 Auto Craft
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="craft-queue-btn">
              📋 Craft Queue
            </button>
          </div>

          <!-- Search and Filter Bar -->
          <div class="flex gap-3 mb-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search recipes..." 
                class="w-full px-4 py-2 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                id="recipe-search"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            
            <select class="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-amber-400/50 focus:outline-none cursor-pointer" id="recipe-sort">
              <option value="name">Sort by Name</option>
              <option value="level">Sort by Level</option>
              <option value="category">Sort by Category</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="materials">Sort by Materials</option>
            </select>

            <select class="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-amber-400/50 focus:outline-none cursor-pointer" id="recipe-filter">
              <option value="all">All Recipes</option>
              <option value="available">Can Craft</option>
              <option value="missing">Missing Materials</option>
              <option value="locked">Locked</option>
              <option value="favorited">Favorited</option>
            </select>
          </div>

          <!-- Filter Categories -->
          <div class="flex gap-2 flex-wrap">
            <button class="filter-btn active px-3 py-1.5 bg-gradient-to-r from-amber-500/80 to-amber-600/80 text-white text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105" data-filter="all">
              📚 All
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="weapons">
              ⚔️ Weapons
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="armor">
              🛡️ Armor
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="tools">
              🔧 Tools
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="consumables">
              🧪 Consumables
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="materials">
              💎 Materials
            </button>
          </div>
        </div>

        <!-- Recipe Grid Container -->
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-6 gap-4 max-w-full" id="recipe-grid">
            ${generateRecipeGrid()}
          </div>
        </div>
      </div>

      <!-- Right Panel: Crafting Station -->
      <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Crafting Station</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="crafting-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
              </svg>
            </div>
            <p class="text-sm">Select a recipe to start crafting</p>
          </div>
        </div>
      </div>

      <!-- Recipe Search Modal -->
      <div id="recipe-search-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-all duration-300">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/20 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white text-xl font-bold">Recipe Database</h3>
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
                    placeholder="Search all available recipes..." 
                    class="w-full px-4 py-3 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                    id="recipe-database-search"
                  />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                
                <div class="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scrollbar" id="available-recipes">
                  ${generateAvailableRecipes()}
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

      .recipe-card {
        aspect-ratio: 1;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        cursor: pointer;
      }
      
      .recipe-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
      }
      
      .recipe-card.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        background: rgba(59, 130, 246, 0.1) !important;
      }

      .recipe-available { border-color: rgba(34, 197, 94, 0.6); }
      .recipe-missing { border-color: rgba(245, 158, 11, 0.6); }
      .recipe-locked { border-color: rgba(156, 163, 175, 0.6); }

      .filter-btn.active {
        background: linear-gradient(to right, rgba(245, 158, 11, 0.8), rgba(217, 119, 6, 0.8)) !important;
        border-color: rgba(245, 158, 11, 0.6) !important;
        color: white !important;
      }

      .recipe-level {
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

      .recipe-status {
        position: absolute;
        bottom: 2px;
        right: 2px;
        font-size: 12px;
        font-weight: bold;
        padding: 1px 3px;
        border-radius: 3px;
        min-width: 14px;
        text-align: center;
      }

      .status-available {
        background: rgba(34, 197, 94, 0.8);
        color: white;
      }

      .status-missing {
        background: rgba(245, 158, 11, 0.8);
        color: white;
      }

      .status-locked {
        background: rgba(156, 163, 175, 0.8);
        color: white;
      }

      @keyframes craftingAnimation {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(180deg); box-shadow: 0 0 30px rgba(245, 158, 11, 0.6); }
        100% { transform: scale(1) rotate(360deg); }
      }

      .crafting-animation {
        animation: craftingAnimation 1s cubic-bezier(0.4, 0, 0.2, 1);
      }
    </style>
  `;
}

function generateRecipeGrid(): string {
  const sampleRecipes = [
    {
      name: "Iron Sword",
      category: "weapons" as const,
      level: "5",
      difficulty: "easy",
      status: "available",
      description: "A sturdy iron sword perfect for combat. Deals moderate damage and has good durability.",
      materials: [
        { name: "Iron Ingot", required: 3, current: 5, available: true },
        { name: "Wood Handle", required: 1, current: 2, available: true },
        { name: "Leather Wrap", required: 1, current: 1, available: true }
      ],
      result: { name: "Iron Sword", quantity: 1 }
    },
    {
      name: "Steel Armor",
      category: "armor" as const,
      level: "8",
      difficulty: "medium",
      status: "missing",
      description: "Heavy steel armor that provides excellent protection against physical attacks.",
      materials: [
        { name: "Steel Ingot", required: 5, current: 3, available: false },
        { name: "Leather", required: 2, current: 4, available: true },
        { name: "Chain Links", required: 10, current: 8, available: false }
      ],
      result: { name: "Steel Armor", quantity: 1 }
    },
    {
      name: "Health Potion",
      category: "consumables" as const,
      level: "2",
      difficulty: "easy",
      status: "available",
      description: "A magical potion that instantly restores health when consumed.",
      materials: [
        { name: "Red Herbs", required: 2, current: 10, available: true },
        { name: "Spring Water", required: 1, current: 5, available: true },
        { name: "Glass Vial", required: 1, current: 3, available: true }
      ],
      result: { name: "Health Potion", quantity: 3 }
    },
    {
      name: "Diamond Pickaxe",
      category: "tools" as const,
      level: "15",
      difficulty: "hard",
      status: "locked",
      description: "An incredibly durable pickaxe made from the finest diamonds. Can mine any material.",
      materials: [
        { name: "Diamond", required: 3, current: 0, available: false },
        { name: "Mythril Handle", required: 1, current: 0, available: false },
        { name: "Enchanted Binding", required: 1, current: 0, available: false }
      ],
      result: { name: "Diamond Pickaxe", quantity: 1 }
    },
    {
      name: "Mana Crystal",
      category: "materials" as const,
      level: "10",
      difficulty: "medium",
      status: "available",
      description: "A crystallized form of pure mana energy. Used in advanced magical crafting.",
      materials: [
        { name: "Raw Mana", required: 5, current: 8, available: true },
        { name: "Crystal Dust", required: 3, current: 4, available: true },
        { name: "Stabilizer", required: 1, current: 2, available: true }
      ],
      result: { name: "Mana Crystal", quantity: 2 }
    },
    {
      name: "Fire Enchantment",
      category: "materials" as const,
      level: "12",
      difficulty: "hard",
      status: "missing",
      description: "A powerful enchantment that adds fire damage to weapons and tools.",
      materials: [
        { name: "Fire Essence", required: 3, current: 1, available: false },
        { name: "Enchanting Scroll", required: 1, current: 0, available: false },
        { name: "Ruby Dust", required: 2, current: 3, available: true }
      ],
      result: { name: "Fire Enchantment", quantity: 1 }
    }
  ];

  let cards = '';
  
  for (let i = 0; i < 48; i++) {
    const hasRecipe = i < sampleRecipes.length;
    const recipe = hasRecipe ? sampleRecipes[i] : null;
    
    if (hasRecipe && recipe) {
      const categoryIcons = {
        weapons: '⚔️',
        armor: '🛡️',
        tools: '🔧',
        consumables: '🧪',
        materials: '💎'
      } as const;

      cards += `
        <div class="recipe-card recipe-${recipe.status} bg-black/40 border-2 rounded-lg cursor-pointer relative flex flex-col items-center justify-center p-3 hover:bg-black/60 transition-all duration-200" 
             data-recipe-name="${recipe.name}"
             data-recipe-category="${recipe.category}"
             data-recipe-level="${recipe.level}"
             data-recipe-difficulty="${recipe.difficulty}"
             data-recipe-status="${recipe.status}"
             data-recipe-description="${recipe.description}"
             data-recipe-materials='${JSON.stringify(recipe.materials)}'
             data-recipe-result='${JSON.stringify(recipe.result)}'>
          
          <div class="text-3xl mb-2 drop-shadow-lg">${categoryIcons[recipe.category]}</div>
          <div class="text-white text-sm font-medium text-center mb-1">${recipe.name}</div>
          <div class="text-white/60 text-xs capitalize">${recipe.category}</div>
          
          <div class="recipe-level">${recipe.level}</div>
          <div class="recipe-status status-${recipe.status}">
            ${recipe.status === 'available' ? '✓' : recipe.status === 'missing' ? '⚠' : '🔒'}
          </div>
        </div>
      `;
    } else {
      cards += `
        <div class="recipe-card bg-black/20 border-2 border-white/10 rounded-lg cursor-pointer relative flex items-center justify-center hover:bg-black/30 transition-all duration-200">
          <div class="w-8 h-8 border border-white/20 rounded border-dashed opacity-30"></div>
        </div>
      `;
    }
  }
  
  return cards;
}

function generateAvailableRecipes(): string {
  const availableRecipes = [
    { name: "Legendary Sword", category: "weapons", level: "20", difficulty: "expert", materials: "Mythril, Dragon Scale" },
    { name: "Arcane Staff", category: "weapons", level: "18", difficulty: "hard", materials: "Enchanted Wood, Mana Crystal" },
    { name: "Master's Armor", category: "armor", level: "25", difficulty: "expert", materials: "Adamantite, Phoenix Feather" },
    { name: "Elixir of Power", category: "consumables", level: "15", difficulty: "medium", materials: "Rare Herbs, Dragon Blood" }
  ];

  return availableRecipes.map(recipe => `
    <div class="bg-black/20 border border-white/10 rounded-lg p-4 hover:bg-black/30 transition-all duration-200 cursor-pointer">
      <div class="flex items-center justify-between mb-2">
        <h5 class="text-white font-medium">${recipe.name}</h5>
        <span class="text-white/50 text-xs">Level ${recipe.level}</span>
      </div>
      <div class="flex items-center justify-between text-sm mb-2">
        <span class="text-white/70 capitalize">${recipe.category}</span>
        <span class="text-amber-400 capitalize">${recipe.difficulty}</span>
      </div>
      <div class="text-white/60 text-xs">
        Materials: ${recipe.materials}
      </div>
      <div class="mt-3 pt-2 border-t border-white/10">
        <button class="w-full px-3 py-1 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-xs font-bold rounded transition-all duration-200">
          Learn Recipe
        </button>
      </div>
    </div>
  `).join('');
}

// Initialize crafting functionality - can be called after content is loaded
export function initializeCrafting() {
  console.log('🔨 Initializing crafting functionality...');
  
  // Search functionality
  const searchInput = document.getElementById('recipe-search');
  if (searchInput) {
    searchInput.addEventListener('input', handleRecipeSearch);
    console.log('🔨 Search functionality initialized');
  }

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', handleRecipeFilter);
    });
    console.log(`🔨 Filter functionality initialized (${filterBtns.length} buttons)`);
  }

  // Sort functionality
  const sortSelect = document.getElementById('recipe-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', handleRecipeSort);
    console.log('🔨 Sort functionality initialized');
  }

  // Filter select functionality
  const filterSelect = document.getElementById('recipe-filter');
  if (filterSelect) {
    filterSelect.addEventListener('change', handleRecipeFilterSelect);
    console.log('🔨 Filter select functionality initialized');
  }

  // Recipe interaction
  const recipeCards = document.querySelectorAll('.recipe-card');
  console.log(`🔨 Found ${recipeCards.length} recipe cards`);
  
  if (recipeCards.length > 0) {
    recipeCards.forEach(card => {
      card.addEventListener('click', handleRecipeClick);
    });
    console.log('🔨 Recipe interaction events attached');
  }

  // Button functionality
  const searchRecipeBtn = document.getElementById('search-recipe-btn');
  const learnRecipeBtn = document.getElementById('learn-recipe-btn');
  const autoCraftBtn = document.getElementById('auto-craft-btn');
  const craftQueueBtn = document.getElementById('craft-queue-btn');

  if (searchRecipeBtn) {
    searchRecipeBtn.addEventListener('click', () => {
      console.log('🔨 Opening recipe search modal...');
      showRecipeSearchModal();
    });
  }

  if (learnRecipeBtn) {
    learnRecipeBtn.addEventListener('click', () => {
      console.log('🔨 Opening learn recipe interface...');
    });
  }

  if (autoCraftBtn) {
    autoCraftBtn.addEventListener('click', () => {
      if (selectedRecipe) {
        console.log('🔨 Starting auto craft for:', selectedRecipe.dataset.recipeName);
      } else {
        alert('Please select a recipe for auto crafting');
      }
    });
  }

  if (craftQueueBtn) {
    craftQueueBtn.addEventListener('click', () => {
      console.log('🔨 Opening craft queue...');
    });
  }

  // Modal functionality
  const modal = document.getElementById('recipe-search-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  if (modal && closeModalBtns.length > 0) {
    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', hideRecipeSearchModal);
    });
    console.log('🔨 Modal functionality initialized');
  }
  
  console.log('🔨 Crafting initialization complete');
}

// Global variable for crafting state
let selectedRecipe: HTMLElement | null = null;

function showRecipeSearchModal() {
  const modal = document.getElementById('recipe-search-modal');
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  }
}

function hideRecipeSearchModal() {
  const modal = document.getElementById('recipe-search-modal');
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
  }
}

function handleRecipeSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  const searchTerm = target.value.toLowerCase();
  const cards = document.querySelectorAll('.recipe-card[data-recipe-name]');
  
  cards.forEach(card => {
    const cardElement = card as HTMLElement;
    const recipeName = cardElement.dataset.recipeName?.toLowerCase() || '';
    const recipeCategory = cardElement.dataset.recipeCategory?.toLowerCase() || '';
    
    if (recipeName.includes(searchTerm) || recipeCategory.includes(searchTerm)) {
      cardElement.style.display = 'flex';
    } else {
      cardElement.style.display = 'none';
    }
  });
}

function handleRecipeFilter(event: Event) {
  const target = event.target as HTMLElement;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  target.classList.add('active');
  
  const filter = target.dataset.filter;
  const cards = document.querySelectorAll('.recipe-card');
  
  cards.forEach(card => {
    const cardElement = card as HTMLElement;
    if (filter === 'all' || cardElement.dataset.recipeCategory === filter || !cardElement.dataset.recipeName) {
      cardElement.style.display = 'flex';
    } else {
      cardElement.style.display = 'none';
    }
  });
}

function handleRecipeFilterSelect(event: Event) {
  const target = event.target as HTMLSelectElement;
  const filter = target.value;
  const cards = document.querySelectorAll('.recipe-card[data-recipe-name]');
  
  cards.forEach(card => {
    const cardElement = card as HTMLElement;
    const status = cardElement.dataset.recipeStatus;
    
    if (filter === 'all') {
      cardElement.style.display = 'flex';
    } else if (filter === 'available' && status === 'available') {
      cardElement.style.display = 'flex';
    } else if (filter === 'missing' && status === 'missing') {
      cardElement.style.display = 'flex';
    } else if (filter === 'locked' && status === 'locked') {
      cardElement.style.display = 'flex';
    } else {
      cardElement.style.display = 'none';
    }
  });
}

function handleRecipeSort(event: Event) {
  const target = event.target as HTMLSelectElement;
  const sortBy = target.value;
  const grid = document.getElementById('recipe-grid');
  if (!grid) return;
  
  const cards = Array.from(grid.querySelectorAll('.recipe-card[data-recipe-name]')) as HTMLElement[];
  
  cards.sort((a, b) => {
    const aValue = getRecipeSortValue(a, sortBy);
    const bValue = getRecipeSortValue(b, sortBy);
    return aValue.localeCompare(bValue);
  });
  
  // Re-append sorted cards
  cards.forEach(card => grid.appendChild(card));
}

function getRecipeSortValue(card: HTMLElement, sortBy: string): string {
  switch (sortBy) {
    case 'name':
      return card.dataset.recipeName || '';
    case 'level':
      return card.dataset.recipeLevel || '';
    case 'category':
      return card.dataset.recipeCategory || '';
    case 'difficulty':
      return card.dataset.recipeDifficulty || '';
    case 'materials':
      return card.dataset.recipeMaterials || '';
    default:
      return card.dataset.recipeName || '';
  }
}

function handleRecipeClick(event: Event) {
  const card = event.currentTarget as HTMLElement;
  console.log('🔨 Recipe clicked:', card.dataset.recipeName);
  
  if (card.dataset.recipeName) {
    // Remove active class from all cards
    document.querySelectorAll('.recipe-card').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked card
    card.classList.add('active');
    
    // Show recipe details
    showRecipeDetails(card);
    selectedRecipe = card;
  }
}

function showRecipeDetails(card: HTMLElement) {
  console.log('🔍 Showing recipe details for:', card.dataset.recipeName);
  
  const panel = document.getElementById('crafting-panel');
  if (!panel) return;
  
  const recipeData = {
    name: card.dataset.recipeName || 'Unknown Recipe',
    category: card.dataset.recipeCategory || 'materials',
    level: card.dataset.recipeLevel || '1',
    difficulty: card.dataset.recipeDifficulty || 'easy',
    status: card.dataset.recipeStatus || 'available',
    description: card.dataset.recipeDescription || 'No description available.',
    materials: JSON.parse(card.dataset.recipeMaterials || '[]'),
    result: JSON.parse(card.dataset.recipeResult || '{}')
  };
  
  panel.innerHTML = generateRecipeDetailsContent(recipeData);
}

function generateRecipeDetailsContent(recipe: any): string {
  const categoryColors: { [key: string]: string } = {
    weapons: '#EF4444',
    armor: '#3B82F6',
    tools: '#F59E0B',
    consumables: '#22C55E',
    materials: '#8B5CF6'
  };

  const categoryIcons: { [key: string]: string } = {
    weapons: '⚔️',
    armor: '🛡️',
    tools: '🔧',
    consumables: '🧪',
    materials: '💎'
  };

  const difficultyColors: { [key: string]: string } = {
    easy: '#22C55E',
    medium: '#F59E0B',
    hard: '#EF4444',
    expert: '#8B5CF6'
  };
  
  return `
    <div class="space-y-4">
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: ${categoryColors[recipe.category] || categoryColors.materials}">
          <span>${categoryIcons[recipe.category] || '💎'}</span>
        </div>
        <h3 class="font-bold text-xl mb-1" style="color: ${categoryColors[recipe.category] || categoryColors.materials}">${recipe.name}</h3>
        <p class="text-white/70 text-sm capitalize">${recipe.category} • Level ${recipe.level}</p>
        <p class="text-white/50 text-xs" style="color: ${difficultyColors[recipe.difficulty] || difficultyColors.easy}">${recipe.difficulty} difficulty</p>
      </div>

      <div class="bg-black/20 border border-white/10 rounded-lg p-3">
        <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
        <p class="text-white/80 text-sm leading-relaxed">${recipe.description}</p>
      </div>

      ${recipe.materials && recipe.materials.length > 0 ? `
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Required Materials</h4>
          <div class="space-y-2">
            ${recipe.materials.map((material: any) => `
              <div class="flex items-center justify-between">
                <span class="text-white/80 text-sm">${material.name}</span>
                <div class="flex items-center gap-2">
                  <span class="text-white/60 text-xs">${material.current}/${material.required}</span>
                  <div class="w-3 h-3 rounded-full ${material.available ? 'bg-green-500' : 'bg-red-500'}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${recipe.result ? `
        <div class="bg-black/20 border border-white/10 rounded-lg p-3">
          <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Result</h4>
          <div class="flex items-center justify-between">
            <span class="text-white/80 text-sm">${recipe.result.name}</span>
            <span class="text-amber-400 font-bold">x${recipe.result.quantity}</span>
          </div>
        </div>
      ` : ''}

      <div class="space-y-2">
        ${recipe.status === 'available' ? `
          <button class="w-full px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
            🔨 Craft Item
          </button>
          <div class="flex gap-2">
            <button class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
              🤖 Auto Craft
            </button>
            <button class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
              📋 Add to Queue
            </button>
          </div>
        ` : `
          <button class="w-full px-4 py-2 bg-gradient-to-r from-gray-500/80 to-gray-600/80 text-white text-sm font-bold rounded-lg cursor-not-allowed" disabled>
            ${recipe.status === 'missing' ? '⚠️ Missing Materials' : '🔒 Recipe Locked'}
          </button>
        `}
        <button class="w-full px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
          ⭐ Add to Favorites
        </button>
      </div>
    </div>
  `;
} 