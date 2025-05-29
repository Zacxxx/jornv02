import React from 'react';
import { motion } from 'framer-motion';
import './FloatingHealthBar.css';

interface FloatingHealthBarProps {
  health: number;
  maxHealth: number;
  visible?: boolean;
  position: { x: number; y: number };
  name?: string;
  showName?: boolean;
  level?: number;
}

const FloatingHealthBar: React.FC<FloatingHealthBarProps> = ({
  health,
  maxHealth,
  visible = true,
  position,
  name = "Enemy",
  showName = false,
  level
}) => {
  if (!visible || maxHealth <= 0) return null;

  const percentage = Math.max(0, Math.min(100, (health / maxHealth) * 100));
  const isLow = percentage <= 20;
  const isCritical = percentage <= 10;
  const isDead = health <= 0;

  // Debug logging
  console.log(`🎯 FloatingHealthBar rendering: ${name}`, {
    position,
    health: `${health}/${maxHealth}`,
    percentage: `${percentage}%`,
    visible,
    showName,
    level,
    isDead,
    calculatedStyle: {
      left: `${position.x}px`,
      top: `${position.y}px`,
      transform: 'translate(-50%, -100%)',
      zIndex: 1000
    }
  });

  return (
    <motion.div
      className="floating-health-bar"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        zIndex: 1000,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ 
        opacity: isDead ? 0 : 1, 
        scale: isDead ? 0.8 : 1,
        y: isDead ? 10 : 0
      }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] 
      }}
    >
      {showName && (
        <div className="floating-health-name">
          <span className="npc-name">{name}</span>
          {level && level > 1 && (
            <span className="npc-level">Lv.{level}</span>
          )}
        </div>
      )}
      
      <div className="floating-health-track">
        <motion.div
          className={`floating-health-fill ${isLow ? 'low' : ''} ${isCritical ? 'critical' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1] 
          }}
        />
        
        <div className="floating-health-text">
          <span className="health-values">
            {health}/{maxHealth}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingHealthBar; 