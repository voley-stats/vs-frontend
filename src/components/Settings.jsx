import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import { profileService } from '../services/profileService';
import BackButton from './BackButton';

const Settings = () => {
  const { user } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    notifications: preferences?.notifications !== undefined ? preferences.notifications : true
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: preferences?.theme || 'dark',
    fontSize: preferences?.fontSize || 'medium'
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: 'person' },
    { id: 'notifications', label: 'Notificaciones', icon: 'notifications' },
    { id: 'display', label: 'Pantalla', icon: 'palette' },
    { id: 'privacy', label: 'Privacidad', icon: 'security' }
  ];

  // Actualizar profileData cuando cambie el usuario
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user?.username || '',
        email: user?.email || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Cargar preferencias de notificaciones cuando cambien las preferencias
  useEffect(() => {
    if (preferences?.notifications !== undefined) {
      setNotificationSettings({
        notifications: preferences.notifications
      });
    }
  }, [preferences]);

  const handleDisplayChange = (e) => {
    const { name, value } = e.target;
    setDisplaySettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await profileService.updateProfile(profileData);
      setMessage('Perfil actualizado correctamente');
      // Actualizar el usuario en el contexto si es necesario
      if (response.user) {
        // El contexto se actualizará automáticamente en el próximo login
      }
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      setMessage(error.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      // Actualizar preferencias usando el campo notifications del backend
      await updatePreferences({ notifications: notificationSettings.notifications });
      setMessage('Configuración de notificaciones actualizada');
    } catch (error) {
      console.error('Error actualizando notificaciones:', error);
      setMessage(error.message || 'Error al actualizar las notificaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDisplay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await updatePreferences(displaySettings);
      setMessage('Configuración de pantalla actualizada');
    } catch (error) {
      setMessage('Error al actualizar la configuración');
    } finally {
      setLoading(false);
    }
  };

  const renderProfile = () => (
    <form onSubmit={handleSaveProfile} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleProfileChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Nota:</strong> Solo puedes actualizar tu nombre de usuario y correo electrónico. Para cambiar otros datos de tu perfil, contacta con un administrador.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Guardando...' : 'Guardar Perfil'}
        </button>
      </div>
    </form>
  );

  const renderNotifications = () => (
    <form onSubmit={handleSaveNotifications} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">Notificaciones por Email</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Recibir notificaciones importantes por correo electrónico</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="notifications"
              checked={notificationSettings.notifications}
              onChange={handleNotificationChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Nota:</strong> Actualmente solo está disponible la configuración general de notificaciones. Próximamente se podrán configurar tipos específicos de notificaciones.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Guardando...' : 'Guardar Notificaciones'}
        </button>
      </div>
    </form>
  );

  const renderDisplay = () => (
    <form onSubmit={handleSaveDisplay} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tema
          </label>
          <select
            id="theme"
            name="theme"
            value={displaySettings.theme}
            onChange={handleDisplayChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="system">Sistema</option>
          </select>
        </div>

        <div>
          <label htmlFor="fontSize" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Tamaño de Fuente
          </label>
          <select
            id="fontSize"
            name="fontSize"
            value={displaySettings.fontSize}
            onChange={handleDisplayChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Guardando...' : 'Guardar Configuración'}
        </button>
      </div>
    </form>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Datos Personales</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Tienes control total sobre tus datos personales. Puedes modificar tu información en cualquier momento.
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
          >
            <span className="material-symbols-outlined mr-2 text-sm">delete</span>
            Eliminar Cuenta
          </button>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Privacidad de Videos</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Tus videos son privados por defecto. Solo tú puedes verlos y sus análisis.
        </p>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
            <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Mantener videos privados</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
            <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Permitir análisis anónimos para mejorar el sistema</span>
          </label>
        </div>
      </div>

      {/* Modal para Eliminar Cuenta */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl">warning</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Eliminar Cuenta
              </h3>
              {user?.role === 'coach' ? (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Para eliminar tu cuenta de entrenador, por favor contacta con un administrador del sistema.
                </p>
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
                </p>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                {user?.role !== 'coach' && (
                  <button
                    onClick={() => {
                      // Aquí iría la lógica para eliminar la cuenta (no implementado en backend)
                      setShowDeleteModal(false);
                      setMessage('La eliminación de cuenta no está disponible actualmente');
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'notifications':
        return renderNotifications();
      case 'display':
        return renderDisplay();
      case 'privacy':
        return renderPrivacy();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header con botón de retroceso */}
            <div className="mb-8">
              <BackButton to="/" className="mb-4" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Configuración
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Personaliza tu experiencia en VolleyStats
              </p>
            </div>

            {/* Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-md ${
                message.includes('Error') 
                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                  : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
              }`}>
                <p className={`text-sm ${
                  message.includes('Error') 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {message}
                </p>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80 mb-6">
              <div className="border-b border-slate-200/80 dark:border-slate-800/80">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                      }`}
                    >
                      <span className="material-symbols-outlined mr-2 text-sm">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80 p-6">
              {renderContent()}
            </div>
      </div>
    </div>
  );
};

export default Settings;
