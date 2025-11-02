import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFilters } from '../contexts/FiltersContext';
import VoleyStatsLogo from './VoleyStatsLogo';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { filters, updateFilters } = useFilters();
  
  // Detectar si estamos en la sección de partidos
  const isInMatchesSection = location.pathname === '/library';

  // Navegación base para todos los usuarios
  const baseNavigationItems = [
    {
      name: 'Resumen',
      href: user?.role === 'assistant' ? '/' : '/',
      icon: 'bar_chart',
      current: location.pathname === '/' || location.pathname === '/assistant-dashboard'
    },
    {
      name: 'Partidos',
      href: '/library',
      icon: 'event',
      current: location.pathname === '/library'
    },
    {
      name: 'Estadísticas',
      href: '/library', // Los usuarios verán estadísticas desde la lista de partidos
      icon: 'show_chart',
      current: location.pathname.startsWith('/stats')
    }
  ];

  // Navegación para entrenadores/administradores (coach = admin)
  const coachAdminNavigationItems = [
    {
      name: 'Subir Video',
      href: '/upload',
      icon: 'upload',
      current: location.pathname === '/upload'
    },
    {
      name: 'Gestión del Equipo',
      href: '/teams',
      icon: 'groups',
      current: location.pathname === '/teams'
    }
  ];

  // Construir navegación según el rol
  let navigationItems = [...baseNavigationItems];
  
  // Entrenadores y administradores (coach = admin) tienen acceso completo
  if (user?.role === 'coach' || user?.role === 'admin') {
    navigationItems = [...navigationItems, ...coachAdminNavigationItems];
  }


  const settingsItem = {
    name: 'Configuración',
    href: '/settings',
    icon: 'settings',
    current: location.pathname === '/settings'
  };

  const profileItem = {
    name: 'Mi Perfil',
    href: '/profile',
    icon: 'person',
    current: location.pathname === '/profile'
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleFilterChange = (e) => {
    updateFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed left-0 top-0 flex flex-col h-screen bg-black dark:bg-gray-dark w-64 z-50">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-700">
        <VoleyStatsLogo size="sidebar" />
      </div>

      {/* Navigation - Ocupa todo el espacio disponible */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {isInMatchesSection ? (
          // Mostrar filtros cuando estamos en partidos
          <div className="space-y-4">
            <h3 className="text-white text-lg font-medium mb-4">Filtros</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha Desde
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fecha Hasta
                </label>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Equipo
                </label>
                <input
                  type="text"
                  name="team"
                  value={filters.team}
                  onChange={handleFilterChange}
                  placeholder="Buscar por equipo..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Temporada
                </label>
                <select
                  name="season"
                  value={filters.season}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Todas las temporadas</option>
                  <option value="Apertura">Apertura</option>
                  <option value="Clausura">Clausura</option>
                  <option value="Liga">Liga</option>
                  <option value="Copa">Copa</option>
                  <option value="Playoff">Playoff</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Estado
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Todos los estados</option>
                  <option value="Procesado">Procesado</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          // Mostrar navegación normal
          navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${
                item.current
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-lg">
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))
        )}
      </nav>

      {/* Opciones de Usuario - Siempre al final */}
      <div className="px-4 py-4 border-t border-gray-700 space-y-2 bg-black dark:bg-gray-dark">
        <Link
          to={settingsItem.href}
          className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${
            settingsItem.current
              ? 'bg-primary text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            {settingsItem.icon}
          </span>
          {settingsItem.name}
        </Link>

        <Link
          to={profileItem.href}
          className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${
            profileItem.current
              ? 'bg-primary text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            {profileItem.icon}
          </span>
          {profileItem.name}
        </Link>
        
        <button
          onClick={handleLogout}
          className="w-full group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors text-gray-300 hover:bg-red-600 hover:text-white"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            logout
          </span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
