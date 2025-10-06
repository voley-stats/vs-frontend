import api from './api';

// Servicio de autenticación con backend real
export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      
      const { user, token } = response;
      
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      return { user, token };
    } catch (error) {
      throw new Error(error.message || 'Error en el login');
    }
  },

  async verifyToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { valid: false };
      }

      const response = await api.get('/auth/verify');
      return { valid: true, user: response.user };
    } catch (error) {
      // Token inválido o expirado
      this.logout();
      return { valid: false };
    }
  },

  async register(userData) {
    try {
      // Solo enviar los campos que espera el backend
      const { fullName, username, email, password } = userData;
      const response = await api.post('/auth/register', {
        fullName,
        username,
        email,
        password
      });
      return { success: true, user: response.user };
    } catch (error) {
      throw new Error(error.message || 'Error al registrar usuario');
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Error al enviar enlace de recuperación');
    }
  },

  async verifyResetToken(token) {
    try {
      const response = await api.get(`/auth/verify-reset-token/${token}`);
      return { valid: true, email: response.email };
    } catch (error) {
      return { valid: false };
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        password: newPassword
      });
      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Error al restablecer contraseña');
    }
  },

  async getCoachProfile() {
    try {
      const response = await api.get('/coach-profile');
      return response.profile;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo perfil de entrenador');
    }
  },

  logout() {
    // Limpiar todos los datos de usuario
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('voleyStats_user');
    localStorage.removeItem('admin_data');
    localStorage.removeItem('user_preferences');
    localStorage.removeItem('system_stats');
    localStorage.removeItem('recent_matches');
    
    // Limpiar cualquier caché de la aplicación
    sessionStorage.clear();
  }
};