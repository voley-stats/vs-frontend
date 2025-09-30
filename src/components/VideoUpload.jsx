import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { videoService } from '../services/videoService';

const VideoUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    videoFile: null,
    match_date: '',
    home_team: '',
    away_team: '',
    tournament: '',
    season: '',
    description: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError('');

    try {
      // Primero crear el partido
      const matchData = {
        home_team: formData.home_team,
        away_team: formData.away_team,
        match_date: formData.match_date,
        tournament: formData.tournament,
        season: formData.season,
        description: formData.description
      };

      const matchResult = await matchService.createMatch(matchData);
      const matchId = matchResult.match.id;

      // Luego subir el video si existe
      if (formData.videoFile) {
        await videoService.uploadVideo(matchId, formData.videoFile, {
          title: `${formData.home_team} vs ${formData.away_team}`,
          description: formData.description
        });
      }

      // Redirigir al dashboard
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error subiendo el video');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Cargar Video de Partido
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Sube un video de partido para análisis automático
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/50 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-800/80">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Video del Partido
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleChange}
                  className="hidden"
                  id="video-upload"
                  required
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <span className="material-symbols-outlined text-4xl text-slate-400 mb-2 block">
                    cloud_upload
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Haz clic para seleccionar un video o arrastra el archivo aquí
                  </p>
                  {formData.videoFile && (
                    <p className="text-sm text-primary mt-2">
                      Archivo seleccionado: {formData.videoFile.name}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="match_date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Fecha del Partido
                </label>
                <input
                  type="date"
                  id="match_date"
                  name="match_date"
                  value={formData.match_date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label htmlFor="tournament" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Torneo
                </label>
                <input
                  type="text"
                  id="tournament"
                  name="tournament"
                  value={formData.tournament}
                  onChange={handleChange}
                  placeholder="Ej: Liga Nacional 2024"
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label htmlFor="season" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Temporada
                </label>
                <select
                  id="season"
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="">Seleccionar temporada</option>
                  <option value="apertura">Apertura</option>
                  <option value="clausura">Clausura</option>
                  <option value="liga">Liga</option>
                  <option value="copa">Copa</option>
                  <option value="playoff">Playoff</option>
                </select>
              </div>

              <div>
                <label htmlFor="home_team" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Equipo a Analizar
                </label>
                <input
                  type="text"
                  id="home_team"
                  name="home_team"
                  value={formData.home_team}
                  onChange={handleChange}
                  placeholder="Nombre del equipo a analizar"
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label htmlFor="away_team" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Equipo Rival
                </label>
                <input
                  type="text"
                  id="away_team"
                  name="away_team"
                  value={formData.away_team}
                  onChange={handleChange}
                  placeholder="Nombre del equipo rival"
                  required
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Descripción (Opcional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Notas adicionales sobre el partido..."
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? 'Cargando...' : 'Iniciar Análisis'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
