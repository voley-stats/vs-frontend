import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { profileService } from '../services/profileService';

const UserProfile = ({ onClose }) => {
  const { user } = useAuth();
  const { preferences, updatePreferences, loading: preferencesLoading } = usePreferences();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    preferences: {
      theme: preferences.theme,
      notifications: preferences.notifications,
      language: preferences.language,
      fontSize: preferences.fontSize
    }
  });

  // Actualizar formData cuando cambien las preferencias o el usuario
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
      preferences: {
        theme: preferences.theme,
        notifications: preferences.notifications,
        language: preferences.language,
        fontSize: preferences.fontSize
      }
    }));
  }, [preferences, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Actualizar perfil en el backend
      const profileData = {
        username: formData.name,
        email: formData.email
      };
      
      await profileService.updateProfile(profileData);
      
      // Actualizar preferencias usando el contexto
      updatePreferences(formData.preferences);
      
      setSuccess('Perfil actualizado exitosamente');
      setIsEditing(false);
      
    } catch (err) {
      console.error('🚨 Error en UserProfile:', err);
      console.error('🚨 Error message:', err.message);
      console.error('🚨 Error response:', err.response);
      const errorMessage = err.message || 'Error al actualizar el perfil';
      console.log('🚨 Estableciendo error:', errorMessage);
      setError(errorMessage);
      console.log('🚨 Error establecido, estado actual:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const response = await profileService.uploadAvatar(file);
        setFormData(prev => ({
          ...prev,
          avatar: response.avatar
        }));
        setSuccess('Avatar actualizado exitosamente');
      } catch (err) {
        setError(err.message || 'Error subiendo avatar');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Mi Perfil
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Avatar Section */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div 
                className="w-24 h-24 rounded-full bg-cover bg-center mx-auto mb-4"
                style={{backgroundImage: `url("${formData.avatar}")`}}
              ></div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-sm">camera_alt</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
              {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
            </p>
          </div>

          {/* Loading indicator for preferences */}
          {preferencesLoading && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Cargando preferencias...
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-200 dark:bg-red-900/50 border-4 border-red-400 dark:border-red-600 rounded-xl p-6 mb-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-red-600 text-2xl mr-3">error</span>
                    <div>
                      <p className="text-lg font-bold text-red-800 dark:text-red-200">
                        {console.log('🚨 Renderizando error:', error)}
                        {error}
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        Por favor, elige un nombre de usuario diferente.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setError('')}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Debug: Mostrar estado de error */}
            {console.log('🔍 Estado de error en render:', error)}

            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Preferencias
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tema
                  </label>
                  <select
                    name="preferences.theme"
                    value={formData.preferences.theme}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  >
                    <option value="dark">Oscuro</option>
                    <option value="light">Claro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Idioma
                  </label>
                  <select
                    name="preferences.language"
                    value={formData.preferences.language}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Tamaño de Fuente
                  </label>
                  <select
                    name="preferences.fontSize"
                    value={formData.preferences.fontSize}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:bg-slate-100 dark:disabled:bg-slate-700"
                  >
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="large">Grande</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="preferences.notifications"
                    checked={formData.preferences.notifications}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-600 rounded disabled:opacity-50"
                  />
                  <label className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                    Recibir notificaciones
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Editar Perfil
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cerrar
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
