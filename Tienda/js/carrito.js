// carrito.js - Lógica específica de la página del carrito
let cantidadesAEliminar = {};

function mostrarCarrito() {
    const carrito = window.carritoManager.obtenerCarrito();
    const cartContainer = document.getElementById('cart-items-container');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCart = document.getElementById('empty-cart');

    if (carrito.length === 0) {
        cartContainer.innerHTML = '';
        cartSummary.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';

    cartContainer.innerHTML = carrito.map(item => {
        if (!cantidadesAEliminar[item.id] || cantidadesAEliminar[item.id] > item.cantidad) {
            cantidadesAEliminar[item.id] = 1;
        }
        
        return `
        <div class="cart-item">
            <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image"
                 onerror="this.src='https://via.placeholder.com/100x100?text=Imagen'">
            
            <div class="cart-item-info">
                <h3>${item.nombre}</h3>
                <p class="cart-item-price">$${item.precio} c/u</p>
                <p><strong>En carrito:</strong> ${item.cantidad} ${item.cantidad === 1 ? 'unidad' : 'unidades'}</p>
            </div>

            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                    <span class="quantity-number">${item.cantidad}</span>
                    <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                </div>
                
                <div class="delete-controls">
                    <p>¿Cuántas eliminar?</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cambiarCantidadEliminar(${item.id}, -1)">-</button>
                        <span class="quantity-number" id="delete-amount-${item.id}">${cantidadesAEliminar[item.id]}</span>
                        <button class="quantity-btn" onclick="cambiarCantidadEliminar(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="eliminarCantidadSeleccionada(${item.id})">
                        ❌ Eliminar <span id="delete-text-${item.id}">${cantidadesAEliminar[item.id]} ${cantidadesAEliminar[item.id] === 1 ? 'unidad' : 'unidades'}</span>
                    </button>
                </div>
            </div>

            <div class="cart-item-total">
                $${item.precio * item.cantidad}
            </div>
        </div>
        `;
    }).join('');

    actualizarResumenCarrito();
}

function cambiarCantidad(productoId, cambio) {
    const carrito = window.carritoManager.obtenerCarrito();
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        const nuevaCantidad = item.cantidad + cambio;
        if (nuevaCantidad > 0) {
            window.carritoManager.actualizarCantidad(productoId, nuevaCantidad);
            mostrarCarrito();
        }
    }
}

function cambiarCantidadEliminar(productoId, cambio) {
    const carrito = window.carritoManager.obtenerCarrito();
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        if (!cantidadesAEliminar[productoId]) {
            cantidadesAEliminar[productoId] = 1;
        }
        
        const nuevaCantidad = cantidadesAEliminar[productoId] + cambio;
        
        if (nuevaCantidad >= 1 && nuevaCantidad <= item.cantidad) {
            cantidadesAEliminar[productoId] = nuevaCantidad;
            
            const amountElement = document.getElementById(`delete-amount-${productoId}`);
            const textElement = document.getElementById(`delete-text-${productoId}`);
            
            if (amountElement && textElement) {
                amountElement.textContent = nuevaCantidad;
                textElement.textContent = nuevaCantidad === 1 ? '1 unidad' : `${nuevaCantidad} unidades`;
            }
        }
    }
}

function eliminarCantidadSeleccionada(productoId) {
    const cantidadAEliminar = cantidadesAEliminar[productoId] || 1;
    const carrito = window.carritoManager.obtenerCarrito();
    const item = carrito.find(item => item.id === productoId);
    
    if (item) {
        if (cantidadAEliminar >= item.cantidad) {
            window.carritoManager.eliminarDelCarrito(productoId);
        } else {
            window.carritoManager.actualizarCantidad(productoId, item.cantidad - cantidadAEliminar);
        }
        
        cantidadesAEliminar[productoId] = 1;
        mostrarCarrito();
    }
}

function actualizarResumenCarrito() {
    const subtotal = window.carritoManager.calcularTotalCarrito();
    const shipping = subtotal > 0 ? 5000 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal}`;
    document.getElementById('shipping').textContent = shipping > 0 ? `$${shipping}` : 'Gratis';
    document.getElementById('total').textContent = `$${total}`;
}

function procederAlPago() {
    const carrito = window.carritoManager.obtenerCarrito();
    if (carrito.length === 0) {
        window.carritoManager.mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }
    alert('🚀 ¡Redirigiendo al proceso de pago! Esta funcionalidad se implementará próximamente.');
}

// Inicializar carrito cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
});