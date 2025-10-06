import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';
import VoleyStatsLogo from './VoleyStatsLogo';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Hacer scroll al inicio cuando se carga la página
  useScrollToTop();

  const faqData = [
    {
      category: 'getting-started',
      title: 'Primeros Pasos',
      questions: [
        {
          question: '¿Cómo me registro en VoleyStats?',
          answer: 'Para registrarte, haz clic en "Registrarse" en la página principal, completa el formulario con tu información y confirma tu email. Una vez confirmado, podrás acceder a todas las funcionalidades de tu plan.'
        },
        {
          question: '¿Qué necesito para comenzar a analizar partidos?',
          answer: 'Solo necesitas videos de partidos en formato MP4, MOV o AVI. Nuestra IA procesará automáticamente el video y extraerá las estadísticas principales del partido.'
        },
        {
          question: '¿Cuánto tiempo toma procesar un video?',
          answer: 'El tiempo de procesamiento depende de la duración del video. En promedio, un partido de 90 minutos se procesa en 5-10 minutos. Recibirás una notificación cuando esté listo.'
        }
      ]
    },
    {
      category: 'video-analysis',
      title: 'Análisis de Video',
      questions: [
        {
          question: '¿Qué formatos de video son compatibles?',
          answer: 'Aceptamos MP4, MOV, AVI, MKV y WebM. Para mejores resultados, recomendamos videos en resolución HD (720p) o superior.'
        },
        {
          question: '¿Puedo subir videos de cualquier duración?',
          answer: 'Sí, pero el tiempo de procesamiento aumenta con la duración. Para partidos completos, recomendamos dividir el video en sets para un análisis más detallado.'
        },
        {
          question: '¿Cómo funciona el análisis automático?',
          answer: 'Nuestra IA utiliza visión por computadora para identificar jugadores, seguimiento de la pelota, detección de acciones (saques, ataques, bloqueos) y cálculo automático de estadísticas.'
        }
      ]
    },
    {
      category: 'statistics',
      title: 'Estadísticas',
      questions: [
        {
          question: '¿Qué estadísticas puedo ver?',
          answer: 'Puntos, ataques, bloqueos, saques, recepciones, sets, errores, eficiencia de ataque, porcentaje de acierto y muchas más métricas detalladas por jugador y equipo.'
        },
        {
          question: '¿Puedo comparar estadísticas entre partidos?',
          answer: 'Sí, puedes comparar estadísticas entre diferentes partidos, jugadores y períodos de tiempo. También puedes ver tendencias y progresión a lo largo del tiempo.'
        },
        {
          question: '¿Cómo exporto mis estadísticas?',
          answer: 'Puedes exportar reportes en PDF, Excel o CSV desde la sección de estadísticas. Los reportes incluyen gráficos, tablas y análisis detallados.'
        }
      ]
    },
    {
      category: 'technical',
      title: 'Soporte Técnico',
      questions: [
        {
          question: '¿Qué hago si el video no se procesa correctamente?',
          answer: 'Verifica que el video esté en un formato compatible y que tenga buena calidad. Si el problema persiste, contacta a nuestro soporte técnico con el ID del video.'
        },
        {
          question: '¿Puedo usar VoleyStats en móvil?',
          answer: 'Sí, VoleyStats es completamente responsive y funciona en dispositivos móviles, tablets y computadoras. La app se adapta automáticamente al tamaño de pantalla.'
        },
        {
          question: '¿Cómo actualizo mi plan?',
          answer: 'Ve a Configuración > Plan y Billing, selecciona el nuevo plan y confirma el cambio. Los cambios se aplican inmediatamente y se prorratea el costo.'
        }
      ]
    }
  ];

  const filteredFAQs = faqData.filter(category => 
    selectedCategory === 'all' || category.category === selectedCategory
  ).map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-light dark:bg-black">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-4">
              <VoleyStatsLogo size="small" />
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Volver al Inicio
              </Link>
              <Link 
                to="/contact" 
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contacto
              </Link>
              <Link 
                to="/login" 
                className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Centro de Ayuda
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Encuentra respuestas a tus preguntas y aprende a usar VoleyStats
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en la ayuda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-black dark:text-white bg-gray-100 dark:bg-gray-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Todas
            </button>
            {faqData.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.category
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Intenta con otros términos de búsqueda o explora las categorías.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFAQs.map((category) => (
                <div key={category.category}>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Nuestro equipo de soporte está aquí para ayudarte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-light transition-colors"
            >
              Contactar Soporte
            </Link>
            <Link 
              to="/login" 
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Acceder a la Plataforma
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <VoleyStatsLogo size="small" />
            <p className="mt-4 text-slate-400">
              &copy; 2024 VoleyStats. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Componente para cada FAQ item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="font-medium text-slate-900 dark:text-white">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-slate-500 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default Help;
