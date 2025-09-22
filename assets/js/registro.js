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

// Función para validar RUN chileno
function validarRUN(run) {
    // Eliminar puntos y guión, convertir a mayúsculas
    run = run.replace(/[\.\-]/g, '').toUpperCase();
    
    if (run.length < 8 || run.length > 9) return false;
    
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);
    
    // Validar que el cuerpo sean solo números
    if (!/^\d+$/.test(cuerpo)) return false;
    
    // Validar dígito verificador
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const resto = suma % 11;
    const dvEsperado = 11 - resto;
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    
    return dv === dvCalculado;
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
    
    if (errorElement && campoElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
        campoElement.style.borderColor = '#ef4444';
    }
}

// Función para limpiar error
function limpiarError(campoId) {
    const errorElement = document.getElementById(`error-${campoId}`);
    const campoElement = document.getElementById(campoId);
    
    if (errorElement && campoElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        campoElement.style.borderColor = '#d1d5db';
    }
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
            
        case 'telefono':
            if (valor.trim() && !/^[\+]?[0-9\s\-\(\)]{8,}$/.test(valor)) {
                return 'Formato de teléfono inválido';
            }
            break;
    }
    
    return ''; // No hay error
}

// Validación completa del formulario
function validarFormulario() {
    let esValido = true;
    const campos = ['nombre', 'email', 'password', 'confirm-password', 'region', 'comuna', 'telefono'];
    
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            const error = validarCampo(campoId, campo.value);
            
            if (error) {
                mostrarError(campoId, error);
                esValido = false;
            } else {
                limpiarError(campoId);
            }
        }
    });
    
    return esValido;
}

// Función para guardar usuario en localStorage
function guardarUsuario(usuarioData) {
    try {
        // Obtener usuarios existentes o crear array vacío
        const usuarios = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Verificar si el email ya existe
        const usuarioExistente = usuarios.find(u => u.email === usuarioData.email);
        if (usuarioExistente) {
            throw new Error('El correo electrónico ya está registrado');
        }
        
        // Agregar nuevo usuario
        usuarios.push(usuarioData);
        
        // Guardar en localStorage
        localStorage.setItem('users', JSON.stringify(usuarios));
        
        return true;
    } catch (error) {
        console.error('Error al guardar usuario:', error);
        return false;
    }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.innerHTML = `
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Estilos para la notificación
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${tipo === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.remove();
        }
    }, 5000);
}

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
    const camposTexto = ['nombre', 'email', 'password', 'confirm-password', 'telefono'];
    
    camposTexto.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('blur', function() {
                const error = validarCampo(this.id, this.value);
                if (error) {
                    mostrarError(this.id, error);
                } else {
                    limpiarError(this.id);
                }
            });
            
            campo.addEventListener('input', function() {
                limpiarError(this.id);
            });
        }
    });

    // Envío del formulario
    document.getElementById('registro-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario()) {
            // Obtener datos del formulario
            const usuarioData = {
                id: Date.now(), // ID único
                nombre: document.getElementById('nombre').value.trim(),
                email: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value,
                telefono: document.getElementById('telefono').value.trim() || '',
                region: document.getElementById('region').options[document.getElementById('region').selectedIndex].text,
                comuna: document.getElementById('comuna').options[document.getElementById('comuna').selectedIndex].text,
                tipo: 'cliente', // Por defecto todos son clientes
                fechaRegistro: new Date().toISOString()
            };
            
            // Intentar guardar usuario
            if (guardarUsuario(usuarioData)) {
                mostrarNotificacion('✅ Registro exitoso. Redirigiendo al login...', 'success');
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                mostrarNotificacion('❌ Error al registrar usuario. Intente nuevamente.', 'error');
            }
        } else {
            mostrarNotificacion('❌ Por favor, corrige los errores en el formulario.', 'error');
        }
    });
});

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notificacion button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);