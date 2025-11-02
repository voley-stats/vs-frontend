import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { coachProfileService } from '../services/coachProfileService';
import VolleyballIcon from './VolleyballIcon';

const CompleteCoachProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfileComplete } = useAuth();
  const [formData, setFormData] = useState({
    club_institution: '',
    team_role: '',
    categories: [], // Combinaciones de división + género
    terms_accepted: false
  });
  const [options, setOptions] = useState({
    divisions: [
      'División de Honor',
      'Primera',
      'Segunda', 
      'Tercera',
      'Cuarta',
      'Quinta',
      'Sexta',
      'Mayores',
      'Sub 21',
      'Sub 18',
      'Sub 16',
      'Sub 14'
    ],
    genders: ['Masculino', 'Femenino'],
    team_roles: [
      'Director Técnico',
      'Asistente',
      'Preparador Físico',
      'Entrenador Principal',
      'Entrenador Asistente',
      'Analista',
      'Coordinador'
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  // Las opciones ya están definidas en el estado inicial
  // No necesitamos cargarlas desde el servidor

  // Verificar si el usuario está logueado
  useEffect(() => {
    if (user) {
      setAuthLoading(false);
    } else {
      console.log('Usuario no logueado, redirigiendo al login...');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'categories') {
      // Manejar selección múltiple para categorías (división + género)
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validaciones
    if (!formData.club_institution.trim()) {
      setError('El club o institución es requerido');
      setLoading(false);
      return;
    }

    if (formData.categories.length === 0) {
      setError('Debe seleccionar al menos una categoría (división + género)');
      setLoading(false);
      return;
    }

    if (!formData.terms_accepted) {
      setError('Debe aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    try {
      const response = await coachProfileService.saveProfile(formData);
      setSuccess('Perfil de entrenador completado exitosamente');
      
      // Marcar perfil como completo en el contexto
      updateProfileComplete(true);
      
      // Redirigir al dashboard después de 2 segundos
      // Usar window.location para forzar recarga y que el AuthContext detecte el cambio
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (err) {
      setError(err.message || 'Error al completar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="max-w-2xl w-full space-y-8 p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <VolleyballIcon className="w-16 h-16" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            ¡Bienvenido a VOLEY STATS!
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Completa tu perfil de entrenador para personalizar tu experiencia
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="club_institution" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Club / Institución *
              </label>
              <input
                id="club_institution"
                name="club_institution"
                type="text"
                required
                value={formData.club_institution}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="Ej: Club Atlético Vóley, Universidad Nacional, etc."
              />
            </div>

            <div>
              <label htmlFor="team_role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Rol en el Equipo (Opcional)
              </label>
              <select
                id="team_role"
                name="team_role"
                value={formData.team_role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="">Selecciona tu rol</option>
                {options.team_roles?.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Categoría(s) que entrena * (Selecciona las combinaciones específicas)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.divisions?.map((division) => 
                  options.genders?.map((gender) => {
                    const categoryValue = `${division} - ${gender}`;
                    return (
                      <label key={categoryValue} className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                          type="checkbox"
                          name="categories"
                          value={categoryValue}
                          checked={formData.categories.includes(categoryValue)}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                          {categoryValue}
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Ejemplo: Si entrenas Primera Masculino y Primera Femenino, selecciona ambas opciones por separado.
              </p>
              
              {/* Mostrar categorías seleccionadas */}
              {formData.categories.length > 0 && (
                <div className="mt-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <h4 className="text-sm font-medium text-primary mb-2">
                    Categorías seleccionadas ({formData.categories.length}):
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.categories.map((category, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-white"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms_accepted"
                name="terms_accepted"
                type="checkbox"
                required
                checked={formData.terms_accepted}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-600 rounded mt-1"
              />
              <label htmlFor="terms_accepted" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                Acepto los{' '}
                <button 
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-primary hover:text-primary/80 underline"
                >
                  términos y condiciones
                </button>{' '}
                de VOLEY STATS *
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleSkip}
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Completar más tarde
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : 'Completar Perfil'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Términos y Condiciones */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-dark rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-black dark:text-white">
                  Términos y Condiciones
                </h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <h4 className="font-semibold text-black dark:text-white">1. Aceptación de Términos</h4>
                <p>
                  Al utilizar VOLEY STATS, usted acepta estar sujeto a estos términos y condiciones. 
                  Si no está de acuerdo con alguna parte de estos términos, no debe usar nuestro servicio.
                </p>

                <h4 className="font-semibold text-black dark:text-white">2. Uso del Servicio</h4>
                <p>
                  VOLEY STATS es una plataforma de análisis de voleibol diseñada para entrenadores, 
                  equipos y profesionales del deporte. El uso del servicio está destinado únicamente 
                  para fines legítimos relacionados con el análisis deportivo.
                </p>

                <h4 className="font-semibold text-black dark:text-white">3. Cuenta de Usuario</h4>
                <p>
                  Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. 
                  Debe proporcionar información precisa y actualizada al crear su cuenta.
                </p>

                <h4 className="font-semibold text-black dark:text-white">4. Privacidad y Datos</h4>
                <p>
                  Respetamos su privacidad y protegemos sus datos personales de acuerdo con nuestra 
                  Política de Privacidad. Los datos de análisis deportivo se utilizan únicamente 
                  para mejorar el rendimiento y proporcionar insights relevantes.
                </p>

                <h4 className="font-semibold text-black dark:text-white">5. Propiedad Intelectual</h4>
                <p>
                  Todo el contenido, software y tecnología de VOLEY STATS están protegidos por 
                  derechos de autor y otras leyes de propiedad intelectual.
                </p>

                <h4 className="font-semibold text-black dark:text-white">6. Limitación de Responsabilidad</h4>
                <p>
                  VOLEY STATS se proporciona "tal como está" sin garantías de ningún tipo. 
                  No seremos responsables por daños directos, indirectos o consecuenciales.
                </p>

                <h4 className="font-semibold text-black dark:text-white">7. Modificaciones</h4>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Los cambios entrarán en vigor inmediatamente después de su publicación.
                </p>

                <h4 className="font-semibold text-black dark:text-white">8. Contacto</h4>
                <p>
                  Para preguntas sobre estos términos, puede contactarnos a través de nuestro 
                  formulario de contacto en la plataforma.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteCoachProfile;
