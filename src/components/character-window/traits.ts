export function createResearchContent(): string {
  return `
    <div class="h-full flex bg-gradient-to-br from-slate-900/95 to-slate-800/95 overflow-hidden">
      <!-- Research Interface -->
      <div class="flex-1 flex flex-col items-center justify-center">
        <!-- Research Header -->
        <div class="text-center mb-8">
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500/30 to-indigo-600/30 border-2 border-indigo-500/50 rounded-full flex items-center justify-center shadow-2xl">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-300">
              <path d="M9 11H1v3h8v3l3-3.5L9 10v1z"/>
              <path d="M22 12h-6"/>
              <path d="M16 16h6"/>
              <path d="M16 8h6"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="M13 5.5a4 4 0 0 0-6 0"/>
              <path d="M13 18.5a4 4 0 0 1-6 0"/>
            </svg>
          </div>
          <h2 class="text-indigo-200 text-2xl font-bold uppercase tracking-wider mb-3">Research Laboratory</h2>
          <p class="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
            Unlock the mysteries of the world through advanced research and experimentation.
          </p>
        </div>

        <!-- Coming Soon Content -->
        <div class="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10 rounded-xl p-8 max-w-lg mx-auto shadow-2xl">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400">
                <path d="M12 2v20"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            
            <h3 class="text-white text-xl font-bold mb-3">Research System</h3>
            <p class="text-white/80 text-sm leading-relaxed mb-6">
              The research laboratory is currently under development. Soon you'll be able to:
            </p>
            
            <div class="space-y-3 text-left mb-6">
              <div class="flex items-center gap-3 text-white/70 text-sm">
                <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>Discover new technologies and abilities</span>
              </div>
              <div class="flex items-center gap-3 text-white/70 text-sm">
                <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>Unlock advanced crafting recipes</span>
              </div>
              <div class="flex items-center gap-3 text-white/70 text-sm">
                <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>Enhance your character's capabilities</span>
              </div>
              <div class="flex items-center gap-3 text-white/70 text-sm">
                <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>Conduct magical experiments</span>
              </div>
              <div class="flex items-center gap-3 text-white/70 text-sm">
                <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                <span>Research ancient artifacts</span>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 rounded-lg p-4">
              <div class="flex items-center justify-center gap-2 text-indigo-300 text-sm font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <span>Coming Soon™</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Placeholder Research Categories -->
        <div class="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div class="bg-black/20 border border-white/10 rounded-lg p-4 text-center opacity-50">
            <div class="w-12 h-12 mx-auto mb-2 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span class="text-2xl">🔬</span>
            </div>
            <h4 class="text-white/70 text-sm font-medium">Alchemy</h4>
          </div>
          
          <div class="bg-black/20 border border-white/10 rounded-lg p-4 text-center opacity-50">
            <div class="w-12 h-12 mx-auto mb-2 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span class="text-2xl">⚡</span>
            </div>
            <h4 class="text-white/70 text-sm font-medium">Arcane</h4>
          </div>
          
          <div class="bg-black/20 border border-white/10 rounded-lg p-4 text-center opacity-50">
            <div class="w-12 h-12 mx-auto mb-2 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span class="text-2xl">🌿</span>
            </div>
            <h4 class="text-white/70 text-sm font-medium">Nature</h4>
          </div>
        </div>
      </div>
    </div>

    <style>
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    </style>
  `;
} 