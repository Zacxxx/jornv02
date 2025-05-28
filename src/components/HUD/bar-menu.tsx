import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import './bar-menu.css';

interface Stat {
  current: number;
  max: number;
}

interface BarMenuProps {
  hp: Stat;
  mp: Stat;
  energy: Stat;
  className?: string;
}

const StatBar: React.FC<{
  label: string;
  stat: Stat;
  color: string;
  lowThreshold?: number;
  className?: string;
}> = ({ label, stat, color, lowThreshold = 0.2, className = "" }) => {
  const percentage = Math.max(0, Math.min(100, (stat.current / stat.max) * 100));
  const isLow = percentage <= (lowThreshold * 100);
  const isCritical = percentage <= 10;

  return (
    <motion.div 
      className={cn("stat-bar-container", className)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="stat-bar-info">
        <span className="stat-label">{label}</span>
        <span className="stat-values">
          {stat.current}/{stat.max}
        </span>
      </div>
      
      <div className="stat-bar-track">
        <motion.div
          className={cn(
            "stat-bar-fill",
            `stat-bar-${color}`,
            isLow && "stat-bar-low",
            isCritical && "stat-bar-critical"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.1 
          }}
        />
      </div>
    </motion.div>
  );
};

const BarMenu: React.FC<BarMenuProps> = ({ hp, mp, energy, className = "" }) => {
  return (
    <motion.div 
      className={cn("bar-menu", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1
      }}
    >
      <StatBar 
        label="HP" 
        stat={hp} 
        color="hp" 
        lowThreshold={0.2}
      />
      <StatBar 
        label="MP" 
        stat={mp} 
        color="mp" 
        lowThreshold={0.1}
      />
      <StatBar 
        label="EN" 
        stat={energy} 
        color="energy" 
        lowThreshold={0.15}
      />
    </motion.div>
  );
};

export default BarMenu; 