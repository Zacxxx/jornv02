import React, { useEffect, useState } from 'react';
import './bar-menu.css';

interface BarProps {
  current: number;
  max: number;
  color: string;
  label: string;
  gradient?: string;
}

const Bar: React.FC<BarProps> = ({ current, max, color, label, gradient }) => {
  const [displayCurrent, setDisplayCurrent] = useState(current);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'gain' | 'loss' | null>(null);
  
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  const isLow = percentage <= 20;
  const isCritical = percentage <= 10;

  useEffect(() => {
    if (displayCurrent !== current) {
      setIsAnimating(true);
      setAnimationType(current > displayCurrent ? 'gain' : 'loss');
      
      const duration = 300;
      const steps = 20;
      const stepValue = (current - displayCurrent) / steps;
      const stepDuration = duration / steps;
      
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step >= steps) {
          setDisplayCurrent(current);
          clearInterval(interval);
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationType(null);
          }, 100);
        } else {
          setDisplayCurrent(prev => Math.round(prev + stepValue));
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [current, displayCurrent]);
  
  return (
    <div className={`stat-bar ${isLow ? 'low' : ''} ${isCritical ? 'critical' : ''} ${isAnimating ? `animating-${animationType}` : ''}`}>
      <div className="stat-bar-container">
        <div className="stat-bar-background">
          <div 
            className="stat-bar-fill" 
            style={{ 
              width: `${percentage}%`,
              background: gradient || color
            }}
          />
          <div className="stat-bar-content">
            <span className="stat-label">{label}</span>
            <span className="stat-values">{displayCurrent}/{max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BarMenuProps {
  hp: { current: number; max: number };
  mp: { current: number; max: number };
  energy: { current: number; max: number };
}

const BarMenu: React.FC<BarMenuProps> = ({ hp, mp, energy }) => {
  return (
    <div className="hud-bar-menu">
      <Bar 
        current={hp.current} 
        max={hp.max} 
        color="#dc2626" 
        label="HP" 
        gradient="linear-gradient(90deg, #dc2626 0%, #991b1b 100%)"
      />
      
      <Bar 
        current={mp.current} 
        max={mp.max} 
        color="#2563eb" 
        label="MP" 
        gradient="linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)"
      />
      
      <Bar 
        current={energy.current} 
        max={energy.max} 
        color="#ca8a04" 
        label="EN" 
        gradient="linear-gradient(90deg, #ca8a04 0%, #a16207 100%)"
      />
    </div>
  );
};

export default BarMenu; 