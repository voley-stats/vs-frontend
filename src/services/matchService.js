import api from './api';

// Servicio de partidos con backend real
export const matchService = {
  async createMatch(matchData) {
    try {
      const response = await api.post('/matches', matchData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error creando partido');
    }
  },

  async getMatches() {
    try {
      const response = await api.get('/matches');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo partidos');
    }
  },

  async getRecentMatches(limit = 5) {
    try {
      const response = await api.get(`/matches?limit=${limit}&sort=created_at&order=desc`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo partidos recientes');
    }
  },

  async getMatchById(id) {
    try {
      const response = await api.get(`/matches/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo partido');
    }
  },

  async updateMatch(id, matchData) {
    try {
      const response = await api.put(`/matches/${id}`, matchData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error actualizando partido');
    }
  },

  async deleteMatch(id) {
    try {
      const response = await api.delete(`/matches/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error eliminando partido');
    }
  }
};