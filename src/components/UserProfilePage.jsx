import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { profileService } from '../services/profileService';
import BackButton from './BackButton';
import LoadingSpinner from './LoadingSpinner';

const UserProfilePage = () => {
  const { user } = useAuth();
  const { preferences, updatePreferences, loading: preferencesLoading } = usePreferences();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profileData, setProfileData] = useState(null);

  // Cargar datos del perfil del backend (solo lectura)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const profile = await profileService.getProfile();
        setProfileData(profile);
      } catch (err) {
        console.error('Error cargando perfil:', err);
        // Si falla, usar datos del contexto
        setProfileData({
          username: user?.username || '',
          email: user?.email || '',
          avatar: user?.avatar || '',
          role: user?.role || ''
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);


  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <BackButton to="/" className="mb-4" />
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                Mi Perfil
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Información de tu cuenta
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800 dark:text-green-200">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading indicator for preferences */}
            {preferencesLoading && (
              <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center">
                  <LoadingSpinner size="sm" className="mr-3" />
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Cargando preferencias...
                  </p>
                </div>
              </div>
            )}

            {/* Información del Perfil */}
            <div className="bg-white dark:bg-gray-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-6">
                Información de la Cuenta
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Nombre de usuario
                  </label>
                  <p className="text-black dark:text-white font-medium text-lg">
                    {profileData?.username || user?.username}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Email
                  </label>
                  <p className="text-black dark:text-white font-medium text-lg">
                    {profileData?.email || user?.email}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Rol
                  </label>
                  <p className="text-black dark:text-white font-medium text-lg capitalize">
                    {profileData?.role === 'admin' || profileData?.role === 'coach' || user?.role === 'admin' || user?.role === 'coach' ? 'Entrenador' : 'Ayudante'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Estado de la cuenta
                  </label>
                  <p className="text-green-600 dark:text-green-400 font-medium text-lg">
                    Activa
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Para modificar tu información personal, ve a <strong>Configuración</strong> en el menú lateral.
                </p>
              </div>
            </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
