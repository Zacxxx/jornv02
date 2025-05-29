export function createTransmogWardrobeContent(): string {
  return `
    <div class="h-full flex flex-col space-y-4 p-4">
      <!-- Transmog Header -->
      <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-pink-500/30 rounded-xl p-4 flex-shrink-0 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-pink-500/30 to-pink-600/30 border border-pink-500/50 rounded-lg flex items-center justify-center shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-pink-300">
                <circle cx="13.5" cy="6.5" r=".5"/>
                <circle cx="17.5" cy="10.5" r=".5"/>
                <circle cx="8.5" cy="7.5" r=".5"/>
                <circle cx="6.5" cy="12.5" r=".5"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
              </svg>
            </div>
            <h4 class="text-pink-200 text-base font-bold uppercase tracking-wider">Transmog Wardrobe</h4>
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1.5 bg-gradient-to-r from-purple-500/90 to-purple-600/90 hover:from-purple-400 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105">
              Save Look
            </button>
            <button class="px-3 py-1.5 bg-gradient-to-r from-pink-500/90 to-pink-600/90 hover:from-pink-400 hover:to-pink-500 text-white text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105">
              Apply Changes
            </button>
          </div>
        </div>
        
        <!-- Quick Outfit Selector -->
        <div class="grid grid-cols-4 gap-2">
          <button class="bg-gradient-to-r from-red-900/40 to-red-800/40 border border-red-500/30 rounded-lg p-2 hover:border-red-400/50 transition-all duration-300">
            <div class="text-red-300 text-xs font-bold">Warrior</div>
            <div class="text-red-400/70 text-xs">Battle Ready</div>
          </button>
          <button class="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-2 hover:border-blue-400/50 transition-all duration-300">
            <div class="text-blue-300 text-xs font-bold">Mage</div>
            <div class="text-blue-400/70 text-xs">Arcane Scholar</div>
          </button>
          <button class="bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-2 hover:border-green-400/50 transition-all duration-300">
            <div class="text-green-300 text-xs font-bold">Ranger</div>
            <div class="text-green-400/70 text-xs">Forest Guardian</div>
          </button>
          <button class="bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-2 hover:border-purple-400/50 transition-all duration-300">
            <div class="text-purple-300 text-xs font-bold">Shadow</div>
            <div class="text-purple-400/70 text-xs">Dark Arts</div>
          </button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0 overflow-hidden">
        <!-- Left: Equipment Slots -->
        <div class="space-y-4 overflow-y-auto">
          <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/20 rounded-xl p-4 shadow-lg">
            <h5 class="text-white text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Equipment Slots
            </h5>
            <div class="space-y-2">
              <!-- Head -->
              <div class="flex items-center gap-3 p-2 bg-black/30 border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-lg flex items-center justify-center">
                  <span class="text-sm">🪖</span>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm font-semibold">Head</div>
                  <div class="text-purple-300 text-xs">[T9] Lightsworn Faceguard</div>
                </div>
                <button class="px-2 py-1 bg-pink-500/80 hover:bg-pink-500 text-white text-xs font-bold rounded transition-all duration-200">
                  Change
                </button>
              </div>

              <!-- Shoulders -->
              <div class="flex items-center gap-3 p-2 bg-black/30 border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-lg flex items-center justify-center">
                  <span class="text-sm">🦽</span>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm font-semibold">Shoulders</div>
                  <div class="text-purple-300 text-xs">[T9] Lightsworn Shoulderguards</div>
                </div>
                <button class="px-2 py-1 bg-pink-500/80 hover:bg-pink-500 text-white text-xs font-bold rounded transition-all duration-200">
                  Change
                </button>
              </div>

              <!-- Chest -->
              <div class="flex items-center gap-3 p-2 bg-black/30 border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-lg flex items-center justify-center">
                  <span class="text-sm">🦺</span>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm font-semibold">Chest</div>
                  <div class="text-purple-300 text-xs">[T9] Lightsworn Breastplate</div>
                </div>
                <button class="px-2 py-1 bg-pink-500/80 hover:bg-pink-500 text-white text-xs font-bold rounded transition-all duration-200">
                  Change
                </button>
              </div>

              <!-- Legs -->
              <div class="flex items-center gap-3 p-2 bg-black/30 border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-lg flex items-center justify-center">
                  <span class="text-sm">👖</span>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm font-semibold">Legs</div>
                  <div class="text-purple-300 text-xs">[T9] Lightsworn Legguards</div>
                </div>
                <button class="px-2 py-1 bg-pink-500/80 hover:bg-pink-500 text-white text-xs font-bold rounded transition-all duration-200">
                  Change
                </button>
              </div>

              <!-- Feet -->
              <div class="flex items-center gap-3 p-2 bg-black/30 border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded-lg flex items-center justify-center">
                  <span class="text-sm">🥾</span>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm font-semibold">Feet</div>
                  <div class="text-purple-300 text-xs">[226] Boots of the Underweller</div>
                </div>
                <button class="px-2 py-1 bg-pink-500/80 hover:bg-pink-500 text-white text-xs font-bold rounded transition-all duration-200">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Center: Character Preview -->
        <div class="space-y-4 overflow-y-auto">
          <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/20 rounded-xl p-4 shadow-lg">
            <h5 class="text-white text-sm font-bold uppercase tracking-wide mb-3 text-center">Character Preview</h5>
            <div class="flex items-center justify-center">
              <div class="w-full max-w-[200px] h-[300px] bg-gradient-to-br from-slate-700/80 to-slate-600/80 border-2 border-blue-500/30 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div class="flex flex-col items-center gap-2 text-white/50 text-center">
                  <div class="text-8xl opacity-70">👤</div>
                  <span class="text-xs font-medium uppercase tracking-wide">3D Model Preview</span>
                </div>
                <!-- Rotation Controls -->
                <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  <button class="w-6 h-6 bg-black/50 border border-white/20 rounded text-white text-xs hover:bg-black/70 transition-all duration-200">←</button>
                  <button class="w-6 h-6 bg-black/50 border border-white/20 rounded text-white text-xs hover:bg-black/70 transition-all duration-200">→</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Color Customization -->
          <div class="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-pink-500/30 rounded-xl p-4 shadow-lg">
            <h5 class="text-pink-300 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              Color Customization
            </h5>
            <div class="space-y-3">
              <div>
                <div class="text-white text-xs font-medium mb-2">Primary Color</div>
                <div class="flex gap-2">
                  <div class="w-6 h-6 bg-red-500 rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-blue-500 rounded border-2 border-blue-400 cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-green-500 rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-purple-500 rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-yellow-500 rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                </div>
              </div>
              <div>
                <div class="text-white text-xs font-medium mb-2">Secondary Color</div>
                <div class="flex gap-2">
                  <div class="w-6 h-6 bg-gray-700 rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-white rounded border-2 border-white cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-black rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-amber-600 rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                  <div class="w-6 h-6 bg-cyan-500 rounded border-2 border-white/30 cursor-pointer hover:scale-110 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Wardrobe Collection -->
        <div class="space-y-4 overflow-y-auto">
          <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/20 rounded-xl p-4 shadow-lg">
            <h5 class="text-white text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Wardrobe Collection
            </h5>
            
            <!-- Search & Filter -->
            <div class="mb-3">
              <input type="text" placeholder="Search appearances..." class="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:border-white/40 focus:outline-none">
            </div>
            
            <!-- Category Tabs -->
            <div class="flex gap-1 mb-3">
              <button class="px-2 py-1 bg-blue-500/80 text-white text-xs font-bold rounded">All</button>
              <button class="px-2 py-1 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded hover:bg-white/10">Helmets</button>
              <button class="px-2 py-1 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded hover:bg-white/10">Armor</button>
              <button class="px-2 py-1 bg-black/30 border border-white/20 text-white/70 text-xs font-medium rounded hover:bg-white/10">Weapons</button>
            </div>

            <!-- Available Appearances -->
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <div class="flex items-center gap-2 p-2 bg-black/30 border border-purple-500/30 rounded-lg hover:border-purple-400/50 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-purple-500/20 border border-purple-500/40 rounded flex items-center justify-center">
                  <span class="text-sm">🪖</span>
                </div>
                <div class="flex-1">
                  <div class="text-purple-300 text-xs font-semibold">Crown of Destruction</div>
                  <div class="text-white/60 text-xs">Tier 10 Set</div>
                </div>
                <div class="text-green-300 text-xs">✓</div>
              </div>

              <div class="flex items-center gap-2 p-2 bg-black/30 border border-orange-500/30 rounded-lg hover:border-orange-400/50 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-orange-500/20 border border-orange-500/40 rounded flex items-center justify-center">
                  <span class="text-sm">🪖</span>
                </div>
                <div class="flex-1">
                  <div class="text-orange-300 text-xs font-semibold">Helm of Domination</div>
                  <div class="text-white/60 text-xs">Legendary</div>
                </div>
                <div class="text-green-300 text-xs">✓</div>
              </div>

              <div class="flex items-center gap-2 p-2 bg-black/30 border border-blue-500/30 rounded-lg hover:border-blue-400/50 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-blue-500/20 border border-blue-500/40 rounded flex items-center justify-center">
                  <span class="text-sm">🦺</span>
                </div>
                <div class="flex-1">
                  <div class="text-blue-300 text-xs font-semibold">Robes of the Archmage</div>
                  <div class="text-white/60 text-xs">Epic Set</div>
                </div>
                <div class="text-red-300 text-xs">✗</div>
              </div>

              <div class="flex items-center gap-2 p-2 bg-black/30 border border-green-500/30 rounded-lg hover:border-green-400/50 transition-all duration-300 cursor-pointer">
                <div class="w-8 h-8 bg-green-500/20 border border-green-500/40 rounded flex items-center justify-center">
                  <span class="text-sm">🥾</span>
                </div>
                <div class="flex-1">
                  <div class="text-green-300 text-xs font-semibold">Boots of the Wild</div>
                  <div class="text-white/60 text-xs">Rare</div>
                </div>
                <div class="text-green-300 text-xs">✓</div>
              </div>
            </div>
          </div>

          <!-- Saved Outfits -->
          <div class="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-500/30 rounded-xl p-4 shadow-lg">
            <h5 class="text-yellow-300 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
              <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              Saved Outfits
            </h5>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-2 bg-black/30 border border-yellow-500/20 rounded-lg">
                <div>
                  <div class="text-white text-xs font-semibold">Battle Ready</div>
                  <div class="text-yellow-400/70 text-xs">Combat Set</div>
                </div>
                <button class="px-2 py-1 bg-yellow-500/80 hover:bg-yellow-500 text-white text-xs font-bold rounded transition-all duration-200">
                  Load
                </button>
              </div>
              <div class="flex items-center justify-between p-2 bg-black/30 border border-yellow-500/20 rounded-lg">
                <div>
                  <div class="text-white text-xs font-semibold">Formal Attire</div>
                  <div class="text-yellow-400/70 text-xs">Social Set</div>
                </div>
                <button class="px-2 py-1 bg-yellow-500/80 hover:bg-yellow-500 text-white text-xs font-bold rounded transition-all duration-200">
                  Load
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
} 