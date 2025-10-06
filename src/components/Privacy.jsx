import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import VoleyStatsLogo from './VoleyStatsLogo';

const Privacy = () => {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Política de Privacidad
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          {/* Introducción */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Nuestro Compromiso con tu Privacidad
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              En Voley Stats, tu privacidad es nuestra prioridad. Esta política explica cómo recopilamos, 
              usamos y protegemos tu información personal y tus videos de entrenamiento.
            </p>
          </section>

          {/* Información que recopilamos */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              ¿Qué Información Recopilamos?
            </h2>
            
            <div className="grid gap-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  📧 Información de Cuenta
                </h3>
                <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• Nombre completo y email</li>
                  <li>• Información del club o equipo</li>
                  <li>• Preferencias de notificaciones</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  🎥 Videos de Entrenamiento
                </h3>
                <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• Videos que subes para análisis</li>
                  <li>• Metadatos del partido (fecha, equipos, torneo)</li>
                  <li>• Estadísticas generadas por nuestro sistema</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  📊 Datos de Uso
                </h3>
                <ul className="text-slate-600 dark:text-slate-400 space-y-2">
                  <li>• Cómo usas la plataforma</li>
                  <li>• Funciones más utilizadas</li>
                  <li>• Errores técnicos (para mejorar el servicio)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cómo usamos tu información */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              ¿Cómo Usamos tu Información?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  🎯 Análisis de Videos
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  Procesamos tus videos para generar estadísticas detalladas que te ayuden a mejorar el rendimiento de tu equipo.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                  🔒 Seguridad
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  Protegemos tus datos con encriptación de extremo a extremo y acceso restringido.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                  📈 Mejora del Servicio
                </h3>
                <p className="text-purple-800 dark:text-purple-200">
                  Usamos datos anónimos para mejorar nuestros algoritmos de análisis.
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
                  📧 Comunicación
                </h3>
                <p className="text-orange-800 dark:text-orange-200">
                  Te enviamos notificaciones sobre el progreso de tus análisis y actualizaciones importantes.
                </p>
              </div>
            </div>
          </section>

          {/* Protección de videos */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Protección de tus Videos
            </h2>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl text-primary">lock</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Privados por Defecto</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Solo tú puedes ver tus videos y análisis
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl text-primary">security</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Encriptación</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Todos los archivos están encriptados
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl text-primary">delete_forever</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Eliminación</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Puedes eliminar tus videos en cualquier momento
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tus derechos */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Tus Derechos
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="material-symbols-outlined text-primary mt-1">download</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Descargar tus Datos</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Puedes exportar todos tus datos en formato estándar
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="material-symbols-outlined text-primary mt-1">edit</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Corregir Información</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Actualiza o corrige cualquier información incorrecta
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="material-symbols-outlined text-primary mt-1">block</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Restringir Procesamiento</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Limita cómo procesamos tus datos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="material-symbols-outlined text-primary mt-1">delete_forever</span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Eliminar Cuenta</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Elimina tu cuenta y todos los datos asociados
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              Cookies y Tecnologías Similares
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Usamos cookies para mejorar tu experiencia y analizar el uso de la plataforma.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Cookies Esenciales</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Necesarias para el funcionamiento básico de la plataforma
                </p>
              </div>
              <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Cookies de Análisis</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Nos ayudan a entender cómo usas la plataforma
                </p>
              </div>
            </div>
          </section>

          {/* Contacto */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
              ¿Tienes Preguntas?
            </h2>
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, 
                no dudes en contactarnos:
              </p>
              <div className="space-y-2">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Email:</strong> privacidad@voleystats.com
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Teléfono:</strong> +1 (555) 123-4567
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Dirección:</strong> 123 Tech Street, Ciudad, País
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Esta política de privacidad puede actualizarse ocasionalmente. Te notificaremos sobre cambios significativos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
