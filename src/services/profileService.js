import api from './api';

export const profileService = {
  // Obtener perfil del usuario
  async getProfile() {
    const response = await api.get('/profile');
    return response;
  },

  // Actualizar perfil del usuario
  async updateProfile(profileData) {
    console.log('🔄 ProfileService - Enviando datos:', profileData);
    const response = await api.put('/profile', profileData);
    console.log('✅ ProfileService - Respuesta exitosa:', response);
    return response;
  },

  // Subir avatar
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Eliminar avatar
  async deleteAvatar() {
    const response = await api.delete('/profile/avatar');
    return response;
  },

  // Cambiar contraseña
  async changePassword(currentPassword, newPassword) {
    const response = await api.put('/profile/password', {
      currentPassword,
      newPassword
    });
    return response;
  },

  // Obtener actividad reciente
  async getActivity(limit = 10) {
    const response = await api.get(`/profile/activity?limit=${limit}`);
    return response;
  }
};
