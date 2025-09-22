// registro.js - Validaciones específicas para el formulario de registro

// Datos de regiones y comunas EXACTOS como en la imagen
const regionesComunas = [
    {
        id: "metropolitana",
        nombre: "Región Metropolitana de Santiago",
        comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "La Florida", "Puente Alto"]
    },
    {
        id: "araucania", 
        nombre: "Región de la Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Victoria"]
    },
    {
        id: "nuble",
        nombre: "Región de Ñuble", 
        comunas: ["Chillán", "Chillán Viejo", "Bulnes", "Quirihue", "San Carlos"]
    },
    {
        id: "maule",
        nombre: "Región del Maule",
        comunas: ["Linares", "Longaví", "Talca", "Curicó", "Constitución"]
    },
    {
        id: "biobio",
        nombre: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "Chiguayante", "San Pedro de la Paz"]
    }
];

// Función para validar correo con dominios específicos
function validarEmail(email) {
    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => email.endsWith(dominio));
}

// Función para cargar regiones en el select
function cargarRegiones() {
    const selectRegion = document.getElementById('region');
    
    regionesComunas.forEach(region => {
        const option = document.createElement('option');
        option.value = region.id;
        option.textContent = region.nombre;
        selectRegion.appendChild(option);
    });
}

// Función para cargar comunas según región seleccionada
function cargarComunas(regionId) {
    const selectComuna = document.getElementById('comuna');
    selectComuna.innerHTML = '<option value="">- Seleccione la comuna -</option>';
    
    const region = regionesComunas.find(r => r.id === regionId);
    
    if (region) {
        region.comunas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna.toLowerCase().replace(/ /g, '_');
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
        selectComuna.disabled = false;
    } else {
        selectComuna.disabled = true;
        selectComuna.innerHTML = '<option value="">- Seleccione la comuna -</option>';
    }
}

// Función para mostrar error
function mostrarError(campoId, mensaje) {
    const errorElement = document.getElementById(`error-${campoId}`);
    const campoElement = document.getElementById(campoId);
    
    errorElement.textContent = mensaje;
    errorElement.style.display = 'block';
    campoElement.style.borderColor = '#ef4444';
}

// Función para limpiar error
function limpiarError(campoId) {
    const errorElement = document.getElementById(`error-${campoId}`);
    const campoElement = document.getElementById(campoId);
    
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    campoElement.style.borderColor = '#d1d5db';
}

// Validación individual de campos
function validarCampo(campoId, valor) {
    switch (campoId) {
        case 'nombre':
            if (!valor.trim()) {
                return 'El nombre completo es requerido';
            }
            if (valor.length > 100) {
                return 'El nombre no puede exceder los 100 caracteres';
            }
            break;
            
        case 'email':
            if (!valor.trim()) {
                return 'El correo electrónico es requerido';
            }
            if (valor.length > 100) {
                return 'El correo no puede exceder los 100 caracteres';
            }
            if (!validarEmail(valor)) {
                return 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
            }
            break;
            
        case 'password':
            if (!valor.trim()) {
                return 'La contraseña es requerida';
            }
            if (valor.length < 4 || valor.length > 10) {
                return 'La contraseña debe tener entre 4 y 10 caracteres';
            }
            break;
            
        case 'confirm-password':
            const password = document.getElementById('password').value;
            if (valor !== password) {
                return 'Las contraseñas no coinciden';
            }
            break;
            
        case 'region':
            if (!valor.trim()) {
                return 'Debe seleccionar una región';
            }
            break;
            
        case 'comuna':
            if (!valor.trim()) {
                return 'Debe seleccionar una comuna';
            }
            break;
    }
    
    return ''; // No hay error
}

// Validación completa del formulario
function validarFormulario() {
    let esValido = true;
    const campos = ['nombre', 'email', 'password', 'confirm-password', 'region', 'comuna'];
    
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        const error = validarCampo(campoId, campo.value);
        
        if (error) {
            mostrarError(campoId, error);
            esValido = false;
        } else {
            limpiarError(campoId);
        }
    });
    
    return esValido;
}

// ... (resto del código)

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cargar regiones al iniciar
    cargarRegiones();

    // Evento para cambiar comunas cuando se selecciona región
    document.getElementById('region').addEventListener('change', function() {
        cargarComunas(this.value);
        limpiarError('region');
        limpiarError('comuna');
    });

    // Evento para limpiar error de comuna cuando se selecciona
    document.getElementById('comuna').addEventListener('change', function() {
        limpiarError('comuna');
    });

    // Validación en tiempo real para campos de texto
    const camposTexto = ['nombre', 'email', 'password', 'confirm-password', 'telefono']; // Agregamos 'telefono'
    
    camposTexto.forEach(campoId => {
        const campo = document.getElementById(campoId);

        if (campo) { // Agregamos esta verificación para evitar errores si el campo no existe
            campo.addEventListener('blur', function() {
                const error = validarCampo(this.id, this.value);
                if (error) {
                    mostrarError(this.id, error);
                } else {
                    limpiarError(this.id);
                }
            });
            
            campo.addEventListener('input', function() {
                limpiarError(this.id); // Aquí está la clave del cambio
            });
        }
    });

    // Envío del formulario
    document.getElementById('registro-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            // Simular registro exitoso
            alert('✅ Registro exitoso. Redirigiendo al login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            alert('❌ Por favor, corrige los errores en el formulario.');
        }
    });
});