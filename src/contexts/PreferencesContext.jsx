import React, { createContext, useContext, useState, useEffect } from 'react';
import { preferencesService } from '../services/preferencesService';
import { useAuth } from './AuthContext';

const PreferencesContext = createContext();

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences debe ser usado dentro de PreferencesProvider');
  }
  return context;
};

export const PreferencesProvider = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'es',
    notifications: true,
    fontSize: 'medium'
  });
  const [loading, setLoading] = useState(false);

  // Cargar preferencias específicas del usuario
  useEffect(() => {
    const loadPreferences = async () => {
      if (user) {
        try {
          setLoading(true);
          console.log('🔄 Cargando preferencias del backend para usuario:', user.id);
          
          // Cargar preferencias del backend
          const userPreferences = await preferencesService.getPreferences(user.id);
          console.log('📥 Preferencias cargadas del backend:', userPreferences);
          
          setPreferences(userPreferences);
        } catch (error) {
          console.error('Error cargando preferencias del backend:', error);
          // Fallback a localStorage específico del usuario
          const userPrefsKey = `user_preferences_${user.id}`;
          const savedPreferences = localStorage.getItem(userPrefsKey);
          if (savedPreferences) {
            try {
              const parsed = JSON.parse(savedPreferences);
              console.log('📥 Preferencias cargadas del localStorage:', parsed);
              setPreferences(prev => ({ ...prev, ...parsed }));
            } catch (parseError) {
              console.error('Error parseando preferencias locales:', parseError);
            }
          }
        } finally {
          setLoading(false);
        }
      } else {
        // Si no hay usuario, usar preferencias por defecto
        console.log('⚠️ No hay usuario, usando preferencias por defecto');
        setPreferences({
          theme: 'dark',
          language: 'es',
          notifications: true,
          fontSize: 'medium'
        });
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  // Aplicar preferencias cuando cambien
  useEffect(() => {
    console.log('🎨 Aplicando preferencias desde PreferencesContext:', preferences);
    
    // Aplicar tema
    const html = document.documentElement;
    if (preferences.theme === 'dark') {
      console.log('🌙 Aplicando tema oscuro desde PreferencesContext');
      html.classList.add('dark');
    } else if (preferences.theme === 'light') {
      console.log('☀️ Aplicando tema claro desde PreferencesContext');
      html.classList.remove('dark');
    } else {
      // Auto - usar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('🔄 Modo automático desde PreferencesContext, sistema prefiere oscuro:', prefersDark);
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }

    // Aplicar tamaño de fuente
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    
    const fontSize = fontSizeMap[preferences.fontSize] || '16px';
    console.log('📝 Aplicando tamaño de fuente desde PreferencesContext:', fontSize);
    
    // Aplicar tamaño de fuente al html
    document.documentElement.style.fontSize = fontSize;
    
    // Aplicar también al body para mejor control
    document.body.style.fontSize = fontSize;

    // Guardar preferencias específicas del usuario
    if (user) {
      const userPrefsKey = `user_preferences_${user.id}`;
      localStorage.setItem(userPrefsKey, JSON.stringify(preferences));
      console.log('💾 Preferencias guardadas en localStorage:', userPrefsKey);
    }
  }, [preferences, user]);

  // Aplicar preferencias inmediatamente al cargar (sin esperar a que cambien)
  useEffect(() => {
    const applyPreferences = () => {
      const html = document.documentElement;
      
      // Aplicar tema inmediatamente
      if (preferences.theme === 'dark') {
        html.classList.add('dark');
      } else if (preferences.theme === 'light') {
        html.classList.remove('dark');
      } else {
        // Auto - usar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      }

      // Aplicar tamaño de fuente inmediatamente
      const fontSizeMap = {
        small: '14px',
        medium: '16px',
        large: '18px'
      };
      
      document.documentElement.style.fontSize = fontSizeMap[preferences.fontSize] || '16px';
      document.body.style.fontSize = fontSizeMap[preferences.fontSize] || '16px';
    };

    // Aplicar inmediatamente
    applyPreferences();
  }, [preferences]);

  const updatePreferences = async (newPreferences) => {
    try {
      setPreferences(prev => ({ ...prev, ...newPreferences }));
      
      // Guardar en backend si hay usuario autenticado
      if (user) {
        await preferencesService.savePreferences(user.id, { ...preferences, ...newPreferences });
      }
    } catch (error) {
      console.error('Error actualizando preferencias:', error);
      // Aún así actualizar localmente
      setPreferences(prev => ({ ...prev, ...newPreferences }));
    }
  };

  const resetPreferences = async () => {
    const defaultPreferences = {
      theme: 'dark',
      language: 'es',
      notifications: true,
      fontSize: 'medium'
    };
    
    try {
      setPreferences(defaultPreferences);
      
      // Resetear en backend si hay usuario autenticado
      if (user) {
        await preferencesService.resetPreferences(user.id);
      }
    } catch (error) {
      console.error('Error reseteando preferencias:', error);
      setPreferences(defaultPreferences);
    }
  };

  return (
    <PreferencesContext.Provider value={{
      preferences,
      updatePreferences,
      resetPreferences,
      loading
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};
