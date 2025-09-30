import React, { useState } from 'react';

const Sidebar = () => {
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const generalStats = [
    { label: 'Saques', value: 12 },
    { label: 'Bloqueos', value: 8 },
    { label: 'Recepciones', value: 25 },
    { label: 'Puntos', value: 60 },
    { label: 'Errores', value: 15 }
  ];

  const playerStats = [
    { label: 'Saques', value: 3 },
    { label: 'Bloqueos', value: 2 },
    { label: 'Recepciones', value: 5 },
    { label: 'Puntos', value: 15 },
    { label: 'Errores', value: 3 }
  ];

  return (
    <aside className="lg:col-span-1 flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Partido 1</h1>
        
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Métricas Generales</h3>
          <div className="text-sm space-y-3 text-slate-600 dark:text-slate-400">
            {generalStats.map((stat, index) => (
              <div 
                key={index}
                className={`flex justify-between items-center py-2 ${
                  index < generalStats.length - 1 ? 'border-b border-slate-200/80 dark:border-slate-800/80' : ''
                }`}
              >
                <p>{stat.label}</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Estadísticas por Jugador</h3>
          <select 
            className="form-select w-full rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-primary focus:border-primary"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            <option value="">Seleccionar Jugador</option>
            <option value="jugador-a">Jugador A</option>
            <option value="jugador-b">Jugador B</option>
          </select>
          
          {selectedPlayer && (
            <div className="text-sm space-y-3 text-slate-600 dark:text-slate-400">
              {playerStats.map((stat, index) => (
                <div 
                  key={index}
                  className={`flex justify-between items-center py-2 ${
                    index < playerStats.length - 1 ? 'border-b border-slate-200/80 dark:border-slate-800/80' : ''
                  }`}
                >
                  <p>{stat.label}</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{stat.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
