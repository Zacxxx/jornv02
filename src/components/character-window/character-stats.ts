export function createCharacterStatsContent(): string {
  return `
    <div class="h-full flex flex-col space-y-4 p-4">
      <!-- Main Content Layout -->
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0 overflow-hidden">
        <!-- Left Column: Character Stats -->
        <div class="space-y-4 overflow-y-auto max-h-full lg:max-h-none">
          <!-- Core Stats & Attributes -->
          <div class="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/30 rounded-xl p-4 flex-shrink-0 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:border-blue-400/50">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-blue-600/30 border border-blue-500/50 rounded-lg flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-300">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h4 class="text-blue-200 text-base font-bold uppercase tracking-wider">Character Stats</h4>
              </div>
              <button class="group px-3 py-1.5 bg-gradient-to-r from-blue-500/90 to-blue-600/90 hover:from-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 border border-blue-400/30 hover:border-blue-300/50">
                <span class="group-hover:text-blue-100 transition-colors duration-200">Character Sheet</span>
              </button>
            </div>
            
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <!-- Core Vitals -->
              <div class="space-y-3">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <h5 class="text-emerald-300 text-sm font-bold uppercase tracking-wide">Vitals</h5>
                </div>
                
                <!-- Health -->
                <div class="group bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-500/30 rounded-lg p-3 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg">
                  <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 bg-emerald-400 rounded-full shadow-sm"></div>
                      <span class="text-white font-semibold text-sm">Health</span>
                    </div>
                    <span class="text-emerald-300 text-sm font-bold">25,420 / 25,420</span>
                  </div>
                  <div class="relative w-full h-2 bg-black/50 rounded-full overflow-hidden border border-emerald-500/20">
                    <div class="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500 shadow-sm" style="width: 100%"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                </div>

                <!-- Mana -->
                <div class="group bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-lg p-3 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg">
                  <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 bg-blue-400 rounded-full shadow-sm"></div>
                      <span class="text-white font-semibold text-sm">Mana</span>
                    </div>
                    <span class="text-blue-300 text-sm font-bold">8,955 / 8,955</span>
                  </div>
                  <div class="relative w-full h-2 bg-black/50 rounded-full overflow-hidden border border-blue-500/20">
                    <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 shadow-sm" style="width: 100%"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                </div>

                <!-- Energy -->
                <div class="group bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border border-yellow-500/30 rounded-lg p-3 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg">
                  <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"></div>
                      <span class="text-white font-semibold text-sm">Energy</span>
                    </div>
                    <span class="text-yellow-300 text-sm font-bold">100 / 100</span>
                  </div>
                  <div class="relative w-full h-2 bg-black/50 rounded-full overflow-hidden border border-yellow-500/20">
                    <div class="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm" style="width: 100%"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>

              <!-- Core Attributes -->
              <div class="space-y-3">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <h5 class="text-orange-300 text-sm font-bold uppercase tracking-wide">Attributes</h5>
                </div>
                
                <!-- Strength -->
                <div class="group bg-gradient-to-r from-red-900/40 to-rose-900/40 border border-red-500/30 rounded-lg p-3 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-gradient-to-br from-red-500/30 to-red-600/30 border border-red-500/50 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-300">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                          <line x1="3" y1="6" x2="21" y2="6"/>
                          <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                      </div>
                      <span class="text-white font-semibold text-sm">Strength</span>
                    </div>
                    <div class="text-right">
                      <div class="text-red-300 text-lg font-bold">142</div>
                      <div class="text-red-400/70 text-xs">+12 bonus</div>
                    </div>
                  </div>
                </div>

                <!-- Agility -->
                <div class="group bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-lg p-3 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 border border-emerald-500/50 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-300">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                      </div>
                      <span class="text-white font-semibold text-sm">Agility</span>
                    </div>
                    <div class="text-right">
                      <div class="text-emerald-300 text-lg font-bold">89</div>
                      <div class="text-emerald-400/70 text-xs">+7 bonus</div>
                    </div>
                  </div>
                </div>

                <!-- Intellect -->
                <div class="group bg-gradient-to-r from-purple-900/40 to-violet-900/40 border border-purple-500/30 rounded-lg p-3 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-gradient-to-br from-purple-500/30 to-purple-600/30 border border-purple-500/50 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-300">
                          <path d="M9 12l2 2 4-4"/>
                          <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/>
                        </svg>
                      </div>
                      <span class="text-white font-semibold text-sm">Intellect</span>
                    </div>
                    <div class="text-right">
                      <div class="text-purple-300 text-lg font-bold">76</div>
                      <div class="text-purple-400/70 text-xs">+5 bonus</div>
                    </div>
                  </div>
                </div>

                <!-- Stamina -->
                <div class="group bg-gradient-to-r from-orange-900/40 to-amber-900/40 border border-orange-500/30 rounded-lg p-3 hover:border-orange-400/50 transition-all duration-300 hover:shadow-lg">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-600/30 border border-orange-500/50 rounded-lg flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-300">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                      </div>
                      <span class="text-white font-semibold text-sm">Stamina</span>
                    </div>
                    <div class="text-right">
                      <div class="text-orange-300 text-lg font-bold">158</div>
                      <div class="text-orange-400/70 text-xs">+15 bonus</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Journey (moved from right column) -->
          <div class="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-500/30 rounded-lg p-3 flex-shrink-0 shadow-lg">
            <h4 class="text-yellow-300 text-sm font-semibold uppercase tracking-wide border-b border-yellow-500/20 pb-2 mb-3 flex items-center gap-2">
              <div class="w-5 h-5 bg-yellow-500/20 border border-yellow-500/40 rounded flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
                </svg>
              </div>
              Hero Journey
            </h4>
            <div class="bg-gradient-to-br from-yellow-800/60 to-amber-800/60 border-2 border-yellow-500/40 rounded-lg p-3">
              <div class="flex gap-3 items-start">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-600/60 to-amber-600/60 border-2 border-yellow-500/70 rounded-lg flex items-center justify-center text-lg md:text-2xl flex-shrink-0 shadow-md">🧭</div>
                <div class="flex-1 min-w-0">
                  <div class="text-yellow-300 text-xs md:text-sm font-semibold mb-1">Path of the Adventurer</div>
                  <div class="text-yellow-200/80 text-xs mb-1">Hero Journey Progress</div>
                  <div class="text-yellow-200/60 text-xs italic mb-2">Forge your legend</div>
                  <div class="space-y-1 mb-2">
                    <div class="flex justify-between items-center">
                      <span class="text-yellow-200/90 text-xs">Available Points</span>
                      <span class="text-green-300 text-xs font-bold bg-green-900/30 px-1.5 py-0.5 rounded">15</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-yellow-200/90 text-xs">Spent Points</span>
                      <span class="text-blue-300 text-xs font-bold bg-blue-900/30 px-1.5 py-0.5 rounded">42</span>
                    </div>
                  </div>
                  <div class="mt-2">
                    <button class="w-full px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-yellow-500/80 to-amber-500/80 hover:from-yellow-500 hover:to-amber-500 text-white text-xs font-semibold rounded transition-all duration-200 hover:scale-105 shadow-md">
                      View Journey
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Column: Equipment -->
        <div class="space-y-4 overflow-y-auto max-h-full lg:max-h-none">
          <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex-shrink-0">
            <h4 class="text-white text-sm font-semibold uppercase tracking-wide text-center border-b border-white/10 pb-2 mb-3">Equipment</h4>
            <div class="grid grid-cols-[60px_1fr_60px] grid-rows-[auto_auto_auto_auto] gap-2 p-4 bg-slate-900/70 rounded-xl border-2 border-blue-500/40 min-h-[350px]">
              <!-- Left Side Equipment -->
              <div class="flex flex-col gap-1.5 items-center">
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[T9] Lightsworn Faceguard">
                  <div class="text-base z-10 text-white/80">🪖</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[226] Pendant of the Nathrezim">
                  <div class="text-base z-10 text-white/80">📿</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[T9] Lightsworn Shoulderguards">
                  <div class="text-base z-10 text-white/80">🦽</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[226] Drape of the Drakerider">
                  <div class="text-base z-10 text-white/80">🧥</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[T9] Lightsworn Breastplate">
                  <div class="text-base z-10 text-white/80">🦺</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center" title="Tabard">
                  <div class="text-base text-white/80">🎽</div>
                </div>
              </div>

              <!-- Character Model Center -->
              <div class="flex items-center justify-center p-5">
                <div class="w-full max-w-[180px] h-[250px] bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-2 border-blue-500/30 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div class="flex flex-col items-center gap-2 text-white/50 text-center">
                    <div class="text-6xl opacity-70">👤</div>
                    <span class="text-xs font-medium uppercase tracking-wide">Character Model</span>
                  </div>
                </div>
              </div>

              <!-- Right Side Equipment -->
              <div class="flex flex-col gap-1.5 items-center">
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[232] Earthshaper">
                  <div class="text-base z-10 text-white/80">⌚</div>
                  <div class="absolute inset-0 border-2 border-orange-500/70 bg-orange-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[T9] Lightsworn Gauntlets">
                  <div class="text-base z-10 text-white/80">🧤</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[219] Valorous Aegis Shoulderplates">
                  <div class="text-base z-10 text-white/80">🔗</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[T9] Lightsworn Legguards">
                  <div class="text-base z-10 text-white/80">👖</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[226] Boots of the Underweller">
                  <div class="text-base z-10 text-white/80">🥾</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[22] Bag of Jewels">
                  <div class="text-base z-10 text-white/80">🎒</div>
                  <div class="absolute inset-0 border-2 border-blue-500/70 bg-blue-500/10 rounded-md"></div>
                </div>
              </div>

              <!-- Bottom Equipment Row -->
              <div class="col-span-3 flex gap-2 justify-center items-center pt-2">
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[213] Ruthlessness">
                  <div class="text-base z-10 text-white/80">💍</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center" title="Ring Slot 2">
                  <div class="text-base text-white/80">💍</div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="The Eye of Eternity">
                  <div class="text-base z-10 text-white/80">🔮</div>
                  <div class="absolute inset-0 border-2 border-orange-500/70 bg-orange-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[226] Favor of the Dragon Queen">
                  <div class="text-base z-10 text-white/80">🔮</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
              </div>

              <!-- Weapon Slots -->
              <div class="col-span-3 flex gap-3 justify-center items-center pt-2">
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[226] Steelbreaker's Embrace">
                  <div class="text-base z-10 text-white/80">⚔️</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center relative overflow-hidden" title="[226] Bladebearer's Signet">
                  <div class="text-base z-10 text-white/80">🛡️</div>
                  <div class="absolute inset-0 border-2 border-purple-500/70 bg-purple-500/10 rounded-md"></div>
                </div>
                <div class="w-12 h-12 bg-black/60 border-2 border-blue-400/40 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400/80 hover:-translate-y-0.5 hover:shadow-lg flex flex-col items-center justify-center" title="Ranged Weapon">
                  <div class="text-base text-white/80">🏹</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Enhanced Details -->
        <div class="space-y-4 overflow-y-auto max-h-full lg:max-h-none">
          <!-- 2x2 Grid Layout for Titles, Professions, Reputation, Achievements -->
          <div class="grid grid-cols-2 gap-3 h-full">
            <!-- Top Left: Titles -->
            <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-white text-xs font-semibold uppercase tracking-wide">Titles</h4>
                <button class="px-1.5 py-0.5 bg-purple-500/80 hover:bg-purple-500 text-white text-xs font-semibold rounded transition-all duration-200 hover:scale-105">
                  Change
                </button>
              </div>
              <div class="flex-1 flex flex-col justify-between">
                <!-- Current Title -->
                <div class="bg-black/40 border border-purple-500/30 rounded-lg p-2 mb-2">
                  <div class="text-purple-400 text-xs font-bold">The Dragonslayer</div>
                  <div class="text-white/60 text-xs">+5% damage to dragons</div>
                </div>
                
                <!-- Available Titles Preview -->
                <div class="space-y-1">
                  <div class="text-white/70 text-xs font-medium">Available (3)</div>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center p-1 bg-black/30 border border-white/10 rounded text-xs">
                      <span class="text-white/80">Monster Hunter</span>
                      <span class="text-green-400">+2% XP</span>
                    </div>
                    <div class="flex justify-between items-center p-1 bg-black/30 border border-white/10 rounded text-xs">
                      <span class="text-white/80">Treasure Seeker</span>
                      <span class="text-yellow-400">+10% Gold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top Right: Professions -->
            <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-white text-xs font-semibold uppercase tracking-wide">Professions</h4>
                <button class="px-1.5 py-0.5 bg-orange-500/80 hover:bg-orange-500 text-white text-xs font-semibold rounded transition-all duration-200 hover:scale-105">
                  View All
                </button>
              </div>
              <div class="flex-1 space-y-2">
                <div class="bg-black/40 border border-blue-500/30 rounded-lg p-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-5 h-5 bg-blue-500/20 border border-blue-500/40 rounded flex items-center justify-center">
                        <span class="text-blue-400 text-xs">🔨</span>
                      </div>
                      <div class="text-blue-400 text-xs font-semibold">Blacksmithing</div>
                    </div>
                    <div class="text-right">
                      <div class="text-white text-xs font-bold">375</div>
                      <div class="text-blue-400 text-xs">Master</div>
                    </div>
                  </div>
                </div>

                <div class="bg-black/40 border border-green-500/30 rounded-lg p-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-5 h-5 bg-green-500/20 border border-green-500/40 rounded flex items-center justify-center">
                        <span class="text-green-400 text-xs">⛏️</span>
                      </div>
                      <div class="text-green-400 text-xs font-semibold">Mining</div>
                    </div>
                    <div class="text-right">
                      <div class="text-white text-xs font-bold">298</div>
                      <div class="text-green-400 text-xs">Expert</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Left: Reputation -->
            <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-white text-xs font-semibold uppercase tracking-wide">Reputation</h4>
                <button class="px-1.5 py-0.5 bg-purple-500/80 hover:bg-purple-500 text-white text-xs font-semibold rounded transition-all duration-200 hover:scale-105">
                  View All
                </button>
              </div>
              <div class="flex-1 space-y-2">
                <div class="bg-black/30 border border-white/10 rounded p-2">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-white/80 text-xs">Stormwind</span>
                    <span class="text-yellow-400 text-xs font-semibold">Exalted</span>
                  </div>
                  <div class="relative w-full h-1.5 bg-black/50 border border-white/10 rounded overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded transition-all duration-300" style="width: 100%"></div>
                  </div>
                </div>
                <div class="bg-black/30 border border-white/10 rounded p-2">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-white/80 text-xs">Argent Dawn</span>
                    <span class="text-purple-400 text-xs font-semibold">Revered</span>
                  </div>
                  <div class="relative w-full h-1.5 bg-black/50 border border-white/10 rounded overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded transition-all duration-300" style="width: 75%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Right: Achievements -->
            <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-white text-xs font-semibold uppercase tracking-wide">Achievements</h4>
                <button class="px-1.5 py-0.5 bg-yellow-500/80 hover:bg-yellow-500 text-white text-xs font-semibold rounded transition-all duration-200 hover:scale-105">
                  View All
                </button>
              </div>
              <div class="flex-1 flex flex-col justify-between">
                <div class="flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-2">
                  <span class="text-lg">🏆</span>
                  <div class="flex flex-col">
                    <div class="text-yellow-400 text-xs font-bold">4,285</div>
                    <div class="text-yellow-300/80 text-xs font-medium">Points</div>
                  </div>
                </div>
                <div class="space-y-1">
                  <div class="text-white/70 text-xs font-medium">Recent</div>
                  <div class="space-y-1">
                    <div class="flex justify-between items-center p-1 bg-black/30 border border-white/10 rounded text-xs">
                      <span class="text-white/80">Dragon Slayer</span>
                      <span class="text-white/50">2d ago</span>
                    </div>
                    <div class="flex justify-between items-center p-1 bg-black/30 border border-white/10 rounded text-xs">
                      <span class="text-white/80">Master Crafter</span>
                      <span class="text-white/50">1w ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
} 