export interface CharacterWindowTab {
  id: string;
  name: string;
  icon: string;
  component: string;
}

export interface CharacterWindowState {
  isOpen: boolean;
  activeTab: string;
  tabs: CharacterWindowTab[];
}

export const CHARACTER_WINDOW_TABS: CharacterWindowTab[] = [
  {
    id: 'character',
    name: 'Character',
    icon: 'user',
    component: 'character-stats'
  },
  {
    id: 'character-sheet',
    name: 'Character Sheet',
    icon: 'file-text',
    component: 'character-sheet'
  },
  {
    id: 'equipment',
    name: 'Equipment',
    icon: 'shield',
    component: 'equipment'
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: 'backpack',
    component: 'inventory-grid'
  },
  {
    id: 'spells',
    name: 'Spells',
    icon: 'wand',
    component: 'spell-book'
  },
  {
    id: 'quests',
    name: 'Quests',
    icon: 'scroll',
    component: 'quest-log'
  },
  {
    id: 'crafting',
    name: 'Crafting',
    icon: 'hammer',
    component: 'crafting-interface'
  },
  {
    id: 'traits',
    name: 'Research',
    icon: 'star',
    component: 'research'
  },
  {
    id: 'hero-journey',
    name: 'Hero Journey',
    icon: 'compass',
    component: 'hero-journey'
  },
  {
    id: 'professions',
    name: 'Professions',
    icon: 'tools',
    component: 'professions'
  },
  {
    id: 'abilities',
    name: 'Abilities',
    icon: 'layers',
    component: 'ability-list'
  },
  {
    id: 'encyclopedia',
    name: 'Encyclopedia',
    icon: 'book',
    component: 'encyclopedia-entries'
  }
]; 