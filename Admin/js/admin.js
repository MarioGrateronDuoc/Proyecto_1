// PANEL DE ADMINISTRACIÓN - JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    console.log('Panel de administración cargado');
    
    // Inicializar datos de ejemplo si no existen
    inicializarDatosEjemplo();
    
    // Cargar estadísticas
    cargarEstadisticas();
    
    // Verificar autenticación
    verificarAutenticacion();
    
    // Inicializar navegación
    inicializarNavegacion();
});

// INICIALIZAR DATOS DE EJEMPLO
function inicializarDatosEjemplo() {
    // Datos de productos de ejemplo
    if (!localStorage.getItem('productos')) {
        const productosEjemplo = [
            { 
                id: 1, 
                nombre: "iPhone 14 Pro", 
                descripcion: "El último smartphone de Apple con Dynamic Island", 
                precio: 999, 
                imagen: "https://via.placeholder.com/300x200/667eea/ffffff?text=iPhone+14+Pro", 
                categoria: "smartphone", 
                stock: 15 
            },
            { 
                id: 2, 
                nombre: "Samsung Galaxy S23", 
                descripcion: "Potente smartphone Android con cámara profesional", 
                precio: 849, 
                imagen: "https://via.placeholder.com/300x200/f093fb/ffffff?text=Galaxy+S23", 
                categoria: "smartphone", 
                stock: 20 
            },
            { 
                id: 3, 
                nombre: "MacBook Air M2", 
                descripcion: "Laptop ultradelgada con chip M2 de Apple", 
                precio: 1199, 
                imagen: "https://via.placeholder.com/300x200/4facfe/ffffff?text=MacBook+Air", 
                categoria: "laptop", 
                stock: 8 
            }
        ];
        localStorage.setItem('productos', JSON.stringify(productosEjemplo));
    }

    // Datos de usuarios de ejemplo
    if (!localStorage.getItem('usuarios')) {
        const usuariosEjemplo = [
            { 
                id: 1, 
                nombre: "Juan Pérez", 
                email: "juan.perez@example.com", 
                rol: "Administrador", 
                estado: "Activo",
                region: "Región Metropolitana de Santiago",
                comuna: "Santiago"
            },
            { 
                id: 2, 
                nombre: "María García", 
                email: "maria.garcia@example.com", 
                rol: "Cliente", 
                estado: "Activo",
                region: "Región Metropolitana de Santiago", 
                comuna: "Providencia"
            }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuariosEjemplo));
    }

    // Usuario actual de ejemplo (para evitar redirección al login)
    if (!localStorage.getItem('usuarioActual')) {
        const usuarioActual = {
            id: 1,
            nombre: "Administrador",
            email: "admin@tienda.com",
            rol: "Administrador"
        };
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
    }
}

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

// FUNCIÓN PARA GENERAR ID ÚNICO
function generarId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}