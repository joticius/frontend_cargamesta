# frontend_cargamesta

CARGAMESTA - FRONTEND
====================

Sistema Web de Control de Rutas y Transporte de Carga
Interfaz desarrollada con HTML5, CSS3 y JavaScript Vanilla

REQUISITOS PREVIOS
==================

Instalar antes de comenzar:

1. Navegador moderno (Chrome, Firefox, Safari o Edge)
   Actualizar a la versión más reciente

2. VS Code (para desarrollo)
   Descargar: https://code.visualstudio.com/

3. Git (control de versiones)
   Descargar: https://git-scm.com/downloads
   Verificar: git --version

4. Extensión Live Server en VS Code
   En VS Code: Ctrl+Shift+X
   Buscar: Live Server
   Instalar: Ritwick Dey

5. Backend corriendo (en paralelo)
   Ver README_BACKEND.md para instrucciones


INSTALACIÓN DEL PROYECTO
=========================

Paso 1: Clonar o descargar el repositorio
------------------------------------------

git clone https://github.com/tu-usuario/frontend_cargamesta.git
cd frontend_cargamesta

Paso 2: Verificar estructura de carpetas
-----------------------------------------

frontend_cargamesta/
├── Css/
│   └── estilos.css         (estilos principales)
├── Js/
│   ├── auth.js             (funciones de autenticación)
│   ├── conductores.js      (gestión de conductores)
│   ├── vehiculos.js        (gestión de vehículos)
│   ├── rutas.js            (gestión de rutas)
│   ├── viajes.js           (gestión de viajes)
│   └── utils.js            (funciones auxiliares)
├── Pages/
│   ├── login.html          (página de login)
│   ├── conductores.html    (módulo conductores)
│   ├── vehiculos.html      (módulo vehículos)
│   ├── rutas.html          (módulo rutas)
│   └── viajes.html         (módulo viajes)
├── assets/
│   └── logo_cargamesta.png (logo de la empresa)
├── index.html              (página principal)
├── .gitignore              (archivos a ignorar)
└── README.md               (este archivo)

Paso 3: Configurar URLs de API
-------------------------------

Abrir Js/auth.js y verificar/actualizar:

const API_AUTH = "http://localhost:8000";
const API_CONDUCTORES = "http://localhost:8001";
const API_VEHICULOS = "http://localhost:8002";
const API_RUTAS = "http://localhost:8003";
const API_VIAJES = "http://localhost:8004";

Asegurarse de que coincida con los puertos del backend.


EJECUTAR EL PROYECTO
====================

Opción 1: Usar Live Server en VS Code (RECOMENDADO)
----------------------------------------------------

1. Abrir la carpeta frontend_cargamesta en VS Code
2. Click derecho en index.html
3. Seleccionar "Open with Live Server"
4. Se abrirá automáticamente en http://localhost:5500

El navegador se recargará automáticamente cuando guardes cambios.

Opción 2: Usar PHP Built-in Server
-----------------------------------

En la carpeta frontend_cargamesta:

php -S localhost:3000

Acceder a: http://localhost:3000

Opción 3: Usar Python SimpleHTTPServer
---------------------------------------

En la carpeta frontend_cargamesta:

Python 3:
python -m http.server 3000

Python 2:
python -m SimpleHTTPServer 3000

Acceder a: http://localhost:3000

Opción 4: Servidor HTTP-Server (global)
----------------------------------------

Instalar globalmente:
npm install -g http-server

Ejecutar:
http-server . -p 3000

Acceder a: http://localhost:3000


ESTRUCTURA DE ARCHIVOS EXPLICADA
=================================

index.html
----------
- Página principal de login
- Redirige a dashboard después de autenticación
- Sin CSS inline (usar archivo externo)

Js/
---

auth.js
  - Funciones: login(), logout(), validateToken()
  - Almacena token en localStorage
  - Maneja redirecciones después de login
  - Verifica sesión en cada carga

utils.js
  - Funciones comunes reutilizables
  - fetch() helpers
  - Manejo de errores
  - Formateo de datos

conductores.js, vehiculos.js, rutas.js, viajes.js
  - CRUD para cada módulo
  - Funciones: crear(), listar(), editar(), eliminar()
  - Actualización dinámica de tablas
  - Validaciones en cliente

Css/
----

estilos.css
  - Variables CSS para colores de CargamEsta (rojo, negro, blanco)
  - Flexbox/Grid para layout responsive
  - Sin CSS inline
  - Mobile-first approach
  - Estados visuales (hover, focus, active)

assets/
-------
  - Logo PNG de CargamEsta
  - Colores corporativos: Rojo #C1272D, Negro, Blanco


FLUJO DE AUTENTICACIÓN
======================

1. Usuario abre index.html
2. Ingresa usuario y contraseña
3. Click en "Iniciar sesión"
4. JavaScript hace POST a http://localhost:8000/login
5. Backend devuelve token si credenciales son correctas
6. Token se guarda en localStorage
7. Redirige a dashboard principal
8. En cada petición API, se incluye el token en headers

Logout:
1. Usuario hace click en "Cerrar sesión"
2. Token se elimina de localStorage
3. Redirige a login

Validación de sesión:
1. Al cargar cualquier página, verifica si existe token
2. Si no existe, redirige a login
3. Si existe, verifica con backend que sea válido


LLAMADAS A API DESDE JAVASCRIPT
================================

Ejemplo básico:

fetch("http://localhost:8001/conductores", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  }
})
.then(response => response.json())
.then(data => {
  if(data.success) {
    console.log(data.data);
  } else {
    alert(data.message);
  }
})
.catch(error => console.error("Error:", error));

Para POST (crear):

fetch("http://localhost:8001/conductores", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
  },
  body: JSON.stringify({
    nombres: "Juan",
    apellidos: "Pérez",
    documento: "1234567890",
    telefono: "3001234567",
    correo: "juan@mail.com",
    numero_licencia: "LIC123",
    categoria_licencia: "C2",
    fecha_vencimiento_licencia: "2027-06-04"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));


ALMACENAMIENTO LOCAL (localStorage)
====================================

Guardar token:
localStorage.setItem("token", "tu_token_aqui");

Obtener token:
const token = localStorage.getItem("token");

Eliminar token:
localStorage.removeItem("token");

Verificar si existe:
if(localStorage.getItem("token")) {
  console.log("Usuario autenticado");
}

El token persiste incluso después de cerrar el navegador.


DISEÑO RESPONSIVE
=================

El CSS debe funcionar en:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

Usar media queries:
@media (max-width: 768px) {
  /* estilos para tablet */
}

@media (max-width: 480px) {
  /* estilos para mobile */
}


VALIDACIÓN DE FORMULARIOS
==========================

En cliente (JavaScript antes de enviar):

function validarConductor(datos) {
  if(!datos.nombres || datos.nombres.trim() === "") {
    alert("El nombre es requerido");
    return false;
  }
  if(!datos.documento || datos.documento.trim() === "") {
    alert("El documento es requerido");
    return false;
  }
  // más validaciones...
  return true;
}

No confíes completamente en validación cliente.
El backend también debe validar.


MENSAJES DE ERROR Y ÉXITO
==========================

Mostrar notificación al usuario:

function mostrarMensaje(texto, tipo) {
  // tipo: "success", "error", "warning", "info"
  const div = document.createElement("div");
  div.className = `alerta alerta-${tipo}`;
  div.textContent = texto;
  document.body.insertBefore(div, document.body.firstChild);
  
  setTimeout(() => div.remove(), 4000);
}

Uso:
mostrarMensaje("Conductor creado exitosamente", "success");
mostrarMensaje("Error al crear conductor", "error");


VARIABLES GLOBALES
==================

Guardar en archivo utils.js o al inicio de auth.js:

const API_BASE = "http://localhost";
const API_AUTH = API_BASE + ":8000";
const API_CONDUCTORES = API_BASE + ":8001";
// etc...

Así es más fácil cambiar URLs en el futuro.


ESTRUCTURA DE RESPUESTAS API ESPERADAS
========================================

Success (200):
{
  "success": true,
  "message": "Operación exitosa",
  "data": { /* datos */ }
}

Error (400, 401, 500):
{
  "success": false,
  "message": "Descripción del error",
  "error": "tipo_error"
}


TROUBLESHOOTING
===============

Problema: CORS error en consola
Solución: Backend debe permitir CORS
         Header en respuesta: Access-Control-Allow-Origin: *

Problema: "Archivo no encontrado" 404
Solución: Verificar rutas relativas de archivos
         Usar rutas relativas correctas (./Js/, ./Css/)

Problema: Token inválido al recargar página
Solución: Token expiró (normal)
         Usuario debe hacer login nuevamente

Problema: Página no responde después de login
Solución: Backend no está corriendo
         Verificar que servicios en localhost:8000-8004 estén activos

Problema: datos no aparecen en tabla
Solución: Abrir DevTools (F12) y ver errores en consola
         Verificar que API devuelva datos correctos


DESARROLLO Y DEBUG
==================

Abrir DevTools: F12 o Ctrl+Shift+I
Tabs útiles:
  - Console: Ver errores y logs
  - Network: Ver peticiones HTTP
  - Storage: Ver localStorage y sessionStorage
  - Elements: Inspeccionar HTML

Para debugging:
console.log(variable) - Imprimir en consola
debugger; - Pausa ejecución (requiere DevTools abierto)

Ver solicitudes HTTP:
Network tab > Click en petición > Ver Request/Response


DISEÑO VISUAL (SIGUIENDO MOCKUP)
================================

Colores principales:
  - Rojo CargamEsta: #C1272D (botones, títulos principales)
  - Negro: #1a1a1a (texto principal)
  - Blanco: #ffffff (fondo)
  - Gris: #f5f5f5 (fondos secundarios)

Tipografía:
  - Font family recomendada: Arial, Helvetica, sans-serif
  - Headings: Bold
  - Body: Regular (400)

Layout:
  - Logo en header izquierda
  - Menú de navegación horizontal
  - Sidebar izquierdo para módulos (Conductores, Vehículos, etc)
  - Área principal de contenido

Componentes:
  - Botones: Rojo para primarios, Gris para secundarios
  - Inputs: Bordes redondeados, padding suficiente
  - Tablas: Filas alternadas con colores sutiles
  - Estados: Verde para success, Rojo para error


GIT WORKFLOW
============

Ver status:
git status

Agregar cambios:
git add .

Hacer commit:
git commit -m "Jota: [Descripción del cambio]"

Ver historial:
git log --oneline

Empujar a GitHub:
git push origin main


PRÓXIMOS PASOS
==============

1. Descargar la carpeta frontend_cargamesta
2. Abrir en VS Code
3. Instalar extensión Live Server
4. Asegurar que backend está corriendo en localhost:8000-8004
5. Iniciar con Live Server
6. Hacer login con credenciales de prueba (admin/admin123)
7. Probar cada módulo (Conductores, Vehículos, Rutas, Viajes)

Última actualización: Junio 2026