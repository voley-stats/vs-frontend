import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BackButton from './BackButton';

const DetailedStats = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Puntos');

  const generalStats = [
    { label: 'Saques', value: 12, percentage: 85 },
    { label: 'Bloqueos', value: 8, percentage: 70 },
    { label: 'Recepciones', value: 25, percentage: 90 },
    { label: 'Puntos', value: 60, percentage: 75 },
    { label: 'Errores', value: 15, percentage: 20 }
  ];

  const playerStats = [
    { label: 'Saques', value: 3, percentage: 80 },
    { label: 'Bloqueos', value: 2, percentage: 60 },
    { label: 'Recepciones', value: 5, percentage: 85 },
    { label: 'Puntos', value: 15, percentage: 70 },
    { label: 'Errores', value: 3, percentage: 15 }
  ];

  const videoClips = [
    {
      id: 1,
      title: 'Saque Ace - Punto 15',
      timestamp: '12:34',
      action: 'Saque',
      player: 'Jugador A',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlFYv6iOQKx1WjuuzvtV1DzGoTAcvJlFnSVu8QwH2baO-7ciLmX4OU4J2GKAAqpQR3o3MiHsk8VJUE_NoviK70sq92uPepLjwyP38OjMMB-68ns0zqTrw_avQwbUdzXuTJzV09XxfH9E_OKrkDZH9hGoptLgFYaqOtzFA5MjbGNRX6OCttPmqkKm6irk5HeuT0uoHG5oCVImhveeWJokX7vEm3uFUZNHvD4YTXaqk4oxHjbs0g7j1YnViUikAlfyrpKa-vOnnCk0'
    },
    {
      id: 2,
      title: 'Bloqueo Efectivo - Punto 23',
      timestamp: '18:45',
      action: 'Bloqueo',
      player: 'Jugador B',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaxruY5vqRw3Afm9I9bqlM_-qT8Gv2GjHSmH__TAsT1fbxs54hTn_IqtxVf4hd6Nwafz51lsD6cfai6qATrD4Fbz7U6X_cO1skpcLL_XfctMUCTwq58Dr8Mz2YnSxG-lMfNLUq6jrmB961w2It8QWd0zC3PyQJYZcHqgkCiyWRlsEzwHyrdWLUnjqRWKJBPdQ6-G_SW1oywWAJRwlDZDnPDDfjpOxccMFZA-uIqxYU9wybgoRH5-CgPQgXPPKn4ADIu1nVR4qxYJA'
    },
    {
      id: 3,
      title: 'Punto de Partido - Punto 45',
      timestamp: '28:12',
      action: 'Ataque',
      player: 'Jugador C',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJs9j-8RCDCJ_gLELWQcujivGrNTjspUkqzxbSYr-hNY_LPXhFoqeh4nkIuw8GsJV8Lfno7-MGYNpZ44P47ZKO46LvLkXGwFyT2s32ud0YSSAJtzcXFSkSfnOBodRNDj4HeFQmjVN2bzmEIFj70FOiMxKRUmvbiEsTb7zD4IufyfIR47PqHqBNnbJg9IXDHGsAIyecNf45tq_DCzmOCGX_TUZcGRKnjYUP66DeGfhjnBSebKbyO8Pc2nLE5qXvZeQ2WvXcwP9Yhww'
    }
  ];

  const filters = ['Puntos', 'Bloqueos', 'Saques'];

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
              <BackButton to="/" className="mb-4" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Estadísticas del Equipo
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Equipo A vs Equipo B - 15 de Enero, 2024
              </p>
            </div>

            {/* Filtros */}
            <div className="mb-6">
              <div className="flex space-x-1 border-b border-slate-200 dark:border-slate-700">
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

            {/* Estadísticas principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Puntos por Jugador */}
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Puntos por Jugador
                </h3>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">120</div>
                <div className="text-sm text-green-600 dark:text-green-400 mb-4">
                  Últimos 5 partidos +15%
                </div>
                <div className="h-32 flex items-end gap-2">
                  {['Alex', 'Ben', 'Chris', 'David', 'Ethan'].map((player, index) => {
                    const heights = [80, 95, 60, 90, 85];
                    return (
                      <div key={player} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t mb-2"
                          style={{ height: `${heights[index]}px` }}
                        ></div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">{player}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Puntos por Partido */}
              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Puntos por Partido
                </h3>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">35</div>
                <div className="text-sm text-red-600 dark:text-red-400 mb-4">
                  Última temporada -5%
                </div>
                <div className="h-32 flex items-end gap-2">
                  {['Partido 1', 'Partido 2', 'Partido 3', 'Partido 4', 'Partido 5'].map((match, index) => {
                    const heights = [40, 100, 35, 45, 38];
                    return (
                      <div key={match} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t mb-2"
                          style={{ height: `${heights[index]}px` }}
                        ></div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">{match}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Análisis de Recepciones */}
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Análisis de Recepciones
              </h3>
              <div className="mb-4">
                <h4 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-2">
                  Recepciones por Jugador
                </h4>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">85</div>
                <div className="text-sm text-green-600 dark:text-green-400 mb-4">
                  Últimos 5 partidos +10%
                </div>
              </div>
              <div className="space-y-3">
                {['Alex', 'Ben', 'Chris', 'David', 'Ethan'].map((player, index) => {
                  const widths = [45, 80, 35, 90, 70];
                  const values = [12, 18, 8, 20, 15];
                  return (
                    <div key={player} className="flex items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-16">{player}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${widths[index]}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white w-8">
                        {values[index]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedStats;
