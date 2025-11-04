# VoleyStats - Frontend

Una aplicación web moderna para el análisis inteligente de partidos de voleibol con un diseño elegante inspirado en los colores del deporte y funcionalidades interactivas.

## 🚀 Características

- **Diseño Moderno**: Interfaz oscura con colores personalizados y tipografía Space Grotesk
- **Responsive**: Adaptable a dispositivos móviles, tablets y desktop
- **Componentes Modulares**: Arquitectura basada en componentes React reutilizables
- **Análisis Near Real Time**: Procesamiento y análisis automático de videos de partidos
- **Gestión de Equipos**: Sistema de invitaciones y gestión de ayudantes por categorías
- **Estadísticas Detalladas**: Visualización de eventos detectados, distribución de eventos y métricas de análisis
- **Autenticación Completa**: Sistema de registro, login, confirmación de email y recuperación de contraseña
- **Perfiles de Usuario**: Perfiles diferenciados para coaches y assistants
- **Configuración Personalizable**: Preferencias de tema, tamaño de fuente y notificaciones

## 🛠️ Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Material Symbols** - Iconografía moderna

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm 9+ o yarn 1.22+
- Git

### Configuración Inicial

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd vs-frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   # Copiar archivo de configuración de ejemplo
   cp config.example.js config.js
   
   # O crear archivo .env (recomendado)
   echo "VITE_API_URL=http://localhost:3001/api" > .env
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Construir para producción:**
   ```bash
   npm run build
   ```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# URL del backend API (OBLIGATORIO)
VITE_API_URL=http://localhost:3001/api

# Configuración de la aplicación
VITE_APP_NAME=VoleyStats
VITE_APP_VERSION=1.0.0

# Configuración opcional
VITE_ENABLE_NOTIFICATIONS=true
VITE_DEV_MODE=true
```

### ⚠️ Variables Críticas

**VITE_API_URL** es **OBLIGATORIA** - sin esta variable la aplicación no funcionará.

Para una configuración completa, copia `env.example` a `.env`:
```bash
cp env.example .env
```

### Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de la construcción
- `npm run lint` - Linting del código
- `npm run lint:fix` - Corregir errores de linting automáticamente
- `npm run format` - Formatear código con Prettier
- `npm run clean` - Limpiar archivos de build y cache

## 🎨 Componentes Principales

### Autenticación y Registro
- **Login**: Inicio de sesión con email y contraseña
- **Register**: Registro de nuevos usuarios (coaches)
- **ConfirmEmail**: Confirmación de email después del registro
- **ForgotPassword / ResetPassword**: Recuperación de contraseña
- **TeamInvitation**: Aceptación de invitaciones para assistants

### Dashboard y Navegación
- **Dashboard**: Vista de resumen con partidos recientes
- **Sidebar**: Navegación principal con filtros para partidos
- **Header**: Logo clickeable y perfil de usuario

### Gestión de Partidos
- **MatchLibrary**: Lista de partidos con filtros (fecha, equipo, temporada, estado)
- **DetailedStats**: Estadísticas detalladas de un partido con eventos detectados
- **VideoUpload**: Subida de videos para análisis (solo coaches)

### Gestión de Equipos
- **TeamManagement**: Gestión de ayudantes por categorías (solo coaches)
- **CompleteCoachProfile**: Completar perfil de entrenador con categorías
- **CompleteAssistantProfile**: Completar perfil de asistente

### Configuración
- **Settings**: Configuración de perfil, preferencias, privacidad y notificaciones
- **UserProfilePage**: Visualización y edición del perfil de usuario

## 🎯 Funcionalidades por Rol

### Coaches (Entrenadores)
- ✅ Subir videos de partidos
- ✅ Ver análisis detallados de partidos
- ✅ Gestionar equipos y categorías
- ✅ Invitar y gestionar ayudantes
- ✅ Ver estadísticas y eventos detectados
- ✅ Completar perfil con club e instituciones

### Assistants (Ayudantes)
- ✅ Ver lista de partidos asignados
- ✅ Ver análisis detallados de partidos
- ✅ Configurar preferencias personales
- ✅ Acceso limitado según permisos

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Paleta de Colores

- **Primary**: #FF7F00 (Naranja intenso del balón)
- **Primary Light**: #FFB300 (Amarillo anaranjado)
- **Background Light**: #f6f7f8 (Fondo claro)
- **Background Dark**: #3A3A3A (Gris oscuro elegante)
- **Accent**: #FF7F00 (Acento principal)

## 📂 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Auth/           # Componentes de autenticación
│   ├── Dashboard/      # Componentes del dashboard
│   ├── Match/          # Componentes de partidos
│   └── Settings/       # Componentes de configuración
├── services/           # Servicios de API
├── contexts/           # Contextos de React (Auth, Preferences, Filters)
├── hooks/              # Hooks personalizados
├── assets/             # Recursos estáticos (logos, imágenes)
├── App.jsx             # Componente principal con rutas
└── main.jsx            # Punto de entrada
```

## 🚀 Desarrollo

### Variables de Entorno Requeridas

La aplicación requiere configurar `VITE_API_URL` en un archivo `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

Para más detalles, consulta `SETUP.md`.

### Configuración de Desarrollo

1. **Configurar el backend:**
   - Asegúrate de que el backend esté ejecutándose en `http://localhost:3001`
   - Configura `VITE_API_URL` en tu archivo `.env` (ver `SETUP.md`)

2. **Configurar el editor:**
   - Instala las extensiones de ESLint y Prettier
   - Configura el formato automático al guardar

3. **Debugging:**
   - Usa las herramientas de desarrollo de React
   - Revisa la consola del navegador para errores
   - Verifica las variables de entorno con `import.meta.env.VITE_API_URL`

### Deploy

Para desplegar en Vercel, consulta `VERCEL_DEPLOY.md` para instrucciones detalladas.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
