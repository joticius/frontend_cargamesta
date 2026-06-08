const API_BASE = "http://localhost";

async function hacerPeticion(url, metodo = "GET", datos = null) {
    const opciones = {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + obtenerToken()
        }
    };
    
    if(datos && (metodo === "POST" || metodo === "PUT")) {
        opciones.body = JSON.stringify(datos);
    }
    
    try {
        const respuesta = await fetch(url, opciones);
        
        if(respuesta.status === 401) {
            logout();
            throw new Error("Sesión expirada");
        }
        
        const json = await respuesta.json();
        
        if(!respuesta.ok) {
            throw new Error(json.message || "Error en la solicitud");
        }
        
        return json;
    } catch(error) {
        console.error("Error en petición:", error);
        throw error;
    }
}

function mostrarNotificacion(mensaje, tipo = "info") {
    const div = document.createElement("div");
    div.className = `notificacion notificacion-${tipo}`;
    div.textContent = mensaje;
    document.body.insertBefore(div, document.body.firstChild);
    
    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 300);
    }, 4000);
}