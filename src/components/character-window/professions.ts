export function createProfessionsContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Profession Selection & Overview -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Professions Header -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-orange-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 border border-orange-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-orange-300">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h2 class="text-orange-200 text-lg font-bold uppercase tracking-wider">Professions</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Active Professions -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">6/8</span>
                <span class="text-white/70 text-xs">active</span>
              </div>
              <!-- Total Skill Points -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">2,847</span>
                <span class="text-white/70 text-xs">total skill</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 mb-4">
            <button class="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="train-skill-btn">
              📚 Train Skill
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="practice-btn">
              🏋️ Practice
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="find-trainer-btn">
              👨‍🏫 Find Trainer
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="profession-quests-btn">
              📋 Profession Quests
            </button>
          </div>

          <!-- Search and Filter -->
          <div class="flex gap-3 mb-3">
            <div class="flex-1 relative">
              <input 
                type="text" 
                placeholder="Search professions..." 
                class="w-full px-4 py-2 pl-10 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
                id="profession-search"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            
            <select class="px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-orange-400/50 focus:outline-none cursor-pointer" id="profession-sort">
              <option value="level">Sort by Level</option>
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="progress">Sort by Progress</option>
            </select>
          </div>

          <!-- Category Filters -->
          <div class="flex gap-2 flex-wrap">
            <button class="filter-btn active px-3 py-1.5 bg-gradient-to-r from-orange-500/80 to-orange-600/80 text-white text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105" data-filter="all">
              📚 All
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="crafting">
              🔨 Crafting
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="gathering">
              🌾 Gathering
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="combat">
              ⚔️ Combat
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="magic">
              ✨ Magic
            </button>
            <button class="filter-btn px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-filter="social">
              👥 Social
            </button>
          </div>
        </div>

        <!-- Professions Grid -->
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-2 gap-4 max-w-full" id="professions-grid">
            ${generateProfessionsGrid()}
          </div>
        </div>
      </div>

      <!-- Right Panel: Profession Details -->
      <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Profession Details</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="profession-details-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <p class="text-sm">Select a profession to view details</p>
          </div>
        </div>
      </div>

      <!-- Training Modal -->
      <div id="training-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-all duration-300">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/20 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white text-xl font-bold">Skill Training</h3>
                <button class="close-modal w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-4" id="training-content">
                ${generateTrainingContent()}
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
        background: rgba(249, 115, 22, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(249, 115, 22, 0.8);
      }

      .profession-card {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        min-height: 200px;
      }
      
      .profession-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(249, 115, 22, 0.3);
      }
      
      .profession-card.active {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        background: rgba(59, 130, 246, 0.1) !important;
      }

      .category-crafting { border-left: 4px solid #F59E0B; }
      .category-gathering { border-left: 4px solid #10B981; }
      .category-combat { border-left: 4px solid #EF4444; }
      .category-magic { border-left: 4px solid #8B5CF6; }
      .category-social { border-left: 4px solid #3B82F6; }

      .filter-btn.active {
        background: linear-gradient(to right, rgba(249, 115, 22, 0.8), rgba(234, 88, 12, 0.8)) !important;
        border-color: rgba(249, 115, 22, 0.6) !important;
        color: white !important;
      }

      .skill-level {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        font-size: 12px;
        font-weight: bold;
        padding: 4px 8px;
        border-radius: 12px;
        min-width: 40px;
        text-align: center;
      }

      .skill-progress {
        height: 6px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 3px;
        overflow: hidden;
        margin: 8px 0;
      }

      .skill-progress-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s ease;
      }

      .level-novice { background: linear-gradient(to right, #6B7280, #9CA3AF); }
      .level-apprentice { background: linear-gradient(to right, #22C55E, #16A34A); }
      .level-journeyman { background: linear-gradient(to right, #3B82F6, #1D4ED8); }
      .level-expert { background: linear-gradient(to right, #A855F7, #7C3AED); }
      .level-master { background: linear-gradient(to right, #F59E0B, #D97706); }
      .level-grandmaster { background: linear-gradient(to right, #EF4444, #DC2626); }

      .training-option {
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .training-option:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
      }

      .training-cost {
        color: #F59E0B;
        font-weight: bold;
      }

      .training-time {
        color: #3B82F6;
        font-weight: bold;
      }

      .profession-mastery {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 4px;
        margin-top: 8px;
      }

      .mastery-point {
        width: 100%;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 2px;
      }

      .mastery-point.filled {
        background: linear-gradient(to right, #F59E0B, #D97706);
      }
    </style>

    <script>
      let selectedProfession = null;

      document.addEventListener('DOMContentLoaded', function() {
        initializeProfessions();
      });

      function initializeProfessions() {
        // Modal functionality
        const trainSkillBtn = document.getElementById('train-skill-btn');
        const modal = document.getElementById('training-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');

        trainSkillBtn?.addEventListener('click', () => {
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
        const searchInput = document.getElementById('profession-search');
        if (searchInput) {
          searchInput.addEventListener('input', handleProfessionSearch);
        }

        // Filter functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
          btn.addEventListener('click', handleProfessionFilter);
        });

        // Profession interaction
        const professionCards = document.querySelectorAll('.profession-card');
        professionCards.forEach(card => {
          card.addEventListener('click', handleProfessionClick);
        });

        // Action buttons
        document.getElementById('practice-btn')?.addEventListener('click', () => {
          if (selectedProfession) {
            console.log('Starting practice session for:', selectedProfession.dataset.professionName);
          } else {
            alert('Please select a profession to practice');
          }
        });

        document.getElementById('find-trainer-btn')?.addEventListener('click', () => {
          console.log('Finding trainers...');
        });

        document.getElementById('profession-quests-btn')?.addEventListener('click', () => {
          console.log('Opening profession quests...');
        });
      }

      function handleProfessionSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const cards = document.querySelectorAll('.profession-card');
        
        cards.forEach(card => {
          const professionName = card.dataset.professionName?.toLowerCase() || '';
          const professionCategory = card.dataset.professionCategory?.toLowerCase() || '';
          
          if (professionName.includes(searchTerm) || professionCategory.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }

      function handleProfessionFilter(event) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        const filter = event.target.dataset.filter;
        const cards = document.querySelectorAll('.profession-card');
        
        cards.forEach(card => {
          if (filter === 'all' || card.dataset.professionCategory === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }

      function handleProfessionClick(event) {
        const card = event.currentTarget;
        document.querySelectorAll('.profession-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        showProfessionDetails(card);
        selectedProfession = card;
      }

      function showProfessionDetails(card) {
        const panel = document.getElementById('profession-details-panel');
        const professionData = {
          name: card.dataset.professionName || 'Unknown Profession',
          category: card.dataset.professionCategory || 'misc',
          level: card.dataset.professionLevel || '1',
          experience: card.dataset.professionExperience || '0',
          maxExperience: card.dataset.professionMaxExperience || '100',
          rank: card.dataset.professionRank || 'novice',
          description: card.dataset.professionDescription || 'No description available.',
          benefits: JSON.parse(card.dataset.professionBenefits || '[]'),
          masteryPoints: card.dataset.professionMasteryPoints || '0',
          maxMasteryPoints: card.dataset.professionMaxMasteryPoints || '100'
        };
        
        panel.innerHTML = generateProfessionDetailsContent(professionData);
      }

      function generateProfessionDetailsContent(profession) {
        const categoryColors = {
          crafting: '#F59E0B',
          gathering: '#10B981',
          combat: '#EF4444',
          magic: '#8B5CF6',
          social: '#3B82F6'
        };

        const categoryIcons = {
          crafting: '🔨',
          gathering: '🌾',
          combat: '⚔️',
          magic: '✨',
          social: '👥'
        };

        const rankColors = {
          novice: '#6B7280',
          apprentice: '#22C55E',
          journeyman: '#3B82F6',
          expert: '#A855F7',
          master: '#F59E0B',
          grandmaster: '#EF4444'
        };
        
        return \`
          <div class="space-y-4">
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: \${categoryColors[profession.category]}">
                <span>\${categoryIcons[profession.category] || '🛠️'}</span>
              </div>
              <h3 class="font-bold text-xl mb-1" style="color: \${categoryColors[profession.category]}">\${profession.name}</h3>
              <p class="text-white/70 text-sm capitalize">\${profession.category} • Level \${profession.level}</p>
              <p class="text-white/50 text-xs uppercase tracking-wide" style="color: \${rankColors[profession.rank as keyof typeof rankColors]}">\${profession.rank}</p>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Experience Progress</h4>
              <div class="flex justify-between items-center mb-2">
                <span class="text-white/70 text-sm">Experience</span>
                <span class="text-green-400 font-bold">\${profession.experience}/\${profession.maxExperience}</span>
              </div>
              <div class="w-full bg-black/30 rounded-full h-3">
                <div class="level-\${profession.rank} h-3 rounded-full transition-all duration-300" style="width: \${(parseInt(profession.experience) / parseInt(profession.maxExperience)) * 100}%"></div>
              </div>
              <div class="text-center mt-2">
                <span class="text-white/60 text-xs">\${parseInt(profession.maxExperience) - parseInt(profession.experience)} XP to next level</span>
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Mastery Progress</h4>
              <div class="flex justify-between items-center mb-2">
                <span class="text-white/70 text-sm">Mastery Points</span>
                <span class="text-orange-400 font-bold">\${profession.masteryPoints}/\${profession.maxMasteryPoints}</span>
              </div>
              <div class="profession-mastery">
                \${Array.from({ length: parseInt(profession.maxMasteryPoints) / 20 }, (_, i) => \`
                  <div class="mastery-point \${i < Math.floor(parseInt(profession.masteryPoints) / 20) ? 'filled' : ''}"></div>
                \`).join('')}
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
              <p class="text-white/80 text-sm leading-relaxed">\${profession.description}</p>
            </div>

            \${profession.benefits.length > 0 ? \`
              <div class="bg-black/20 border border-white/10 rounded-lg p-3">
                <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Benefits</h4>
                <div class="space-y-1">
                  \${profession.benefits.map(benefit => \`
                    <div class="text-green-400 text-sm">• \${benefit}</div>
                  \`).join('')}
                </div>
              </div>
            \` : ''}

            <div class="space-y-2">
              <button class="w-full px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                📚 Train Skill
              </button>
              <button class="w-full px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                🏋️ Practice Session
              </button>
              <button class="w-full px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                📋 View Recipes/Skills
              </button>
            </div>
          </div>
        \`;
      }
    </script>
  `;
}

function generateProfessionsGrid(): string {
  const sampleProfessions = [
    {
      name: "Blacksmithing",
      category: "crafting",
      level: 45,
      experience: 2350,
      maxExperience: 3000,
      rank: "journeyman",
      description: "The art of forging weapons and armor from metal. Create powerful equipment and repair damaged gear.",
      benefits: ["Craft weapons and armor", "Repair equipment", "Extract metal components", "+15% durability on crafted items"],
      masteryPoints: 67,
      maxMasteryPoints: 100
    },
    {
      name: "Herbalism",
      category: "gathering",
      level: 38,
      experience: 1890,
      maxExperience: 2500,
      rank: "apprentice",
      description: "Gather magical herbs and plants from the wilderness. Essential for alchemy and healing.",
      benefits: ["Gather rare herbs", "Identify plant properties", "Find hidden herb nodes", "+20% herb gathering speed"],
      masteryPoints: 42,
      maxMasteryPoints: 100
    },
    {
      name: "Archery",
      category: "combat",
      level: 52,
      experience: 4200,
      maxExperience: 5000,
      rank: "expert",
      description: "Master the bow and arrow. Increase accuracy, range, and damage with ranged weapons.",
      benefits: ["Increased bow damage", "Longer range", "Critical shot abilities", "+25% accuracy"],
      masteryPoints: 78,
      maxMasteryPoints: 100
    },
    {
      name: "Enchanting",
      category: "magic",
      level: 29,
      experience: 980,
      maxExperience: 1500,
      rank: "apprentice",
      description: "Imbue items with magical properties. Create powerful enchantments and magical effects.",
      benefits: ["Enchant weapons and armor", "Create magical scrolls", "Identify magic items", "+10% enchantment power"],
      masteryPoints: 23,
      maxMasteryPoints: 100
    },
    {
      name: "Leadership",
      category: "social",
      level: 31,
      experience: 1150,
      maxExperience: 1800,
      rank: "journeyman",
      description: "Inspire and lead others in battle and exploration. Coordinate group activities effectively.",
      benefits: ["Inspire party members", "Coordinate group actions", "Negotiate better prices", "+15% party experience"],
      masteryPoints: 35,
      maxMasteryPoints: 100
    },
    {
      name: "Mining",
      category: "gathering",
      level: 41,
      experience: 2100,
      maxExperience: 2700,
      rank: "journeyman",
      description: "Extract valuable ores and gems from the earth. Essential for crafting and trading.",
      benefits: ["Mine rare ores", "Find gem deposits", "Detect mineral veins", "+30% mining speed"],
      masteryPoints: 55,
      maxMasteryPoints: 100
    },
    {
      name: "Alchemy",
      category: "crafting",
      level: 36,
      experience: 1650,
      maxExperience: 2200,
      rank: "apprentice",
      description: "Create potions, elixirs, and magical compounds. Transform raw materials into powerful consumables.",
      benefits: ["Brew health potions", "Create magical elixirs", "Transmute materials", "+20% potion effectiveness"],
      masteryPoints: 41,
      maxMasteryPoints: 100
    },
    {
      name: "Runic Magic",
      category: "magic",
      level: 27,
      experience: 720,
      maxExperience: 1200,
      rank: "novice",
      description: "Harness the power of ancient runes. Create magical inscriptions and protective wards.",
      benefits: ["Inscribe magical runes", "Create protective wards", "Enhance spell effects", "+12% magical resistance"],
      masteryPoints: 18,
      maxMasteryPoints: 100
    }
  ];

  return sampleProfessions.map((profession, _index) => {
    const categoryIcons: Record<string, string> = {
      crafting: '🔨',
      gathering: '🌾',
      combat: '⚔️',
      magic: '✨',
      social: '👥'
    };

    const rankColors = {
      novice: '#6B7280',
      apprentice: '#22C55E',
      journeyman: '#3B82F6',
      expert: '#A855F7',
      master: '#F59E0B',
      grandmaster: '#EF4444'
    };

    return `
      <div class="profession-card category-${profession.category} bg-black/40 border-2 border-white/10 rounded-lg cursor-pointer relative p-4 hover:bg-black/60 transition-all duration-200" 
           data-profession-name="${profession.name}"
           data-profession-category="${profession.category}"
           data-profession-level="${profession.level}"
           data-profession-experience="${profession.experience}"
           data-profession-max-experience="${profession.maxExperience}"
           data-profession-rank="${profession.rank}"
           data-profession-description="${profession.description}"
           data-profession-benefits='${JSON.stringify(profession.benefits)}'
           data-profession-mastery-points="${profession.masteryPoints}"
           data-profession-max-mastery-points="${profession.maxMasteryPoints}">
        
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="text-3xl">${categoryIcons[profession.category] || '🛠️'}</div>
            <div>
              <h4 class="text-white font-bold text-base mb-1">${profession.name}</h4>
              <p class="text-white/70 text-sm capitalize">${profession.category}</p>
            </div>
          </div>
          <div class="skill-level" style="background-color: ${rankColors[profession.rank as keyof typeof rankColors]}">${profession.level}</div>
        </div>
        
        <div class="mb-3">
          <div class="flex justify-between items-center mb-1">
            <span class="text-white/60 text-xs">Experience</span>
            <span class="text-white/80 text-xs">${profession.experience}/${profession.maxExperience}</span>
          </div>
          <div class="skill-progress">
            <div class="skill-progress-fill level-${profession.rank}" style="width: ${(profession.experience / profession.maxExperience) * 100}%"></div>
          </div>
        </div>
        
        <div class="mb-3">
          <div class="flex justify-between items-center mb-1">
            <span class="text-white/60 text-xs">Rank</span>
            <span class="text-white/80 text-xs capitalize" style="color: ${rankColors[profession.rank as keyof typeof rankColors]}">${profession.rank}</span>
          </div>
        </div>
        
        <p class="text-white/60 text-xs line-clamp-2 mb-3">${profession.description}</p>
        
        <div class="profession-mastery">
          ${Array.from({ length: 5 }, (_, i) => `
            <div class="mastery-point ${i < Math.floor(profession.masteryPoints / 20) ? 'filled' : ''}"></div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function generateTrainingContent(): string {
  return `
    <div class="space-y-4">
      <div class="text-center mb-4">
        <h4 class="text-white font-bold text-lg mb-2">Available Training Options</h4>
        <p class="text-white/70 text-sm">Choose a training method to improve your skills</p>
      </div>
      
      <div class="space-y-3">
        <div class="training-option bg-black/20 border border-white/10 rounded-lg p-4 hover:bg-black/30">
          <div class="flex items-center justify-between mb-2">
            <h5 class="text-white font-semibold">🎯 Basic Training</h5>
            <div class="flex items-center gap-2">
              <span class="training-cost">50 gold</span>
              <span class="training-time">2 hours</span>
            </div>
          </div>
          <p class="text-white/80 text-sm mb-2">Standard training session with a local instructor.</p>
          <div class="text-green-400 text-sm">+100-150 Experience</div>
        </div>

        <div class="training-option bg-black/20 border border-white/10 rounded-lg p-4 hover:bg-black/30">
          <div class="flex items-center justify-between mb-2">
            <h5 class="text-white font-semibold">⭐ Advanced Training</h5>
            <div class="flex items-center gap-2">
              <span class="training-cost">120 gold</span>
              <span class="training-time">4 hours</span>
            </div>
          </div>
          <p class="text-white/80 text-sm mb-2">Intensive training with a master craftsman.</p>
          <div class="text-green-400 text-sm">+250-350 Experience + 1 Mastery Point</div>
        </div>

        <div class="training-option bg-black/20 border border-white/10 rounded-lg p-4 hover:bg-black/30">
          <div class="flex items-center justify-between mb-2">
            <h5 class="text-white font-semibold">💎 Master Class</h5>
            <div class="flex items-center gap-2">
              <span class="training-cost">300 gold</span>
              <span class="training-time">8 hours</span>
            </div>
          </div>
          <p class="text-white/80 text-sm mb-2">Exclusive training with a grandmaster. Unlocks special techniques.</p>
          <div class="text-green-400 text-sm">+500-700 Experience + 3 Mastery Points + New Recipe</div>
        </div>

        <div class="training-option bg-black/20 border border-white/10 rounded-lg p-4 hover:bg-black/30">
          <div class="flex items-center justify-between mb-2">
            <h5 class="text-white font-semibold">📚 Self Study</h5>
            <div class="flex items-center gap-2">
              <span class="training-cost">Free</span>
              <span class="training-time">6 hours</span>
            </div>
          </div>
          <p class="text-white/80 text-sm mb-2">Study profession manuals and practice on your own.</p>
          <div class="text-green-400 text-sm">+50-100 Experience</div>
        </div>
      </div>

      <div class="text-center mt-6">
        <button class="px-6 py-2 bg-gradient-to-r from-orange-500/80 to-orange-600/80 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105">
          Start Training
        </button>
      </div>
    </div>
  `;
} 