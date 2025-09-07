// src/App.jsx - Con Sistema de Roles
import React, { useState, useEffect } from 'react';
import HomePage from "./components/HomePage";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'dashboard', 'login'
  const [user, setUser] = useState(null); // Usuario autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay sesión guardada al cargar la app
  useEffect(() => {
    const savedUser = localStorage.getItem('academicProjectsUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        // Si hay usuario guardado y está en home, llevarlo al dashboard
        if (currentView === 'home') {
          setCurrentView('dashboard');
        }
      } catch (error) {
        console.error('Error al recuperar datos del usuario:', error);
        localStorage.removeItem('academicProjectsUser');
      }
    }
  }, []);

  // Función para determinar si el usuario es administrador
  const isAdmin = (userData) => {
    return userData?.email === 'admin@university.edu' || 
           userData?.role === 'Administrador' ||
           userData?.name === 'Administrador';
  };

  // Función para manejar login exitoso
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Guardar en localStorage para persistir la sesión
    localStorage.setItem('academicProjectsUser', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  // Función para manejar logout
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('academicProjectsUser');
    setCurrentView('home');
  };

  // Función para navegar al dashboard (requiere autenticación)
  const navigateToDashboard = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  };

  // Función para navegar al login
  const navigateToLogin = () => {
    setCurrentView('login');
  };

  // Función para navegar al home
  const navigateToHome = () => {
    setCurrentView('home');
  };

  // Renderizar la vista actual
  const renderView = () => {
    switch(currentView) {
      case 'login':
        return (
          <Login 
            onLogin={handleLogin}
            onNavigateHome={navigateToHome}
          />
        );
        
      case 'dashboard':
        // Solo mostrar dashboard si está autenticado
        if (!isAuthenticated) {
          setCurrentView('login');
          return null;
        }
        
        // Mostrar dashboard según el rol del usuario
        if (isAdmin(user)) {
          return (
            <AdminDashboard 
              user={user}
              onNavigateHome={navigateToHome}
              onLogout={handleLogout}
            />
          );
        } else {
          return (
            <StudentDashboard 
              user={user}
              onNavigateHome={navigateToHome}
              onLogout={handleLogout}
            />
          );
        }
        
      default: // 'home'
        return (
          <HomePage 
            onNavigateDashboard={navigateToDashboard}
            onNavigateLogin={navigateToLogin}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
}

export default App;