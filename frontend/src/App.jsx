import React, { useState, useEffect } from 'react';
import { Header } from './pages1/Header.jsx';
import { Dashboard } from './pages1/Dashboard.jsx';
import { AlertsPanel } from './pages1/AlertsPanel.jsx';
// import { ResourceManagement } from './pages2/ResourceManagement.jsx';
// import { AIInsights } from './pages2/AIInsights.jsx';
// import { Reports } from './pages2/Reports.jsx';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <AlertsPanel />;
      case 'resources':
        return <ResourceManagement />;
      case 'ai-insights':
        return <AIInsights />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="min-h-[calc(100vh-80px)]">
        {renderCurrentPage()}
      </main>
    </div>
  );
}