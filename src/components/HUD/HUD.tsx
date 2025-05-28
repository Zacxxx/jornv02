import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BarMenu from './bar-menu';
import Portrait from './portrait';
import './HUD.css';
import { cn } from '../../utils/cn';

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
  const isLowHealth = (playerStats.hp.current / playerStats.hp.max) <= 0.2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(
            "hud-layout",
            isLowHealth && "low-health"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
          }}
          transition={{ 
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] // cubic-bezier for smooth animation
          }}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HUD;
export type { PlayerStats }; 