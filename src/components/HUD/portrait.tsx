import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './portrait.css';
import { cn } from '../../utils/cn';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Reset states when portraitSrc changes
    setImageLoaded(false);
    setImageError(false);
    
    // Normalize asset path for production builds
    let normalizedSrc = portraitSrc;
    
    // Handle different path formats
    if (portraitSrc.startsWith('./')) {
      normalizedSrc = portraitSrc.substring(1); // Remove leading dot
    } else if (!portraitSrc.startsWith('/') && !portraitSrc.startsWith('http')) {
      normalizedSrc = `/${portraitSrc}`;
    }
    
    // For production builds, ensure proper asset resolution
    if (import.meta.env.PROD) {
      // In production, assets might be in a different location
      if (normalizedSrc.startsWith('/assets/')) {
        // Keep as is for Vite's asset handling
      } else if (!normalizedSrc.startsWith('http')) {
        normalizedSrc = `/assets/${normalizedSrc.replace(/^\/+/, '')}`;
      }
    }
    
    setCurrentSrc(normalizedSrc);
    console.log(`Portrait: Setting source to ${normalizedSrc} (original: ${portraitSrc})`);
  }, [portraitSrc]);

  const handleImageLoad = () => {
    console.log(`Portrait loaded successfully: ${currentSrc}`);
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    console.warn(`Portrait failed to load: ${currentSrc}`);
    setImageError(true);
    setImageLoaded(false);
    
    // Try fallback paths
    const fallbackPaths = [
      '/assets/characters/portrait/default-portrait.png',
      './assets/characters/portrait/default-portrait.png',
      '/public/assets/characters/portrait/default-portrait.png'
    ];
    
    const currentIndex = fallbackPaths.indexOf(currentSrc);
    if (currentIndex < fallbackPaths.length - 1) {
      const nextFallback = fallbackPaths[currentIndex + 1];
      console.log(`Portrait: Trying fallback: ${nextFallback}`);
      setCurrentSrc(nextFallback);
      setImageError(false);
    } else {
      console.warn('Portrait: All fallback paths failed, using text fallback');
    }
  };

  return (
    <motion.div 
      className={cn("portrait-frame", className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {!imageError && currentSrc && (
        <motion.img 
          src={currentSrc} 
          alt={`${playerName} portrait`}
          className="portrait-image"
          onLoad={handleImageLoad}
          onError={handleImageError}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {(imageError || !imageLoaded) && (
        <motion.div 
          className="portrait-fallback"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {playerName.charAt(0).toUpperCase()}
        </motion.div>
      )}
      
      <motion.div 
        className="portrait-level"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {level}
      </motion.div>
    </motion.div>
  );
};

export default Portrait; 