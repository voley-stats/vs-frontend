import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VideoUpload from './components/VideoUpload';
import MatchLibrary from './components/MatchLibrary';
import DetailedStats from './components/DetailedStats';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200">
        <div className="flex flex-col min-h-screen">
          <Header onLogout={handleLogout} />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<VideoUpload />} />
            <Route path="/library" element={<MatchLibrary />} />
            <Route path="/stats/:id" element={<DetailedStats />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
