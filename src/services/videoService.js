import api from './api';

// Servicio de videos con backend real
export const videoService = {
  async uploadVideo(matchId, videoFile, metadata) {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', metadata.title || '');
      formData.append('description', metadata.description || '');

      const response = await api.upload(`/videos/upload/${matchId}`, formData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error subiendo video');
    }
  },

  async getVideos() {
    try {
      const response = await api.get('/videos');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo videos');
    }
  },

  async getVideoById(id) {
    try {
      const response = await api.get(`/videos/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo video');
    }
  },

  async getVideosByMatch(matchId) {
    try {
      const response = await api.get(`/videos/match/${matchId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo videos del partido');
    }
  },

  async deleteVideo(id) {
    try {
      const response = await api.delete(`/videos/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error eliminando video');
    }
  },

  // Eliminar video por matchId (nuevo endpoint)
  async deleteVideoByMatch(matchId, videoId = null) {
    try {
      let url = `/videos/match/${matchId}`;
      if (videoId) {
        url += `?videoId=${videoId}`;
      }
      const response = await api.delete(url);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error eliminando video');
    }
  },

  async getVideoStats() {
    try {
      const response = await api.get('/videos/stats/user');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo estadísticas de videos');
    }
  }
};