// Servicio de videos simulado
export const videoService = {
  async uploadVideo(matchId, videoFile, metadata) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      id: Date.now(),
      match_id: matchId,
      filename: videoFile.name,
      status: 'uploading',
      metadata
    };
  },

  async getVideos() {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      videos: [
        {
          id: 1,
          match_id: 1,
          filename: 'partido_1.mp4',
          status: 'processed',
          created_at: '2024-01-15T10:00:00Z'
        }
      ]
    };
  }
};