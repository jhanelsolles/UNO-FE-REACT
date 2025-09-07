// src/components/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  User, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  Smartphone, 
  ShoppingCart, 
  GraduationCap,
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  LogOut,
  X,
  Calendar,
  Target,
  TrendingUp
} from 'lucide-react';

const StudentDashboard = ({ user, onNavigateHome, onLogout }) => {
  // Proyectos específicos del estudiante autenticado
  const [myProjects, setMyProjects] = useState([
    {
      id: 1,
      name: "Sistema E-commerce",
      progress: 75,
      status: "en-progreso",
      icon: ShoppingCart,
      description: "Plataforma de comercio electrónico con React y Node.js",
      createdAt: "2025-08-15",
      lastUpdate: "2025-09-01",
      tasks: [
        { id: 1, name: "Diseño de UI", completed: true },
        { id: 2, name: "Backend API", completed: true },
        { id: 3, name: "Integración de pagos", completed: false },
        { id: 4, name: "Testing", completed: false }
      ],
      priority: "alta",
      dueDate: "2025-12-15"
    },
    {
      id: 2,
      name: "App Móvil",
      progress: 100,
      status: "finalizado",
      icon: Smartphone,
      description: "Aplicación móvil para gestión de tareas",
      createdAt: "2025-07-10",
      lastUpdate: "2025-08-20",
      tasks: [
        { id: 1, name: "Prototipo", completed: true },
        { id: 2, name: "Desarrollo", completed: true },
        { id: 3, name: "Testing", completed: true },
        { id: 4, name: "Deploy", completed: true }
      ],
      priority: "media",
      dueDate: "2025-08-30"
    },
    {
      id: 3,
      name: "Sistema de Gestión",
      progress: 45,
      status: "en-progreso",
      icon: BarChart3,
      description: "Sistema de gestión académica",
      createdAt: "2025-08-20",
      lastUpdate: "2025-09-02",
      tasks: [
        { id: 1, name: "Análisis", completed: true },
        { id: 2, name: "Base de datos", completed: true },
        { id: 3, name: "Frontend", completed: false },
        { id: 4, name: "Integración", completed: false }
      ],
      priority: "media",
      dueDate: "2025-11-30"
    }
  ]);

  const [stats, setStats] = useState({
    enProgreso: 0,
    finalizados: 0,
    total: 0,
    avgProgress: 0
  });

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const enProgreso = myProjects.filter(p => p.status === "en-progreso").length;
    const finalizados = myProjects.filter(p => p.status === "finalizado").length;
    const avgProgress = myProjects.length > 0 
      ? Math.round(myProjects.reduce((sum, p) => sum + p.progress, 0) / myProjects.length)
      : 0;
    
    setStats({
      enProgreso,
      finalizados,
      total: myProjects.length,
      avgProgress
    });
  }, [myProjects]);

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getProgressTextColor = (progress) => {
    if (progress === 100) return "text-green-600";
    if (progress >= 75) return "text-blue-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-orange-600";
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'alta': return 'bg-red-100 text-red-700';
      case 'media': return 'bg-yellow-100 text-yellow-700';
      case 'baja': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      setMyProjects(myProjects.filter(p => p.id !== projectId));
    }
  };

  const handleUpdateProject = (updatedProject) => {
    setMyProjects(myProjects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    setEditingProject(null);
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      onLogout();
    }
  };

  const ProjectForm = ({ project = null, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: project?.name || '',
      description: project?.description || '',
      progress: project?.progress || 0,
      priority: project?.priority || 'media',
      dueDate: project?.dueDate || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (project) {
        // Editar proyecto existente
        const updatedProject = {
          ...project,
          ...formData,
          progress: parseInt(formData.progress),
          status: parseInt(formData.progress) === 100 ? 'finalizado' : 'en-progreso',
          lastUpdate: new Date().toISOString().split('T')[0]
        };
        onSubmit(updatedProject);
      } else {
        // Crear nuevo proyecto
        const newProject = {
          id: Date.now(),
          name: formData.name,
          description: formData.description,
          progress: parseInt(formData.progress),
          status: parseInt(formData.progress) === 100 ? 'finalizado' : 'en-progreso',
          icon: BarChart3,
          createdAt: new Date().toISOString().split('T')[0],
          lastUpdate: new Date().toISOString().split('T')[0],
          tasks: [],
          priority: formData.priority,
          dueDate: formData.dueDate
        };
        setMyProjects([...myProjects, newProject]);
        onCancel();
      }
      
      setFormData({ name: '', description: '', progress: 0, priority: 'media', dueDate: '' });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Proyecto
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Sistema E-commerce"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe tu proyecto..."
                rows="3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progreso (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({...formData, progress: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridad
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de entrega
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                {project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={onNavigateHome}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mis Proyectos
              </h1>
            </div>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user?.avatar || 'U'}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{user?.name || 'Usuario'}</div>
                  <div className="text-xs text-gray-600">{user?.role || 'Estudiante'}</div>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                  <div className="p-3 border-b">
                    <div className="text-sm font-medium text-gray-900">{user?.name || 'Usuario'}</div>
                    <div className="text-xs text-gray-600">{user?.email || 'usuario@example.com'}</div>
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
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">
                ¡Hola, {user?.name?.split(' ')[0] || 'Estudiante'}! 👋
              </h1>
              <p className="text-blue-100 mb-6 text-lg">
                Gestiona tus proyectos académicos, mantén un seguimiento de tu progreso y alcanza tus objetivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowProjectForm(true)}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Nuevo Proyecto</span>
                </button>
                <div className="text-blue-100 text-sm">
                  <p>📊 Progreso promedio: {stats.avgProgress}%</p>
                  <p>🎯 {stats.enProgreso} proyectos activos</p>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Mis Proyectos ({myProjects.length})</h2>
                <button 
                  onClick={() => setShowProjectForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo</span>
                </button>
              </div>
              
              {myProjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes proyectos aún</h3>
                  <p className="text-gray-600 mb-6">Crea tu primer proyecto académico para comenzar</p>
                  <button 
                    onClick={() => setShowProjectForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Crear Mi Primer Proyecto
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myProjects.map((project) => {
                    const IconComponent = project.icon;
                    const isOverdue = project.dueDate && new Date(project.dueDate) < new Date() && project.status !== 'finalizado';
                    
                    return (
                      <div key={project.id} className={`border rounded-xl p-4 hover:shadow-md transition-shadow ${
                        isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-100'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium text-gray-900">{project.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)}`}>
                                  {project.priority}
                                </span>
                                {isOverdue && (
                                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                                    Vencido
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{project.description}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <p className="text-xs text-gray-500">Creado: {project.createdAt}</p>
                                {project.dueDate && (
                                  <p className={`text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                                    📅 Entrega: {project.dueDate}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className={`text-sm font-medium ${getProgressTextColor(project.progress)}`}>
                                {project.progress}%
                              </div>
                              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
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
                              <button 
                                onClick={() => setEditingProject(project)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Editar proyecto"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteProject(project.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar proyecto"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* User Profile */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user?.avatar || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'Usuario'}</h3>
                  <p className="text-sm text-gray-600">{user?.role || 'Estudiante'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'usuario@example.com'}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowProjectForm(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Nuevo Proyecto +
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Mis Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.enProgreso}</div>
                    <div className="text-sm text-gray-600">En Progreso</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{stats.finalizados}</div>
                    <div className="text-sm text-gray-600">Completados</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{stats.avgProgress}%</div>
                    <div className="text-sm text-gray-600">Progreso Promedio</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600">Total: {stats.total} proyectos</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">Crear Proyecto</span>
                </button>
                
                <button
                  onClick={() => {
                    const inProgressProjects = myProjects.filter(p => p.status === 'en-progreso');
                    if (inProgressProjects.length > 0) {
                      setSelectedProject(inProgressProjects[0]);
                    }
                  }}
                  className="w-full flex items-center space-x-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  disabled={stats.enProgreso === 0}
                >
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">Ver Progreso</span>
                </button>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Próximas Entregas</h3>
              <div className="space-y-3">
                {myProjects
                  .filter(p => p.dueDate && p.status !== 'finalizado')
                  .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                  .slice(0, 3)
                  .map((project) => {
                    const isOverdue = new Date(project.dueDate) < new Date();
                    const daysLeft = Math.ceil((new Date(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div key={project.id} className={`p-3 rounded-lg border ${
                        isOverdue ? 'border-red-200 bg-red-50' : 
                        daysLeft <= 7 ? 'border-yellow-200 bg-yellow-50' : 
                        'border-gray-200 bg-gray-50'
                      }`}>
                        <p className="font-medium text-gray-900 text-sm">{project.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className={`text-xs ${
                            isOverdue ? 'text-red-600' : 
                            daysLeft <= 7 ? 'text-yellow-600' : 
                            'text-gray-600'
                          }`}>
                            {isOverdue ? 'Vencido' : 
                             daysLeft === 0 ? 'Hoy' :
                             daysLeft === 1 ? 'Mañana' :
                             `${daysLeft} días`}
                          </p>
                          <div className={`text-xs font-medium ${getProgressTextColor(project.progress)}`}>
                            {project.progress}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {myProjects.filter(p => p.dueDate && p.status !== 'finalizado').length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No hay entregas programadas
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectForm 
          onSubmit={() => {}}
          onCancel={() => setShowProjectForm(false)}
        />
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <ProjectForm 
          project={editingProject}
          onSubmit={handleUpdateProject}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedProject.name}</h3>
                <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedProject.priority)}`}>
                    Prioridad: {selectedProject.priority}
                  </span>
                  {selectedProject.dueDate && (
                    <span className="text-xs text-gray-500">
                      📅 Entrega: {selectedProject.dueDate}
                    </span>
                  )}
                </div>
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
                <span className={`font-medium ${getProgressTextColor(selectedProject.progress)}`}>
                  {selectedProject.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${getProgressColor(selectedProject.progress)}`}
                  style={{ width: `${selectedProject.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-sm font-medium text-gray-700">Creado:</span>
                <p className="text-sm text-gray-600">{selectedProject.createdAt}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Última actualización:</span>
                <p className="text-sm text-gray-600">{selectedProject.lastUpdate}</p>
              </div>
            </div>

            {selectedProject.tasks && selectedProject.tasks.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Tareas del Proyecto</h4>
                <div className="space-y-2">
                  {selectedProject.tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className={`w-4 h-4 rounded ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={task.completed ? 'text-green-700' : 'text-gray-700'}>
                        {task.name}
                      </span>
                      {task.completed && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setEditingProject(selectedProject);
                  setSelectedProject(null);
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </button>
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

export default StudentDashboard;