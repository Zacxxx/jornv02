// Function to generate talent tree HTML
function generateTalentTree(treeType: string): string {
  const treeData: Record<string, any[]> = {
    combat: [
      { name: 'Weapon Mastery', tier: 1, status: 'learned', currentRanks: 3, maxRanks: 5 },
      { name: 'Critical Strike', tier: 1, status: 'learned', currentRanks: 2, maxRanks: 3 },
      { name: 'Berserker Rage', tier: 2, status: 'available', currentRanks: 0, maxRanks: 1 },
      { name: 'Dual Wield', tier: 2, status: 'locked', currentRanks: 0, maxRanks: 1 },
      { name: 'Execute', tier: 3, status: 'locked', currentRanks: 0, maxRanks: 1 }
    ],
    magic: [
      { name: 'Mana Efficiency', tier: 1, status: 'learned', currentRanks: 4, maxRanks: 5 },
      { name: 'Spell Power', tier: 1, status: 'learned', currentRanks: 3, maxRanks: 5 },
      { name: 'Elemental Focus', tier: 2, status: 'available', currentRanks: 0, maxRanks: 3 },
      { name: 'Arcane Mastery', tier: 2, status: 'locked', currentRanks: 0, maxRanks: 1 },
      { name: 'Time Warp', tier: 3, status: 'locked', currentRanks: 0, maxRanks: 1 }
    ],
    survival: [
      { name: 'Health Boost', tier: 1, status: 'learned', currentRanks: 5, maxRanks: 5 },
      { name: 'Armor Mastery', tier: 1, status: 'learned', currentRanks: 3, maxRanks: 5 },
      { name: 'Shield Wall', tier: 2, status: 'available', currentRanks: 0, maxRanks: 1 },
      { name: 'Last Stand', tier: 2, status: 'locked', currentRanks: 0, maxRanks: 1 },
      { name: 'Immortality', tier: 3, status: 'locked', currentRanks: 0, maxRanks: 1 }
    ],
    crafting: [
      { name: 'Tool Efficiency', tier: 1, status: 'learned', currentRanks: 2, maxRanks: 5 },
      { name: 'Resource Finder', tier: 1, status: 'learned', currentRanks: 4, maxRanks: 5 },
      { name: 'Master Crafter', tier: 2, status: 'available', currentRanks: 0, maxRanks: 3 },
      { name: 'Legendary Smith', tier: 2, status: 'locked', currentRanks: 0, maxRanks: 1 },
      { name: 'Divine Creation', tier: 3, status: 'locked', currentRanks: 0, maxRanks: 1 }
    ],
    passive: [
      { name: 'Experience Boost', tier: 1, status: 'learned', currentRanks: 3, maxRanks: 5 },
      { name: 'Luck', tier: 1, status: 'learned', currentRanks: 2, maxRanks: 3 },
      { name: 'Speed Boost', tier: 2, status: 'available', currentRanks: 0, maxRanks: 3 },
      { name: 'Aura Mastery', tier: 2, status: 'locked', currentRanks: 0, maxRanks: 1 },
      { name: 'Transcendence', tier: 3, status: 'locked', currentRanks: 0, maxRanks: 1 }
    ]
  };

  const talents = treeData[treeType] || treeData.combat;
  
  return `
    <div class="talent-tree">
      ${talents.map((talent, index) => `
        <div class="talent-node ${talent.status} bg-black/40 border-2 rounded-full flex items-center justify-center text-2xl relative" 
             data-talent-name="${talent.name}"
             data-talent-tier="${talent.tier}"
             data-talent-current-ranks="${talent.currentRanks}"
             data-talent-max-ranks="${talent.maxRanks}"
             data-status="${talent.status}"
             data-talent-type="passive"
             data-talent-description="Improves your ${talent.name.toLowerCase()} capabilities."
             data-talent-effects='["+${talent.maxRanks * 10}% effectiveness"]'
             data-talent-requirements='["Level ${talent.tier * 10}"]'
             style="grid-column: ${(index % 3) + 2}; grid-row: ${talent.tier + 1};">
          <span>${talent.status === 'locked' ? '🔒' : '⭐'}</span>
          ${talent.currentRanks > 0 ? `<div class="talent-points">${talent.currentRanks}/${talent.maxRanks}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

export function createAbilityListContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Left Panel: Ability Trees -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Abilities Header -->
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
              <h2 class="text-cyan-200 text-lg font-bold uppercase tracking-wider">Abilities & Talents</h2>
            </div>
            <div class="flex items-center gap-4">
              <!-- Available Points -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">15</span>
                <span class="text-white/70 text-xs">talent points</span>
              </div>
              <!-- Spent Points -->
              <div class="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <div class="w-4 h-4 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full"></div>
                <span class="text-white text-sm font-bold">35/50</span>
                <span class="text-white/70 text-xs">spent</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 mb-4">
            <button class="px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="auto-assign-btn">
              🤖 Auto Assign
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="save-build-btn">
              💾 Save Build
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="load-build-btn">
              📂 Load Build
            </button>
            <button class="px-4 py-2 bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-400 hover:to-red-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105" id="reset-abilities-btn">
              🔄 Reset All
            </button>
          </div>

          <!-- Talent Tree Tabs -->
          <div class="flex gap-2 flex-wrap">
            <button class="talent-tree-tab active px-3 py-1.5 bg-gradient-to-r from-cyan-500/80 to-cyan-600/80 text-white text-xs font-bold rounded-lg transition-all duration-200 hover:scale-105" data-tree="combat">
              ⚔️ Combat
            </button>
            <button class="talent-tree-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-tree="magic">
              ✨ Magic
            </button>
            <button class="talent-tree-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-tree="survival">
              🛡️ Survival
            </button>
            <button class="talent-tree-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-tree="crafting">
              🔧 Crafting
            </button>
            <button class="talent-tree-tab px-3 py-1.5 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-200" data-tree="passive">
              🌟 Passive
            </button>
          </div>
        </div>

        <!-- Talent Tree Container -->
        <div class="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div id="talent-tree-content">
            ${generateTalentTree('combat')}
          </div>
        </div>
      </div>

      <!-- Right Panel: Ability Details -->
      <div class="w-96 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-l-2 border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <h3 class="text-white text-lg font-bold uppercase tracking-wide">Ability Details</h3>
        </div>
        
        <div class="flex-1 p-4 overflow-y-auto custom-scrollbar" id="ability-details-panel">
          <div class="text-center text-white/50 py-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="m2 17 10 5 10-5"/>
                <path d="m2 12 10 5 10-5"/>
              </svg>
            </div>
            <p class="text-sm">Click an ability to view details</p>
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
        background: rgba(6, 182, 212, 0.6);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(6, 182, 212, 0.8);
      }

      .talent-tree-tab.active {
        background: linear-gradient(to right, rgba(6, 182, 212, 0.8), rgba(8, 145, 178, 0.8)) !important;
        border-color: rgba(6, 182, 212, 0.6) !important;
        color: white !important;
      }

      .talent-node {
        position: relative;
        width: 60px;
        height: 60px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .talent-node:hover {
        transform: scale(1.1);
        z-index: 10;
      }

      .talent-node.available {
        border-color: rgba(34, 197, 94, 0.8);
        background: rgba(34, 197, 94, 0.1);
        box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
      }

      .talent-node.locked {
        border-color: rgba(107, 114, 128, 0.6);
        background: rgba(0, 0, 0, 0.3);
        opacity: 0.6;
        cursor: not-allowed;
      }

      .talent-node.learned {
        border-color: rgba(6, 182, 212, 0.8);
        background: rgba(6, 182, 212, 0.2);
        box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
      }

      .talent-node.maxed {
        border-color: rgba(245, 158, 11, 0.8);
        background: rgba(245, 158, 11, 0.2);
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
      }

      .talent-points {
        position: absolute;
        bottom: -2px;
        right: -2px;
        background: rgba(6, 182, 212, 0.9);
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 2px 4px;
        border-radius: 8px;
        min-width: 16px;
        text-align: center;
      }

      .talent-connection {
        position: absolute;
        background: rgba(107, 114, 128, 0.4);
        z-index: 1;
      }

      .talent-connection.active {
        background: rgba(6, 182, 212, 0.6);
        box-shadow: 0 0 4px rgba(6, 182, 212, 0.4);
      }

      .talent-tree {
        position: relative;
        min-height: 800px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(10, 1fr);
        gap: 20px;
        padding: 20px;
      }

      .talent-tier {
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 20px;
      }

      .tier-label {
        position: absolute;
        left: -60px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        font-weight: bold;
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }
    </style>

    <script>
      let selectedAbility = null;

      document.addEventListener('DOMContentLoaded', function() {
        initializeAbilities();
      });

      function initializeAbilities() {
        // Tab functionality
        const treeTabs = document.querySelectorAll('.talent-tree-tab');
        treeTabs.forEach(tab => {
          tab.addEventListener('click', handleTreeTabClick);
        });

        // Talent node interaction
        const talentNodes = document.querySelectorAll('.talent-node');
        talentNodes.forEach(node => {
          node.addEventListener('click', handleTalentNodeClick);
        });

        // Action buttons
        document.getElementById('auto-assign-btn')?.addEventListener('click', () => {
          console.log('Auto-assigning talent points...');
        });

        document.getElementById('save-build-btn')?.addEventListener('click', () => {
          console.log('Saving current build...');
        });

        document.getElementById('load-build-btn')?.addEventListener('click', () => {
          console.log('Loading build...');
        });

        document.getElementById('reset-abilities-btn')?.addEventListener('click', () => {
          if (confirm('Are you sure you want to reset all abilities? This action cannot be undone.')) {
            console.log('Resetting all abilities...');
          }
        });
      }

      function handleTreeTabClick(event) {
        const treeTabs = document.querySelectorAll('.talent-tree-tab');
        treeTabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        const treeType = event.target.dataset.tree;
        const treeContent = document.getElementById('talent-tree-content');
        treeContent.innerHTML = generateTalentTree(treeType);
        
        // Re-initialize node listeners
        const talentNodes = document.querySelectorAll('.talent-node');
        talentNodes.forEach(node => {
          node.addEventListener('click', handleTalentNodeClick);
        });
      }

      function handleTalentNodeClick(event) {
        const node = event.currentTarget;
        const status = node.dataset.status;
        
        if (status === 'locked') {
          console.log('This talent is locked. Requirements not met.');
          return;
        }
        
        if (status === 'available') {
          // Logic to spend talent point
          console.log('Learning talent:', node.dataset.talentName);
        }
        
        document.querySelectorAll('.talent-node').forEach(n => n.classList.remove('selected'));
        node.classList.add('selected');
        showAbilityDetails(node);
        selectedAbility = node;
      }

      function showAbilityDetails(node) {
        const panel = document.getElementById('ability-details-panel');
        const abilityData = {
          name: node.dataset.talentName || 'Unknown Ability',
          description: node.dataset.talentDescription || 'No description available.',
          type: node.dataset.talentType || 'passive',
          tier: node.dataset.talentTier || '1',
          maxRanks: node.dataset.talentMaxRanks || '1',
          currentRanks: node.dataset.talentCurrentRanks || '0',
          effects: JSON.parse(node.dataset.talentEffects || '[]'),
          requirements: JSON.parse(node.dataset.talentRequirements || '[]'),
          status: node.dataset.status || 'locked'
        };
        
        panel.innerHTML = generateAbilityDetailsContent(abilityData);
      }

      function generateAbilityDetailsContent(ability) {
        const statusColors = {
          locked: '#6B7280',
          available: '#22C55E',
          learned: '#06B6D4',
          maxed: '#F59E0B'
        };

        const typeIcons = {
          active: '⚡',
          passive: '🌟',
          toggle: '🔄',
          ultimate: '💫'
        };
        
        return \`
          <div class="space-y-4">
            <div class="text-center">
              <div class="w-20 h-20 mx-auto mb-3 bg-black/40 border-2 rounded-lg flex items-center justify-center text-3xl" style="border-color: \${statusColors[ability.status]}">
                <span>\${typeIcons[ability.type] || '⭐'}</span>
              </div>
              <h3 class="font-bold text-xl mb-1 text-white">\${ability.name}</h3>
              <p class="text-white/70 text-sm capitalize">Tier \${ability.tier} • \${ability.type}</p>
              <p class="text-white/50 text-xs uppercase tracking-wide" style="color: \${statusColors[ability.status]}">\${ability.status}</p>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Description</h4>
              <p class="text-white/80 text-sm leading-relaxed">\${ability.description}</p>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3">
              <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Ranks</h4>
              <div class="flex justify-between items-center mb-2">
                <span class="text-white/70 text-sm">Current Rank</span>
                <span class="text-cyan-400 font-bold">\${ability.currentRanks}/\${ability.maxRanks}</span>
              </div>
              <div class="w-full bg-black/30 rounded-full h-2">
                <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full transition-all duration-300" style="width: \${(parseInt(ability.currentRanks) / parseInt(ability.maxRanks)) * 100}%"></div>
              </div>
            </div>

            \${ability.effects.length > 0 ? \`
              <div class="bg-black/20 border border-white/10 rounded-lg p-3">
                <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Effects</h4>
                <div class="space-y-1">
                  \${ability.effects.map(effect => \`
                    <div class="text-green-400 text-sm">• \${effect}</div>
                  \`).join('')}
                </div>
              </div>
            \` : ''}

            \${ability.requirements.length > 0 ? \`
              <div class="bg-black/20 border border-white/10 rounded-lg p-3">
                <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Requirements</h4>
                <div class="space-y-1">
                  \${ability.requirements.map(req => \`
                    <div class="text-yellow-400 text-sm">• \${req}</div>
                  \`).join('')}
                </div>
              </div>
            \` : ''}

            \${ability.status === 'available' ? \`
              <div class="space-y-2">
                <button class="w-full px-4 py-2 bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  ⬆️ Learn Ability (1 Point)
                </button>
              </div>
            \` : ability.status === 'learned' && parseInt(ability.currentRanks) < parseInt(ability.maxRanks) ? \`
              <div class="space-y-2">
                <button class="w-full px-4 py-2 bg-gradient-to-r from-cyan-500/80 to-cyan-600/80 hover:from-cyan-400 hover:to-cyan-500 text-white text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105">
                  ⬆️ Upgrade Ability (1 Point)
                </button>
              </div>
            \` : ''}
          </div>
        \`;
      }
    </script>
  `;
} 