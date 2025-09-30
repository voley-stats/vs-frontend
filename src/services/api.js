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
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.message || error.error || 'Error en la petición');
  }
  return await response.json();
};

// Cliente HTTP base
export const apiClient = {
  async get(url) {
    const response = await fetch(`${API_URL}${url}`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  async post(url, data) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async put(url, data) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  async delete(url) {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
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
      body: formData
    });
    return handleResponse(response);
  }
};

// Exportar como api para compatibilidad
export default apiClient;
export const api = apiClient;
