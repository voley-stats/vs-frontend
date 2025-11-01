import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AssistantDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadUserCategories();
  }, []);

  const loadUserCategories = async () => {
    try {
      setLoading(true);
      // Cargar categorías del ayudante
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/categories/my-categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTeams(data.categories || []);
      }
    } catch (error) {
      console.error('Error cargando categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Dashboard de Ayudante
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Bienvenido, {user?.fullName || user?.username}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Estadísticas básicas */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                Mis Categorías
              </h3>
              <p className="text-3xl font-bold text-primary">
                {teams.length}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Categorías asignadas
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                Rol
              </h3>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                Ayudante
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Asistente técnico
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                Estado
              </h3>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                Activo
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Perfil completo
              </p>
            </div>
          </div>

          {/* Lista de categorías */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Categorías Asignadas
            </h2>
            
            {teams.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  No tienes categorías asignadas aún
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((category) => (
                  <div key={category.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                      {category.division} - {category.gender}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      {category.club_name}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {category.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Funcionalidades limitadas */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Funcionalidades Disponibles
            </h2>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.725-1.36 3.49 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Acceso Limitado
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>Como ayudante, tienes acceso limitado a las funcionalidades de VoleyStats:</p>
                    <ul className="mt-2 list-disc list-inside">
                      <li>Ver equipos asignados</li>
                      <li>Acceder a análisis básicos</li>
                      <li>Ver estadísticas de partidos</li>
                    </ul>
                    <p className="mt-2">Para funciones avanzadas, contacta a tu entrenador.</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;
