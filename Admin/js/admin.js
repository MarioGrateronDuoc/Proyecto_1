// PANEL DE ADMINISTRACIÓN - JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    console.log('Panel de administración cargado');
    
    // Cargar estadísticas
    cargarEstadisticas();
    
    // Verificar autenticación
    verificarAutenticacion();
    
    // Inicializar navegación
    inicializarNavegacion();
});

// CARGAR ESTADÍSTICAS DESDE LOCALSTORAGE
function cargarEstadisticas() {
    try {
        // Productos
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        document.getElementById('total-productos').textContent = productos.length;
        
        // Usuarios
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        document.getElementById('total-usuarios').textContent = usuarios.length;
        
        // Pedidos pendientes (ejemplo)
        const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        const pendientes = pedidos.filter(pedido => pedido.estado === 'pendiente').length;
        document.getElementById('pedidos-pendientes').textContent = pendientes;
        
        // Ventas hoy (ejemplo)
        document.getElementById('ventas-hoy').textContent = '0';
        
    } catch (error) {
        console.error('Error cargando estadísticas:', error);
        // Valores por defecto en caso de error
        document.getElementById('total-productos').textContent = '0';
        document.getElementById('total-usuarios').textContent = '0';
        document.getElementById('pedidos-pendientes').textContent = '0';
        document.getElementById('ventas-hoy').textContent = '0';
    }
}

// VERIFICAR AUTENTICACIÓN
function verificarAutenticacion() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!usuarioActual) {
        // Redirigir al login si no hay usuario autenticado
        window.location.href = 'login.html';
        return;
    }
    
    // Mostrar información del usuario
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.textContent = `Bienvenido, ${usuarioActual.nombre || 'Administrador'}`;
    }
}

// INICIALIZAR NAVEGACIÓN
function inicializarNavegacion() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.admin-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'home.html')) {
            link.classList.add('active');
        }
    });
}

// CERRAR SESIÓN
function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('usuarioActual');
        window.location.href = 'login.html';
    }
}

// MENSAJES DE CONSOLA PARA DEBUG
console.log('=== PANEL ADMIN CARGADO ===');
console.log('Productos en localStorage:', JSON.parse(localStorage.getItem('productos')) || []);
console.log('Usuarios en localStorage:', JSON.parse(localStorage.getItem('usuarios')) || []);
console.log('Usuario actual:', JSON.parse(localStorage.getItem('usuarioActual')));