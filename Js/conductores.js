const API_CONDUCTORES = "http://localhost:8001";

document.addEventListener("DOMContentLoaded", function() {
    if(!obtenerToken()) {
        window.location.href = "../index.html";
    }
    
    listarConductores();
    
    const form = document.getElementById("formularioConductor");
    if(form) {
        form.addEventListener("submit", crearConductor);
    }
});

async function listarConductores() {
    try {
        const resultado = await hacerPeticion(`${API_CONDUCTORES}/conductores`);
        
        if(resultado.success) {
            const tabla = document.getElementById("tablaConductores");
            tabla.innerHTML = "";
            
            resultado.data.forEach(conductor => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${conductor.nombres} ${conductor.apellidos}</td>
                    <td>${conductor.documento}</td>
                    <td>${conductor.telefono}</td>
                    <td>${conductor.estado}</td>
                    <td>
                        <button class="btn-editar">Editar</button>
                        <button class="btn-eliminar">Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        }
    } catch(error) {
        mostrarNotificacion("Error al cargar conductores", "error");
    }
}

async function crearConductor(evento) {
    evento.preventDefault();
    
    const datos = {
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        documento: document.getElementById("documento").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        numero_licencia: document.getElementById("numero_licencia").value,
        categoria_licencia: document.getElementById("categoria_licencia").value,
        fecha_vencimiento_licencia: document.getElementById("fecha_vencimiento_licencia").value
    };
    
    try {
        const resultado = await hacerPeticion(
            `${API_CONDUCTORES}/conductores`,
            "POST",
            datos
        );
        
        if(resultado.success) {
            mostrarNotificacion("Conductor creado exitosamente", "success");
            document.getElementById("formularioConductor").reset();
            listarConductores();
        }
    } catch(error) {
        mostrarNotificacion("Error al crear conductor", "error");
    }
}