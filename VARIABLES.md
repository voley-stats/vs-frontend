# 📋 Variables de Entorno - VoleyStats Frontend

## 🚨 Variables Críticas (OBLIGATORIAS)

### VITE_API_URL
- **Descripción**: URL del backend API
- **Desarrollo**: `http://localhost:3001/api`
- **Producción**: `https://tu-backend-domain.com/api`
- **Importante**: Sin esta variable, la aplicación NO funcionará
- **Uso**: Todas las llamadas a la API usan esta variable

## 📝 Variables de Configuración

### VITE_APP_NAME
- **Descripción**: Nombre de la aplicación
- **Valor por defecto**: `VoleyStats`
- **Uso**: Título de la aplicación

### VITE_APP_VERSION
- **Descripción**: Versión de la aplicación
- **Valor por defecto**: `1.0.0`
- **Uso**: Versión mostrada en la UI

### VITE_ENABLE_NOTIFICATIONS
- **Descripción**: Habilitar notificaciones
- **Valores**: `true` o `false`
- **Valor por defecto**: `true`

## 🔧 Variables de Desarrollo

### VITE_DEV_MODE
- **Descripción**: Modo de desarrollo
- **Valores**: `true` o `false`
- **Uso**: Habilitar funciones de debug

### VITE_DEBUG_MODE
- **Descripción**: Logs de debug
- **Valores**: `true` o `false`
- **Uso**: Mostrar logs adicionales en consola

## 🌐 Variables de Producción

### VITE_FRONTEND_URL
- **Descripción**: URL del frontend en producción
- **Ejemplo**: `https://voleystats.com`
- **Uso**: URLs absolutas en la aplicación

### VITE_CORS_ORIGIN
- **Descripción**: Origen permitido para CORS
- **Ejemplo**: `https://voleystats.com`
- **Uso**: Configuración de CORS

## 📊 Variables de Servicios Externos

### VITE_ANALYTICS_ID
- **Descripción**: ID de Google Analytics
- **Uso**: Tracking de usuarios
- **Opcional**: Sí

### VITE_EMAIL_SERVICE_URL
- **Descripción**: URL del servicio de email
- **Uso**: Envío de emails
- **Opcional**: Sí

### VITE_STORAGE_URL
- **Descripción**: URL del servicio de storage
- **Uso**: Almacenamiento de archivos
- **Opcional**: Sí

## 🔍 Variables Encontradas en el Código

### En `src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

### En `config.example.js`:
```javascript
apiUrl: process.env.VITE_API_URL || 'http://localhost:3001/api',
appName: process.env.VITE_APP_NAME || 'VoleyStats',
appVersion: process.env.VITE_APP_VERSION || '1.0.0',
authDomain: process.env.VITE_AUTH_DOMAIN || 'localhost',
analyticsId: process.env.VITE_ANALYTICS_ID || '',
enableNotifications: process.env.VITE_ENABLE_NOTIFICATIONS === 'true' || true,
```

### En `vite.config.js`:
```javascript
__APP_VERSION__: JSON.stringify(process.env.npm_package_version)
```

## ⚠️ Problemas Encontrados y Corregidos

### 1. URL Hardcodeada en TeamManagement.jsx
**Antes:**
```javascript
const response = await fetch('http://localhost:3001/api/categories', {
```

**Después:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const response = await fetch(`${API_URL}/categories`, {
```

## 📋 Checklist para Nueva PC

- [ ] Copiar `env.example` a `.env`
- [ ] Configurar `VITE_API_URL` con la URL correcta del backend
- [ ] Verificar que el backend esté ejecutándose
- [ ] Configurar variables de producción si es necesario
- [ ] Probar que la aplicación se conecte al backend
- [ ] Verificar que no haya URLs hardcodeadas

## 🚀 Comandos de Configuración

```bash
# 1. Copiar archivo de configuración
cp env.example .env

# 2. Editar variables
nano .env

# 3. Instalar dependencias
npm install

# 4. Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración por Entorno

### Desarrollo
```env
VITE_API_URL=http://localhost:3001/api
VITE_DEV_MODE=true
VITE_DEBUG_MODE=true
```

### Producción
```env
VITE_API_URL=https://api.voleystats.com/api
VITE_DEV_MODE=false
VITE_DEBUG_MODE=false
VITE_FRONTEND_URL=https://voleystats.com
```

## 📞 Soporte

Si tienes problemas con las variables:

1. Verifica que todas las variables empiecen con `VITE_`
2. Reinicia el servidor después de cambiar variables
3. Revisa la consola del navegador para errores
4. Asegúrate de que el backend esté funcionando
