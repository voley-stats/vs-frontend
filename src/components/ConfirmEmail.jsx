import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser: setAuthUser, updateProfileComplete } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      confirmEmail();
    } else {
      setError('Token de confirmación no encontrado');
    }
  }, [token]);

  const confirmEmail = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/auth/confirm-email', { token });
      
      setSuccess(true);
      setUser(response.user);
      
      // Guardar usuario y token en localStorage para mantener la sesión
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      
      // Actualizar el contexto de autenticación
      setAuthUser(response.user);
      
      // Si es un coach, verificar si tiene perfil completo antes de redirigir
      if (response.user.role === 'coach') {
        try {
          // Verificar si el perfil del coach está completo
          const { coachProfileService } = await import('../services/coachProfileService');
          const profileCheck = await coachProfileService.checkProfileComplete();
          
          // Actualizar el estado del perfil en el contexto
          updateProfileComplete(profileCheck.isComplete);
          
          if (!profileCheck.isComplete) {
            // Perfil incompleto - redirigir a completar perfil
            // Dar tiempo para que el contexto se actualice
            await new Promise(resolve => setTimeout(resolve, 100));
            navigate('/complete-profile');
            return;
          }
        } catch (profileError) {
          // Si no existe el perfil o hay error, asumir que necesita completarlo
          console.log('Perfil no encontrado, redirigiendo a completar perfil');
          updateProfileComplete(false);
          // Dar tiempo para que el contexto se actualice
          await new Promise(resolve => setTimeout(resolve, 100));
          navigate('/complete-profile');
          return;
        }
      }
      
      // Si ya tiene perfil completo o no es coach, redirigir al dashboard
      updateProfileComplete(true);
      await new Promise(resolve => setTimeout(resolve, 100));
      navigate('/');
      
    } catch (error) {
      console.error('Error confirmando email:', error);
      setError(error.message || 'Error confirmando email');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Confirmando tu email...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Error de Confirmación
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {error}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Ir al Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Registrarse Nuevamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              ¡Email Confirmado!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {user?.role === 'coach' 
                ? 'Tu cuenta ha sido activada exitosamente. Te redirigiremos para completar tu perfil de entrenador.'
                : 'Tu cuenta ha sido activada exitosamente. Te redirigiremos al dashboard.'
              }
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {user?.role === 'coach'
                  ? 'Redirigiendo para completar tu perfil...'
                  : 'Redirigiendo al dashboard...'
                }
              </p>
            </div>
            {user?.role === 'coach' ? (
              <button
                onClick={async () => {
                  // Verificar perfil y actualizar contexto antes de navegar
                  try {
                    const { coachProfileService } = await import('../services/coachProfileService');
                    const profileCheck = await coachProfileService.checkProfileComplete();
                    updateProfileComplete(profileCheck.isComplete);
                    // Dar tiempo para que el contexto se actualice
                    await new Promise(resolve => setTimeout(resolve, 100));
                    if (!profileCheck.isComplete) {
                      navigate('/complete-profile');
                    } else {
                      navigate('/');
                    }
                  } catch (error) {
                    updateProfileComplete(false);
                    await new Promise(resolve => setTimeout(resolve, 100));
                    navigate('/complete-profile');
                  }
                }}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Completar Perfil Ahora
              </button>
            ) : (
              <button
                onClick={async () => {
                  await new Promise(resolve => setTimeout(resolve, 100));
                  navigate('/');
                }}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Ir al Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ConfirmEmail;
