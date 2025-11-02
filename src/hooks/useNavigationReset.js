import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigationReset = (user, loading) => {
  const location = useLocation();

  useEffect(() => {
    // Solo ejecutar cuando el usuario se autentica y no está cargando
    if (user && !loading) {
      // NO redirigir si estamos en la pantalla de completar perfil o confirmar email
      if (location.pathname === '/complete-profile' || 
          location.pathname === '/complete-assistant-profile' || 
          location.pathname === '/confirm-email') {
        return;
      }

      // Verificar si ya se hizo la redirección inicial para este usuario
      const hasRedirectedKey = `redirected_${user.id}`;
      const hasRedirected = localStorage.getItem(hasRedirectedKey);
      
      // Solo redirigir UNA VEZ después del login
      if (!hasRedirected && location.pathname !== '/') {
        console.log(`Redirigiendo usuario ${user.role} desde ${location.pathname} al dashboard (primera vez)`);
        localStorage.setItem(hasRedirectedKey, 'true');
        window.history.replaceState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }

      // Marcar que ya se hizo la redirección inicial
      if (location.pathname === '/') {
        localStorage.setItem(hasRedirectedKey, 'true');
      }

      // Lista de rutas válidas para cada tipo de usuario
      const validRoutes = {
        admin: ['/', '/upload', '/library', '/stats', '/settings', '/complete-profile', '/teams', '/profile'],
        coach: ['/', '/upload', '/library', '/stats', '/settings', '/complete-profile', '/teams', '/profile'],
        assistant: ['/', '/assistant-dashboard', '/library', '/stats', '/settings', '/profile', '/complete-assistant-profile'],
        user: ['/', '/upload', '/library', '/stats', '/settings', '/profile']
      };

      const userRoutes = validRoutes[user.role] || validRoutes.user;
      const currentPath = location.pathname;
      
      // Verificar si la ruta actual es válida para el usuario
      const isValidRoute = userRoutes.some(route => {
        if (route === '/stats') {
          return currentPath.startsWith('/stats/');
        }
        return currentPath === route;
      });

      // Si la ruta no es válida, redirigir al dashboard
      if (!isValidRoute) {
        console.log(`Redirigiendo usuario ${user.role} desde ${currentPath} al dashboard (ruta inválida)`);
        window.history.replaceState(null, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  }, [user, loading, location.pathname]);
};
