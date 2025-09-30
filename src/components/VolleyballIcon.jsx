import React from 'react';

const VolleyballIcon = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="volleyballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7F00" />
          <stop offset="100%" stopColor="#FFB300" />
        </linearGradient>
      </defs>
      
      {/* Círculo principal del balón */}
      <circle 
        cx="24" 
        cy="24" 
        r="20" 
        fill="url(#volleyballGradient)"
      />
      
      {/* Líneas de los paneles del balón - más precisas */}
      <path 
        d="M24 4 C 24 4, 8 12, 8 24 C 8 36, 24 44, 24 44" 
        stroke="#FFFFFF" 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M24 4 C 24 4, 40 12, 40 24 C 40 36, 24 44, 24 44" 
        stroke="#FFFFFF" 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M8 24 C 8 24, 16 16, 24 16 C 32 16, 40 24, 40 24" 
        stroke="#FFFFFF" 
        strokeWidth="2" 
        fill="none"
      />
      <path 
        d="M8 24 C 8 24, 16 32, 24 32 C 32 32, 40 24, 40 24" 
        stroke="#FFFFFF" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Líneas curvas adicionales para más realismo */}
      <path 
        d="M12 16 C 12 16, 20 8, 24 8 C 28 8, 36 16, 36 16" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        fill="none"
      />
      <path 
        d="M12 32 C 12 32, 20 40, 24 40 C 28 40, 36 32, 36 32" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        fill="none"
      />
      
      {/* Líneas horizontales adicionales para más detalle */}
      <path 
        d="M12 20 C 12 20, 20 12, 24 12 C 28 12, 36 20, 36 20" 
        stroke="#FFFFFF" 
        strokeWidth="1" 
        fill="none"
        opacity="0.7"
      />
      <path 
        d="M12 28 C 12 28, 20 36, 24 36 C 28 36, 36 28, 36 28" 
        stroke="#FFFFFF" 
        strokeWidth="1" 
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
};

export default VolleyballIcon;
