import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const TeamInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [invitation, setInvitation] = useState(null);
  const [invitationType, setInvitationType] = useState('new_user');
  
  // Estado para el flujo de cambio de contraseña
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const [acceptedUser, setAcceptedUser] = useState(null);
  
  // Datos del formulario inicial
  const [formData, setFormData] = useState({
    full_name: '',
    password: '',
    confirm_password: '',
    email: ''
  });
  
  // Datos del formulario de cambio de contraseña
  const [passwordChangeData, setPasswordChangeData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (token) {
      loadInvitation();
    }
  }, [token]);

  const loadInvitation = async () => {
    try {
      setLoading(true);
      
      if (!token) {
        setError('Token de invitación no encontrado');
        setLoading(false);
        return;
      }

      // Cargar información real de la invitación desde el backend
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/teams/invite/verify?token=${token}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error cargando invitación');
      }

      setInvitation(result.invitation);
      setInvitationType(result.invitationType || 'new_user');
    } catch (err) {
      setError(err.message || 'Error cargando invitación');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Solo validar contraseñas si es usuario nuevo y tiene confirm_password
      if (invitationType === 'new_user' && formData.confirm_password && formData.password !== formData.confirm_password) {
        setError('Las contraseñas no coinciden');
        setLoading(false);
        return;
      }

      // Validar campos requeridos
      if (invitationType === 'new_user') {
        if (!formData.email || !formData.full_name || !formData.password) {
          setError('Todos los campos son requeridos');
          setLoading(false);
          return;
        }
      }

      // Llamar a la API real para aceptar invitación
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/teams/invite/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          email: formData.email,
          full_name: formData.full_name,
          password: formData.password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error aceptando invitación');
      }
      
      // Verificar si requiere cambio de contraseña
      if (result.requiresPasswordChange && result.tempToken) {
        setRequiresPasswordChange(true);
        setTempToken(result.tempToken);
        setAcceptedUser(result.user);
        setSuccess('Invitación aceptada. Ahora configura tu contraseña personal.');
        return;
      }
      
      // Si no requiere cambio de contraseña (caso de usuario existente), redirigir directamente
      setSuccess('Invitación aceptada exitosamente. Redirigiendo...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error aceptando invitación');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validar contraseñas
      if (passwordChangeData.newPassword !== passwordChangeData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        setLoading(false);
        return;
      }

      if (passwordChangeData.newPassword.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        setLoading(false);
        return;
      }

      // Llamar al endpoint de setup de contraseña
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/profile/password/setup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}`
        },
        body: JSON.stringify({
          newPassword: passwordChangeData.newPassword
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error cambiando contraseña');
      }

      // Guardar token JWT permanente para login automático
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }

      setSuccess('Contraseña configurada exitosamente. Redirigiendo...');
      
      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        // Recargar la página para que el AuthContext detecte el nuevo token
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error cambiando contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    if (!window.confirm('¿Estás seguro de que quieres rechazar esta invitación?')) {
      return;
    }

    try {
      setLoading(true);
      // Simular rechazo de invitación (reemplazar con API real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Invitación rechazada');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Error rechazando invitación');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !invitation && !requiresPasswordChange) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-light dark:bg-black">
        <div className="text-center">
          <LoadingSpinner size="xl" className="mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando invitación...</p>
        </div>
      </div>
    );
  }

  if (error && !invitation && !requiresPasswordChange) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-light dark:bg-black">
        <div className="max-w-md w-full bg-white dark:bg-gray-dark rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Invitación Inválida
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error}
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Ir al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de cambio de contraseña
  if (requiresPasswordChange) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-light dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Configurar Contraseña
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Bienvenido, {acceptedUser?.full_name || acceptedUser?.username || 'Usuario'}. 
              Por favor configura una contraseña personal para tu cuenta.
            </p>
          </div>

          {/* Error/Success Messages */}
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

          {/* Formulario de cambio de contraseña */}
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="bg-white dark:bg-gray-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nueva Contraseña *
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    value={passwordChangeData.newPassword}
                    onChange={(e) => setPasswordChangeData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmar Nueva Contraseña *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={passwordChangeData.confirmPassword}
                    onChange={(e) => setPasswordChangeData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Confirma tu contraseña"
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
            >
              {loading ? 'Configurando...' : 'Configurar Contraseña'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Al configurar tu contraseña, serás redirigido automáticamente al dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla inicial de aceptación de invitación
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Invitación al Equipo
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Has sido invitado a unirte a un equipo en VOLEY STATS
          </p>
        </div>

        {/* Información de la invitación */}
        <div className="bg-white dark:bg-gray-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Detalles de la Invitación
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Equipo</label>
              <p className="text-gray-900 dark:text-white">{invitation?.team_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</label>
              <p className="text-gray-900 dark:text-white">{invitation?.team_role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Invitado por</label>
              <p className="text-gray-900 dark:text-white">{invitation?.inviter_name}</p>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
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

        {/* Formulario de aceptación */}
        <form onSubmit={handleAccept} className="space-y-6">
          {invitationType === 'new_user' ? (
            // Usuario nuevo - formulario completo
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.725-1.36 3.49 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Usuario Nuevo
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                      <p>Completa tu registro para unirte al equipo. Usa la contraseña temporal del email.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre Completo
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña Temporal (del email)
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Pega la contraseña temporal del email"
                />
              </div>
            </div>
          ) : (
            // Usuario existente - solo confirmación
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Usuario Existente
                    </h3>
                    <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <p>Ya tienes una cuenta en VoleyStats. Solo necesitas confirmar que deseas unirte al equipo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleDecline}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Rechazar'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
            >
              {loading ? 'Aceptando...' : 'Aceptar Invitación'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Al aceptar esta invitación, te unirás al equipo y podrás colaborar en el análisis de voleibol.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamInvitation;
