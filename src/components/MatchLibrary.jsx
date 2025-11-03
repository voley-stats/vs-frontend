import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import { matchService } from '../services/matchService';
import { videoService } from '../services/videoService';
import LoadingSpinner from './LoadingSpinner';
import { useFilters } from '../contexts/FiltersContext';

const MatchLibrary = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { filters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);
  const [deletingVideoId, setDeletingVideoId] = useState(null);
  const matchesPerPage = 5; // 5 partidos por página para navegación más fácil

  // Cargar partidos del backend
  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Los filtros se obtienen del contexto
        console.log('🔍 Filtros recibidos:', filters);
        
        // Construir parámetros de filtro para la API
        const queryParams = new URLSearchParams();
        
        if (filters.team) queryParams.append('team', filters.team);
        
        // Mapear valores del sidebar a valores del backend
        if (filters.status) {
          let backendStatus = filters.status;
          if (filters.status === 'Procesado') backendStatus = 'completed';
          if (filters.status === 'Pendiente') backendStatus = 'pending';
          queryParams.append('status', backendStatus);
        }
        
        if (filters.season) queryParams.append('tournament', filters.season);
        if (filters.dateFrom) {
          console.log('🔍 Enviando dateFrom:', filters.dateFrom);
          queryParams.append('dateFrom', filters.dateFrom);
        }
        if (filters.dateTo) {
          console.log('🔍 Enviando dateTo:', filters.dateTo);
          queryParams.append('dateTo', filters.dateTo);
        }
        
        // Agregar parámetros de paginación
        queryParams.append('page', currentPage);
        queryParams.append('limit', matchesPerPage);
        
        const queryString = queryParams.toString();
        const url = queryString ? `?${queryString}` : '';
        
        const response = await matchService.getMatches(url);
        setMatches(response.matches || []);
        
        // Usar la paginación del backend
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
          setTotalMatches(response.pagination.total);
        } else {
          // Fallback si no hay paginación en la respuesta
          const totalMatches = response.matches?.length || 0;
          const pages = Math.ceil(totalMatches / matchesPerPage);
          setTotalPages(pages);
          setTotalMatches(totalMatches);
        }
      } catch (err) {
        setError(err.message || 'Error cargando partidos');
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [filters, currentPage]); // Agregar currentPage como dependencia

  // Los filtros principales se manejan en el backend
  // Solo aplicamos filtro de fecha local para el rango de fechas
  const filteredMatches = matches.filter(match => {
    if (filters.dateTo) {
      return match.match_date <= filters.dateTo;
    }
    return true;
  });

  // Ya no necesitamos paginación local, el backend maneja todo
  const currentMatches = filteredMatches;

  // Funciones de paginación
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para formatear fecha sin problemas de timezone
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Si la fecha viene como string ISO, parsearla correctamente
      const date = new Date(dateString);
      // Usar UTC para evitar problemas de timezone
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return dateString;
    }
  };

  // Función para recargar los partidos
  const reloadMatches = async () => {
    const queryParams = new URLSearchParams();
    if (filters.team) queryParams.append('team', filters.team);
    if (filters.status) {
      let backendStatus = filters.status;
      if (filters.status === 'Procesado') backendStatus = 'completed';
      if (filters.status === 'Pendiente') backendStatus = 'pending';
      queryParams.append('status', backendStatus);
    }
    if (filters.season) queryParams.append('tournament', filters.season);
    if (filters.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
    if (filters.dateTo) queryParams.append('dateTo', filters.dateTo);
    queryParams.append('page', currentPage);
    queryParams.append('limit', matchesPerPage);
    
    const queryString = queryParams.toString();
    const url = queryString ? `?${queryString}` : '';
    const response = await matchService.getMatches(url);
    setMatches(response.matches || []);
    
    if (response.pagination) {
      setTotalPages(response.pagination.pages);
      setTotalMatches(response.pagination.total);
    }
  };

  // Función para eliminar video por matchId (usa el nuevo endpoint)
  const handleDeleteVideoByMatch = async (matchId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este video? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      setDeletingVideoId(matchId);
      // Usar el nuevo endpoint que elimina por matchId
      await videoService.deleteVideoByMatch(matchId);
      
      // Recargar la lista de partidos después de un pequeño delay para que el backend procese
      setTimeout(async () => {
        await reloadMatches();
      }, 500);
    } catch (error) {
      console.error('Error eliminando video:', error);
      alert('Error al eliminar el video: ' + (error.message || 'Error desconocido'));
    } finally {
      setDeletingVideoId(null);
    }
  };

  // Los filtros se manejan en el Sidebar a través del contexto

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BackButton to="/" className="mb-4" />
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BackButton to="/" className="mb-4" />
          <div className="text-center">
            <div className="text-red-600 dark:text-red-400 mb-4">
              <span className="material-symbols-outlined text-4xl">error</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Error cargando partidos
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header con botón de retroceso */}
            <div className="mb-8">
              <BackButton to="/" className="mb-4" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Biblioteca de Partidos
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Gestiona y accede a todos tus partidos analizados
              </p>
            </div>


        {/* Matches List */}
        <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
          <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Partidos ({totalMatches})
              </h2>
              {totalPages > 1 && (
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Página {currentPage} de {totalPages}
                </div>
              )}
            </div>
          </div>
          
          <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {filteredMatches.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-slate-400 dark:text-slate-500 mb-4">
                  <span className="material-symbols-outlined text-4xl">sports_volleyball</span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  No hay partidos disponibles
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Aún no tienes partidos registrados. Sube un video para comenzar el análisis.
                </p>
              </div>
            ) : (
              currentMatches.map((match) => (
                <div key={match.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                          {match.home_team} vs {match.away_team}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          match.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : match.status === 'processing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {match.status === 'completed' ? 'Completado' : 
                           match.status === 'processing' ? 'Procesando' : 'Pendiente'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div>
                          <span className="font-medium">Fecha:</span> {formatDate(match.match_date)}
                        </div>
                        <div>
                          <span className="font-medium">Torneo:</span> {match.tournament || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Temporada:</span> {match.season ? match.season.charAt(0).toUpperCase() + match.season.slice(1) : (match.tournament || 'N/A')}
                        </div>
                        <div>
                          <span className="font-medium">Duración:</span> {match.duration ? `${match.duration} min` : 'N/A'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {match.status === 'completed' && match.video_processed ? (
                        <>
                          <Link
                            to={`/stats/${match.id}`}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                          >
                            <span className="material-symbols-outlined mr-2">visibility</span>
                            Ver Análisis
                          </Link>
                          <button
                            onClick={() => handleDeleteVideoByMatch(match.id)}
                            disabled={deletingVideoId !== null}
                            className="inline-flex items-center justify-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Eliminar video"
                          >
                            <span className="material-symbols-outlined">
                              {deletingVideoId ? 'hourglass_empty' : 'delete'}
                            </span>
                          </button>
                        </>
                      ) : match.status === 'processing' ? (
                        <>
                          <button
                            disabled
                            className="inline-flex items-center px-4 py-2 bg-blue-300 dark:bg-blue-600 text-blue-500 dark:text-blue-400 rounded-md cursor-not-allowed"
                          >
                            <span className="material-symbols-outlined mr-2">schedule</span>
                            Procesando...
                          </button>
                          <button
                            onClick={() => handleDeleteVideoByMatch(match.id)}
                            disabled={deletingVideoId !== null}
                            className="inline-flex items-center justify-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Eliminar video"
                          >
                            <span className="material-symbols-outlined">
                              {deletingVideoId ? 'hourglass_empty' : 'delete'}
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            disabled
                            className="inline-flex items-center px-4 py-2 bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 rounded-md cursor-not-allowed"
                          >
                            <span className="material-symbols-outlined mr-2">pending</span>
                            Pendiente
                          </button>
                          {/* Permitir eliminar videos pendientes también */}
                          {match.video_path && (
                            <button
                              onClick={() => handleDeleteVideoByMatch(match.id)}
                              disabled={deletingVideoId !== null}
                              className="inline-flex items-center justify-center p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Eliminar video"
                            >
                              <span className="material-symbols-outlined">
                                {deletingVideoId ? 'hourglass_empty' : 'delete'}
                              </span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Mostrando {((currentPage - 1) * matchesPerPage) + 1} a {Math.min(currentPage * matchesPerPage, totalMatches)} de {totalMatches} partidos
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Botón Anterior */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>
                  
                  {/* Números de página */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  {/* Botón Siguiente */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchLibrary;
