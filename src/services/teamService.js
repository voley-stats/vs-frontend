import api from './api';

export const teamService = {
  // Obtener equipos del usuario
  async getTeams() {
    try {
      const response = await api.get('/teams');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo equipos');
    }
  },

  // Obtener un equipo específico
  async getTeam(teamId) {
    try {
      const response = await api.get(`/teams/${teamId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error obteniendo equipo');
    }
  },

  // Crear nuevo equipo
  async createTeam(teamData) {
    try {
      const response = await api.post('/teams', teamData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error creando equipo');
    }
  },

  // Actualizar equipo
  async updateTeam(teamId, teamData) {
    try {
      const response = await api.put(`/teams/${teamId}`, teamData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error actualizando equipo');
    }
  },

  // Eliminar equipo
  async deleteTeam(teamId) {
    try {
      const response = await api.delete(`/teams/${teamId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error eliminando equipo');
    }
  },

  // Invitar miembro al equipo
  async inviteMember(teamId, invitationData) {
    try {
      const response = await api.post(`/teams/${teamId}/invite`, invitationData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error enviando invitación');
    }
  },

  // Aceptar invitación
  async acceptInvitation(token, userData = null) {
    try {
      const response = await api.post('/teams/invite/accept', {
        token,
        ...userData
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error aceptando invitación');
    }
  },

  // Rechazar invitación
  async declineInvitation(token) {
    try {
      const response = await api.post('/teams/invite/decline', { token });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error rechazando invitación');
    }
  },

  // Eliminar miembro del equipo
  async removeMember(teamId, memberId) {
    try {
      const response = await api.delete(`/teams/${teamId}/members/${memberId}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error eliminando miembro');
    }
  }
};