const API_AUTH = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", function() {
    // Verificar si ya está autenticado
    verificarAutenticacion();
    
    // Evento de formulario login
    const loginForm = document.getElementById("loginForm");
    if(loginForm) {
        loginForm.addEventListener("submit", manejarLogin);
    }
});

function verificarAutenticacion() {
    const token = localStorage.getItem("token");
    const rutaActual = window.location.pathname;
    
    if(token && rutaActual.includes("index.html")) {
        // Ya está autenticado, redirigir a dashboard
        window.location.href = "Pages/dashboard.html";
    } else if(!token && !rutaActual.includes("index.html")) {
        // No está autenticado, redirigir a login
        window.location.href = "../index.html";
    }
}

async function manejarLogin(evento) {
    evento.preventDefault();
    
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const mensajeError = document.getElementById("mensajeError");
    
    if(!usuario || !contrasena) {
        mostrarError("Usuario y contraseña son requeridos", mensajeError);
        return;
    }
    
    try {
        const respuesta = await fetch(`${API_AUTH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                contrasena: contrasena
            })
        });
        
        const datos = await respuesta.json();
        
        if(datos.success) {
            localStorage.setItem("token", datos.data.token);
            localStorage.setItem("usuario", datos.data.usuario);
            window.location.href = "Pages/dashboard.html";
        } else {
            mostrarError(datos.message || "Error al iniciar sesión", mensajeError);
        }
    } catch(error) {
        console.error("Error:", error);
        mostrarError("Error al conectar con el servidor", mensajeError);
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "../index.html";
}

function obtenerToken() {
    return localStorage.getItem("token");
}

function mostrarError(mensaje, elemento) {
    if(elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = "block";
        setTimeout(() => {
            elemento.style.display = "none";
        }, 5000);
    }
}
