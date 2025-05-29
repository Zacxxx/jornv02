export function createAbilityListContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Talent Tree Interface -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Talents Header -->
        <div class="flex-shrink-0 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-b-2 border-cyan-500/30 p-4 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 border border-cyan-500/50 rounded-lg flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-300">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="m2 17 10 5 10-5"/>
                  <path d="m2 12 10 5 10-5"/>
                </svg>
              </div>
              <h2 class="text-cyan-200 text-lg font-bold uppercase tracking-wider">Talents & Abilities</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Available Points -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">23</span>
                <span class="text-white/70 text-xs">ability pts</span>
              </div>
              <!-- Spent Points -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">47/70</span>
                <span class="text-white/70 text-xs">spent</span>
              </div>
            </div>
          </div>

          <!-- Class & Path Selectors -->
          <div class="flex gap-4 mb-4">
            <div class="flex-1">
              <label class="block text-white/70 text-sm font-medium mb-2">Current Class</label>
              <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none cursor-pointer" id="class-selector">
                <option value="paladin" selected>🛡️ Paladin</option>
                <option value="warrior">⚔️ Warrior</option>
                <option value="mage">🔮 Mage</option>
                <option value="rogue">🗡️ Rogue</option>
                <option value="archer">🏹 Archer</option>
                <option value="cleric">✨ Cleric</option>
              </select>
            </div>
            
            <div class="flex-1">
              <label class="block text-white/70 text-sm font-medium mb-2">Hero Path</label>
              <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none cursor-pointer" id="path-selector">
                <option value="guardian" selected>🛡️ Guardian Path</option>
                <option value="destroyer">💥 Destroyer Path</option>
                <option value="scholar">📚 Scholar Path</option>
                <option value="wanderer">🗺️ Wanderer Path</option>
                <option value="creator">🔨 Creator Path</option>
              </select>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 mb-4">
            <button class="px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="create-talent-btn">
              ⭐ Create Talent
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="create-ability-btn">
              💫 Create Ability
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="research-unlocks-btn">
              🔬 Research Unlocks
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-amber-500/80 to-amber-600/80 hover:from-amber-400 hover:to-amber-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="save-build-btn">
              💾 Save Build
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-400 hover:to-red-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="reset-talents-btn">
              🔄 Reset Tree
            </button>
          </div>

          <!-- Tree Category Tabs -->
          <div class="flex gap-2 flex-wrap">
            <button class="tree-category-tab active px-3 py-1.5 bg-gradient-to-r from-cyan-500/80 to-cyan-600/80 text-white text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105" data-category="core">
              🎯 Core Abilities
            </button>
            <button class="tree-category-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-category="combat">
              ⚔️ Combat
            </button>
            <button class="tree-category-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-category="magic">
              ✨ Magic
            </button>
            <button class="tree-category-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-category="utility">
              🛠️ Utility
            </button>
            <button class="tree-category-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-category="mastery">
              👑 Mastery
            </button>
          </div>
        </div>

        <!-- Talent Tree Canvas -->
        <div class="flex-1 overflow-hidden bg-gradient-to-b from-slate-800/30 to-slate-900/30">
          <div class="h-full overflow-auto custom-scrollbar" id="talent-tree-container">
            <div class="relative min-w-[1200px] min-h-[600px] p-8" id="talent-tree-canvas">
              ${generateHorizontalTalentTree('core')}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Talent Details -->
      <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Talent Details</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="talent-details-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="m2 17 10 5 10-5"/>
                <path d="m2 12 10 5 10-5"/>
              </svg>
            </div>
            <p class="text-sm">Select a talent to view details</p>
          </div>
        </div>
      </div>

      <!-- Create Talent Modal -->
      <div id="create-talent-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-all duration-300">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/20 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white text-xl font-bold">Create New Talent</h3>
                <button class="close-modal w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-6" id="create-talent-content">
                ${generateCreateTalentContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Research Unlocks Modal -->
      <div id="research-unlocks-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-all duration-300">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-gradient-to-br from-slate-900/98 to-slate-800/98 border border-white/20 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-white text-xl font-bold">Research New Unlocks</h3>
                <button class="close-modal w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-lg flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-6" id="research-unlocks-content">
                ${generateResearchUnlocksContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(6, 182, 212, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(6, 182, 212, 0.8);
      }

      .tree-category-tab.active {
        background: linear-gradient(to right, rgba(6, 182, 212, 0.8), rgba(8, 145, 178, 0.8)) !important;
        border-color: rgba(6, 182, 212, 0.6) !important;
        color: white !important;
      }

      .talent-node {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        overflow: hidden;
      }

      .talent-node:hover {
        transform: scale(1.1) translateZ(10px);
        z-index: 20;
        box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
      }

      .talent-node.available {
        border: 3px solid rgba(34, 197, 94, 0.8);
        background: rgba(34, 197, 94, 0.15);
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        animation: pulse-green 2s infinite;
      }

      .talent-node.locked {
        border: 3px solid rgba(107, 114, 128, 0.6);
        background: rgba(0, 0, 0, 0.4);
        opacity: 0.6;
        cursor: not-allowed;
      }

      .talent-node.learned {
        border: 3px solid rgba(6, 182, 212, 0.8);
        background: rgba(6, 182, 212, 0.2);
        box-shadow: 0 0 25px rgba(6, 182, 212, 0.4);
      }

      .talent-node.mastered {
        border: 3px solid rgba(245, 158, 11, 0.8);
        background: rgba(245, 158, 11, 0.2);
        box-shadow: 0 0 30px rgba(245, 158, 11, 0.5);
        animation: pulse-gold 3s infinite;
      }

      .talent-node.researched {
        border: 3px solid rgba(147, 51, 234, 0.8);
        background: rgba(147, 51, 234, 0.15);
        box-shadow: 0 0 20px rgba(147, 51, 234, 0.4);
        animation: pulse-purple 2.5s infinite;
      }

      @keyframes pulse-green {
        0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
        50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.6); }
      }

      @keyframes pulse-gold {
        0%, 100% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.5); }
        50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.8); }
      }

      @keyframes pulse-purple {
        0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.4); }
        50% { box-shadow: 0 0 35px rgba(147, 51, 234, 0.7); }
      }

      .talent-connection {
        position: absolute;
        background: linear-gradient(90deg, rgba(107, 114, 128, 0.4), rgba(107, 114, 128, 0.6), rgba(107, 114, 128, 0.4));
        height: 4px;
        z-index: 1;
        border-radius: 2px;
        transition: all 0.3s ease;
      }

      .talent-connection.active {
        background: linear-gradient(90deg, rgba(6, 182, 212, 0.6), rgba(6, 182, 212, 0.8), rgba(6, 182, 212, 0.6));
        height: 6px;
        box-shadow: 0 0 8px rgba(6, 182, 212, 0.4);
      }

      .talent-points {
        position: absolute;
        top: -8px;
        right: -8px;
        background: linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(8, 145, 178, 0.9));
        color: white;
        font-size: 12px;
        font-weight: bold;
        padding: 4px 6px;
        border-radius: 10px;
        min-width: 20px;
        text-align: center;
        border: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }

      .talent-icon {
        font-size: 32px;
        margin-bottom: 4px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
      }

      .talent-name {
        font-size: 10px;
        font-weight: bold;
        text-align: center;
        color: white;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        line-height: 1.1;
      }

      .talent-tier-indicator {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: rgba(255, 255, 255, 0.7);
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 8px;
        font-weight: bold;
      }

      .research-unlock-item {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      .research-unlock-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(147, 51, 234, 0.3);
      }
      
      .research-unlock-item.selected {
        border-color: rgba(59, 130, 246, 0.8) !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        background: rgba(59, 130, 246, 0.1) !important;
      }

      .unlock-cost {
        color: #F59E0B;
        font-weight: bold;
      }

      .unlock-time {
        color: #3B82F6;
        font-weight: bold;
      }

      .tree-background {
        background-image: 
          radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%);
        background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
      }
    </style>
  `;
}

function generateHorizontalTalentTree(category: string): string {
  const treeData: { [key: string]: any[] } = {
    core: [
      { id: 'health_boost', name: 'Health Boost', icon: '❤️', tier: 1, x: 100, y: 150, status: 'learned', currentRanks: 5, maxRanks: 5, connections: ['armor_mastery'] },
      { id: 'mana_boost', name: 'Mana Boost', icon: '💙', tier: 1, x: 100, y: 250, status: 'learned', currentRanks: 3, maxRanks: 5, connections: ['spell_power'] },
      { id: 'stamina_boost', name: 'Stamina Boost', icon: '💚', tier: 1, x: 100, y: 350, status: 'learned', currentRanks: 4, maxRanks: 5, connections: ['endurance'] },
      
      { id: 'armor_mastery', name: 'Armor Mastery', icon: '🛡️', tier: 2, x: 300, y: 150, status: 'learned', currentRanks: 2, maxRanks: 3, connections: ['shield_wall'] },
      { id: 'spell_power', name: 'Spell Power', icon: '✨', tier: 2, x: 300, y: 250, status: 'available', currentRanks: 0, maxRanks: 3, connections: ['arcane_mastery'] },
      { id: 'endurance', name: 'Endurance', icon: '🏃', tier: 2, x: 300, y: 350, status: 'locked', currentRanks: 0, maxRanks: 3, connections: ['speed_boost'] },
      
      { id: 'shield_wall', name: 'Shield Wall', icon: '⚔️', tier: 3, x: 500, y: 100, status: 'available', currentRanks: 0, maxRanks: 1, connections: ['fortress'] },
      { id: 'arcane_mastery', name: 'Arcane Mastery', icon: '🔮', tier: 3, x: 500, y: 250, status: 'locked', currentRanks: 0, maxRanks: 1, connections: ['time_warp'] },
      { id: 'speed_boost', name: 'Speed Boost', icon: '⚡', tier: 3, x: 500, y: 400, status: 'locked', currentRanks: 0, maxRanks: 1, connections: ['haste'] },
      
      { id: 'fortress', name: 'Fortress', icon: '🏰', tier: 4, x: 700, y: 150, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] },
      { id: 'time_warp', name: 'Time Warp', icon: '🌀', tier: 4, x: 700, y: 250, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] },
      { id: 'haste', name: 'Haste', icon: '💨', tier: 4, x: 700, y: 350, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] }
    ],
    combat: [
      { id: 'weapon_mastery', name: 'Weapon Mastery', icon: '⚔️', tier: 1, x: 100, y: 200, status: 'learned', currentRanks: 3, maxRanks: 5, connections: ['critical_strike'] },
      { id: 'critical_strike', name: 'Critical Strike', icon: '💥', tier: 2, x: 300, y: 200, status: 'learned', currentRanks: 2, maxRanks: 3, connections: ['berserker_rage'] },
      { id: 'berserker_rage', name: 'Berserker Rage', icon: '😡', tier: 3, x: 500, y: 200, status: 'available', currentRanks: 0, maxRanks: 1, connections: ['execute'] },
      { id: 'execute', name: 'Execute', icon: '💀', tier: 4, x: 700, y: 200, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] }
    ],
    magic: [
      { id: 'elemental_affinity', name: 'Elemental Affinity', icon: '🔥', tier: 1, x: 100, y: 150, status: 'learned', currentRanks: 4, maxRanks: 5, connections: ['fire_mastery', 'ice_mastery'] },
      { id: 'fire_mastery', name: 'Fire Mastery', icon: '🔥', tier: 2, x: 300, y: 100, status: 'learned', currentRanks: 3, maxRanks: 3, connections: ['meteor'] },
      { id: 'ice_mastery', name: 'Ice Mastery', icon: '❄️', tier: 2, x: 300, y: 200, status: 'available', currentRanks: 0, maxRanks: 3, connections: ['blizzard'] },
      { id: 'meteor', name: 'Meteor', icon: '☄️', tier: 3, x: 500, y: 100, status: 'available', currentRanks: 0, maxRanks: 1, connections: [] },
      { id: 'blizzard', name: 'Blizzard', icon: '🌨️', tier: 3, x: 500, y: 200, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] }
    ],
    utility: [
      { id: 'resource_finder', name: 'Resource Finder', icon: '💎', tier: 1, x: 100, y: 200, status: 'learned', currentRanks: 2, maxRanks: 5, connections: ['lucky_break'] },
      { id: 'lucky_break', name: 'Lucky Break', icon: '🍀', tier: 2, x: 300, y: 200, status: 'available', currentRanks: 0, maxRanks: 3, connections: ['treasure_hunter'] },
      { id: 'treasure_hunter', name: 'Treasure Hunter', icon: '🗝️', tier: 3, x: 500, y: 200, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] }
    ],
    mastery: [
      { id: 'experience_master', name: 'Experience Master', icon: '📈', tier: 1, x: 100, y: 150, status: 'learned', currentRanks: 3, maxRanks: 5, connections: ['skill_master'] },
      { id: 'skill_master', name: 'Skill Master', icon: '🎯', tier: 2, x: 300, y: 150, status: 'available', currentRanks: 0, maxRanks: 3, connections: ['grandmaster'] },
      { id: 'legendary_status', name: 'Legendary Status', icon: '👑', tier: 1, x: 100, y: 300, status: 'researched', currentRanks: 0, maxRanks: 1, connections: ['immortal'] },
      { id: 'grandmaster', name: 'Grandmaster', icon: '✨', tier: 3, x: 500, y: 150, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] },
      { id: 'immortal', name: 'Immortal', icon: '🌟', tier: 3, x: 500, y: 300, status: 'locked', currentRanks: 0, maxRanks: 1, connections: [] }
    ]
  };

  const talents = treeData[category] || treeData.core;
  const connections = generateConnections(talents);
  
  return `
    <div class="tree-background w-full h-full relative">
      <!-- Talent Connections -->
      ${connections}
      
      <!-- Talent Nodes -->
      ${talents.map(talent => `
        <div class="talent-node ${talent.status}" 
             style="left: ${talent.x}px; top: ${talent.y}px;"
             data-talent-id="${talent.id}"
             data-talent-name="${talent.name}"
             data-talent-tier="${talent.tier}"
             data-talent-current-ranks="${talent.currentRanks}"
             data-talent-max-ranks="${talent.maxRanks}"
             data-talent-status="${talent.status}"
             data-talent-type="${getTalentType(talent.id)}"
             data-talent-description="${getTalentDescription(talent.id)}"
             data-talent-effects='${JSON.stringify(getTalentEffects(talent.id))}'
             data-talent-requirements='${JSON.stringify(getTalentRequirements(talent.id, talent.tier))}'>
          
          <div class="talent-tier-indicator">T${talent.tier}</div>
          <div class="talent-icon">${talent.icon}</div>
          <div class="talent-name">${talent.name.split(' ').join('<br>')}</div>
          
          ${talent.currentRanks > 0 ? `<div class="talent-points">${talent.currentRanks}/${talent.maxRanks}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

function generateConnections(talents: any[]): string {
  let connectionsHtml = '';
  
  talents.forEach(talent => {
    if (talent.connections && talent.connections.length > 0) {
      talent.connections.forEach((connectedId: string) => {
        const connectedTalent = talents.find(t => t.id === connectedId);
        if (connectedTalent) {
          const startX = talent.x + 80; // Node width
          const startY = talent.y + 40; // Half node height
          const endX = connectedTalent.x;
          
          const width = Math.abs(endX - startX);
          const isActive = talent.status === 'learned' || talent.status === 'mastered';
          
          connectionsHtml += `
            <div class="talent-connection ${isActive ? 'active' : ''}"
                 style="left: ${startX}px; top: ${startY - 2}px; width: ${width}px;"></div>
          `;
        }
      });
    }
  });
  
  return connectionsHtml;
}

function getTalentType(talentId: string): string {
  const typeMap: { [key: string]: string } = {
    'health_boost': 'Passive',
    'mana_boost': 'Passive',
    'stamina_boost': 'Passive',
    'armor_mastery': 'Passive',
    'spell_power': 'Passive',
    'endurance': 'Passive',
    'shield_wall': 'Active',
    'arcane_mastery': 'Passive',
    'speed_boost': 'Active',
    'fortress': 'Ultimate',
    'time_warp': 'Ultimate',
    'haste': 'Active',
    'weapon_mastery': 'Passive',
    'critical_strike': 'Passive',
    'berserker_rage': 'Active',
    'execute': 'Active',
    'elemental_affinity': 'Passive',
    'fire_mastery': 'Passive',
    'ice_mastery': 'Passive',
    'meteor': 'Active',
    'blizzard': 'Active',
    'resource_finder': 'Passive',
    'lucky_break': 'Passive',
    'treasure_hunter': 'Passive',
    'experience_master': 'Passive',
    'skill_master': 'Passive',
    'legendary_status': 'Passive',
    'grandmaster': 'Ultimate',
    'immortal': 'Ultimate'
  };
  return typeMap[talentId] || 'Unknown';
}

function getTalentDescription(talentId: string): string {
  const descriptions: { [key: string]: string } = {
    'health_boost': 'Increases maximum health by 10% per rank.',
    'mana_boost': 'Increases maximum mana by 8% per rank.',
    'stamina_boost': 'Increases maximum stamina by 12% per rank.',
    'armor_mastery': 'Reduces physical damage taken by 5% per rank.',
    'spell_power': 'Increases spell damage by 15% per rank.',
    'endurance': 'Increases stamina regeneration by 20% per rank.',
    'shield_wall': 'Grants temporary immunity to damage for 3 seconds.',
    'arcane_mastery': 'Unlocks advanced magical abilities and increases mana efficiency.',
    'speed_boost': 'Increases movement speed by 50% for 10 seconds.',
    'fortress': 'Become immovable and gain massive damage reduction.',
    'time_warp': 'Manipulate time to gain additional actions.',
    'haste': 'Increases attack and casting speed by 30%.',
    'weapon_mastery': 'Increases weapon damage by 8% per rank.',
    'critical_strike': 'Increases critical hit chance by 5% per rank.',
    'berserker_rage': 'Enter a rage state, increasing damage but reducing defense.',
    'execute': 'Deal massive damage to enemies below 25% health.',
    'elemental_affinity': 'Increases elemental damage by 6% per rank.',
    'fire_mastery': 'Master fire magic, unlocking powerful fire spells.',
    'ice_mastery': 'Master ice magic, unlocking powerful ice spells.',
    'meteor': 'Call down a devastating meteor strike.',
    'blizzard': 'Create a massive blizzard that damages all enemies.',
    'resource_finder': 'Increases chance to find rare materials by 10% per rank.',
    'lucky_break': 'Increases critical resource finds by 15% per rank.',
    'treasure_hunter': 'Unlock hidden treasure locations and rare loot.',
    'experience_master': 'Gain 15% more experience per rank.',
    'skill_master': 'Reduce skill training time by 20% per rank.',
    'legendary_status': 'Become a legend, unlocking unique abilities.',
    'grandmaster': 'Achieve mastery in all skills.',
    'immortal': 'Transcend mortality itself.'
  };
  return descriptions[talentId] || 'No description available.';
}

function getTalentEffects(talentId: string): string[] {
  const effects: { [key: string]: string[] } = {
    'health_boost': ['+50 Health per rank', 'Unlocks at Character Level 1'],
    'mana_boost': ['+40 Mana per rank', 'Unlocks at Character Level 1'],
    'stamina_boost': ['+60 Stamina per rank', 'Unlocks at Character Level 1'],
    'armor_mastery': ['+2 Armor Rating per rank', 'Damage reduction scaling'],
    'spell_power': ['+10 Spell Damage per rank', 'Affects all magic schools'],
    'endurance': ['+1 Stamina/sec per rank', 'Out of combat only'],
    'shield_wall': ['3 second immunity', '60 second cooldown', 'Cannot move while active'],
    'arcane_mastery': ['Unlock Tier 4 spells', '+25% Mana efficiency', 'New spell combinations'],
    'speed_boost': ['+50% Movement Speed', '10 second duration', '30 second cooldown'],
    'fortress': ['95% Damage Reduction', 'Immunity to knockdown', '5 minute cooldown'],
    'time_warp': ['+2 Actions per turn', '3 turn duration', 'Once per combat'],
    'haste': ['+30% Attack Speed', '+30% Cast Speed', '15 second duration'],
    'weapon_mastery': ['+4 Weapon Damage per rank', 'Applies to all weapon types'],
    'critical_strike': ['+5% Crit Chance per rank', 'Affects spells and attacks'],
    'berserker_rage': ['+50% Damage', '-25% Defense', '20 second duration'],
    'execute': ['500% weapon damage', 'Only usable below 25% enemy health'],
    'elemental_affinity': ['+3 Fire/Ice/Lightning damage per rank', 'Resistance penetration'],
    'fire_mastery': ['Unlock Meteor', '+25% Fire damage', 'Fire spells cost 20% less'],
    'ice_mastery': ['Unlock Blizzard', '+25% Ice damage', 'Freeze chance +15%'],
    'meteor': ['800-1200 Area Damage', '4 second cast time', '5 minute cooldown'],
    'blizzard': ['200 damage/sec for 10 seconds', 'Large area effect', '3 minute cooldown'],
    'resource_finder': ['+10% Rare material chance per rank', 'Applies to all gathering'],
    'lucky_break': ['+15% Critical gathering per rank', 'Double resource chance'],
    'treasure_hunter': ['Reveal hidden treasures', '+50% Chest loot quality'],
    'experience_master': ['+15% XP gain per rank', 'Applies to all activities'],
    'skill_master': ['-20% Training time per rank', 'Faster skill progression'],
    'legendary_status': ['Unlock Legendary quests', '+100% Reputation gain'],
    'grandmaster': ['Max all skill caps', 'Unique crafting recipes'],
    'immortal': ['Cannot die from damage', 'Regenerate from fatal wounds']
  };
  return effects[talentId] || ['No effects defined'];
}

function getTalentRequirements(talentId: string, tier: number): { level: number; points: number; prerequisites: string[] } {
  const baseRequirements = {
    1: { level: 1, points: 0 },
    2: { level: 10, points: 5 },
    3: { level: 25, points: 15 },
    4: { level: 50, points: 30 }
  };

  const base = baseRequirements[tier as keyof typeof baseRequirements] || { level: 1, points: 0 };
  
  const prerequisites: { [key: string]: string[] } = {
    'armor_mastery': ['health_boost'],
    'spell_power': ['mana_boost'],
    'endurance': ['stamina_boost'],
    'shield_wall': ['armor_mastery'],
    'arcane_mastery': ['spell_power'],
    'speed_boost': ['endurance'],
    'fortress': ['shield_wall'],
    'time_warp': ['arcane_mastery'],
    'haste': ['speed_boost'],
    'critical_strike': ['weapon_mastery'],
    'berserker_rage': ['critical_strike'],
    'execute': ['berserker_rage'],
    'fire_mastery': ['elemental_affinity'],
    'ice_mastery': ['elemental_affinity'],
    'meteor': ['fire_mastery'],
    'blizzard': ['ice_mastery'],
    'lucky_break': ['resource_finder'],
    'treasure_hunter': ['lucky_break'],
    'skill_master': ['experience_master'],
    'grandmaster': ['skill_master'],
    'immortal': ['legendary_status']
  };

  return {
    level: base.level,
    points: base.points,
    prerequisites: prerequisites[talentId] || []
  };
}

function generateCreateTalentContent(): string {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Column: Basic Info -->
      <div class="space-y-4">
        <div>
          <label class="block text-white/70 text-sm font-medium mb-2">Talent Name</label>
          <input type="text" class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none" placeholder="Enter talent name...">
        </div>
        
        <div>
          <label class="block text-white/70 text-sm font-medium mb-2">Icon</label>
          <div class="flex gap-2 flex-wrap">
            <button class="talent-icon-btn w-12 h-12 bg-black/40 border border-white/20 rounded-lg hover:border-cyan-400/50 flex items-center justify-center text-2xl">⚔️</button>
            <button class="talent-icon-btn w-12 h-12 bg-black/40 border border-white/20 rounded-lg hover:border-cyan-400/50 flex items-center justify-center text-2xl">🛡️</button>
            <button class="talent-icon-btn w-12 h-12 bg-black/40 border border-white/20 rounded-lg hover:border-cyan-400/50 flex items-center justify-center text-2xl">✨</button>
            <button class="talent-icon-btn w-12 h-12 bg-black/40 border border-white/20 rounded-lg hover:border-cyan-400/50 flex items-center justify-center text-2xl">🔥</button>
            <button class="talent-icon-btn w-12 h-12 bg-black/40 border border-white/20 rounded-lg hover:border-cyan-400/50 flex items-center justify-center text-2xl">❄️</button>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-white/70 text-sm font-medium mb-2">Tier</label>
            <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none">
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
              <option value="4">Tier 4</option>
            </select>
          </div>
          <div>
            <label class="block text-white/70 text-sm font-medium mb-2">Max Ranks</label>
            <input type="number" min="1" max="10" value="1" class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none">
          </div>
        </div>
      </div>
      
      <!-- Right Column: Advanced Settings -->
      <div class="space-y-4">
        <div>
          <label class="block text-white/70 text-sm font-medium mb-2">Description</label>
          <textarea class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none h-24 resize-none" placeholder="Describe the talent's effects..."></textarea>
        </div>
        
        <div>
          <label class="block text-white/70 text-sm font-medium mb-2">Type</label>
          <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none">
            <option value="passive">Passive</option>
            <option value="active">Active</option>
            <option value="ultimate">Ultimate</option>
          </select>
        </div>
        
        <div>
          <label class="block text-white/70 text-sm font-medium mb-2">Category</label>
          <select class="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:border-cyan-400/50 focus:outline-none">
            <option value="core">Core Abilities</option>
            <option value="combat">Combat</option>
            <option value="magic">Magic</option>
            <option value="utility">Utility</option>
            <option value="mastery">Mastery</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
      <button class="close-modal px-6 py-2 bg-gray-600/80 hover:bg-gray-600 text-white rounded-lg transition-all duration-200">Cancel</button>
      <button class="px-6 py-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg transition-all duration-200">Create Talent</button>
    </div>
  `;
}

function generateResearchUnlocksContent(): string {
  return `
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-white text-lg font-bold">Available Research Unlocks</h4>
        <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
          <div class="w-4 h-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
          <span class="text-purple-300 text-sm font-bold">89</span>
          <span class="text-white/70 text-xs">essence</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto custom-scrollbar">
        <!-- Discovered Unlocks -->
        <div class="research-unlock-item bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400/50 transition-all duration-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-lg flex items-center justify-center text-2xl">👑</div>
            <div class="flex-1">
              <h5 class="text-white font-bold">Legendary Status</h5>
              <p class="text-purple-300 text-sm">Mastery Tree - Tier 1</p>
            </div>
          </div>
          <p class="text-white/70 text-sm mb-3">Become a legend, unlocking unique abilities and legendary quest lines.</p>
          <div class="flex justify-between items-center">
            <div class="flex gap-4">
              <span class="unlock-cost">25 Essence</span>
              <span class="unlock-time">2 hours</span>
            </div>
            <button class="px-3 py-1 bg-purple-600/80 hover:bg-purple-600 text-white text-sm rounded transition-all duration-200">Research</button>
          </div>
        </div>
        
        <div class="research-unlock-item bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/50 transition-all duration-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-lg flex items-center justify-center text-2xl">🌀</div>
            <div class="flex-1">
              <h5 class="text-white font-bold">Time Warp</h5>
              <p class="text-blue-300 text-sm">Core Tree - Tier 4</p>
            </div>
          </div>
          <p class="text-white/70 text-sm mb-3">Manipulate time itself to gain additional actions in combat.</p>
          <div class="flex justify-between items-center">
            <div class="flex gap-4">
              <span class="unlock-cost">40 Essence</span>
              <span class="unlock-time">4 hours</span>
            </div>
            <button class="px-3 py-1 bg-blue-600/80 hover:bg-blue-600 text-white text-sm rounded transition-all duration-200">Research</button>
          </div>
        </div>
        
        <div class="research-unlock-item bg-gradient-to-br from-red-900/40 to-red-800/40 border border-red-500/30 rounded-lg p-4 hover:border-red-400/50 transition-all duration-200">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-lg flex items-center justify-center text-2xl">☄️</div>
            <div class="flex-1">
              <h5 class="text-white font-bold">Meteor</h5>
              <p class="text-red-300 text-sm">Magic Tree - Tier 3</p>
            </div>
          </div>
          <p class="text-white/70 text-sm mb-3">Call down devastating meteors to crush your enemies.</p>
          <div class="flex justify-between items-center">
            <div class="flex gap-4">
              <span class="unlock-cost">30 Essence</span>
              <span class="unlock-time">3 hours</span>
            </div>
            <button class="px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white text-sm rounded transition-all duration-200">Research</button>
          </div>
        </div>
        
        <!-- Undiscovered Unlocks -->
        <div class="research-unlock-item bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-gray-500/30 rounded-lg p-4 opacity-60">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-500/30 to-gray-600/30 rounded-lg flex items-center justify-center text-2xl">❓</div>
            <div class="flex-1">
              <h5 class="text-white font-bold">??? Unknown Talent</h5>
              <p class="text-gray-300 text-sm">??? Tree - Tier ???</p>
            </div>
          </div>
          <p class="text-white/70 text-sm mb-3">This talent remains hidden. Complete more research to discover it.</p>
          <div class="flex justify-between items-center">
            <div class="flex gap-4">
              <span class="text-gray-400">??? Essence</span>
              <span class="text-gray-400">??? time</span>
            </div>
            <button class="px-3 py-1 bg-gray-600/80 text-gray-400 text-sm rounded cursor-not-allowed" disabled>Locked</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end gap-3 pt-4 border-t border-white/10">
      <button class="close-modal px-6 py-2 bg-gray-600/80 hover:bg-gray-600 text-white rounded-lg transition-all duration-200">Close</button>
      <button class="px-6 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-all duration-200" disabled>Start Research</button>
    </div>
  `;
}

// Global variables for talent tree state
let currentTreeCategory: string = 'core';

// Initialize talent tree functionality
export function initializeTalents() {
  console.log('🌟 Initializing talent tree functionality...');
  
  // Category tab switching
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const categoryTab = target.closest('.tree-category-tab') as HTMLElement;
    
    if (categoryTab && categoryTab.dataset.category) {
      const category = categoryTab.dataset.category;
      
      // Update active tab
      document.querySelectorAll('.tree-category-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('bg-black/30', 'border', 'border-white/20', 'text-white/70');
        tab.classList.remove('bg-gradient-to-r', 'from-cyan-500/80', 'to-cyan-600/80', 'text-white');
      });
      
      categoryTab.classList.add('active');
      categoryTab.classList.remove('bg-black/30', 'border', 'border-white/20', 'text-white/70');
      categoryTab.classList.add('bg-gradient-to-r', 'from-cyan-500/80', 'to-cyan-600/80', 'text-white');
      
      // Update tree content
      currentTreeCategory = category;
      console.log(`📂 Switched to ${currentTreeCategory} talent tree`);
      const treeCanvas = document.getElementById('talent-tree-canvas');
      if (treeCanvas) {
        treeCanvas.innerHTML = generateHorizontalTalentTree(category);
      }
    }
  });
  
  // Talent node interactions
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const talentNode = target.closest('.talent-node') as HTMLElement;
    
    if (talentNode) {
      const talentData = {
        id: talentNode.dataset.talentId,
        name: talentNode.dataset.talentName,
        tier: talentNode.dataset.talentTier,
        currentRanks: talentNode.dataset.talentCurrentRanks,
        maxRanks: talentNode.dataset.talentMaxRanks,
        status: talentNode.dataset.talentStatus,
        type: talentNode.dataset.talentType,
        description: talentNode.dataset.talentDescription,
        effects: JSON.parse(talentNode.dataset.talentEffects || '[]'),
        requirements: JSON.parse(talentNode.dataset.talentRequirements || '{}')
      };
      
      updateTalentDetailsPanel(talentData);
    }
  });
  
  // Modal functionality
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    // Open modals
    if (target.id === 'create-talent-btn') {
      openModal('create-talent-modal');
    } else if (target.id === 'research-unlocks-btn') {
      openModal('research-unlocks-modal');
    }
    
    // Close modals
    if (target.classList.contains('close-modal') || target.closest('.close-modal')) {
      closeAllModals();
    }
  });
  
  // Other button actions
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    
    if (target.id === 'create-ability-btn') {
      console.log('🔮 Create Ability clicked');
      // TODO: Implement ability creation
    } else if (target.id === 'save-build-btn') {
      console.log('💾 Save Build clicked');
      // TODO: Implement build saving
    } else if (target.id === 'reset-talents-btn') {
      console.log('🔄 Reset Tree clicked');
      // TODO: Implement talent reset
    }
  });
}

function updateTalentDetailsPanel(talentData: any) {
  const detailsPanel = document.getElementById('talent-details-panel');
  if (!detailsPanel) return;
  
  const statusColors = {
    'locked': 'text-gray-400',
    'available': 'text-green-400',
    'learned': 'text-cyan-400',
    'mastered': 'text-yellow-400',
    'researched': 'text-purple-400'
  };
  
  const statusColor = statusColors[talentData.status as keyof typeof statusColors] || 'text-white';
  
  detailsPanel.innerHTML = `
    <div class="space-y-6">
      <!-- Talent Header -->
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 border-2 border-cyan-500/50 rounded-xl flex items-center justify-center text-4xl shadow-lg">
          ${document.querySelector(`[data-talent-id="${talentData.id}"] .talent-icon`)?.textContent || '⭐'}
        </div>
        <h4 class="text-white text-xl font-bold">${talentData.name}</h4>
        <p class="${statusColor} text-sm font-medium uppercase tracking-wide">${talentData.status}</p>
        ${talentData.currentRanks > 0 ? `<p class="text-white/70 text-sm">Rank ${talentData.currentRanks}/${talentData.maxRanks}</p>` : ''}
      </div>
      
      <!-- Talent Info -->
      <div class="space-y-4">
        <div class="bg-black/30 border border-white/10 rounded-lg p-4">
          <h5 class="text-white font-bold mb-2">Description</h5>
          <p class="text-white/70 text-sm leading-relaxed">${talentData.description}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-black/30 border border-white/10 rounded-lg p-3">
            <h6 class="text-white font-bold text-sm mb-1">Type</h6>
            <p class="text-cyan-300 text-sm">${talentData.type}</p>
          </div>
          <div class="bg-black/30 border border-white/10 rounded-lg p-3">
            <h6 class="text-white font-bold text-sm mb-1">Tier</h6>
            <p class="text-cyan-300 text-sm">Tier ${talentData.tier}</p>
          </div>
        </div>
        
        <!-- Effects -->
        <div class="bg-black/30 border border-white/10 rounded-lg p-4">
          <h5 class="text-white font-bold mb-3">Effects</h5>
          <ul class="space-y-2">
            ${talentData.effects.map((effect: string) => `
              <li class="flex items-center gap-2 text-sm">
                <div class="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span class="text-white/70">${effect}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <!-- Requirements -->
        <div class="bg-black/30 border border-white/10 rounded-lg p-4">
          <h5 class="text-white font-bold mb-3">Requirements</h5>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-white/70">Character Level:</span>
              <span class="text-cyan-300">${talentData.requirements.level}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-white/70">Ability Points:</span>
              <span class="text-cyan-300">${talentData.requirements.points}</span>
            </div>
            ${talentData.requirements.prerequisites && talentData.requirements.prerequisites.length > 0 ? `
              <div>
                <span class="text-white/70">Prerequisites:</span>
                <div class="mt-1 space-y-1">
                  ${talentData.requirements.prerequisites.map((prereq: string) => `
                    <div class="text-yellow-300 text-xs">• ${prereq.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Action Buttons -->
        ${talentData.status === 'available' ? `
          <button class="w-full px-4 py-3 bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105">
            Learn Talent (1 Point)
          </button>
        ` : talentData.status === 'learned' && parseInt(talentData.currentRanks) < parseInt(talentData.maxRanks) ? `
          <button class="w-full px-4 py-3 bg-gradient-to-r from-cyan-600/80 to-cyan-700/80 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105">
            Upgrade Talent (1 Point)
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function openModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
  }
}

function closeAllModals() {
  const modals = document.querySelectorAll('[id$="-modal"]');
  modals.forEach(modal => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
  });
} 