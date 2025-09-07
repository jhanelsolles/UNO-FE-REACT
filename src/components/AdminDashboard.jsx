import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  GraduationCap,
  ArrowLeft,
  Trash2,
  Eye,
  LogOut,
  X,
  Shield,
  UserCheck,
  UserX,
  Search
} from 'lucide-react';

const AdminDashboard = ({ user, onNavigateHome, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [allProjects] = useState([
    {
      id: 1,
      name: "Sistema E-commerce",
      progress: 75,
      status: "en-progreso",
      owner: "Huasace Daniel",
      ownerId: 1,
      description: "Plataforma de comercio electrónico",
      createdAt: "2025-08-15",
      lastUpdate: "2025-09-01"
    },
    {
      id: 2,
      name: "App Móvil",
      progress: 100,
      status: "finalizado",
      owner: "Huasace Daniel", 
      ownerId: 1,
      description: "Aplicación móvil para gestión de tareas",
      createdAt: "2025-07-10",
      lastUpdate: "2025-08-20"
    }
  ]);

  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0
  });

  const getStoredUsers = () => {
    try {
      const storedUsers = localStorage.getItem('academicProjectsUsers');
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  };

  const saveUsers = (updatedUsers) => {
    try {
      localStorage.setItem('academicProjectsUsers', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error al guardar usuarios:', error);
    }
  };

  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = getStoredUsers();
      const formattedUsers = storedUsers.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: 'activo',
        avatar: u.avatar,
        registrationDate: u.registrationDate,
        projectsCount: u.id === 1 ? 3 : Math.floor(Math.random() * 3)
      }));
      setUsers(formattedUsers);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const activeUsers = users.filter(u => u.status === 'activo').length;
    const completedProjects = allProjects.filter(p => p.status === 'finalizado').length;
    const inProgressProjects = allProjects.filter(p => p.status === 'en-progreso').length;
    
    setStats({
      totalUsers: users.length,
      activeUsers,
      totalProjects: allProjects.length,
      completedProjects,
      inProgressProjects
    });
  }, [users, allProjects]);

  const handleDeleteUser = (userId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      const storedUsers = getStoredUsers();
      const updatedUsers = storedUsers.filter(u => u.id !== userId);
      saveUsers(updatedUsers);
      
      setUsers(users.filter(u => u.id !== userId));
      
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
    }
  };

  const handleToggleUserStatus = (userId) => {
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'activo' ? 'inactivo' : 'activo' }
        : u
    );
    setUsers(updatedUsers);
    
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(updatedUsers.find(u => u.id === userId));
    }
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      onLogout();
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateHome}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Panel de Administrador
              </h1>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'dashboard' 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('users')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'users' 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Usuarios ({users.length})
                </button>
                <button
                  onClick={() => setCurrentView('projects')}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'projects' 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Proyectos ({allProjects.length})
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {user?.avatar || 'A'}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{user?.name || 'Administrador'}</div>
                    <div className="text-xs text-gray-600">Administrador</div>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                    <div className="p-3 border-b">
                      <div className="text-sm font-medium text-gray-900">{user?.name || 'Administrador'}</div>
                      <div className="text-xs text-gray-600">{user?.email || 'admin@university.edu'}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    <p className="text-gray-600">Total Usuarios</p>
                    <p className="text-sm text-green-600">{stats.activeUsers} activos</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                    <p className="text-gray-600">Total Proyectos</p>
                    <p className="text-sm text-blue-600">{stats.inProgressProjects} en progreso</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
                    <p className="text-gray-600">Completados</p>
                    <p className="text-sm text-purple-600">
                      {Math.round((stats.completedProjects / Math.max(stats.totalProjects, 1)) * 100)}% del total
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.inProgressProjects}</p>
                    <p className="text-gray-600">En Progreso</p>
                    <p className="text-sm text-orange-600">
                      {Math.round((stats.inProgressProjects / Math.max(stats.totalProjects, 1)) * 100)}% del total
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usuarios Recientes</h3>
                <div className="space-y-3">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.role}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'activo' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No hay usuarios registrados</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Proyectos Recientes</h3>
                <div className="space-y-3">
                  {allProjects.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{project.name}</p>
                        <p className="text-sm text-gray-600">Por: {project.owner}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">
                          {project.progress}%
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="h-1 rounded-full bg-blue-600"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users View */}
        {currentView === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Buscar usuarios por nombre o email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Todos</option>
                  <option value="activo">Activos</option>
                  <option value="inactivo">Inactivos</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Gestión de Usuarios ({filteredUsers.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((userItem) => (
                  <div key={userItem.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {userItem.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{userItem.name}</h4>
                          <p className="text-sm text-gray-600">{userItem.email}</p>
                          <p className="text-xs text-gray-500">{userItem.role}</p>
                          <p className="text-xs text-gray-500">Registro: {userItem.registrationDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            userItem.status === 'activo' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {userItem.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{userItem.projectsCount} proyectos</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedUser(userItem)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(userItem.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              userItem.status === 'activo'
                                ? 'text-red-600 hover:bg-red-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={userItem.status === 'activo' ? 'Desactivar' : 'Activar'}
                          >
                            {userItem.status === 'activo' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(userItem.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron usuarios</h3>
                    <p className="text-gray-600">Intenta cambiar los filtros de búsqueda</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Projects View */}
        {currentView === 'projects' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Buscar proyectos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Todos</option>
                  <option value="en-progreso">En Progreso</option>
                  <option value="finalizado">Finalizados</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Gestión de Proyectos ({filteredProjects.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <p className="text-xs text-gray-500">Por: {project.owner}</p>
                          <p className="text-xs text-gray-500">Creado: {project.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-blue-600">
                            {project.progress}%
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 rounded-full bg-blue-600"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-900">Detalles del Usuario</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <p className="text-sm text-gray-500">{selectedUser.role}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <p>
                  <span className="font-medium">Estado:</span> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    selectedUser.status === 'activo' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedUser.status}
                  </span>
                </p>
                <p><span className="font-medium">Fecha de registro:</span> {selectedUser.registrationDate}</p>
                <p><span className="font-medium">Proyectos:</span> {selectedUser.projectsCount}</p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => handleToggleUserStatus(selectedUser.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    selectedUser.status === 'activo'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {selectedUser.status === 'activo' ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => {
                    handleDeleteUser(selectedUser.id);
                    setSelectedUser(null);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedProject.name}</h3>
                <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                <p className="text-sm text-gray-500 mt-1">Por: {selectedProject.owner}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Progreso General</span>
                <span className="font-medium text-blue-600">
                  {selectedProject.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-blue-600"
                  style={{ width: `${selectedProject.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm font-medium text-gray-700">Fecha de creación:</span>
                <p className="text-sm text-gray-600">{selectedProject.createdAt}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Última actualización:</span>
                <p className="text-sm text-gray-600">{selectedProject.lastUpdate}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Estado:</span>
                <p className={`text-sm font-medium ${
                  selectedProject.status === 'finalizado' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {selectedProject.status === 'finalizado' ? 'Finalizado' : 'En Progreso'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">ID del proyecto:</span>
                <p className="text-sm text-gray-600">{selectedProject.id}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close menus */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;