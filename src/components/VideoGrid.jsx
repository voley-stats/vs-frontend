import React from 'react';

const VideoGrid = () => {
  const videos = [
    {
      id: 1,
      title: 'Saque Ace',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvlFYv6iOQKx1WjuuzvtV1DzGoTAcvJlFnSVu8QwH2baO-7ciLmX4OU4J2GKAAqpQR3o3MiHsk8VJUE_NoviK70sq92uPepLjwyP38OjMMB-68ns0zqTrw_avQwbUdzXuTJzV09XxfH9E_OKrkDZH9hGoptLgFYaqOtzFA5MjbGNRX6OCttPmqkKm6irk5HeuT0uoHG5oCVImhveeWJokX7vEm3uFUZNHvD4YTXaqk4oxHjbs0g7j1YnViUikAlfyrpKa-vOnnCk0'
    },
    {
      id: 2,
      title: 'Bloqueo Efectivo',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaxruY5vqRw3Afm9I9bqlM_-qT8Gv2GjHSmH__TAsT1fbxs54hTn_IqtxVf4hd6Nwafz51lsD6cfai6qATrD4Fbz7U6X_cO1skpcLL_XfctMUCTwq58Dr8Mz2YnSxG-lMfNLUq6jrmB961w2It8QWd0zC3PyQJYZcHqgkCiyWRlsEzwHyrdWLUnjqRWKJBPdQ6-G_SW1oywWAJRwlDZDnPDDfjpOxccMFZA-uIqxYU9wybgoRH5-CgPQgXPPKn4ADIu1nVR4qxYJA'
    },
    {
      id: 3,
      title: 'Punto de Partido',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJs9j-8RCDCJ_gLELWQcujivGrNTjspUkqzxbSYr-hNY_LPXhFoqeh4nkIuw8GsJV8Lfno7-MGYNpZ44P47ZKO46LvLkXGwFyT2s32ud0YSSAJtzcXFSkSfnOBodRNDj4HeFQmjVN2bzmEIFj70FOiMxKRUmvbiEsTb7zD4IufyfIR47PqHqBNnbJg9IXDHGsAIyecNf45tq_DCzmOCGX_TUZcGRKnjYUP66DeGfhjnBSebKbyO8Pc2nLE5qXvZeQ2WvXcwP9Yhww'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Videos Destacados</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="group">
            <div className="relative w-full aspect-video bg-cover rounded-lg overflow-hidden shadow-md">
              <div 
                className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110" 
                style={{backgroundImage: `url("${video.thumbnail}")`}}
              ></div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-white/80 text-5xl">play_circle</span>
              </div>
            </div>
            <p className="text-sm font-medium mt-2 text-slate-700 dark:text-slate-300">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
