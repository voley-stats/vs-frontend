import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import VolleyballIcon from './VolleyballIcon';
import UserProfile from './UserProfile';

const Header = () => {
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-slate-200/80 dark:border-slate-800/80 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10">
          <VolleyballIcon className="w-10 h-10" />
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
        {hasPermission('upload_videos') && (
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
        )}
        {hasPermission('view_library') && (
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
        )}
        {hasPermission('manage_users') && (
          <Link 
            to="/admin" 
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/admin' 
                ? 'text-primary' 
                : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            Administración
          </Link>
        )}
      </nav>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setShowProfile(true)}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Configuración de perfil"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">settings</span>
        </button>
        <button 
          onClick={logout}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          title="Cerrar sesión"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">logout</span>
        </button>
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 transition-colors"
          onClick={() => setShowProfile(true)}
        >
          <div 
            className="w-10 h-10 bg-center bg-no-repeat bg-cover rounded-full" 
            style={{backgroundImage: `url("${user?.avatar}")`}}
          ></div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
      
      {/* Modal de Perfil */}
      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </header>
  );
};

export default Header;
