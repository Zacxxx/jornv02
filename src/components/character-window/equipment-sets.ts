export function createEquipmentSetsContent(): string {
  return `
    <div class="h-full flex flex-col space-y-4 p-4">
      <!-- Equipment Sets Header -->
      <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-amber-500/30 rounded-xl p-4 flex-shrink-0 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-amber-500/30 to-amber-600/30 border border-amber-500/50 rounded-lg flex items-center justify-center shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-amber-300">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h4 class="text-amber-200 text-base font-bold uppercase tracking-wider">Equipment & Sets</h4>
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1.5 bg-gradient-to-r from-green-500/90 to-green-600/90 hover:from-green-400 hover:to-green-500 text-white text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105">
              Save Set
            </button>
            <button class="px-3 py-1.5 bg-gradient-to-r from-blue-500/90 to-blue-600/90 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105">
              Load Set
            </button>
          </div>
        </div>
        
        <!-- Quick Set Selector -->
        <div class="grid grid-cols-3 gap-2">
          <button class="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-2 hover:border-purple-400/50 transition-all duration-300">
            <div class="text-purple-300 text-xs font-bold">Combat Set</div>
            <div class="text-purple-400/70 text-xs">+15% DPS</div>
          </button>
          <button class="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-2 hover:border-blue-400/50 transition-all duration-300">
            <div class="text-blue-300 text-xs font-bold">Tank Set</div>
            <div class="text-blue-400/70 text-xs">+20% Defense</div>
          </button>
          <button class="bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-2 hover:border-green-400/50 transition-all duration-300">
            <div class="text-green-300 text-xs font-bold">Healing Set</div>
            <div class="text-green-400/70 text-xs">+25% Healing</div>
          </button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 overflow-hidden">
        <!-- Left: Advanced Stats -->
        <div class="space-y-4 overflow-y-auto">
          <!-- Combat Stats -->
          <div class="bg-gradient-to-br from-red-900/40 to-red-800/40 border border-red-500/30 rounded-xl p-4 shadow-lg">
            <h5 class="text-red-300 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              Combat Statistics
            </h5>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-black/30 border border-red-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Attack Power</div>
                <div class="text-red-300 text-lg font-bold">2,847</div>
                <div class="text-red-400/70 text-xs">+156 from gear</div>
              </div>
              <div class="bg-black/30 border border-red-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Critical Strike</div>
                <div class="text-red-300 text-lg font-bold">24.5%</div>
                <div class="text-red-400/70 text-xs">+8.2% from gear</div>
              </div>
              <div class="bg-black/30 border border-red-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Haste</div>
                <div class="text-red-300 text-lg font-bold">18.7%</div>
                <div class="text-red-400/70 text-xs">+6.1% from gear</div>
              </div>
              <div class="bg-black/30 border border-red-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Mastery</div>
                <div class="text-red-300 text-lg font-bold">31.2%</div>
                <div class="text-red-400/70 text-xs">+12.8% from gear</div>
              </div>
            </div>
          </div>

          <!-- Defensive Stats -->
          <div class="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-xl p-4 shadow-lg">
            <h5 class="text-blue-300 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Defensive Statistics
            </h5>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-black/30 border border-blue-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Armor</div>
                <div class="text-blue-300 text-lg font-bold">4,892</div>
                <div class="text-blue-400/70 text-xs">32% damage reduction</div>
              </div>
              <div class="bg-black/30 border border-blue-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Block Chance</div>
                <div class="text-blue-300 text-lg font-bold">15.3%</div>
                <div class="text-blue-400/70 text-xs">+5.8% from gear</div>
              </div>
              <div class="bg-black/30 border border-blue-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Dodge</div>
                <div class="text-blue-300 text-lg font-bold">12.1%</div>
                <div class="text-blue-400/70 text-xs">+4.2% from gear</div>
              </div>
              <div class="bg-black/30 border border-blue-500/20 rounded-lg p-2">
                <div class="text-white/90 text-xs font-medium">Parry</div>
                <div class="text-blue-300 text-lg font-bold">8.7%</div>
                <div class="text-blue-400/70 text-xs">+3.1% from gear</div>
              </div>
            </div>
          </div>

          <!-- Resistances -->
          <div class="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-xl p-4 shadow-lg">
            <h5 class="text-purple-300 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              Resistances
            </h5>
            <div class="space-y-2">
              <div class="flex justify-between items-center p-2 bg-black/30 border border-purple-500/20 rounded-lg">
                <span class="text-white/90 text-xs font-medium">Fire Resistance</span>
                <span class="text-orange-300 text-sm font-bold">156</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 border border-purple-500/20 rounded-lg">
                <span class="text-white/90 text-xs font-medium">Frost Resistance</span>
                <span class="text-cyan-300 text-sm font-bold">142</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 border border-purple-500/20 rounded-lg">
                <span class="text-white/90 text-xs font-medium">Nature Resistance</span>
                <span class="text-green-300 text-sm font-bold">128</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Set Bonuses & Equipment -->
        <div class="space-y-4 overflow-y-auto">
          <!-- Active Set Bonuses -->
          <div class="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-500/30 rounded-xl p-4 shadow-lg">
            <h5 class="text-yellow-300 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Active Set Bonuses
            </h5>
            <div class="space-y-3">
              <!-- Tier 9 Set -->
              <div class="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-3">
                <div class="flex justify-between items-center mb-2">
                  <div class="text-purple-300 text-sm font-bold">Lightsworn Battlegear</div>
                  <div class="text-purple-400/70 text-xs">4/5 pieces</div>
                </div>
                <div class="space-y-1">
                  <div class="text-green-300 text-xs">✓ (2) Set: +10% healing done</div>
                  <div class="text-green-300 text-xs">✓ (4) Set: Reduces cooldown by 2 sec</div>
                  <div class="text-gray-400 text-xs">○ (5) Set: +15% critical strike chance</div>
                </div>
              </div>

              <!-- Legendary Set -->
              <div class="bg-gradient-to-r from-orange-900/40 to-red-900/40 border border-orange-500/30 rounded-lg p-3">
                <div class="flex justify-between items-center mb-2">
                  <div class="text-orange-300 text-sm font-bold">Shadowmourne Set</div>
                  <div class="text-orange-400/70 text-xs">2/3 pieces</div>
                </div>
                <div class="space-y-1">
                  <div class="text-green-300 text-xs">✓ (2) Set: +25% shadow damage</div>
                  <div class="text-gray-400 text-xs">○ (3) Set: Chaos Bolt ability unlocked</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Equipment Comparison -->
          <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/20 rounded-xl p-4 shadow-lg">
            <h5 class="text-white text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Equipment Comparison
            </h5>
            <div class="space-y-3">
              <div class="bg-black/30 border border-white/20 rounded-lg p-3">
                <div class="flex justify-between items-center mb-2">
                  <div class="text-white text-sm font-semibold">Current vs Alternative</div>
                  <button class="px-2 py-1 bg-blue-500/80 hover:bg-blue-500 text-white text-xs font-bold rounded transition-all duration-200">
                    Compare
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div class="text-purple-300 font-semibold">[T9] Lightsworn Helm</div>
                    <div class="text-green-300">+156 Stamina</div>
                    <div class="text-blue-300">+89 Intellect</div>
                  </div>
                  <div>
                    <div class="text-orange-300 font-semibold">[232] Crown of Torment</div>
                    <div class="text-green-300">+178 Stamina (+22)</div>
                    <div class="text-blue-300">+92 Intellect (+3)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enchantments & Gems -->
          <div class="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-xl p-4 shadow-lg">
            <h5 class="text-emerald-300 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Enhancements
            </h5>
            <div class="space-y-2">
              <div class="flex justify-between items-center p-2 bg-black/30 border border-emerald-500/20 rounded-lg">
                <span class="text-white/90 text-xs font-medium">Enchantments</span>
                <span class="text-emerald-300 text-sm font-bold">12/16</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 border border-emerald-500/20 rounded-lg">
                <span class="text-white/90 text-xs font-medium">Gems Socketed</span>
                <span class="text-emerald-300 text-sm font-bold">8/12</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 border border-emerald-500/20 rounded-lg">
                <span class="text-white/90 text-xs font-medium">Meta Gem Active</span>
                <span class="text-green-300 text-sm font-bold">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
} 