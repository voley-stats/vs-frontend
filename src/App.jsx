import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { FiltersProvider } from './contexts/FiltersContext';
import { useNavigationReset } from './hooks/useNavigationReset';
import useScrollToTop from './hooks/useScrollToTop';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import VideoUpload from './components/VideoUpload';
import MatchLibrary from './components/MatchLibrary';
import DetailedStats from './components/DetailedStats';
import AdminPanel from './components/AdminPanel';
import CompleteCoachProfile from './components/CompleteCoachProfile';
import CompleteAssistantProfile from './components/CompleteAssistantProfile';
import AssistantDashboard from './components/AssistantDashboard';
import ConfirmEmail from './components/ConfirmEmail';
import Settings from './components/Settings';
import TeamManagement from './components/TeamManagement';
import TeamInvitation from './components/TeamInvitation';
import UserProfilePage from './components/UserProfilePage';
import LandingPage from './components/LandingPage';
import Help from './components/Help';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Documentation from './components/Documentation';
import LoadingSpinner from './components/LoadingSpinner';

function AppContent() {
  const { user, loading, profileComplete } = useAuth();
  
  // Hook personalizado para manejar la navegación
  useNavigationReset(user, loading);
  
  // Hook para hacer scroll al inicio en cada cambio de ruta
  useScrollToTop();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <LoadingSpinner size="xl" className="mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
               <Route path="/confirm-email" element={<ConfirmEmail />} />
               <Route path="/team-invitation" element={<TeamInvitation />} />
               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/reset-password/:token" element={<ResetPassword />} />
               <Route path="/help" element={<Help />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/privacy" element={<Privacy />} />
               <Route path="/docs" element={<Documentation />} />
               <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Si el usuario está logueado pero no tiene perfil completo, redirigir según su rol
  if (user && !profileComplete) {
    if (user.role === 'assistant') {
      return (
        <Routes>
          <Route path="/complete-assistant-profile" element={<CompleteAssistantProfile />} />
          <Route path="*" element={<Navigate to="/complete-assistant-profile" replace />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/complete-profile" element={<CompleteCoachProfile />} />
          <Route path="*" element={<Navigate to="/complete-profile" replace />} />
        </Routes>
      );
    }
  }

  // Rutas diferenciadas por rol
  if (user?.role === 'assistant') {
    // Rutas para ayudantes
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<AssistantDashboard />} />
          <Route path="/assistant-dashboard" element={<AssistantDashboard />} />
          <Route path="/complete-assistant-profile" element={<CompleteAssistantProfile />} />
          <Route path="*" element={<Navigate to="/assistant-dashboard" replace />} />
        </Routes>
      </Layout>
    );
  } else if (user?.role === 'coach' || user?.role === 'admin') {
    // Rutas para entrenadores/administradores (coach = admin)
    return (
      <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<VideoUpload />} />
            <Route path="/library" element={<MatchLibrary />} />
            <Route path="/stats/:id" element={<DetailedStats />} />
            <Route path="/complete-profile" element={<CompleteCoachProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/teams" element={<TeamManagement />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    );
  } else {
    // Rutas para ayudantes/usuarios (assistant = user)
    return (
      <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<VideoUpload />} />
            <Route path="/library" element={<MatchLibrary />} />
            <Route path="/stats/:id" element={<DetailedStats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </div>
    );
  }
}

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <FiltersProvider>
          <Router>
            <AppContent />
          </Router>
        </FiltersProvider>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;
