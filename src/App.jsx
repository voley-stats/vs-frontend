import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { useNavigationReset } from './hooks/useNavigationReset';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VideoUpload from './components/VideoUpload';
import MatchLibrary from './components/MatchLibrary';
import DetailedStats from './components/DetailedStats';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const { user, loading } = useAuth();
  
  // Hook personalizado para manejar la navegación
  useNavigationReset(user, loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/library" element={<MatchLibrary />} />
          <Route path="/stats/:id" element={<DetailedStats />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <Router>
          <AppContent />
        </Router>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;
