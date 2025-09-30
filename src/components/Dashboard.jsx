import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { matchService } from '../services/matchService';

const Dashboard = () => {
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMatches = async () => {
      try {
        const data = await matchService.getRecentMatches(3);
        setRecentMatches(data.matches);
      } catch (error) {
        console.error('Error obteniendo partidos recientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMatches();
  }, []);

  const quickActions = [
    {
      title: 'Cargar Video',
      description: 'Sube un nuevo video de partido para análisis',
      icon: 'upload',
      link: '/upload',
      color: 'bg-primary'
    },
    {
      title: 'Últimos Partidos',
      description: 'Revisa los partidos analizados recientemente',
      icon: 'history',
      link: '/library',
      color: 'bg-primary-light'
    },
    {
      title: 'Ver Estadísticas',
      description: 'Explora estadísticas detalladas de partidos',
      icon: 'analytics',
      link: '/stats',
      color: 'bg-accent'
    }
  ];


  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Bienvenido a VoleyStats
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Panel de control para análisis de partidos de voleibol
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group block p-6 bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                    <span className="material-symbols-outlined text-white text-xl">
                      {action.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
          <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Últimos Partidos Analizados
            </h2>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-slate-600 dark:text-slate-400">Cargando partidos...</span>
              </div>
            ) : recentMatches.length > 0 ? (
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        {match.home_team} vs {match.away_team}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(match.match_date).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        match.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : match.status === 'processing'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {match.status === 'completed' ? 'Procesado' : 
                         match.status === 'processing' ? 'Procesando' : 'Pendiente'}
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {match.home_score}-{match.away_score}
                      </span>
                      {match.status === 'completed' && (
                        <Link
                          to={`/stats/${match.id}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400">No hay partidos recientes</p>
                <Link
                  to="/upload"
                  className="text-primary hover:text-primary/80 transition-colors text-sm"
                >
                  Subir tu primer partido
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
