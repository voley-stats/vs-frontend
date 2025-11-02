// Configuración base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Función para obtener headers de autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Función para manejar respuestas de la API
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      error: 'Error desconocido',
      message: `Error ${response.status}: ${response.statusText}`
    }));
    // Incluir el código de estado en el error para poder manejarlo
    const apiError = new Error(error.message || error.error || 'Error en la petición');
    apiError.status = response.status;
    apiError.error = error.error;
    throw apiError;
  }
  return await response.json();
};

// Cliente HTTP base
export const apiClient = {
  async get(url) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include'
    });
    return handleResponse(response);
  },

  async post(url, data) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      credentials: 'include'
    });
    return handleResponse(response);
  },

  async put(url, data) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
      credentials: 'include'
    });
    return handleResponse(response);
  },

  async delete(url) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include'
    });
    return handleResponse(response);
  },

  async upload(url, formData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: formData,
      credentials: 'include'
    });
    return handleResponse(response);
  }
};

// Exportar como api para compatibilidad
export default apiClient;
export { apiClient as api };
