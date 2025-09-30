import React from 'react';

const Charts = () => {
  const pointsData = [
    { set: 'Set 1', height: '60%' },
    { set: 'Set 2', height: '100%' },
    { set: 'Set 3', height: '20%' }
  ];

  const errorsData = [
    { set: 'Set 1', height: '70%' },
    { set: 'Set 2', height: '80%' },
    { set: 'Set 3', height: '40%' }
  ];

  return (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Resumen del Partido</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-2">Puntos por Set</h3>
          <div className="h-48 flex items-end gap-4 p-4 rounded bg-slate-100 dark:bg-slate-800/50">
            {pointsData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1 text-center">
                <div className="w-full bg-primary/20 rounded-t" style={{height: item.height}}>
                  <div className="w-full h-full bg-primary rounded-t"></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.set}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-2">Errores por Set</h3>
          <div className="h-48 flex items-end gap-4 p-4 rounded bg-slate-100 dark:bg-slate-800/50">
            {errorsData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1 text-center">
                <div className="w-full bg-red-500/20 rounded-t" style={{height: item.height}}>
                  <div className="w-full h-full bg-red-500 rounded-t"></div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.set}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
