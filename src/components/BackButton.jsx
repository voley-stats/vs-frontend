import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ 
  to = null, 
  onClick = null, 
  children = 'Volver', 
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ${className}`}
    >
      <span className="material-symbols-outlined mr-2 text-lg">
        arrow_back
      </span>
      {children}
    </button>
  );
};

export default BackButton;
