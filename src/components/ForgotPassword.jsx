import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VoleyStatsLogo from './VoleyStatsLogo';
import { authService } from '../services/authService';
import { CheckIcon, ArrowLeftIcon } from './Icons';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'sent'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.forgotPassword(email);
      
      if (result.success) {
        setSuccess('Se ha enviado un enlace de recuperación a tu email');
        setStep('sent');
      }
    } catch (err) {
      setError(err.message || 'Error al enviar el enlace de recuperación');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    
    try {
      await authService.forgotPassword(email);
      setSuccess('Se ha reenviado el enlace de recuperación');
    } catch (err) {
      setError(err.message || 'Error al reenviar el enlace');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <div className="mx-auto mb-6">
              <VoleyStatsLogo size="login" />
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Revisa tu email
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckIcon className="w-8 h-8 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Email enviado
                </h3>
                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                  <p>
                    Hemos enviado un enlace de recuperación a <strong>{email}</strong>
                  </p>
                  <p className="mt-2">
                    Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Reenviando...' : 'Reenviar enlace'}
            </button>

            <div className="text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Volver al login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="max-w-lg w-full space-y-8 p-8">
        {/* Logo centrado independientemente */}
        <div className="flex justify-center items-center mb-16">
          <div className="flex justify-center items-center w-full">
            <VoleyStatsLogo size="login" />
          </div>
        </div>
        
        {/* Texto centrado independientemente */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Recupera tu contraseña
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="Ingresa tu email"
            />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </button>
          </div>

          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Volver al login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
