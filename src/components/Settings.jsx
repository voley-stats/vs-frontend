import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePreferences } from '../contexts/PreferencesContext';
import BackButton from './BackButton';

const Settings = () => {
  const { user } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    team: user?.team || '',
    position: user?.position || '',
    bio: user?.bio || ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    matchAnalysisComplete: true,
    weeklyReports: true,
    systemUpdates: false
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: preferences?.theme || 'system',
    language: preferences?.language || 'es',
    timezone: preferences?.timezone || 'America/Mexico_City',
    dateFormat: preferences?.dateFormat || 'DD/MM/YYYY'
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: 'person' },
    { id: 'notifications', label: 'Notificaciones', icon: 'notifications' },
    { id: 'display', label: 'Pantalla', icon: 'palette' },
    { id: 'privacy', label: 'Privacidad', icon: 'security' }
  ];

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
      // Aquí iría la lógica para actualizar el perfil
      console.log('Actualizando perfil:', profileData);
      setMessage('Perfil actualizado correctamente');
    } catch (error) {
      setMessage('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      // Aquí iría la lógica para actualizar las notificaciones
      console.log('Actualizando notificaciones:', notificationSettings);
      setMessage('Configuración de notificaciones actualizada');
    } catch (error) {
      setMessage('Error al actualizar las notificaciones');
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
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
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

        <div>
          <label htmlFor="team" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Equipo
          </label>
          <input
            type="text"
            id="team"
            name="team"
            value={profileData.team}
            onChange={handleProfileChange}
            placeholder="Nombre de tu equipo"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Posición
          </label>
          <select
            id="position"
            name="position"
            value={profileData.position}
            onChange={handleProfileChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="">Seleccionar posición</option>
            <option value="entrenador">Entrenador</option>
            <option value="asistente">Asistente</option>
            <option value="analista">Analista</option>
            <option value="director">Director Técnico</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Biografía
        </label>
        <textarea
          id="bio"
          name="bio"
          value={profileData.bio}
          onChange={handleProfileChange}
          rows={4}
          placeholder="Cuéntanos sobre tu experiencia en el voleibol..."
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        />
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
            <p className="text-sm text-slate-600 dark:text-slate-400">Recibir notificaciones importantes por correo</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notificationSettings.emailNotifications}
              onChange={handleNotificationChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">Análisis Completado</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Notificar cuando se complete el análisis de un partido</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="matchAnalysisComplete"
              checked={notificationSettings.matchAnalysisComplete}
              onChange={handleNotificationChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">Reportes Semanales</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Recibir resúmenes semanales de estadísticas</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="weeklyReports"
              checked={notificationSettings.weeklyReports}
              onChange={handleNotificationChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">Actualizaciones del Sistema</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Notificar sobre nuevas características y mejoras</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="systemUpdates"
              checked={notificationSettings.systemUpdates}
              onChange={handleNotificationChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
          </label>
        </div>
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
          <label htmlFor="language" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Idioma
          </label>
          <select
            id="language"
            name="language"
            value={displaySettings.language}
            onChange={handleDisplayChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Zona Horaria
          </label>
          <select
            id="timezone"
            name="timezone"
            value={displaySettings.timezone}
            onChange={handleDisplayChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="America/Mexico_City">México (GMT-6)</option>
            <option value="America/New_York">Nueva York (GMT-5)</option>
            <option value="Europe/Madrid">Madrid (GMT+1)</option>
            <option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateFormat" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Formato de Fecha
          </label>
          <select
            id="dateFormat"
            name="dateFormat"
            value={displaySettings.dateFormat}
            onChange={handleDisplayChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
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
          Tienes control total sobre tus datos personales. Puedes descargar, modificar o eliminar tu información en cualquier momento.
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            <span className="material-symbols-outlined mr-2 text-sm">download</span>
            Descargar Datos
          </button>
          <button className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">
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
