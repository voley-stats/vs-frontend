import React from 'react';
import voleyStatsLogo from '../assets/VOLEY_STATS_LOGO_CROPPED.svg';

const VoleyStatsLogo = ({ className, showText = true, textSize = "text-xl", size = "default" }) => {
  // Definir tamaños por defecto según el contexto
  const getSizeClasses = () => {
    if (className) return className; // Si se especifica className, usarlo
    
    switch (size) {
      case 'login':
        return "w-[800px] h-[200px]"; // Muy grande para login con logo recortado
      case 'sidebar':
        return "w-48 h-12"; // Reducido para sidebar
      case 'small':
        return "w-32 h-8"; // Reducido para header
      case 'large':
        return "w-[800px] h-[200px]"; // Grande
      default:
        return "w-80 h-20"; // Tamaño por defecto
    }
  };

  return (
    <div className={`flex items-center ${getSizeClasses()}`}>
      <img 
        src={voleyStatsLogo} 
        alt="VoleyStats Logo"
        className="h-full w-auto"
      />
    </div>
  );
};

export default VoleyStatsLogo;
