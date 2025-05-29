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
        right: 2px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 1px 4px;
        border-radius: 3px;
        min-width: 16px;
        text-align: center;
      }

      .recipe-favorite {
        position: absolute;
        top: 2px;
        left: 2px;
        color: #fbbf24;
        font-size: 12px;
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
      }

      .recipe-status {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }

      .status-available { background: rgba(34, 197, 94, 0.8); }
      .status-missing { background: rgba(245, 158, 11, 0.8); }
      .status-locked { background: rgba(156, 163, 175, 0.8); }

      .crafting-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 16px;
      }

      .crafting-slot {
        aspect-ratio: 1;
        background: rgba(0, 0, 0, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.2s ease;
      }

      .crafting-slot.filled {
        border-color: rgba(245, 158, 11, 0.6);
        background: rgba(245, 158, 11, 0.1);
      }

      .material-requirement {
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        border-left: 3px solid transparent;
        margin-bottom: 8px;
      }

      .material-available {
        border-left-color: #22C55E;
        background: rgba(34, 197, 94, 0.1);
      }

      .material-missing {
        border-left-color: #EF4444;
        background: rgba(239, 68, 68, 0.1);
      }
    </style>

    <script>
      let selectedRecipe = null;

      document.addEventListener('DOMContentLoaded', function() {
        initializeCrafting();
      });

      function initializeCrafting() {
        // Modal functionality
        const searchRecipeBtn = document.getElementById('search-recipe-btn');
        const modal = document.getElementById('recipe-search-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');

        searchRecipeBtn?.addEventListener('click', () => {
          modal.classList.remove('opacity-0', 'pointer-events-none');
          modal.classList.add('opacity-100', 'pointer-events-auto');
        });

        closeModalBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.classList.remove('opacity-100', 'pointer-events-auto');
          });
        });

        // Search functionality
        const searchInput = document.getElementById('recipe-search');
        if (searchInput) {
          searchInput.addEventListener('input', handleRecipeSearch);
        }

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
          btn.addEventListener('click', handleRecipeFilter);
        });

        // Recipe interaction
        const recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => {
          card.addEventListener('click', handleRecipeClick);
        });

        // Action buttons
        document.getElementById('learn-recipe-btn')?.addEventListener('click', () => {
          console.log('Opening recipe learning interface...');
        });

        document.getElementById('auto-craft-btn')?.addEventListener('click', () => {
          if (selectedRecipe) {
            console.log('Setting up auto-craft for:', selectedRecipe.dataset.recipeName);
          } else {
            alert('Please select a recipe for auto-crafting');
          }
        });

        document.getElementById('craft-queue-btn')?.addEventListener('click', () => {
          console.log('Opening craft queue...');
        });
      }

      function handleRecipeSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const cards = document.querySelectorAll('.recipe-card');
        
        cards.forEach(card => {
          const recipeName = card.dataset.recipeName?.toLowerCase() || '';
          const recipeCategory = card.dataset.recipeCategory?.toLowerCase() || '';
          
          if (recipeName.includes(searchTerm) || recipeCategory.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }

      function handleRecipeFilter(event) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const filter = event.target.dataset.filter;
        const cards = document.querySelectorAll('.recipe-card');
        
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.recipeCategory === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }

      function handleRecipeClick(event) {
        const card = event.currentTarget;
        document.querySelectorAll('.recipe-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        showCraftingStation(card);
        selectedRecipe = card;
      }

      function showCraftingStation(card) {
        const panel = document.getElementById('crafting-panel');
        const recipeData = {
          name: card.dataset.recipeName || 'Unknown Recipe',
          category: card.dataset.recipeCategory || 'misc',
          level: card.dataset.recipeLevel || '1',
          difficulty: card.dataset.recipeDifficulty || 'easy',
          description: card.dataset.recipeDescription || 'No description available.',
          materials: JSON.parse(card.dataset.recipeMaterials || '[]'),
          result: JSON.parse(card.dataset.recipeResult || '{}'),
          status: card.dataset.recipeStatus || 'available'
        };
        
        panel.innerHTML = generateCraftingStationContent(recipeData);
      }

      function generateCraftingStationContent(recipe) {
        const difficultyColors = {
          easy: '#22C55E',
          medium: '#F59E0B',
          hard: '#EF4444',
          expert: '#8B5CF6'
        };

        const categoryIcons = {
          weapons: '⚔️',
          armor: '🛡️',
          tools: '🔧',
          consumables: '🧪',
          materials: '💎'
        };
        
        return \`
          <div class="space-y-4">
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: \${difficultyColors[recipe.difficulty]}">
                <span>\${categoryIcons[recipe.category] || '📦'}</span>
              </div>
              <h3 class="font-bold text-xl mb-1 text-white">\${recipe.name}</h3>
              <p class="text-white/70 text-sm capitalize">\${recipe.category} • Level \${recipe.level}</p>
              <p class="text-white/50 text-xs uppercase tracking-wide" style="color: \${difficultyColors[recipe.difficulty]}">\${recipe.difficulty}</p>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Crafting Grid</h4>
              <div class="crafting-grid">
                \${Array.from({ length: 9 }, (_, i) => \`
                  <div class="crafting-slot" data-slot="\${i}">
                    <div class="w-6 h-6 border border-white/20 rounded border-dashed opacity-30"></div>
                  </div>
                \`).join('')}
              </div>
              
              <div class="flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-amber-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
              
              <div class="text-center">
                <div class="w-16 h-16 mx-auto bg-black/40 border-2 border-amber-500/60 rounded-lg flex items-center justify-center text-2xl mb-2">
                  <span>\${categoryIcons[recipe.category] || '📦'}</span>
                </div>
                <p class="text-white/80 text-sm">\${recipe.result.name || recipe.name}</p>
                <p class="text-white/60 text-xs">Quantity: \${recipe.result.quantity || 1}</p>
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Required Materials</h4>
              <div class="space-y-2">
                \${recipe.materials.map(material => \`
                  <div class="material-requirement \${material.available ? 'material-available' : 'material-missing'}">
                    <div class="flex items-center justify-between">
                      <span class="text-white/80 text-sm">\${material.name}</span>
                      <span class="text-white/60 text-xs">\${material.current}/\${material.required}</span>
                    </div>
                  </div>
                \`).join('')}
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
              <p class="text-white/80 text-sm leading-relaxed">\${recipe.description}</p>
            </div>

            <div class="space-y-2">
              \${recipe.status === 'available' ? \`
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
              \` : \`
                <button class="w-full px-4 py-2 bg-gradient-to-r from-gray-500/80 to-gray-600/80 text-white text-sm font-bold rounded-lg cursor-not-allowed" disabled>
                  \${recipe.status === 'missing' ? '⚠️ Missing Materials' : '🔒 Recipe Locked'}
                </button>
              \`}
              <button class="w-full px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                ⭐ Add to Favorites
              </button>
            </div>
          </div>
        \`;
      }
    </script>
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