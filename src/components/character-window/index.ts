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
    id: 'crafting',
    name: 'Crafting',
    icon: 'hammer',
    component: 'crafting-interface'
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
    id: 'traits',
    name: 'Traits',
    icon: 'star',
    component: 'trait-tree'
  },
  {
    id: 'abilities',
    name: 'Abilities',
    icon: 'layers',
    component: 'ability-list'
  },
  {
    id: 'quests',
    name: 'Quests',
    icon: 'scroll',
    component: 'quest-log'
  },
  {
    id: 'encyclopedia',
    name: 'Encyclopedia',
    icon: 'book',
    component: 'encyclopedia-entries'
  }
]; 