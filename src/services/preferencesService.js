import api from './api';

// Servicio de preferencias con sincronización backend
export const preferencesService = {
  // Obtener preferencias del backend
  async getPreferences(userId) {
    try {
      const response = await api.get(`/users/${userId}/preferences`);
      console.log('📥 Respuesta del backend:', response);
      
      // La respuesta ya viene con la estructura correcta
      return response.preferences;
    } catch (error) {
      console.error('Error obteniendo preferencias:', error);
      
      // Fallback a localStorage específico del usuario
      const userPrefsKey = `user_preferences_${userId}`;
      const localPreferences = localStorage.getItem(userPrefsKey);
      if (localPreferences) {
        return JSON.parse(localPreferences);
      }
      
      // Preferencias por defecto
      return {
        theme: 'dark',
        language: 'es',
        notifications: true,
        fontSize: 'medium'
      };
    }
  },

  // Guardar preferencias en el backend
  async savePreferences(userId, preferences) {
    try {
      const response = await api.put(`/users/${userId}/preferences`, preferences);
      console.log('💾 Respuesta del backend al guardar:', response);
      
      // También guardar en localStorage específico del usuario como backup
      const userPrefsKey = `user_preferences_${userId}`;
      localStorage.setItem(userPrefsKey, JSON.stringify(preferences));
      
      return { success: true, preferences: response.preferences };
    } catch (error) {
      console.error('Error guardando preferencias:', error);
      
      // Fallback: guardar solo en localStorage específico del usuario
      const userPrefsKey = `user_preferences_${userId}`;
      localStorage.setItem(userPrefsKey, JSON.stringify(preferences));
      
      return { success: false, error: 'Error de conexión, guardado localmente' };
    }
  },

  // Sincronizar preferencias entre dispositivos
  async syncPreferences(userId) {
    try {
      // Simular sincronización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En una implementación real, aquí obtendrías las preferencias del backend
      // y las compararías con las locales para decidir cuáles usar
      
      const localPreferences = localStorage.getItem('user_preferences');
      const localTimestamp = localStorage.getItem('preferences_timestamp');
      
      // Simular timestamp del backend
      const backendTimestamp = Date.now() - 1000; // 1 segundo más reciente
      
      if (localTimestamp && parseInt(localTimestamp) > backendTimestamp) {
        // Las preferencias locales son más recientes, enviar al backend
        return await this.savePreferences(userId, JSON.parse(localPreferences));
      } else {
        // Las preferencias del backend son más recientes, obtenerlas
        return await this.getPreferences(userId);
      }
    } catch (error) {
      console.error('Error sincronizando preferencias:', error);
      return null;
    }
  },

  // Resetear preferencias a valores por defecto
  async resetPreferences(userId) {
    try {
      const response = await api.delete(`/users/${userId}/preferences`);
      return { success: true, preferences: response.preferences };
    } catch (error) {
      console.error('Error reseteando preferencias:', error);
      
      const defaultPreferences = {
        theme: 'dark',
        language: 'es',
        notifications: true,
        fontSize: 'medium'
      };
      
      return await this.savePreferences(userId, defaultPreferences);
    }
  },

  // Limpiar preferencias de un usuario (para logout)
  clearUserPreferences(userId) {
    const userPrefsKey = `user_preferences_${userId}`;
    localStorage.removeItem(userPrefsKey);
  }
};
