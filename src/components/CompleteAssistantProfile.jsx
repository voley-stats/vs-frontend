import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const CompleteAssistantProfile = () => {
  const { user, updateProfileComplete } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    terms_accepted: false
  });

  // Verificar si el usuario está logueado
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      console.log('Usuario no logueado, redirigiendo al login...');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validar contraseñas
      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        setLoading(false);
        return;
      }

      if (!formData.terms_accepted) {
        setError('Debe aceptar los términos y condiciones');
        setLoading(false);
        return;
      }

      // Actualizar contraseña del usuario (endpoint específico para invitados)
      const response = await fetch(`http://localhost:3001/api/profile/password/setup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          newPassword: formData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error actualizando contraseña');
      }

      setSuccess('Perfil completado exitosamente');
      
      // Marcar perfil como completo
      updateProfileComplete(true);
      
      setTimeout(() => {
        navigate('/assistant-dashboard');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Error completando perfil');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            Completar Perfil de Ayudante
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Configura tu contraseña y acepta los términos para continuar
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nueva Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Confirma tu contraseña"
              />
            </div>

            <div className="flex items-start">
              <input
                id="terms_accepted"
                name="terms_accepted"
                type="checkbox"
                checked={formData.terms_accepted}
                onChange={handleChange}
                required
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-600 rounded mt-1"
              />
              <label htmlFor="terms_accepted" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                Acepto los términos y condiciones de VoleyStats
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

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Completando...' : 'Completar Perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteAssistantProfile;
