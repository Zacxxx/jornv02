import { CHARACTER_WINDOW_TABS, CharacterWindowState } from '../components/character-window';
import { createCharacterStatsContent } from '../components/character-window/character-stats';
import { createCharacterSheetContent } from '../components/character-window/character-sheet';
import { createInventoryContent, initializeInventory } from '../components/character-window/inventory-grid';
import { createCraftingContent, initializeCrafting } from '../components/character-window/crafting-interface';
// import { CraftingMenu } from '../components/character-window/crafting-menu';
import { createSpellBookContent, initializeSpells } from '../components/character-window/spell-book';
import { createResearchContent } from '../components/character-window/traits';
import { createAbilityListContent } from '../components/character-window/ability-list';
import { createQuestLogContent, initializeQuests } from '../components/character-window/quest-log';
import { createEncyclopediaContent } from '../components/character-window/encyclopedia-entries';
import { createHeroJourneyContent } from '../components/character-window/hero-journey';
import { createEquipmentContent } from '../components/character-window/equipment';

class CharacterWindowManager {
  private state: CharacterWindowState;
  private windowElement: HTMLElement | null = null;
  private contentElement: HTMLElement | null = null;
  private tabsElement: HTMLElement | null = null;
  private onCloseCallback: (() => void) | null = null;

  constructor() {
    this.state = {
      isOpen: false,
      activeTab: 'character',
      tabs: CHARACTER_WINDOW_TABS
    };
  }

  init() {
    this.createWindowElement();
    this.setupEventListeners();
  }

  private createWindowElement() {
    // Remove existing window if it exists
    const existing = document.getElementById('character_window');
    if (existing) {
      existing.remove();
    }

    // Create the main window element
    this.windowElement = document.createElement('div');
    this.windowElement.id = 'character_window';
    this.windowElement.className = 'character-window';
    this.windowElement.style.display = 'none';

    this.windowElement.innerHTML = `
      <div class="flex flex-col h-full w-full">
        <!-- Window Header - Top Bar -->
        <div class="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b-2 border-white/10 flex-shrink-0 w-full">
          <div class="flex items-center gap-3 flex-1">
            <div class="w-12 h-12 border-2 border-white/30 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 shadow-lg">
              <img src="/assets/characters/portrait/default-portrait.png" alt="Character Portrait" class="w-full h-full object-cover" />
            </div>
            <div class="flex items-center gap-6 flex-1 min-w-0">
              <div class="flex flex-col min-w-0">
                <h3 class="text-white text-base font-bold truncate leading-tight">Player</h3>
                <p class="text-blue-400 text-sm font-semibold leading-tight">Level 80 Human Paladin</p>
                <p class="text-white/80 text-xs leading-tight">Adventurer</p>
              </div>
              <div class="flex-1 max-w-sm">
                <div class="relative w-full h-2 bg-black/50 border border-white/20 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300" style="width: 25%"></div>
                </div>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-white text-xs font-semibold">250 / 1000 XP</span>
                  <span class="text-white/70 text-xs">750 to next level</span>
                </div>
              </div>
              <!-- Currency Section -->
              <div class="flex items-center gap-4 bg-black/30 border border-white/20 rounded-lg px-3 py-2">
                <!-- Gold -->
                <div class="flex items-center gap-1.5">
                  <div class="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-900">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <path d="M12 17h.01"/>
                    </svg>
                  </div>
                  <span class="text-yellow-300 text-sm font-bold">1,247</span>
                </div>
                <!-- Essence -->
                <div class="flex items-center gap-1.5">
                  <div class="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-100">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span class="text-purple-300 text-sm font-bold">89</span>
                </div>
                <!-- Components -->
                <div class="flex items-center gap-1.5">
                  <div class="w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-100">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                  <span class="text-orange-300 text-sm font-bold">156</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="window-minimize flex items-center justify-center w-7 h-7 bg-blue-500/80 hover:bg-blue-500 border-none rounded transition-all duration-200 hover:scale-105 active:scale-95" title="Minimize">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <button class="window-close flex items-center justify-center w-7 h-7 bg-red-500/80 hover:bg-red-500 border-none rounded transition-all duration-200 hover:scale-105 active:scale-95" title="Close">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Window Body -->
        <div class="flex flex-1 min-h-0 w-full">
          <!-- Vertical Tabs Sidebar -->
          <div class="w-16 bg-slate-900/90 border-r-2 border-white/10 p-2 flex flex-col gap-2 overflow-y-auto flex-shrink-0" id="character_window_tabs">
            ${this.renderTabs()}
          </div>
          
          <!-- Content Area -->
          <div class="flex-1 bg-slate-800/80 overflow-hidden w-full">
            <div class="h-full overflow-y-auto w-full" id="character_window_content">
              ${this.renderContent(this.state.activeTab)}
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to the playing container
    const playingContainer = document.querySelector('.playing');
    if (playingContainer) {
      playingContainer.appendChild(this.windowElement);
    }

    // Store references
    this.contentElement = this.windowElement.querySelector('#character_window_content');
    this.tabsElement = this.windowElement.querySelector('#character_window_tabs');
  }

  private renderTabs(): string {
    return this.state.tabs.map(tab => `
      <button class="window-tab flex items-center justify-center w-12 h-12 rounded-lg border-none cursor-pointer transition-all duration-200 ${
        tab.id === this.state.activeTab 
          ? 'bg-blue-500/20 border-2 border-blue-500/30 text-white shadow-lg' 
          : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white/90 hover:scale-105'
      }" 
              data-tab="${tab.id}" title="${tab.name}">
        <div class="w-5 h-5">
          ${this.getTabIcon(tab.icon)}
        </div>
      </button>
    `).join('');
  }

  private getTabIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'user': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>`,
      'file-text': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <line x1="10" y1="9" x2="8" y2="9"/>
      </svg>`,
      'shield': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
      'hammer': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 12 2 2 4-4"/>
        <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
      </svg>`,
      'backpack': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 7c1-1 3-1 5-1s4 0 5 1v12H5V7Z"/>
        <path d="M12 6V2"/>
        <path d="M8 6V4"/>
        <path d="M16 6V4"/>
      </svg>`,
      'wand': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/>
        <path d="m14 7 3 3"/>
        <path d="M5 6v4"/>
        <path d="M19 14v4"/>
        <path d="M10 2v2"/>
        <path d="M7 8H3"/>
        <path d="M21 16h-4"/>
        <path d="M11 3H9"/>
      </svg>`,
      'scroll': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>`,
      'star': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>`,
      'compass': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"/>
      </svg>`,
      'tools': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>`,
      'layers': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="m2 17 10 5 10-5"/>
        <path d="m2 12 10 5 10-5"/>
      </svg>`,
      'book': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>`
    };

    return icons[iconName] || icons['user'];
  }

  private async renderContent(tabId: string): Promise<string> {
    switch (tabId) {
      case 'character':
        return createCharacterStatsContent();
      case 'character-sheet':
        return createCharacterSheetContent();
      case 'crafting':
        return createCraftingContent();
      case 'inventory':
        return createInventoryContent();
      case 'spells':
        return createSpellBookContent();
      case 'traits':
        return createResearchContent();
      case 'equipment':
        return createEquipmentContent();
      case 'hero-journey':
        return createHeroJourneyContent();
      case 'professions':
        const { createProfessionsContent } = await import('../components/character-window/professions');
        return createProfessionsContent();
      case 'equipment-sets':
        const { createEquipmentSetsContent } = await import('../components/character-window/equipment-sets');
        return createEquipmentSetsContent();
      case 'transmog-wardrobe':
        const { createTransmogWardrobeContent } = await import('../components/character-window/transmog-wardrobe');
        return createTransmogWardrobeContent();
      case 'abilities':
        return createAbilityListContent();
      case 'quests':
        return createQuestLogContent();
      case 'encyclopedia':
        return createEncyclopediaContent();
      default:
        return '<div class="placeholder-content">Content not available</div>';
    }
  }

  private setupEventListeners() {
    if (!this.windowElement) return;

    // Close button
    const closeBtn = this.windowElement.querySelector('.window-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Minimize button (optional functionality)
    const minimizeBtn = this.windowElement.querySelector('.window-minimize');
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => this.minimize());
    }

    // Tab switching with improved debugging
    this.windowElement.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      console.log('🖱️ Click detected on:', target.tagName, target.className);
      
      const tabBtn = target.closest('.window-tab') as HTMLElement;
      
      if (tabBtn && tabBtn.dataset.tab) {
        console.log('🖱️ Tab clicked:', tabBtn.dataset.tab);
        await this.switchTab(tabBtn.dataset.tab);
      } else {
        console.log('🖱️ Click not on tab button');
      }
    });

    // Handle content area button clicks
    this.windowElement.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button') as HTMLElement;
      
      if (button && button.textContent) {
        const buttonText = button.textContent.trim();
        console.log('🖱️ Button clicked:', buttonText);
        
        // Handle specific button actions
        switch (buttonText) {
          case 'Character Sheet':
            console.log('🖱️ Opening Character Sheet tab');
            await this.switchTab('character-sheet');
            break;
          case 'View Journey':
            console.log('🖱️ Opening Hero Journey tab');
            await this.switchTab('hero-journey');
            break;
          case 'Equipment Sets':
            console.log('🖱️ Opening Equipment Sets tab');
            await this.switchTab('equipment');
            break;
          case 'Transmog':
            console.log('🖱️ Opening Transmog tab');
            await this.switchTab('transmog');
            break;
          case 'View All':
            // Handle "View All" buttons for reputation, achievements, etc.
            console.log('🖱️ View All button clicked');
            break;
          case 'Change':
            // Handle title change button
            console.log('🖱️ Change title button clicked');
            break;
          default:
            console.log('🖱️ Unhandled button:', buttonText);
        }
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.isOpen) {
        this.close();
      }
    });

    // Close on outside click
    this.windowElement.addEventListener('click', (e) => {
      if (e.target === this.windowElement) {
        this.close();
      }
    });
  }

  async open(tabId: string = 'character') {
    if (!this.windowElement) {
      this.init();
    }

    this.state.isOpen = true;
    this.state.activeTab = tabId;
    
    if (this.windowElement) {
      this.windowElement.style.display = 'flex';
      this.updateTabs();
      await this.updateContent();
    }
  }

  close() {
    if (this.windowElement && this.state.isOpen) {
      this.windowElement.style.display = 'none';
      this.state.isOpen = false;
      
      if (this.onCloseCallback) {
        this.onCloseCallback();
      }
    }
  }

  minimize() {
    if (this.windowElement && this.state.isOpen) {
      // Toggle minimized state - hide/show the window body
      const windowBody = this.windowElement.querySelector('.flex.flex-1.min-h-0') as HTMLElement;
      if (windowBody) {
        const isMinimized = windowBody.classList.contains('hidden');
        
        if (isMinimized) {
          windowBody.classList.remove('hidden');
          windowBody.classList.add('flex');
        } else {
          windowBody.classList.remove('flex');
          windowBody.classList.add('hidden');
        }
        
        // Update minimize button icon
        const minimizeBtn = this.windowElement.querySelector('.window-minimize svg');
        if (minimizeBtn && isMinimized) {
          // Restore icon (square with X)
          minimizeBtn.innerHTML = `
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
          `;
        } else if (minimizeBtn) {
          // Minimize icon (line)
          minimizeBtn.innerHTML = `<line x1="5" y1="12" x2="19" y2="12"/>`;
        }
      }
    }
  }

  setOnCloseCallback(callback: () => void) {
    this.onCloseCallback = callback;
  }

  async switchTab(tabId: string) {
    if (this.state.activeTab === tabId) return;
    
    this.state.activeTab = tabId;
    this.updateTabs();
    await this.updateContent();
  }

  private updateTabs() {
    if (!this.tabsElement) return;
    
    // Re-render the tabs HTML to update the active state
    this.tabsElement.innerHTML = this.renderTabs();
  }

  private async updateContent() {
    if (!this.contentElement) return;
    
    const content = await this.renderContent(this.state.activeTab);
    this.contentElement.innerHTML = content;
    
    // Initialize specific functionality based on the active tab
    if (this.state.activeTab === 'inventory') {
      // Use a small delay to ensure DOM is fully rendered
      setTimeout(() => {
        initializeInventory();
      }, 100);
    } else if (this.state.activeTab === 'crafting') {
      setTimeout(() => {
        initializeCrafting();
      }, 100);
    } else if (this.state.activeTab === 'spells') {
      setTimeout(() => {
        initializeSpells();
      }, 100);
    } else if (this.state.activeTab === 'quests') {
      setTimeout(() => {
        initializeQuests();
      }, 100);
    }
  }

  isOpen(): boolean {
    return this.state.isOpen;
  }

  getActiveTab(): string {
    return this.state.activeTab;
  }
}

export const characterWindowManager = new CharacterWindowManager(); 