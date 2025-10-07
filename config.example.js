// Archivo de configuración de ejemplo para VoleyStats Frontend
// Copia este archivo como config.js y configura los valores según tu entorno

export const config = {
  // URL del backend API
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3001/api',
  
  // Configuración de la aplicación
  appName: process.env.VITE_APP_NAME || 'VoleyStats',
  appVersion: process.env.VITE_APP_VERSION || '1.0.0',
  
  // Configuración de autenticación
  authDomain: process.env.VITE_AUTH_DOMAIN || 'localhost',
  
  // Configuración de analytics
  analyticsId: process.env.VITE_ANALYTICS_ID || '',
  
  // Configuración de notificaciones
  enableNotifications: process.env.VITE_ENABLE_NOTIFICATIONS === 'true' || true,
  
  // Configuración de desarrollo
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Configuración de build
  buildPath: 'dist',
  
  // Configuración de la API
  apiTimeout: 10000, // 10 segundos
  maxRetries: 3,
  
  // Configuración de cache
  cacheTimeout: 300000, // 5 minutos
};

export default config;
