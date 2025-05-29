export function createHeroJourneyContent(): string {
  return `
    <div class="h-full flex flex-col space-y-4 p-4">
      <!-- Hero Journey Header -->
      <div class="bg-slate-800/60 border border-white/10 rounded-lg p-4 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 md:w-20 md:h-20 border-2 border-yellow-500/30 rounded-lg overflow-hidden bg-yellow-500/10 flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-white text-lg md:text-xl font-bold mb-1">Hero Journey</h3>
              <p class="text-yellow-400 text-sm md:text-base font-semibold mb-1">Path of the Adventurer</p>
              <p class="text-white/80 text-xs md:text-sm">Forge your legend through trials and triumphs</p>
            </div>
          </div>
          <div class="flex-shrink-0">
            <button class="px-4 py-2 bg-yellow-500/80 hover:bg-yellow-500 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-yellow-400/30">
              View Journey
            </button>
          </div>
        </div>
      </div>

      <!-- Journey Points -->
      <div class="bg-slate-800/40 border border-white/10 rounded-lg p-4">
        <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Journey Points</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-black/30 border border-white/10 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/80 text-sm font-medium">Available Points</span>
              <span class="text-green-400 text-lg font-bold">15</span>
            </div>
            <div class="text-white/60 text-xs">Ready to spend on new abilities</div>
          </div>
          <div class="bg-black/30 border border-white/10 rounded-lg p-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/80 text-sm font-medium">Spent Points</span>
              <span class="text-blue-400 text-lg font-bold">42</span>
            </div>
            <div class="text-white/60 text-xs">Invested in your journey</div>
          </div>
        </div>
      </div>

      <!-- Journey Paths (Placeholder) -->
      <div class="flex-1 bg-slate-800/40 border border-white/10 rounded-lg p-4 overflow-y-auto">
        <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-4">Journey Paths</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Path of Valor -->
          <div class="bg-black/30 border border-red-500/30 rounded-lg p-4 hover:border-red-500/50 transition-all duration-200">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div>
                <h5 class="text-red-400 font-semibold text-sm">Path of Valor</h5>
                <div class="text-white/60 text-xs">Combat Mastery</div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-white/70">Progress</span>
                <span class="text-red-400 font-semibold">8/15</span>
              </div>
              <div class="w-full bg-black/50 rounded-full h-2">
                <div class="bg-red-500 h-2 rounded-full transition-all duration-300" style="width: 53%"></div>
              </div>
            </div>
          </div>

          <!-- Path of Wisdom -->
          <div class="bg-black/30 border border-blue-500/30 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-200">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-blue-500/20 border border-blue-500/40 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  <circle cx="12" cy="8" r="2"/>
                  <path d="M12 10v4h4"/>
                </svg>
              </div>
              <div>
                <h5 class="text-blue-400 font-semibold text-sm">Path of Wisdom</h5>
                <div class="text-white/60 text-xs">Knowledge & Magic</div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-white/70">Progress</span>
                <span class="text-blue-400 font-semibold">12/20</span>
              </div>
              <div class="w-full bg-black/50 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="width: 60%"></div>
              </div>
            </div>
          </div>

          <!-- Path of Fortune -->
          <div class="bg-black/30 border border-green-500/30 rounded-lg p-4 hover:border-green-500/50 transition-all duration-200">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-green-500/20 border border-green-500/40 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <path d="M17 6a5 5 0 0 0-10 0c0 6 5 10 5 10s5-4 5-10z"/>
                  <path d="M9 12h6"/>
                </svg>
              </div>
              <div>
                <h5 class="text-green-400 font-semibold text-sm">Path of Fortune</h5>
                <div class="text-white/60 text-xs">Luck & Discovery</div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-white/70">Progress</span>
                <span class="text-green-400 font-semibold">5/12</span>
              </div>
              <div class="w-full bg-black/50 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full transition-all duration-300" style="width: 42%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coming Soon Message -->
        <div class="mt-8 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span class="text-yellow-400 text-sm font-medium">Full Hero Journey system coming soon!</span>
          </div>
        </div>
      </div>
    </div>
  `;
} 