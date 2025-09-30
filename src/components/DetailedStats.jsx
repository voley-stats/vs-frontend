import React, { useState } from 'react';

const DetailedStats = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('');

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

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Estadísticas Detalladas - Partido 1
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Equipo A vs Equipo B - 15 de Enero, 2024
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar con métricas */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80 mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Métricas Generales
              </h2>
              <div className="space-y-4">
                {generalStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Efectividad: {stat.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas por jugador */}
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Estadísticas por Jugador
              </h3>
              <select 
                className="w-full mb-4 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
              >
                <option value="">Seleccionar Jugador</option>
                <option value="jugador-a">Jugador A</option>
                <option value="jugador-b">Jugador B</option>
                <option value="jugador-c">Jugador C</option>
              </select>
              
              {selectedPlayer && (
                <div className="space-y-4">
                  {playerStats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {stat.label}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gráficos */}
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Análisis por Set
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-2">
                    Puntos por Set
                  </h3>
                  <div className="h-48 flex items-end gap-4 p-4 rounded bg-slate-100 dark:bg-slate-800/50">
                    {[
                      { set: 'Set 1', height: '60%', points: 25 },
                      { set: 'Set 2', height: '100%', points: 25 },
                      { set: 'Set 3', height: '20%', points: 15 }
                    ].map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1 text-center">
                        <div className="w-full bg-primary/20 rounded-t" style={{height: item.height}}>
                          <div className="w-full h-full bg-primary rounded-t"></div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.set}</p>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.points}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-2">
                    Errores por Set
                  </h3>
                  <div className="h-48 flex items-end gap-4 p-4 rounded bg-slate-100 dark:bg-slate-800/50">
                    {[
                      { set: 'Set 1', height: '70%', errors: 7 },
                      { set: 'Set 2', height: '80%', errors: 8 },
                      { set: 'Set 3', height: '40%', errors: 4 }
                    ].map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1 text-center">
                        <div className="w-full bg-red-500/20 rounded-t" style={{height: item.height}}>
                          <div className="w-full h-full bg-red-500 rounded-t"></div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.set}</p>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.errors}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Clips de video vinculados */}
            <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Clips Destacados Vinculados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videoClips.map((clip) => (
                  <div key={clip.id} className="group">
                    <div className="relative w-full aspect-video bg-cover rounded-lg overflow-hidden shadow-md">
                      <div 
                        className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110" 
                        style={{backgroundImage: `url("${clip.thumbnail}")`}}
                      ></div>
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/80 text-4xl">play_circle</span>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {clip.timestamp}
                      </div>
                    </div>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {clip.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {clip.action} - {clip.player}
                        </span>
                        <button className="text-primary hover:text-primary/80 transition-colors">
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedStats;
