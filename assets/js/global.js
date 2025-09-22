// Carrito de compras
let carrito = [];

// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Actualizar contador del carrito
function actualizarContadorCarrito() {
    const contador = document.querySelector('.cart-count');
    if (contador) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = totalItems;
        
        // Actualizar texto del enlace del carrito
        const enlaceCarrito = document.querySelector('.cart-icon');
        if (enlaceCarrito && !enlaceCarrito.querySelector('.cart-count')) {
            enlaceCarrito.innerHTML = `Carrito (${totalItems})`;
        }
    }
}
function reducirCantidad(productoId) {
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        if (item.cantidad > 1) {
            item.cantidad -= 1; // Reduce la cantidad
            guardarCarrito();
            mostrarNotificacion('Cantidad reducida', 'success');
        } else {
            eliminarDelCarrito(productoId); // Elimina si queda en 0
        }
    }
}
// Agregar producto al carrito
function agregarAlCarrito(productoId, cantidad = 1) {
    const producto = productos.find(p => p.id === productoId);
    
    if (producto) {
        const itemExistente = carrito.find(item => item.id === productoId);
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            });
        }
        
        guardarCarrito();
        mostrarNotificacion('Producto agregado al carrito', 'success');
    }
}

// Eliminar producto del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito();
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `alert alert-${tipo}`;
    notificacion.textContent = mensaje;
    
    // Agregar al body
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
});