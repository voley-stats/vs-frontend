import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { teamService } from '../services/teamService';
import { coachProfileService } from '../services/coachProfileService';
import BackButton from './BackButton';
import LoadingSpinner from './LoadingSpinner';

const TeamManagement = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'assistant'
  });

  // Cargar equipos al montar el componente
  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      
      // Obtener categorías reales del backend
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Categorías cargadas:', data);
        
        // Mapear categorías para la UI
        const categoriesData = data.categories.map(category => ({
          id: category.id,
          name: category.full_name, // "Primera - Masculino"
          division: category.division,
          gender: category.gender,
          members: category.members || [],
          isFromBackend: true // Marcar que viene del backend
        }));
        
        setTeams(categoriesData);
      } else {
        throw new Error('Error cargando categorías del backend');
      }
    } catch (err) {
      console.error('Error cargando categorías del coach:', err);
      setError('Error cargando las categorías del entrenador');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Invitar miembro a la categoría usando el endpoint de categorías
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/categories/${selectedTeam.id}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(inviteData)
      });
      
      if (response.ok) {
        setSuccess('Invitación enviada exitosamente');
        setShowInviteForm(false);
        setInviteData({ email: '', role: 'assistant' });
        loadTeams(); // Recargar categorías
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error enviando invitación');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (categoryId, memberId) => {
    if (!window.confirm('¿Estás seguro de que quieres desactivar este miembro de la categoría? (Podrás reactivarlo más tarde)')) {
      return;
    }

    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/categories/${categoryId}/members/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setSuccess('Miembro desactivado exitosamente');
        loadTeams();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error desactivando miembro');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReactivateMember = async (categoryId, memberId) => {
    if (!window.confirm('¿Estás seguro de que quieres reactivar este miembro en la categoría?')) {
      return;
    }

    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/categories/${categoryId}/members/${memberId}/reactivate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setSuccess('Miembro reactivado exitosamente');
        loadTeams();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error reactivando miembro');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleName = (role) => {
    const roles = {
      'coach': 'Entrenador Principal',
      'assistant': 'Asistente',
      'analyst': 'Analista',
      'physio': 'Preparador Físico'
    };
    return roles[role] || role;
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'accepted': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'declined': 'bg-red-100 text-red-800'
    };
    
    const statusText = {
      'accepted': 'Activo',
      'pending': 'Pendiente',
      'declined': 'Rechazado'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  if (loading && teams.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-light dark:bg-black">
        <div className="text-center">
          <LoadingSpinner size="xl" className="mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando equipos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <BackButton to="/" className="mb-4" />
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                Gestión de Ayudantes
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Administra los ayudantes de tus equipos por categoría
              </p>
            </div>

            {/* Mensajes de estado */}
            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-800 dark:text-green-200">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de categorías */}
            <div className="grid gap-6">
              {teams.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-black dark:text-white">No hay categorías configuradas</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Completa tu perfil de entrenador para ver tus categorías.</p>
                </div>
              ) : (
                teams.map((category) => (
                  <div key={category.id} className="bg-white dark:bg-gray-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-black dark:text-white">{category.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Categoría: {category.division} - {category.gender}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTeam(category);
                            setShowInviteForm(true);
                          }}
                          className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          + Invitar Ayudante
                        </button>
                      </div>
                    </div>

                    {/* Miembros de la categoría */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Miembros de la categoría</h4>
                      
                      {/* Miembros activos */}
                      {category.members && category.members.filter(m => m.status === 'accepted').length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-xs font-medium text-green-600 dark:text-green-400 mb-2">✅ Activos</h5>
                          <div className="space-y-2">
                            {category.members.filter(m => m.status === 'accepted').map((member) => (
                              <div key={member.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div className="flex items-center space-x-3">
                                  <div className="h-8 w-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                                    {member.full_name ? member.full_name.charAt(0).toUpperCase() : member.username?.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-black dark:text-white">
                                      {member.full_name || member.username}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {getRoleName(member.role)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getStatusBadge(member.status)}
                                  {member.role !== 'coach' && (
                                    <button
                                      onClick={() => handleRemoveMember(category.id, member.id)}
                                      className="text-red-600 hover:text-red-800 text-xs"
                                    >
                                      Desactivar
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Miembros desactivados */}
                      {category.members && category.members.filter(m => m.status !== 'accepted').length > 0 && (
                        <div>
                          <h5 className="text-xs font-medium text-red-600 dark:text-red-400 mb-2">❌ Desactivados</h5>
                          <div className="space-y-2">
                            {category.members.filter(m => m.status !== 'accepted').map((member) => (
                              <div key={member.id} className="flex items-center justify-between py-2 px-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                                <div className="flex items-center space-x-3">
                                  <div className="h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                    {member.full_name ? member.full_name.charAt(0).toUpperCase() : member.username?.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                      {member.full_name || member.username}
                                    </p>
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                      {getRoleName(member.role)} - Desactivado
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">
                                    Desactivado
                                  </span>
                                  {member.role !== 'coach' && (
                                    <button
                                      onClick={() => handleReactivateMember(category.id, member.id)}
                                      className="text-green-600 hover:text-green-800 text-xs font-medium"
                                    >
                                      Reactivar
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Mensaje si no hay miembros */}
                      {(!category.members || category.members.length === 0) && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No hay miembros en esta categoría</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal para invitar miembro */}
            {showInviteForm && selectedTeam && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-dark rounded-lg max-w-md w-full p-6">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                    Invitar ayudante a {selectedTeam.name}
                  </h3>
                  <form onSubmit={handleInviteMember}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={inviteData.email}
                          onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rol *
                        </label>
                        <select
                          value={inviteData.role}
                          onChange={(e) => setInviteData({ ...inviteData, role: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                          required
                        >
                          <option value="assistant">Asistente Técnico</option>
                          <option value="analyst">Analista de Video</option>
                          <option value="physio">Preparador Físico</option>
                          <option value="statistician">Estadístico</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setShowInviteForm(false)}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Enviando...' : 'Enviar Invitación'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default TeamManagement;