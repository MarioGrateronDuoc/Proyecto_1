// Validación del formulario de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Validación en tiempo real para email
    emailInput.addEventListener('input', function() {
        validateEmail();
    });

    // Validación en tiempo real para contraseña
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });

    // Validación del formulario al enviar
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();

            if (isEmailValid && isPasswordValid) {
                attemptLogin();
            }
        });
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        
        if (!email) {
            emailError.textContent = 'El correo electrónico es requerido';
            return false;
        } else if (email.length > 100) {
            emailError.textContent = 'Máximo 100 caracteres permitidos';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        
        if (!password) {
            passwordError.textContent = 'La contraseña es requerida';
            return false;
        } else if (password.length < 4 || password.length > 10) {
            passwordError.textContent = 'La contraseña debe tener entre 4 y 10 caracteres';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }

    function attemptLogin() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Simulación de usuarios (esto vendría de una base de datos)
        const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
        
        // Buscar usuario
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login exitoso
            showNotification('¡Login exitoso! Bienvenido ' + user.nombre, 'success');
            
            // Guardar sesión del usuario
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirigir después de 1 segundo
            setTimeout(() => {
                redirectUser(user.rol);
            }, 1000);
        } else {
            showNotification('Credenciales incorrectas. Verifica tu email y contraseña.', 'error');
        }
    }

    function redirectUser(userType) {
        switch(userType) {
            case 'Administrador':
            case 'Vendedor':
                // Redirección al panel de administración. Se sube un nivel (..) y luego se entra a la carpeta Admin/
                window.location.href = '../Admin/home.html';
                break;
            case 'Cliente':
            default:
                // Redirección a la página principal de la tienda
                window.location.href = 'index.html';
                break;
        }
    }

    function showNotification(message, type) {
        // Crear notificación estilo Toast
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 'background: var(--color-success);' : type === 'error' ? 'background: var(--color-error);' : 'background: var(--color-info);'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Función mejorada para manejar la sesión
    function handleExistingSession() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            const loginContainer = document.querySelector('.login-container');
            
            if (loginContainer) {
                loginContainer.innerHTML = `
                    <div style="text-align: center;">
                        <h2 style="color: var(--color-primary); margin-bottom: 1rem;">Ya estás conectado</h2>
                        <p>Has iniciado sesión como <strong>${user.nombre}</strong> (${user.rol}).</p>
                        <p>¿Qué te gustaría hacer?</p>
                        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                            <a href="index.html" class="btn btn-primary">Volver a la Tienda</a>
                            <button id="logoutBtn" class="btn btn-outline">Cerrar Sesión</button>
                        </div>
                    </div>
                `;
                document.getElementById('logoutBtn').addEventListener('click', function() {
                    localStorage.removeItem('currentUser');
                    window.location.reload();
                });
            }
        }
    }

    // Ejecutar verificación al cargar la página
    handleExistingSession();
});