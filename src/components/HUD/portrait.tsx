import React from 'react';
import './portrait.css';

interface PortraitProps {
  portraitSrc: string;
  playerName?: string;
  level?: number;
  className?: string;
}

const Portrait: React.FC<PortraitProps> = ({ 
  portraitSrc, 
  playerName = "Player", 
  level = 1,
  className = ""
}) => {
  return (
    <div className={`portrait-frame ${className}`}>
      <img 
        src={portraitSrc} 
        alt={`${playerName} portrait`}
        className="portrait-image"
        onError={(e) => {
          // Fallback to a simple colored rectangle if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.portrait-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'portrait-fallback';
            fallback.textContent = playerName.charAt(0).toUpperCase();
            parent.appendChild(fallback);
          }
        }}
      />
      <div className="portrait-level">{level}</div>
    </div>
  );
};

export default Portrait; 