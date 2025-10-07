# Guía de Configuración - VoleyStats Frontend

Esta guía te ayudará a configurar el proyecto VoleyStats Frontend en una nueva máquina.

## 🚀 Configuración Rápida

### 1. Prerrequisitos
- **Node.js 18+**: [Descargar aquí](https://nodejs.org/)
- **npm 9+** o **yarn 1.22+**
- **Git**: [Descargar aquí](https://git-scm.com/)

### 2. Clonar y Configurar

```bash
# Clonar el repositorio
git clone <repository-url>
cd vs-frontend

# Instalar dependencias
npm install

# Crear archivo de configuración
echo "VITE_API_URL=http://localhost:3001/api" > .env

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Configuración Detallada

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URL del backend API (OBLIGATORIO)
VITE_API_URL=http://localhost:3001/api

# Configuración de la aplicación
VITE_APP_NAME=VoleyStats
VITE_APP_VERSION=1.0.0

# Configuración opcional
VITE_ENABLE_NOTIFICATIONS=true
VITE_AUTH_DOMAIN=localhost
VITE_ANALYTICS_ID=

# Configuración de desarrollo
VITE_DEV_MODE=true
```

### ⚠️ Variables Críticas para Configurar

**1. VITE_API_URL (OBLIGATORIO)**
- **Desarrollo**: `http://localhost:3001/api`
- **Producción**: `https://tu-backend-domain.com/api`
- **Importante**: Sin esta variable, la aplicación no funcionará

**2. Configuraciones por Entorno**

**Desarrollo:**
```env
VITE_API_URL=http://localhost:3001/api
VITE_DEV_MODE=true
```

**Producción:**
```env
VITE_API_URL=https://api.voleystats.com/api
VITE_DEV_MODE=false
```

**3. URLs Hardcodeadas Corregidas**

✅ **Ya corregido**: La URL hardcodeada en `TeamManagement.jsx` ahora usa `VITE_API_URL`:
```javascript
// Antes (hardcodeado):
const response = await fetch('http://localhost:3001/api/categories', {

// Ahora (usando variable de entorno):
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const response = await fetch(`${API_URL}/categories`, {
```

**4. Archivo de Configuración Completo**

He creado `env.example` con todas las variables disponibles. Para configurar:

```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar con tus valores
nano .env
```

### Configuración del Backend

1. **Desarrollo local:**
   ```bash
   # El backend debe estar ejecutándose en http://localhost:3001
   # Configura VITE_API_URL=http://localhost:3001/api
   ```

2. **Producción:**
   ```bash
   # Configura la URL real de tu backend
   VITE_API_URL=https://your-backend-domain.com/api
   ```

### Scripts de Desarrollo

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Construir para producción
npm run preview         # Vista previa de la construcción

# Calidad de código
npm run lint            # Verificar código
npm run lint:fix        # Corregir errores automáticamente
npm run format          # Formatear código
npm run format:check    # Verificar formato

# Utilidades
npm run clean           # Limpiar archivos de build
npm run type-check      # Verificar tipos (si usas TypeScript)
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Limpiar cache y reinstalar
npm run clean
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"
```bash
# Cambiar puerto en vite.config.js
server: {
  port: 3001,  # Cambiar a otro puerto
}
```

### Error: "API connection failed"
1. Verifica que el backend esté ejecutándose
2. Revisa la URL en `VITE_API_URL`
3. Verifica que no haya problemas de CORS

### Error: "Build failed"
```bash
# Limpiar y reconstruir
npm run clean
npm run build
```

## 📁 Estructura de Archivos Importantes

```
vs-frontend/
├── .env                 # Variables de entorno (crear)
├── config.example.js    # Configuración de ejemplo
├── vite.config.js       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
├── package.json         # Dependencias y scripts
├── .eslintrc.js         # Configuración de ESLint
├── .prettierrc          # Configuración de Prettier
└── README.md            # Documentación principal
```

## 🔄 Flujo de Trabajo Recomendado

1. **Configurar entorno:**
   ```bash
   cp config.example.js config.js
   # Editar config.js con tus valores
   ```

2. **Desarrollo:**
   ```bash
   npm run dev
   # Abrir http://localhost:3000
   ```

3. **Antes de commit:**
   ```bash
   npm run lint:fix
   npm run format
   npm run build
   ```

4. **Deploy:**
   ```bash
   npm run build
   # Subir carpeta dist/ al servidor
   ```

## 📞 Soporte

Si tienes problemas:

1. Revisa esta guía
2. Verifica que todas las dependencias estén instaladas
3. Revisa los logs de la consola
4. Asegúrate de que el backend esté funcionando

## 🎯 Próximos Pasos

Una vez configurado:

1. Revisa los componentes en `src/components/`
2. Configura tu backend API
3. Personaliza los estilos en `tailwind.config.js`
4. Añade nuevas funcionalidades siguiendo la estructura existente
