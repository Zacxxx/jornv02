import { CHARACTER_WINDOW_TABS, CharacterWindowState } from '../components/character-window';
import { createCharacterStatsContent } from '../components/character-window/character-stats';
import { createInventoryContent } from '../components/character-window/inventory-grid';
import { createCraftingContent } from '../components/character-window/crafting-interface';
import { createSpellBookContent } from '../components/character-window/spell-book';
import { createTraitTreeContent } from '../components/character-window/trait-tree';
import { createAbilityListContent } from '../components/character-window/ability-list';
import { createQuestLogContent } from '../components/character-window/quest-log';
import { createEncyclopediaContent } from '../components/character-window/encyclopedia-entries';

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
      <div class="window-header">
        <h3 class="window-title">Character</h3>
        <button class="window-close">✕</button>
      </div>
      <div class="window-body">
        <div class="window-tabs" id="character_window_tabs">
          ${this.renderTabs()}
        </div>
        <div class="window-content" id="character_window_content">
          ${this.renderContent(this.state.activeTab)}
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
      <button class="window-tab ${tab.id === this.state.activeTab ? 'active' : ''}" 
              data-tab="${tab.id}">
        <div class="tab-icon">
          ${this.getTabIcon(tab.icon)}
        </div>
        <span class="tab-label">${tab.name}</span>
      </button>
    `).join('');
  }

  private getTabIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'user': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
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
      'star': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>`,
      'layers': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="m2 17 10 5 10-5"/>
        <path d="m2 12 10 5 10-5"/>
      </svg>`,
      'scroll': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>`,
      'book': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        <circle cx="12" cy="8" r="2"/>
        <path d="M12 10v4h4"/>
      </svg>`
    };
    return icons[iconName] || '📄';
  }

  private renderContent(tabId: string): string {
    switch (tabId) {
      case 'character':
        return createCharacterStatsContent();
      case 'crafting':
        return createCraftingContent();
      case 'inventory':
        return createInventoryContent();
      case 'spells':
        return createSpellBookContent();
      case 'traits':
        return createTraitTreeContent();
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

    // Tab switching
    this.windowElement.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const tabBtn = target.closest('.window-tab') as HTMLElement;
      
      if (tabBtn && tabBtn.dataset.tab) {
        this.switchTab(tabBtn.dataset.tab);
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

  open(tabId: string = 'character') {
    if (!this.windowElement) {
      this.init();
    }

    this.state.isOpen = true;
    this.state.activeTab = tabId;
    
    if (this.windowElement) {
      this.windowElement.style.display = 'flex';
      this.updateTabs();
      this.updateContent();
    }
  }

  close() {
    this.state.isOpen = false;
    if (this.windowElement) {
      this.windowElement.style.display = 'none';
    }
    
    // Notify callback that window is closed
    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
  }

  setOnCloseCallback(callback: () => void) {
    this.onCloseCallback = callback;
  }

  switchTab(tabId: string) {
    if (this.state.activeTab === tabId) return;
    
    this.state.activeTab = tabId;
    this.updateTabs();
    this.updateContent();
  }

  private updateTabs() {
    if (!this.tabsElement) return;
    
    const tabs = this.tabsElement.querySelectorAll('.window-tab');
    tabs.forEach(tab => {
      const tabElement = tab as HTMLElement;
      if (tabElement.dataset.tab === this.state.activeTab) {
        tabElement.classList.add('active');
      } else {
        tabElement.classList.remove('active');
      }
    });
  }

  private updateContent() {
    if (!this.contentElement) return;
    
    this.contentElement.innerHTML = this.renderContent(this.state.activeTab);
  }

  isOpen(): boolean {
    return this.state.isOpen;
  }

  getActiveTab(): string {
    return this.state.activeTab;
  }
}

export const characterWindowManager = new CharacterWindowManager(); 