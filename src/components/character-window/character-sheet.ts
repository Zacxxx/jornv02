export function createCharacterSheetContent(): string {
  return `
    <div class="h-full flex flex-col space-y-4 p-4">
      <!-- Character Sheet Header -->
      <div class="bg-slate-800/60 border border-white/10 rounded-lg p-4 flex-shrink-0">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 border-2 border-white/30 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 shadow-lg">
            <img src="/assets/characters/portrait/default-portrait.png" alt="Character Portrait" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-white text-xl font-bold mb-1">Player</h3>
            <p class="text-blue-400 text-base font-semibold mb-1">Level 80 Human Paladin</p>
            <p class="text-white/80 text-sm">The Dragonslayer</p>
            <div class="mt-2 flex gap-4 text-xs">
              <span class="text-white/70">Guild: <span class="text-blue-400">Heroes of Azeroth</span></span>
              <span class="text-white/70">Realm: <span class="text-green-400">Stormwind</span></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content Layout -->
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 overflow-hidden">
        <!-- Left Column: Detailed Stats -->
        <div class="space-y-4 overflow-y-auto max-h-full">
          <!-- Core Attributes -->
          <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex-shrink-0">
            <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Core Attributes</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Strength</span>
                  <span class="text-white text-xs font-semibold">142 (+12)</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Agility</span>
                  <span class="text-white text-xs font-semibold">89 (+5)</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Intellect</span>
                  <span class="text-white text-xs font-semibold">76 (+8)</span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Stamina</span>
                  <span class="text-white text-xs font-semibold">158 (+15)</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Spirit</span>
                  <span class="text-white text-xs font-semibold">95 (+7)</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Armor</span>
                  <span class="text-white text-xs font-semibold">3,245</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Combat Stats -->
          <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex-shrink-0">
            <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Combat Statistics</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-2">
                <h5 class="text-white/90 text-xs font-medium uppercase tracking-wide mb-2">Offense</h5>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Attack Power</span>
                  <span class="text-white text-xs font-semibold">2,847</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Spell Power</span>
                  <span class="text-white text-xs font-semibold">1,245</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Critical Strike</span>
                  <span class="text-white text-xs font-semibold">8.45%</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Hit Rating</span>
                  <span class="text-white text-xs font-semibold">245 (7.8%)</span>
                </div>
              </div>
              <div class="space-y-2">
                <h5 class="text-white/90 text-xs font-medium uppercase tracking-wide mb-2">Defense</h5>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Defense Rating</span>
                  <span class="text-white text-xs font-semibold">540</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Block Rating</span>
                  <span class="text-white text-xs font-semibold">156 (12.3%)</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Dodge Rating</span>
                  <span class="text-white text-xs font-semibold">89 (4.7%)</span>
                </div>
                <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                  <span class="text-white/80 text-xs">Parry Rating</span>
                  <span class="text-white text-xs font-semibold">124 (6.2%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Resistances -->
          <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex-shrink-0">
            <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Resistances</h4>
            <div class="grid grid-cols-2 gap-2">
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-red-400 text-xs">Fire</span>
                <span class="text-white text-xs font-semibold">125</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-blue-400 text-xs">Frost</span>
                <span class="text-white text-xs font-semibold">98</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-purple-400 text-xs">Arcane</span>
                <span class="text-white text-xs font-semibold">87</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-green-400 text-xs">Nature</span>
                <span class="text-white text-xs font-semibold">156</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-yellow-400 text-xs">Holy</span>
                <span class="text-white text-xs font-semibold">245</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-gray-400 text-xs">Shadow</span>
                <span class="text-white text-xs font-semibold">134</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Character Details -->
        <div class="space-y-4 overflow-y-auto max-h-full">
          <!-- Character Information -->
          <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex-shrink-0">
            <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Character Information</h4>
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-2">
                  <div class="flex flex-col p-2 bg-black/30 rounded border border-white/5">
                    <span class="text-white/60 text-xs">Race</span>
                    <span class="text-white text-xs font-semibold">Human</span>
                  </div>
                  <div class="flex flex-col p-2 bg-black/30 rounded border border-white/5">
                    <span class="text-white/60 text-xs">Class</span>
                    <span class="text-white text-xs font-semibold">Paladin</span>
                  </div>
                  <div class="flex flex-col p-2 bg-black/30 rounded border border-white/5">
                    <span class="text-white/60 text-xs">Level</span>
                    <span class="text-white text-xs font-semibold">80</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex flex-col p-2 bg-black/30 rounded border border-white/5">
                    <span class="text-white/60 text-xs">Gender</span>
                    <span class="text-white text-xs font-semibold">Male</span>
                  </div>
                  <div class="flex flex-col p-2 bg-black/30 rounded border border-white/5">
                    <span class="text-white/60 text-xs">Faction</span>
                    <span class="text-blue-400 text-xs font-semibold">Alliance</span>
                  </div>
                  <div class="flex flex-col p-2 bg-black/30 rounded border border-white/5">
                    <span class="text-white/60 text-xs">Zone</span>
                    <span class="text-white text-xs font-semibold">Stormwind City</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Talent Specialization -->
          <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex-shrink-0">
            <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Talent Specialization</h4>
            <div class="space-y-3">
              <div class="bg-black/30 border border-yellow-500/30 rounded-lg p-3">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-8 h-8 bg-yellow-500/20 border border-yellow-500/40 rounded flex items-center justify-center">
                    <span class="text-yellow-400 text-sm">🛡️</span>
                  </div>
                  <div>
                    <div class="text-yellow-400 text-sm font-semibold">Protection</div>
                    <div class="text-white/60 text-xs">Primary Specialization</div>
                  </div>
                </div>
                <div class="text-white/70 text-xs">51 points spent</div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-black/30 border border-white/10 rounded-lg p-2">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-6 h-6 bg-blue-500/20 border border-blue-500/40 rounded flex items-center justify-center">
                      <span class="text-blue-400 text-xs">⚔️</span>
                    </div>
                    <div class="text-blue-400 text-xs font-semibold">Retribution</div>
                  </div>
                  <div class="text-white/60 text-xs">15 points</div>
                </div>
                <div class="bg-black/30 border border-white/10 rounded-lg p-2">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="w-6 h-6 bg-green-500/20 border border-green-500/40 rounded flex items-center justify-center">
                      <span class="text-green-400 text-xs">✨</span>
                    </div>
                    <div class="text-green-400 text-xs font-semibold">Holy</div>
                  </div>
                  <div class="text-white/60 text-xs">5 points</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Player Statistics -->
          <div class="bg-slate-800/40 border border-white/10 rounded-lg p-3 flex-shrink-0">
            <h4 class="text-white text-sm font-semibold uppercase tracking-wide border-b border-white/10 pb-2 mb-3">Player Statistics</h4>
            <div class="space-y-2">
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-white/80 text-xs">Total Playtime</span>
                <span class="text-white text-xs font-semibold">247 days, 15 hours</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-white/80 text-xs">Honorable Kills</span>
                <span class="text-white text-xs font-semibold">1,247</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-white/80 text-xs">Deaths</span>
                <span class="text-white text-xs font-semibold">89</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-white/80 text-xs">Quests Completed</span>
                <span class="text-white text-xs font-semibold">2,456</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-white/80 text-xs">Dungeons Cleared</span>
                <span class="text-white text-xs font-semibold">342</span>
              </div>
              <div class="flex justify-between items-center p-2 bg-black/30 rounded border border-white/5">
                <span class="text-white/80 text-xs">Raids Completed</span>
                <span class="text-white text-xs font-semibold">67</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
} 