import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import VoleyStatsLogo from './VoleyStatsLogo';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Comenzar', icon: 'play_arrow' },
    { id: 'upload-videos', title: 'Subir Videos', icon: 'cloud_upload' },
    { id: 'analyze-stats', title: 'Analizar Estadísticas', icon: 'analytics' },
    { id: 'team-management', title: 'Gestionar Equipos', icon: 'groups' },
    { id: 'best-practices', title: 'Mejores Prácticas', icon: 'star' },
    { id: 'faq', title: 'Preguntas Frecuentes', icon: 'help' }
  ];

  const renderGettingStarted = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          🚀 Bienvenido a Voley Stats
        </h3>
        <p className="text-blue-800 dark:text-blue-200">
          Voley Stats es la plataforma líder para análisis automático de voleibol. 
          Convierte tus videos de entrenamiento en estadísticas detalladas que te ayudarán a mejorar el rendimiento de tu equipo.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl text-primary">cloud_upload</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">1. Sube tu Video</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Carga videos de partidos o entrenamientos
          </p>
        </div>
        
        <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl text-primary">psychology</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">2. Análisis Automático</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Nuestro AI analiza automáticamente el video
          </p>
        </div>
        
        <div className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-2xl text-primary">analytics</span>
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">3. Obtén Estadísticas</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Recibe estadísticas detalladas y insights
          </p>
        </div>
      </div>
    </div>
  );

  const renderUploadVideos = () => (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          📹 Cómo Subir Videos Correctamente
        </h3>
        <p className="text-green-800 dark:text-green-200">
          Para obtener los mejores resultados, sigue estas recomendaciones al subir tus videos.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">📋 Requisitos del Video</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>• <strong>Formato:</strong> MP4, AVI, MOV, MKV</li>
            <li>• <strong>Duración:</strong> Entre 5 minutos y 2 horas</li>
            <li>• <strong>Calidad:</strong> Mínimo 720p recomendado</li>
            <li>• <strong>Tamaño:</strong> Máximo 2GB por video</li>
          </ul>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">🎯 Mejores Prácticas de Grabación</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>• <strong>Ángulo:</strong> Vista lateral o diagonal de la cancha</li>
            <li>• <strong>Estabilidad:</strong> Usa trípode o estabilizador</li>
            <li>• <strong>Iluminación:</strong> Buena iluminación, evita contraluces</li>
            <li>• <strong>Enfoque:</strong> Mantén toda la cancha en foco</li>
          </ul>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">📝 Información del Partido</h4>
          <p className="text-slate-600 dark:text-slate-400 mb-3">
            Completa todos los campos para obtener análisis más precisos:
          </p>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>• <strong>Fecha del partido:</strong> Para organizar cronológicamente</li>
            <li>• <strong>Equipos:</strong> Nombre de ambos equipos</li>
            <li>• <strong>Torneo/Temporada:</strong> Contexto del partido</li>
            <li>• <strong>Categoría:</strong> División y género del equipo</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAnalyzeStats = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          📊 Entendiendo las Estadísticas
        </h3>
        <p className="text-purple-800 dark:text-purple-200">
          Aprende a interpretar y usar las estadísticas generadas por nuestro sistema.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">🏐 Estadísticas de Ataque</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Efectividad de Ataque</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Porcentaje de ataques exitosos vs fallidos
              </p>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Zonas de Ataque</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Distribución de ataques por zona de la cancha
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">🛡️ Estadísticas de Defensa</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Recepción</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Calidad de recepciones y distribución
              </p>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Bloqueo</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Efectividad del bloqueo y posicionamiento
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">📈 Métricas de Rendimiento</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Puntos por Set</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Evolución del marcador por set
              </p>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Ritmo del Juego</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Velocidad y dinámica del partido
              </p>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Errores</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Análisis de errores y oportunidades
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamManagement = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          👥 Gestión de Equipos y Categorías
        </h3>
        <p className="text-orange-800 dark:text-orange-200">
          Organiza tu club con diferentes categorías y gestiona el acceso de tu equipo.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">🏢 Configuración del Club</h4>
          <ol className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>1. <strong>Completa tu perfil de coach</strong> con información del club</li>
            <li>2. <strong>Crea categorías</strong> (ej: "Primera División Femenino")</li>
            <li>3. <strong>Invita miembros</strong> a cada categoría</li>
            <li>4. <strong>Asigna roles</strong> (asistente, analista, etc.)</li>
          </ol>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">👤 Roles y Permisos</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Coach</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Acceso completo a todas las funciones</li>
                <li>• Gestión de categorías y miembros</li>
                <li>• Análisis de todos los partidos</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Asistente</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Acceso a categorías asignadas</li>
                <li>• Subir videos y ver análisis</li>
                <li>• Gestión limitada</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">📧 Sistema de Invitaciones</h4>
          <ol className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>1. <strong>Envía invitaciones</strong> por email a nuevos miembros</li>
            <li>2. <strong>Los invitados</strong> reciben un enlace para registrarse</li>
            <li>3. <strong>Auto-asignación</strong> a la categoría correspondiente</li>
            <li>4. <strong>Acceso inmediato</strong> una vez registrados</li>
          </ol>
        </div>
      </div>
    </div>
  );

  const renderBestPractices = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          ⭐ Mejores Prácticas para Entrenadores
        </h3>
        <p className="text-yellow-800 dark:text-yellow-200">
          Consejos profesionales para maximizar el valor de Voley Stats en tu entrenamiento.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">📅 Planificación de Análisis</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>• <strong>Analiza partidos clave</strong> inmediatamente después del juego</li>
            <li>• <strong>Compara rendimiento</strong> entre diferentes partidos</li>
            <li>• <strong>Identifica patrones</strong> a lo largo de la temporada</li>
            <li>• <strong>Documenta mejoras</strong> y áreas de trabajo</li>
          </ul>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">🎯 Enfoque en Métricas Clave</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Para Ataque</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Efectividad por zona</li>
                <li>• Tiempo de reacción</li>
                <li>• Variedad de ataques</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Para Defensa</h5>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Posicionamiento</li>
                <li>• Tiempo de reacción</li>
                <li>• Cobertura de zona</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">👥 Trabajo en Equipo</h4>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li>• <strong>Comparte análisis</strong> con tu equipo técnico</li>
            <li>• <strong>Involucra a los jugadores</strong> en la revisión de estadísticas</li>
            <li>• <strong>Establece objetivos</strong> basados en datos</li>
            <li>• <strong>Celebra mejoras</strong> con evidencia concreta</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
          ❓ Preguntas Frecuentes
        </h3>
        <p className="text-indigo-800 dark:text-indigo-200">
          Respuestas a las preguntas más comunes sobre Voley Stats.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">¿Cuánto tiempo toma el análisis de un video?</h4>
          <p className="text-slate-600 dark:text-slate-400">
            El tiempo de análisis depende de la duración del video. Un partido de 1 hora típicamente toma entre 15-30 minutos para procesar completamente.
          </p>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">¿Puedo analizar videos de entrenamientos?</h4>
          <p className="text-slate-600 dark:text-slate-400">
            Sí, nuestro sistema funciona tanto con partidos oficiales como con entrenamientos. Solo asegúrate de que el video muestre claramente la cancha completa.
          </p>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">¿Mis videos son privados?</h4>
          <p className="text-slate-600 dark:text-slate-400">
            Absolutamente. Todos tus videos son privados por defecto. Solo tú y los miembros de tu equipo (según permisos) pueden acceder a ellos.
          </p>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">¿Puedo exportar las estadísticas?</h4>
          <p className="text-slate-600 dark:text-slate-400">
            Sí, puedes exportar todas las estadísticas en formato CSV o PDF para usar en presentaciones o análisis adicionales.
          </p>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">¿Qué pasa si el análisis no es preciso?</h4>
          <p className="text-slate-600 dark:text-slate-400">
            Nuestro sistema mejora constantemente. Si encuentras imprecisiones, puedes reportarlas y nuestro equipo las revisará para futuras mejoras.
          </p>
        </div>

        <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">¿Hay límite en la cantidad de videos?</h4>
          <p className="text-slate-600 dark:text-slate-400">
            Los planes incluyen diferentes límites de almacenamiento. Puedes consultar los detalles en la sección de precios o contactar a soporte.
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return renderGettingStarted();
      case 'upload-videos':
        return renderUploadVideos();
      case 'analyze-stats':
        return renderAnalyzeStats();
      case 'team-management':
        return renderTeamManagement();
      case 'best-practices':
        return renderBestPractices();
      case 'faq':
        return renderFAQ();
      default:
        return renderGettingStarted();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/">
                <VoleyStatsLogo size="small" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="mb-8">
                <BackButton to="/" className="mb-4" />
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Documentación
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Guía completa para usar Voley Stats
                </p>
              </div>

              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {section.icon}
                    </span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
