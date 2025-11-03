import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import BackButton from './BackButton';
import { statsService } from '../services/statsService';
import { videoService } from '../services/videoService';
import LoadingSpinner from './LoadingSpinner';

// Mapeo de event_types del backend a nombres en español (con primera letra mayúscula y plural)
const EVENT_TYPE_MAPPING = {
  'serve': 'Saques',
  'block': 'Bloqueos',
  'receive': 'Recepciones',
  'attack': 'Ataques',
  'point': 'Puntos',
  'error': 'Errores',
  'dig': 'Defensas',
  'set': 'Colocaciones'
};

// Función para convertir event_type a nombre legible con primera letra mayúscula y plural
const formatEventType = (eventType) => {
  if (EVENT_TYPE_MAPPING[eventType]) {
    return EVENT_TYPE_MAPPING[eventType];
  }
  // Si no está en el mapeo, convertir a formato legible
  const formatted = eventType.charAt(0).toUpperCase() + eventType.slice(1);
  // Agregar 's' al final si no termina en 's' para hacerlo plural
  return formatted.endsWith('s') ? formatted : formatted + 's';
};

const DetailedStats = () => {
  const { id } = useParams(); // Este es el videoId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  useEffect(() => {
    const fetchStats = async () => {
      if (!id) {
        setError('ID no proporcionado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Intentar primero obtener el video desde el match
        // Si id es un matchId, obtener los videos del match y usar el primero
        let videoId = id;
        
        try {
          // Intentar obtener videos del match
          const videosResponse = await videoService.getVideosByMatch(id);
          if (videosResponse.videos && videosResponse.videos.length > 0) {
            // Usar el primer video del match
            videoId = videosResponse.videos[0].id;
          }
        } catch (matchError) {
          // Si falla, asumir que id es directamente un videoId
          console.log('Asumiendo que id es un videoId:', id);
          videoId = id;
        }

        // Obtener estadísticas del video
        const data = await statsService.getVideoFargateStats(videoId);
        setStatsData(data);
        
        // Establecer "Todos" como filtro por defecto
        setSelectedFilter('Todos');
      } catch (err) {
        console.error('Error obteniendo estadísticas:', err);
        setError(err.message || 'Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  // Transformar event_distribution a formato para mostrar
  const getGeneralStats = () => {
    if (!statsData || !statsData.event_distribution) return [];

    const totalEvents = statsData.summary?.total_events || 
      statsData.event_distribution.reduce((sum, event) => sum + (event.count || 0), 0);

    return statsData.event_distribution.map(event => {
      const count = event.count || 0;
      const percentage = totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0;
      const label = formatEventType(event.event_type);
      
      return {
        label,
        value: count,
        percentage,
        average_confidence: event.average_confidence || 0,
        event_type: event.event_type
      };
    });
  };

  // Obtener eventos filtrados
  const getFilteredEvents = () => {
    if (!statsData || !statsData.detected_events) return [];
    
    // Si se selecciona "Todos", mostrar todos los eventos
    if (!selectedFilter || selectedFilter === 'Todos') {
      return statsData.detected_events;
    }

    // Encontrar el event_type correspondiente al filtro seleccionado
    // Primero buscar en el mapeo directo
    let eventTypeKey = Object.keys(EVENT_TYPE_MAPPING).find(
      key => EVENT_TYPE_MAPPING[key] === selectedFilter
    );
    
    // Si no está en el mapeo, buscar en event_distribution por el label formateado
    if (!eventTypeKey && statsData.event_distribution) {
      const event = statsData.event_distribution.find(e => 
        formatEventType(e.event_type) === selectedFilter
      );
      if (event) {
        eventTypeKey = event.event_type;
      }
    }

    if (!eventTypeKey) return statsData.detected_events;

    return statsData.detected_events.filter(event => event.event_type === eventTypeKey);
  };

  // Obtener filtros disponibles desde event_distribution
  const getAvailableFilters = () => {
    if (!statsData || !statsData.event_distribution) return [];
    return statsData.event_distribution.map(event => 
      formatEventType(event.event_type)
    );
  };

  // Formatear timestamp a formato legible (MM:SS)
  const formatTimestamp = (timestamp) => {
    if (typeof timestamp !== 'number') return '00:00';
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const generalStats = getGeneralStats();
  const filteredEvents = getFilteredEvents();
  const filters = getAvailableFilters();
  const totalEvents = statsData?.summary?.total_events || 0;

  if (loading) {
    return (
      <div className="flex h-screen bg-background-light dark:bg-background-dark">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-background-light dark:bg-background-dark">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <BackButton to="/library" />
          </div>
        </div>
      </div>
    );
  }

  if (!statsData) {
    return (
      <div className="flex h-screen bg-background-light dark:bg-background-dark">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">No hay datos disponibles</p>
            <BackButton to="/library" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header con botón de retroceso */}
            <div className="mb-8">
              <BackButton to="/library" className="mb-4" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Estadísticas del Video
              </h1>
              {statsData.summary && (
                <p className="text-slate-600 dark:text-slate-400">
                  {totalEvents} eventos detectados
                </p>
              )}
            </div>

            {/* Resumen general */}
            {statsData.summary && (
              <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {statsData.summary.total_events || 0}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Total de Eventos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {statsData.summary.total_event_types || 0}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Tipos de Eventos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      {statsData.summary.unique_event_types?.length || 0}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Eventos Únicos</div>
                  </div>
                </div>
              </div>
            )}

            {/* Filtros */}
            {filters.length > 0 && (
              <div className="mb-6">
                <div className="flex space-x-1 border-b border-slate-200 dark:border-slate-700">
                  {/* Botón "Todos" */}
                  <button
                    onClick={() => setSelectedFilter('Todos')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      selectedFilter === 'Todos' || !selectedFilter
                        ? 'border-primary text-primary'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                    }`}
                  >
                    Todos
                  </button>
                  {/* Filtros por tipo de evento */}
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        selectedFilter === filter
                          ? 'border-primary text-primary'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Estadísticas principales - Distribución de Eventos */}
            <div className="mb-8">
              {/* Distribución de Eventos - Ocupa todo el ancho */}
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Distribución de Eventos
                </h3>
                {generalStats.length > 0 ? (
                  <>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      {totalEvents}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Total de eventos detectados
                    </div>
                    <div className="space-y-3">
                      {generalStats.map((stat, index) => {
                        const maxValue = Math.max(...generalStats.map(s => s.value));
                        const heightPercentage = maxValue > 0 ? (stat.value / maxValue) * 100 : 0;
                        return (
                          <div key={stat.event_type || index} className="flex items-center">
                            <span className="text-sm text-slate-600 dark:text-slate-400 w-32">
                              {stat.label}
                            </span>
                            <div className="flex-1 mx-4">
                              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${heightPercentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-slate-900 dark:text-white w-16 text-right">
                              {stat.value}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 w-16 text-right">
                              ({stat.percentage}%)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">No hay datos de distribución disponibles</p>
                )}
              </div>
            </div>

            {/* Eventos Detectados */}
            {filteredEvents.length > 0 && (
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Eventos Detectados {selectedFilter && selectedFilter !== 'Todos' && `- ${selectedFilter}`}
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredEvents.slice(0, 50).map((event, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {formatTimestamp(event.timestamp)}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {formatEventType(event.event_type)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {filteredEvents.length > 50 && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-4">
                      Mostrando los primeros 50 de {filteredEvents.length} eventos
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Información del Análisis */}
            {statsData.analysis && (
              <div className="mt-6 bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Información del Análisis
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Duración:</span>
                    <div className="text-slate-900 dark:text-white font-medium">
                      {statsData.analysis.duration ? `${Math.round(statsData.analysis.duration)}s` : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">FPS:</span>
                    <div className="text-slate-900 dark:text-white font-medium">
                      {statsData.analysis.fps || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedStats;