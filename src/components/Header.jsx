import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-slate-200/80 dark:border-slate-800/80 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">VoleyStats</h2>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <Link 
          to="/" 
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/' 
              ? 'text-primary' 
              : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/upload" 
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/upload' 
              ? 'text-primary' 
              : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
          }`}
        >
          Cargar Video
        </Link>
        <Link 
          to="/library" 
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/library' 
              ? 'text-primary' 
              : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
          }`}
        >
          Biblioteca
        </Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Cerrar sesión"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">logout</span>
        </button>
        <div 
          className="w-10 h-10 bg-center bg-no-repeat bg-cover rounded-full" 
          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAD3tQqHZMrS4_KFsD7eX0LqxTcLkpCW79hMTIu8J3fWOJni5PBACOisTUByWNBaWLUNnuJE0SsFIustp2rnaC4u5PlZYcY4RiiNka5S0ByR0_D5R9iLRvJk3YFX1N01EdiKnMjJPsYzkd0v3S2BvCF6jhLuT3NeQn18rUJtcJQH4lP-VhpZ2XARY5uQUJQz8tWfRRmXsvoiaHTALwgTUDSX67o3MXyob13dc4S3M5vcKInlAsQda6z7JL0zDii2BWEL3V0R4Ai6Bg")'}}
        ></div>
      </div>
    </header>
  );
};

export default Header;
