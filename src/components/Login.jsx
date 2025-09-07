// src/components/Login.jsx - Con Registro Funcional
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  User, 
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const Login = ({ onLogin, onNavigateHome }) => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = registro
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'estudiante'
  });

  // Función para obtener usuarios guardados en localStorage
  const getStoredUsers = () => {
    try {
      const storedUsers = localStorage.getItem('academicProjectsUsers');
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      console.error('Error al obtener usuarios guardados:', error);
      return [];
    }
  };

  // Función para guardar usuarios en localStorage
  const saveUsers = (users) => {
    try {
      localStorage.setItem('academicProjectsUsers', JSON.stringify(users));
    } catch (error) {
      console.error('Error al guardar usuarios:', error);
    }
  };

  // Usuarios predeterminados del sistema
  const getDefaultUsers = () => [
    {
      id: 1,
      email: 'huasace@university.edu',
      password: '123456',
      name: 'Huasace Daniel',
      role: 'Estudiante de Ingeniería',
      avatar: 'HD',
      registrationDate: '2025-01-15',
      isDefault: true
    },
    {
      id: 2,
      email: 'admin@university.edu', 
      password: 'admin123',
      name: 'Administrador',
      role: 'Administrador',
      avatar: 'AD',
      registrationDate: '2024-12-01',
      isDefault: true
    }
  ];

  // Función para inicializar usuarios si no existen
  const initializeUsers = () => {
    const storedUsers = getStoredUsers();
    if (storedUsers.length === 0) {
      const defaultUsers = getDefaultUsers();
      saveUsers(defaultUsers);
      return defaultUsers;
    }
    return storedUsers;
  };

  // Obtener todos los usuarios (predeterminados + registrados)
  const getAllUsers = () => {
    return initializeUsers();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar errores al escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos requeridos');
      return false;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }

    if (!isLogin) {
      if (!formData.name || formData.name.length < 2) {
        setError('El nombre debe tener al menos 2 caracteres');
        return false;
      }
      
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return false;
      }
    }

    return true;
  };

  const generateUserAvatar = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'estudiante': 'Estudiante',
      'profesor': 'Profesor', 
      'admin': 'Administrador'
    };
    return roleMap[role] || 'Estudiante';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const allUsers = getAllUsers();

    if (isLogin) {
      // Proceso de Login
      const user = allUsers.find(
        u => u.email.toLowerCase() === formData.email.toLowerCase() && 
             u.password === formData.password
      );

      if (user) {
        setSuccess('¡Login exitoso! Redirigiendo...');
        setTimeout(() => {
          onLogin({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            registrationDate: user.registrationDate
          });
        }, 1500);
      } else {
        setError('Email o contraseña incorrectos');
      }
    } else {
      // Proceso de Registro
      const existingUser = allUsers.find(
        u => u.email.toLowerCase() === formData.email.toLowerCase()
      );
      
      if (existingUser) {
        setError('Ya existe una cuenta con este email');
      } else {
        // Crear nuevo usuario
        const newUserId = Math.max(...allUsers.map(u => u.id), 0) + 1;
        const roleDisplayName = getRoleDisplayName(formData.role);
        
        const newUser = {
          id: newUserId,
          email: formData.email.toLowerCase(),
          password: formData.password,
          name: formData.name,
          role: formData.role === 'admin' ? 'Administrador' : 
                formData.role === 'profesor' ? 'Profesor' : 
                `Estudiante de ${formData.role === 'estudiante' ? 'Ingeniería' : formData.role}`,
          avatar: generateUserAvatar(formData.name),
          registrationDate: new Date().toISOString().split('T')[0],
          isDefault: false
        };

        // Guardar el nuevo usuario
        const updatedUsers = [...allUsers, newUser];
        saveUsers(updatedUsers);

        setSuccess(`¡Registro exitoso! Bienvenido ${formData.name}. Iniciando sesión...`);
        
        // Auto-login después del registro
        setTimeout(() => {
          onLogin({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
            registrationDate: newUser.registrationDate
          });
        }, 2000);
      }
    }

    setLoading(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'estudiante'
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onNavigateHome}
            className="absolute top-6 left-6 p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AcademicProjects
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta nueva'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h2>
            {!isLogin && (
              <p className="text-sm text-gray-600">
                Completa todos los campos para crear tu cuenta
              </p>
            )}
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          {/* Demo Credentials - Solo mostrar en login */}
          {isLogin && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm font-medium mb-2">Credenciales de prueba:</p>
              <div className="text-blue-700 text-xs space-y-1">
                <div>👨‍🎓 <strong>Estudiante:</strong> huasace@university.edu / 123456</div>
                <div>👨‍💼 <strong>Admin:</strong> admin@university.edu / admin123</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only for registration */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Juan Pérez"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Role field - only for registration */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!isLogin}
                >
                  <option value="estudiante">Estudiante</option>
                  <option value="profesor">Profesor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            )}

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
              )}
            </div>

            {/* Confirm Password field - only for registration */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                </>
              ) : (
                isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                onClick={switchMode}
                className="ml-2 text-blue-600 font-medium hover:underline"
                disabled={loading}
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>

          {/* Forgot password - only for login */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 AcademicProjects. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default Login;