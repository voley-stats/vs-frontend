import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { preferencesService } from '../services/preferencesService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (savedUser && token) {
          // Verificar si el token sigue siendo válido
          const data = await authService.verifyToken();
          if (data && data.valid) {
            setUser(data.user);
          } else {
            // Token inválido, limpiar localStorage
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    
    try {
      const data = await authService.login(credentials.email, credentials.password);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Limpiar preferencias del usuario actual antes del logout
    if (user) {
      preferencesService.clearUserPreferences(user.id);
    }
    
    authService.logout();
    setUser(null);
    // Limpiar cualquier caché adicional
    localStorage.removeItem('voleyStats_user');
    localStorage.removeItem('admin_data');
    
    // Limpiar banderas de redirección para todos los usuarios
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('redirected_')) {
        localStorage.removeItem(key);
      }
    });
    
    // No forzar recarga de página, dejar que React maneje la navegación
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    const permissions = {
      admin: [
        'view_dashboard',
        'upload_videos',
        'view_library',
        'view_stats',
        'manage_users',
        'manage_settings',
        'view_analytics',
        'manage_plans'
      ],
      user: [
        'view_dashboard',
        'upload_videos',
        'view_library',
        'view_stats'
      ]
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
