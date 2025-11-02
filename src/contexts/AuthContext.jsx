import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { preferencesService } from '../services/preferencesService';
import { coachProfileService } from '../services/coachProfileService';

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
  const [profileComplete, setProfileComplete] = useState(true);

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
            const loadedUser = data.user;
            setUser(loadedUser);
            
            // Verificar si el perfil está completo según el rol
            if (loadedUser.role === 'coach') {
              try {
                const profileCheck = await coachProfileService.checkProfileComplete();
                setProfileComplete(profileCheck.isComplete);
              } catch (profileError) {
                // Si recibimos 403 o cualquier error, asumir que no está completo
                // (403 puede significar que el middleware bloquea porque el perfil no está completo)
                console.log('Perfil de coach no encontrado o error al verificar:', profileError);
                setProfileComplete(false);
              }
            } else if (loadedUser.role === 'assistant') {
              // Para assistants, considerar el perfil como completo por ahora
              // (aquí se podría verificar también si fuera necesario)
              setProfileComplete(true);
            } else {
              // Para otros roles (admin, user), considerar como completo
              setProfileComplete(true);
            }
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
      
      // Para todos los roles, considerar el perfil como completo por defecto
      // Solo verificar si es realmente necesario completar el perfil
      setProfileComplete(true);
      
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
    setProfileComplete(false);
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
        'manage_plans',
        'manage_teams',
        'invite_members'
      ],
      coach: [
        'view_dashboard',
        'upload_videos',
        'view_library',
        'view_stats',
        'manage_teams',
        'invite_members',
        'view_analytics'
      ],
      assistant: [
        'view_dashboard',
        'view_library',
        'view_stats'
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

  const updateProfileComplete = (isComplete) => {
    setProfileComplete(isComplete);
  };

  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const value = {
    user,
    loading,
    profileComplete,
    login,
    logout,
    hasRole,
    hasPermission,
    updateProfileComplete,
    setUser: updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
