import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notificationService } from '../services/notificationService';

const NotificationBanner = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dismissedNotifications, setDismissedNotifications] = useState(new Set());

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await notificationService.getNotifications();
      setNotifications(response.notifications || []);
    } catch (err) {
      console.error('Error cargando notificaciones:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const dismissNotification = (notificationId) => {
    setDismissedNotifications(prev => new Set([...prev, notificationId]));
  };

  const dismissAllNotifications = () => {
    const allIds = notifications.map(n => n.id);
    setDismissedNotifications(new Set(allIds));
  };

  // Filtrar notificaciones no desestimadas
  const activeNotifications = notifications.filter(
    notification => !dismissedNotifications.has(notification.id)
  );

  if (loading) {
    return null; // No mostrar nada mientras carga
  }

  if (error || activeNotifications.length === 0) {
    return null; // No mostrar nada si hay error o no hay notificaciones
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Header con botón para cerrar todas */}
      {activeNotifications.length > 1 && (
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Novedades ({activeNotifications.length})
          </h3>
          <button
            onClick={dismissAllNotifications}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            Cerrar todas
          </button>
        </div>
      )}

      {/* Lista de notificaciones */}
      {activeNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`border-l-4 p-4 rounded-r-lg ${notificationService.getNotificationColor(
            notification.type,
            notification.priority
          )}`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="material-symbols-outlined text-lg">
                {notificationService.getNotificationIcon(notification.type)}
              </span>
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium">
                    {notification.title}
                  </h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${notificationService.getPriorityBadge(notification.priority)}`}>
                    {notification.priority === 'high' ? 'Alta' : 
                     notification.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
                
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="flex-shrink-0 ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              
              <p className="mt-1 text-sm">
                {notification.content}
              </p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {notification.action_url && notification.action_text && (
                    <Link
                      to={notification.action_url}
                      className="inline-flex items-center px-3 py-1 bg-white/50 dark:bg-black/20 text-xs font-medium rounded-md hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                    >
                      {notification.action_text}
                      <span className="material-symbols-outlined ml-1 text-xs">arrow_forward</span>
                    </Link>
                  )}
                  
                  <span className="text-xs opacity-75">
                    {notificationService.formatDate(notification.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;
