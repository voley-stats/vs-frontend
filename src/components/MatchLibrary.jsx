import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';

const MatchLibrary = () => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    team: '',
    status: '',
    season: ''
  });

  const matches = [
    {
      id: 1,
      teams: 'Equipo A vs Equipo B',
      date: '2024-01-15',
      tournament: 'Liga Nacional 2024',
      season: 'Apertura',
      status: 'Procesado',
      score: '3-1',
      duration: '2h 15min',
      actions: 45
    },
    {
      id: 2,
      teams: 'Equipo C vs Equipo D',
      date: '2024-01-14',
      tournament: 'Copa Regional',
      season: 'Clausura',
      status: 'Pendiente',
      score: '-',
      duration: '-',
      actions: 0
    },
    {
      id: 3,
      teams: 'Equipo E vs Equipo F',
      date: '2024-01-13',
      tournament: 'Liga Nacional 2024',
      season: 'Apertura',
      status: 'Procesado',
      score: '3-2',
      duration: '2h 45min',
      actions: 52
    },
    {
      id: 4,
      teams: 'Equipo G vs Equipo H',
      date: '2024-01-12',
      tournament: 'Torneo Juvenil',
      season: 'Liga',
      status: 'Procesado',
      score: '3-0',
      duration: '1h 30min',
      actions: 28
    }
  ];

  const filteredMatches = matches.filter(match => {
    const dateMatch = !filters.dateFrom || !filters.dateTo || 
      (match.date >= filters.dateFrom && match.date <= filters.dateTo);
    const teamMatch = !filters.team || match.teams.toLowerCase().includes(filters.team.toLowerCase());
    const statusMatch = !filters.status || match.status === filters.status;
    const seasonMatch = !filters.season || match.season === filters.season;
    
    return dateMatch && teamMatch && statusMatch && seasonMatch;
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

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
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Partidos ({filteredMatches.length})
            </h2>
          </div>
          
          <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {filteredMatches.map((match) => (
              <div key={match.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                        {match.teams}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        match.status === 'Procesado' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div>
                        <span className="font-medium">Fecha:</span> {match.date}
                      </div>
                      <div>
                        <span className="font-medium">Torneo:</span> {match.tournament}
                      </div>
                      <div>
                        <span className="font-medium">Temporada:</span> {match.season}
                      </div>
                      <div>
                        <span className="font-medium">Duración:</span> {match.duration}
                      </div>
                      <div>
                        <span className="font-medium">Acciones:</span> {match.actions}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {match.score}
                      </div>
                    </div>
                    
                    {match.status === 'Procesado' ? (
                      <Link
                        to={`/stats/${match.id}`}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      >
                        <span className="material-symbols-outlined mr-2">visibility</span>
                        Ver Análisis
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center px-4 py-2 bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 rounded-md cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined mr-2">schedule</span>
                        Procesando...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchLibrary;
