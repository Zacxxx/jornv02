export { default as HUD } from './HUD';
export { default as BarMenu } from './bar-menu';
export { default as Portrait } from './portrait';

// Types pour faciliter l'utilisation
export interface PlayerStats {
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  energy: { current: number; max: number };
  level: number;
  name: string;
  portraitSrc: string;
} 