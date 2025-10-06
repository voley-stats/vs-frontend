import api from './api';

export const coachProfileService = {
  // Obtener perfil de entrenador
  async getProfile() {
    try {
      const response = await api.get('/coach-profile');
      return response.profile;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo perfil de entrenador');
    }
  },

  // Crear o actualizar perfil de entrenador
  async saveProfile(profileData) {
    try {
      const response = await api.post('/coach-profile', profileData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error guardando perfil de entrenador');
    }
  },

  // Actualizar perfil de entrenador
  async updateProfile(profileData) {
    try {
      const response = await api.put('/coach-profile', profileData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error actualizando perfil de entrenador');
    }
  },

  // Eliminar perfil de entrenador
  async deleteProfile() {
    try {
      const response = await api.delete('/coach-profile');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error eliminando perfil de entrenador');
    }
  },

  // Verificar si el perfil está completo
  async checkProfileComplete() {
    try {
      const response = await api.get('/coach-profile/check');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error verificando perfil de entrenador');
    }
  },

  // Obtener opciones para los selectores
  async getOptions() {
    try {
      const response = await api.get('/coach-profile/options');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo opciones');
    }
  }
};
