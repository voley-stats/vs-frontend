# 🚀 Guía de Deploy a Vercel - VoleyStats Frontend

Esta guía te ayudará a desplegar el frontend de VoleyStats en Vercel.

## 📋 Prerequisitos

- ✅ Cuenta en [Vercel](https://vercel.com)
- ✅ Repositorio del frontend en GitHub/GitLab/Bitbucket
- ✅ Backend desplegado (Railway, Render, u otro servicio)

## 🎯 Opción Recomendada: Frontend en Vercel + Backend en Railway/Render

Esta es la configuración recomendada según la documentación del backend:
- ✅ Frontend en Vercel (mejor rendimiento, CDN global)
- ✅ Backend en Railway/Render (mantiene toda la funcionalidad de video)

## 📝 Pasos para el Deploy

### 1. Preparar el Repositorio

El repositorio ya está preparado con:
- ✅ `vercel.json` configurado
- ✅ `.vercelignore` para optimizar el deploy
- ✅ Variables de entorno usando `VITE_API_URL`
- ✅ Sin URLs hardcodeadas

### 2. Conectar el Repositorio a Vercel

1. **Inicia sesión en Vercel**: [vercel.com](https://vercel.com)
2. **Ve a Dashboard** → **Add New Project**
3. **Importa tu repositorio** del frontend
4. **Configura el proyecto**:
   - **Framework Preset**: Vite (Vercel lo detectará automáticamente)
   - **Root Directory**: `.` (raíz del proyecto)
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `dist` (automático)
   - **Install Command**: `npm install` (automático)

### 3. Configurar Variables de Entorno

En la sección **Environment Variables** del proyecto en Vercel, agrega:

#### Variable Obligatoria:
```
VITE_API_URL=https://tu-backend.railway.app/api
```

**⚠️ IMPORTANTE**: Reemplaza `https://tu-backend.railway.app/api` con la URL real de tu backend.

#### Variables Opcionales:
```
VITE_APP_NAME=VoleyStats
VITE_APP_VERSION=1.0.0
VITE_ENABLE_NOTIFICATIONS=true
VITE_DEV_MODE=false
```

### 4. Configurar Entornos (Production, Preview, Development)

Puedes configurar diferentes valores para cada entorno:

**Production:**
```
VITE_API_URL=https://api.voleystats.com/api
VITE_DEV_MODE=false
```

**Preview** (para PRs):
```
VITE_API_URL=https://staging-api.voleystats.com/api
VITE_DEV_MODE=false
```

**Development** (opcional):
```
VITE_API_URL=http://localhost:3001/api
VITE_DEV_MODE=true
```

### 5. Actualizar CORS en el Backend

Asegúrate de que el backend permita el dominio de Vercel. En `src/server.js` del backend:

```javascript
origin: [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://tu-app.vercel.app', // ← Agrega tu dominio de Vercel
  'https://*.vercel.app'        // ← O permite todos los subdominios de Vercel
].filter(Boolean),
```

### 6. Hacer el Deploy

1. **Click en "Deploy"** en Vercel
2. Vercel construirá y desplegará automáticamente
3. Obtendrás una URL como: `https://tu-app.vercel.app`

### 7. Verificar el Deploy

1. Visita la URL generada por Vercel
2. Verifica que la aplicación cargue correctamente
3. Prueba la conexión con el backend (login, etc.)
4. Revisa los logs en Vercel si hay errores

## 🔧 Configuración Avanzada

### Dominio Personalizado

1. Ve a **Settings** → **Domains**
2. Agrega tu dominio personalizado
3. Sigue las instrucciones de DNS

### Variables de Entorno por Branch

Puedes configurar diferentes variables para diferentes branches:
- **Production**: branch `master` o `main`
- **Preview**: cualquier otro branch (crea preview deployments automáticos)

### Monitoreo y Analytics

Vercel incluye:
- ✅ Analytics de rendimiento
- ✅ Logs en tiempo real
- ✅ Métricas de uso

## 🐛 Solución de Problemas

### Error: "Failed to build"

**Solución:**
1. Revisa los logs de build en Vercel
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que `npm install` funcione correctamente localmente

### Error: "API connection failed"

**Solución:**
1. Verifica que `VITE_API_URL` esté configurada correctamente
2. Verifica que el backend esté funcionando
3. Verifica que CORS permita el dominio de Vercel

### Error: "404 on page refresh"

**Solución:**
Ya está resuelto con el `rewrites` en `vercel.json` que redirige todo a `index.html` para que React Router funcione correctamente.

### Error: "Environment variable not found"

**Solución:**
1. Verifica que las variables empiecen con `VITE_`
2. Reinicia el build después de agregar variables
3. Verifica que estén configuradas para el entorno correcto (Production/Preview/Development)

## 📊 Estructura del Proyecto

```
vs-frontend/
├── vercel.json          # Configuración de Vercel
├── .vercelignore        # Archivos a ignorar en deploy
├── vite.config.js       # Configuración de Vite
├── package.json         # Dependencias
├── dist/                # Build output (generado)
└── src/                 # Código fuente
```

## 🚀 Deploy Automático

Vercel hace deploy automático cuando:
- ✅ Haces push a la branch principal (production)
- ✅ Creas un Pull Request (preview deployment)
- ✅ Haces push a cualquier branch (preview deployment opcional)

## 📝 Checklist Final

Antes de hacer deploy, verifica:

- [ ] Backend está desplegado y funcionando
- [ ] `VITE_API_URL` apunta a la URL correcta del backend
- [ ] CORS del backend permite el dominio de Vercel
- [ ] Todas las variables de entorno están configuradas
- [ ] El build funciona localmente (`npm run build`)
- [ ] No hay errores en la consola del navegador

## 💡 Próximos Pasos

1. **Configurar dominio personalizado** (opcional)
2. **Configurar analytics** (Google Analytics, etc.)
3. **Configurar monitoreo de errores** (Sentry, etc.)
4. **Optimizar imágenes** (usar CDN si es necesario)

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vite en Vercel](https://vercel.com/docs/frameworks/vite)
- [Variables de Entorno en Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

---

**¡Listo para desplegar! 🎉**

Una vez que hayas configurado todo, simplemente conecta tu repositorio a Vercel y el deploy será automático.

