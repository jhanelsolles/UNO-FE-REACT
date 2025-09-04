import React, { useState } from "react";
import {
  BookOpen,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  User,
  Lock,
  Mail,
  GraduationCap,
  Target,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
  Star,
} from "lucide-react";

const HomePage = () => {
  const [isMobileMenuOpen] = useState(false);

  // Stats data
  const stats = [
    {
      icon: Users,
      label: "Estudiantes",
      value: "1",
      color: "blue",
    },
    {
      icon: BookOpen,
      label: "Proyectos Registrados",
      value: "2",
      color: "green",
    },
    {
      icon: CheckCircle,
      label: "Proyectos Finalizados",
      value: "2",
      color: "purple",
    },
  ];

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AcademicProjects
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#inicio"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Inicio
            </a>
            <a
              href="#estadisticas"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Estadísticas
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#inicio"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Inicio
              </a>
              <a
                href="#estadisticas"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Estadísticas
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HeroSection = () => (
    <section
      id="inicio"
      className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gestión de
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Proyectos
                </span>
                <br />
                Académicos
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Plataforma integral para la gestión, seguimiento y análisis de
                proyectos académicos. Conecta estudiantes, asesores y
                administradores en un ecosistema colaborativo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                Crear Proyecto
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fácil de Usar</p>
                  <p className="text-sm text-gray-600">Interfaz intuitiva</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Responsivo</p>
                  <p className="text-sm text-gray-600">
                    Todos los dispositivos
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">GraphQL</p>
                  <p className="text-sm text-gray-600">API moderna</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            +
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-t-lg mb-6"></div>
            {/* Mock Dashboard */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Huasace Daniel</p>
                  <p className="text-sm text-gray-500">
                    Estudiante de Ingeniería
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">3</p>
                  <p className="text-xs text-blue-600">Proyectos En Progreso</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">2</p>
                  <p className="text-xs text-green-600">Finalizados</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">Sistema E-commerce</p>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      75%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">App Móvil</p>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      100%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const StatsSection = () => (
    <section id="estadisticas" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proyetos En Cursos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "bg-blue-100 text-blue-600",
              green: "bg-green-100 text-green-600",
              purple: "bg-purple-100 text-purple-600",
              orange: "bg-orange-100 text-orange-600",
            };

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`inline-flex p-3 rounded-xl ${
                    colorClasses[stat.color]
                  } mb-4`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const FeaturesSection = () => <section></section>;

  const CTASection = () => <section></section>;

  const LoginPreview = () => <section></section>;

  const TechStack = () => <section></section>;

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">AcademicProjects</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transformando la gestión de proyectos académicos con tecnología
              moderna y diseño centrado en el usuario.
            </p>
            <div className="flex space-x-4">
              {[].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <Star className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400"></p>
            <div className="flex space-x-6 mt-4 md:mt-0"></div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <LoginPreview />
      <TechStack />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
