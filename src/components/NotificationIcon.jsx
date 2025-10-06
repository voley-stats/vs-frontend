import React, { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  // Filtrar notificaciones no desestimadas
  const activeNotifications = notifications.filter(
    notification => !dismissedNotifications.has(notification.id)
  );

  if (loading) {
    return null;
  }

  if (error || activeNotifications.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Icono de notificaciones */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
        title="Novedades"
      >
        <span className="material-symbols-outlined text-xl">
          info
        </span>
        {/* Indicador de notificaciones */}
        {activeNotifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {activeNotifications.length}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer click fuera */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel de notificaciones */}
          <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50 max-h-96 overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Novedades ({activeNotifications.length})
                </h3>
                <div className="flex items-center space-x-2">
                  {activeNotifications.length > 1 && (
                    <button
                      onClick={dismissAllNotifications}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    >
                      Cerrar todas
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de notificaciones */}
            <div className="p-4 space-y-3">
              {activeNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 ${notificationService.getNotificationColor(
                    notification.type,
                    notification.priority
                  )}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <span className="material-symbols-outlined text-sm">
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
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                      
                      <p className="mt-1 text-sm">
                        {notification.content}
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {notification.action_url && notification.action_text && (
                            <a
                              href={notification.action_url}
                              className="inline-flex items-center px-2 py-1 bg-white/50 dark:bg-black/20 text-xs font-medium rounded-md hover:bg-white/70 dark:hover:bg-black/30 transition-colors"
                            >
                              {notification.action_text}
                              <span className="material-symbols-outlined ml-1 text-xs">arrow_forward</span>
                            </a>
                          )}
                        </div>
                        
                        <span className="text-xs opacity-75">
                          {notificationService.formatDate(notification.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIcon;
