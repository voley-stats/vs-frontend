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