# VoleyStats - Frontend

Una aplicación web moderna para el análisis inteligente de partidos de voleibol con un diseño elegante inspirado en los colores del deporte y funcionalidades interactivas.

## 🚀 Características

- **Diseño Moderno**: Interfaz oscura con colores personalizados y tipografía Space Grotesk
- **Responsive**: Adaptable a dispositivos móviles, tablets y desktop
- **Componentes Modulares**: Arquitectura basada en componentes React reutilizables
- **Estadísticas en Tiempo Real**: Visualización de métricas de partidos
- **Videos Destacados**: Galería de momentos clave del partido
- **Selección de Jugadores**: Análisis individual por jugador

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

### Header
- Logo y navegación principal
- Menú responsivo
- Perfil de usuario

### Sidebar
- Métricas generales del partido
- Estadísticas por jugador
- Selector de jugadores

### Charts
- Gráficos de puntos por set
- Visualización de errores
- Datos interactivos

### VideoGrid
- Galería de videos destacados
- Efectos hover
- Thumbnails responsivos

## 🎯 Funcionalidades

- **Tema Oscuro**: Diseño optimizado para análisis de datos
- **Navegación Intuitiva**: Menú claro y accesible
- **Datos Dinámicos**: Estadísticas actualizables
- **Responsive Design**: Adaptable a todos los dispositivos

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
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Charts.jsx
│   └── VideoGrid.jsx
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Desarrollo

### Estructura del Proyecto
```
src/
├── components/          # Componentes React
├── services/           # Servicios de API
├── contexts/           # Contextos de React
├── hooks/              # Hooks personalizados
├── assets/             # Recursos estáticos
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

### Configuración de Desarrollo

1. **Configurar el backend:**
   - Asegúrate de que el backend esté ejecutándose en `http://localhost:3001`
   - O configura `VITE_API_URL` en tu archivo `.env`

2. **Configurar el editor:**
   - Instala las extensiones de ESLint y Prettier
   - Configura el formato automático al guardar

3. **Debugging:**
   - Usa las herramientas de desarrollo de React
   - Revisa la consola del navegador para errores
   - Usa `console.log` para debugging temporal

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
