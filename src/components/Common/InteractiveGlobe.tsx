import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../../contexts/GlobalContext';

const InteractiveGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useGlobalContext();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Set precise mouse coordinates for CSS variables
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const isDark = theme === 'dark';

  // Base Map Opacity Settings 
  // Map remains dimly lit and highlights locally where mouse hovers.
  const mapColor = isDark 
     ? 'invert(60%) sepia(30%) saturate(600%) hue-rotate(130deg) brightness(120%) opacity(0.8)' // teal/brand tone but brighter base
     : 'invert(30%) sepia(50%) saturate(400%) hue-rotate(130deg) brightness(80%) opacity(0.8)';

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen z-0 overflow-hidden pointer-events-none transition-colors duration-500"
    >
      {/* 
        The underlying map layer (Dim)
      */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center opacity-20 dark:opacity-20"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}world-map.svg')`,
          backgroundSize: 'cover',
          filter: mapColor,
        }}
      />

      {/* 
        The "Highlight / Glow" layer containing the same map, 
        but masked using a radial-gradient to only show around the mouse cursor.
      */}
      <div 
        className={`absolute inset-0 bg-no-repeat bg-center pointer-events-none transition-opacity duration-300 ${isDark ? 'mix-blend-screen opacity-100' : 'mix-blend-plus-lighter opacity-100'}`}
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}world-map.svg')`,
          backgroundSize: 'cover',
          filter: isDark 
            ? 'invert(75%) sepia(50%) saturate(400%) hue-rotate(130deg) brightness(160%)' 
            : 'invert(50%) sepia(80%) saturate(600%) hue-rotate(130deg) brightness(130%)',
          WebkitMaskImage: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.15) 0%, transparent 100%)`,
          maskImage: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.15) 0%, transparent 100%)`,
          transition: 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default InteractiveGlobe;
