export function createProfessionsContent(): string {
  return `
    <div class="h-full flex flex-col space-y-4 p-4">
      <!-- Professions Header -->
      <div class="bg-slate-800/60 border border-white/10 rounded-lg p-4 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 md:w-20 md:h-20 border-2 border-orange-500/30 rounded-lg overflow-hidden bg-orange-500/10 flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-white text-lg md:text-xl font-bold mb-1">Professions</h3>
              <p class="text-orange-400 text-sm md:text-base font-semibold mb-1">Master Craftsman</p>
              <p class="text-white/80 text-xs md:text-sm">Hone your skills and create legendary items</p>
            </div>
          </div>
          <div class="flex-shrink-0">
            <button class="px-4 py-2 bg-orange-500/80 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-orange-400/30">
              Manage Skills
            </button>
          </div>
        </div>
      </div>

      <!-- Active Professions -->
      <div class="bg-slate-800/40 border border-white/10 rounded-lg p-4">
        <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Active Professions</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Primary Profession -->
          <div class="bg-black/30 border border-blue-500/30 rounded-lg p-4 cursor-pointer hover:border-blue-500/50 transition-all duration-200 hover:bg-black/40">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-blue-500/20 border border-blue-500/40 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/>
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                </svg>
              </div>
              <div class="flex-1">
                <h5 class="text-blue-400 font-semibold text-sm">Blacksmithing</h5>
                <div class="text-white/60 text-xs">Primary Profession</div>
              </div>
              <div class="text-right">
                <div class="text-white font-bold text-lg">375</div>
                <div class="text-blue-400 text-xs font-medium">Master</div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-white/70">Progress to Grand Master</span>
                <span class="text-blue-400 font-semibold">375/450</span>
              </div>
              <div class="w-full bg-black/50 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="width: 83%"></div>
              </div>
            </div>
          </div>

          <!-- Secondary Profession -->
          <div class="bg-black/30 border border-green-500/30 rounded-lg p-4 cursor-pointer hover:border-green-500/50 transition-all duration-200 hover:bg-black/40">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
                  <path d="M12 2v20m8-10H4"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div class="flex-1">
                <h5 class="text-green-400 font-semibold text-sm">Mining</h5>
                <div class="text-white/60 text-xs">Secondary Profession</div>
              </div>
              <div class="text-right">
                <div class="text-white font-bold text-lg">298</div>
                <div class="text-green-400 text-xs font-medium">Expert</div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-white/70">Progress to Artisan</span>
                <span class="text-green-400 font-semibold">298/300</span>
              </div>
              <div class="w-full bg-black/50 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full transition-all duration-300" style="width: 99%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Available Professions -->
      <div class="flex-1 bg-slate-800/40 border border-white/10 rounded-lg p-4 overflow-y-auto">
        <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-4">Available Professions</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Crafting Professions -->
          <div class="space-y-3">
            <h5 class="text-white/90 text-xs font-medium uppercase tracking-wide text-center bg-black/30 py-2 rounded">Crafting</h5>
            
            <div class="bg-black/20 border border-white/10 rounded-lg p-3 cursor-pointer hover:border-white/20 transition-all duration-200 hover:bg-black/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-purple-500/20 border border-purple-500/40 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="m2 17 10 5 10-5"/>
                    <path d="m2 12 10 5 10-5"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h6 class="text-purple-400 font-semibold text-sm">Enchanting</h6>
                  <div class="text-white/60 text-xs">Imbue items with magical properties</div>
                </div>
                <div class="text-white/40 text-xs">Available</div>
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3 cursor-pointer hover:border-white/20 transition-all duration-200 hover:bg-black/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-yellow-500/20 border border-yellow-500/40 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h6 class="text-yellow-400 font-semibold text-sm">Inscription</h6>
                  <div class="text-white/60 text-xs">Create scrolls and glyphs</div>
                </div>
                <div class="text-white/40 text-xs">Available</div>
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3 cursor-pointer hover:border-white/20 transition-all duration-200 hover:bg-black/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h6 class="text-red-400 font-semibold text-sm">Alchemy</h6>
                  <div class="text-white/60 text-xs">Brew potions and elixirs</div>
                </div>
                <div class="text-white/40 text-xs">Available</div>
              </div>
            </div>
          </div>

          <!-- Gathering Professions -->
          <div class="space-y-3">
            <h5 class="text-white/90 text-xs font-medium uppercase tracking-wide text-center bg-black/30 py-2 rounded">Gathering</h5>
            
            <div class="bg-black/20 border border-white/10 rounded-lg p-3 cursor-pointer hover:border-white/20 transition-all duration-200 hover:bg-black/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-600/20 border border-green-600/40 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500">
                    <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h6 class="text-green-500 font-semibold text-sm">Herbalism</h6>
                  <div class="text-white/60 text-xs">Gather herbs and plants</div>
                </div>
                <div class="text-white/40 text-xs">Available</div>
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3 cursor-pointer hover:border-white/20 transition-all duration-200 hover:bg-black/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-orange-600/20 border border-orange-600/40 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500">
                    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
                    <line x1="16" y1="8" x2="2" y2="22"/>
                    <line x1="17.5" y1="15" x2="9" y2="15"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h6 class="text-orange-500 font-semibold text-sm">Skinning</h6>
                  <div class="text-white/60 text-xs">Harvest leather and hides</div>
                </div>
                <div class="text-white/40 text-xs">Available</div>
              </div>
            </div>

            <div class="bg-black/20 border border-white/10 rounded-lg p-3 cursor-pointer hover:border-white/20 transition-all duration-200 hover:bg-black/30">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-cyan-500/20 border border-cyan-500/40 rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-400">
                    <path d="M6 2v20"/>
                    <path d="M20 8v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8"/>
                    <path d="M6 18h.01"/>
                    <path d="M6 14h.01"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h6 class="text-cyan-400 font-semibold text-sm">Fishing</h6>
                  <div class="text-white/60 text-xs">Catch fish and treasures</div>
                </div>
                <div class="text-white/40 text-xs">Available</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profession Limits Notice -->
        <div class="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="text-yellow-400 text-sm font-semibold">Profession Limits</span>
          </div>
          <div class="text-yellow-300/80 text-xs">
            You can learn up to 2 primary professions and unlimited secondary professions. 
            Changing primary professions will reset your skill level.
          </div>
        </div>
      </div>
    </div>
  `;
} 