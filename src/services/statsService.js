import apiClient from './api.js';

export const statsService = {
  // Obtener estadísticas de un partido
  async getMatchStats(matchId) {
    try {
      return await apiClient.get(`/stats/match/${matchId}`);
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo estadísticas del partido');
    }
  },

  // Obtener estadísticas por jugador en un partido
  async getPlayerStats(matchId, playerId = null) {
    try {
      const url = playerId 
        ? `/stats/match/${matchId}/players?playerId=${playerId}`
        : `/stats/match/${matchId}/players`;
      
      return await apiClient.get(url);
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo estadísticas de jugadores');
    }
  },

  // Obtener estadísticas generales de un jugador
  async getPlayerOverallStats(playerId, period = 'all') {
    try {
      return await apiClient.get(`/stats/player/${playerId}?period=${period}`);
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo estadísticas del jugador');
    }
  },

  // Obtener comparación entre equipos
  async getTeamComparison(matchId) {
    try {
      return await apiClient.get(`/stats/comparison/${matchId}`);
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo comparación');
    }
  },

  // Guardar estadísticas de partido
  async saveMatchStats(matchId, statsData) {
    try {
      return await apiClient.post(`/stats/match/${matchId}`, statsData);
    } catch (error) {
      throw new Error(error.message || 'Error guardando estadísticas');
    }
  },

  // Guardar estadísticas de jugador
  async savePlayerStats(playerId, matchId, statsData) {
    try {
      return await apiClient.post(`/stats/player/${playerId}/match/${matchId}`, statsData);
    } catch (error) {
      throw new Error(error.message || 'Error guardando estadísticas del jugador');
    }
  },

  // Obtener métricas de análisis de video desde Fargate
  async getVideoFargateStats(videoId) {
    try {
      return await apiClient.get(`/stats/video/${videoId}/fargate`);
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo métricas del video');
    }
  }
};
