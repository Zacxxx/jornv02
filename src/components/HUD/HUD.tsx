import React from 'react';
import BarMenu from './bar-menu';
import Portrait from './portrait';
import './HUD.css';

interface PlayerStats {
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  energy: { current: number; max: number };
  level: number;
  name: string;
  portraitSrc: string;
}

interface HUDProps {
  playerStats: PlayerStats;
  visible?: boolean;
}

const HUD: React.FC<HUDProps> = ({ playerStats, visible = true }) => {
  if (!visible) return null;

  const isLowHealth = (playerStats.hp.current / playerStats.hp.max) <= 0.2;

  return (
    <div className="hud-layout">
      <Portrait 
        portraitSrc={playerStats.portraitSrc}
        playerName={playerStats.name}
        level={playerStats.level}
        className={isLowHealth ? 'low-health' : ''}
      />
      <BarMenu 
        hp={playerStats.hp}
        mp={playerStats.mp}
        energy={playerStats.energy}
      />
    </div>
  );
};

export default HUD; 