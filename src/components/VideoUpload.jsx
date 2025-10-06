import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { matchService } from '../services/matchService';
import { videoService } from '../services/videoService';
import { categoryService } from '../services/categoryService';
import BackButton from './BackButton';
import LoadingSpinner from './LoadingSpinner';

const VideoUpload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    videoFile: null,
    match_date: '',
    home_team: '',
    away_team: '',
    tournament: '',
    season: '',
    description: '',
    category: '' // Categoría específica del video
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [userRole, setUserRole] = useState('');

  // Cargar categorías disponibles para el usuario
  useEffect(() => {
    loadUserCategories();
  }, []);

  const loadUserCategories = async () => {
    try {
      console.log('🔄 Cargando categorías del usuario...');
      setLoading(true);
      setError('');
      
      const response = await categoryService.getMyCategories();
      console.log('📡 Respuesta del API:', response);
      
      if (response.categories && response.categories.length > 0) {
        console.log(`✅ Encontradas ${response.categories.length} categorías`);
        
        // Mapear las categorías del backend al formato esperado
        const mappedCategories = response.categories.map(category => ({
          value: category.full_name,
          label: category.full_name,
          id: category.id,
          division: category.division,
          gender: category.gender,
          club_name: category.club_name
        }));
        
        console.log('🗂️ Categorías mapeadas:', mappedCategories);
        
        setCategoryOptions(mappedCategories);
        setUserRole(response.user_role);
        
        // Si solo hay una categoría disponible, seleccionarla automáticamente
        if (mappedCategories.length === 1) {
          console.log('🎯 Auto-seleccionando única categoría:', mappedCategories[0].value);
          setFormData(prev => ({
            ...prev,
            category: mappedCategories[0].value
          }));
        }
      } else {
        console.log('⚠️ No se encontraron categorías');
        setCategoryOptions([]);
        setUserRole(response.user_role || 'unknown');
        setError('No tienes categorías asignadas. Contacta al administrador.');
      }
    } catch (err) {
      console.error('❌ Error cargando categorías:', err);
      
      // Si es un error de red o servidor, mostrar mensaje más amigable
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Error de conexión. Verifica tu conexión a internet e intenta nuevamente.');
      } else if (err.message.includes('Categoría no encontrada')) {
        setError('No tienes categorías asignadas. Contacta al administrador para obtener acceso.');
      } else {
        setError(`Error cargando categorías disponibles: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

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
      // Encontrar el category_id basado en la categoría seleccionada
      const selectedCategory = categoryOptions.find(cat => cat.value === formData.category);
      if (!selectedCategory) {
        throw new Error('Debe seleccionar una categoría válida');
      }

      // Primero crear el partido
      const matchData = {
        home_team: formData.home_team,
        away_team: formData.away_team,
        match_date: formData.match_date,
        tournament: formData.tournament,
        season: formData.season,
        description: formData.description,
        category_id: selectedCategory.id
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

  // Mostrar loading mientras se cargan las categorías
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <BackButton to="/" className="mb-4" />
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <LoadingSpinner size="xl" className="mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Cargando categorías disponibles...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error si no hay categorías disponibles
  if (categoryOptions.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <BackButton to="/" className="mb-4" />
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Sin categorías disponibles
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error || 'No tienes categorías asignadas. Contacta al administrador para obtener acceso.'}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      categoryService.clearCache();
                      loadUserCategories();
                    }}
                    className="inline-flex items-center px-3 py-2 border border-red-300 dark:border-red-600 rounded-md text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header con botón de retroceso */}
            <div className="mb-8">
              <BackButton to="/" className="mb-4" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Cargar Video de Partido
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Sube un video de partido para análisis automático
                {userRole === 'assistant' && ' (solo categorías asignadas)'}
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
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Categoría del Video *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      disabled={categoryOptions.length === 0}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {categoryOptions.length === 0 ? 'No hay categorías disponibles' : 'Seleccionar categoría'}
                      </option>
                      {categoryOptions.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {userRole === 'assistant' 
                        ? 'Categorías asignadas a tu perfil'
                        : 'Selecciona la categoría específica del video (división + género)'
                      }
                    </p>
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
