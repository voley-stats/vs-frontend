import React, { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import LoadingSpinner from './LoadingSpinner';

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await notificationService.getAllNotifications();
      setNotifications(response.notifications || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await notificationService.toggleNotification(id);
      await loadNotifications();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta notificación?')) {
      try {
        await notificationService.deleteNotification(id);
        await loadNotifications();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCreate = async (formData) => {
    try {
      await notificationService.createNotification(formData);
      setShowCreateForm(false);
      await loadNotifications();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await notificationService.updateNotification(id, formData);
      setEditingNotification(null);
      await loadNotifications();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Gestión de Notificaciones
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Administra las notificaciones que ven los usuarios
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined mr-2 text-sm">add</span>
          Nueva Notificación
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <NotificationForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingNotification && (
        <NotificationForm
          notification={editingNotification}
          onSubmit={(data) => handleUpdate(editingNotification.id, data)}
          onCancel={() => setEditingNotification(null)}
        />
      )}

      {/* Notifications List */}
      <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notificaciones ({notifications.length})
          </h3>
        </div>
        
        <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-slate-400 dark:text-slate-500 mb-4">
                <span className="material-symbols-outlined text-4xl">notifications_off</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                No hay notificaciones
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Crea tu primera notificación para comenzar.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-slate-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${notificationService.getPriorityBadge(notification.priority)}`}>
                        {notification.priority === 'high' ? 'Alta' : 
                         notification.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        notification.is_active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {notification.is_active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      {notification.content}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>Tipo: {notification.type}</span>
                      <span>Audiencia: {notification.target_audience}</span>
                      <span>Creada: {notificationService.formatDate(notification.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setEditingNotification(notification)}
                      className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      title="Editar"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    
                    <button
                      onClick={() => handleToggleActive(notification.id)}
                      className={`p-2 transition-colors ${
                        notification.is_active
                          ? 'text-yellow-500 hover:text-yellow-600'
                          : 'text-green-500 hover:text-green-600'
                      }`}
                      title={notification.is_active ? 'Desactivar' : 'Activar'}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {notification.is_active ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-2 text-red-400 hover:text-red-600 transition-colors"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Formulario para crear/editar notificaciones
const NotificationForm = ({ notification, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: notification?.type || 'feature_update',
    title: notification?.title || '',
    content: notification?.content || '',
    target_audience: notification?.target_audience || 'all',
    priority: notification?.priority || 'medium',
    action_url: notification?.action_url || '',
    action_text: notification?.action_text || '',
    expires_at: notification?.expires_at ? notification.expires_at.split('T')[0] : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        {notification ? 'Editar Notificación' : 'Nueva Notificación'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tipo
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
              required
            >
              <option value="feature_update">Nueva Función</option>
              <option value="improvement">Mejora</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="announcement">Anuncio</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Prioridad
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
              required
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Contenido
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Audiencia
            </label>
            <select
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
              required
            >
              <option value="all">Todos</option>
              <option value="coaches">Solo Entrenadores</option>
              <option value="assistants">Solo Asistentes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Fecha de Expiración (Opcional)
            </label>
            <input
              type="date"
              name="expires_at"
              value={formData.expires_at}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              URL de Acción (Opcional)
            </label>
            <input
              type="url"
              name="action_url"
              value={formData.action_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Texto del Botón (Opcional)
            </label>
            <input
              type="text"
              name="action_text"
              value={formData.action_text}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            {notification ? 'Actualizar' : 'Crear'} Notificación
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationManagement;
