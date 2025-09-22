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
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            attemptLogin();
        }
    });

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
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Buscar usuario
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login exitoso
            showNotification('¡Login exitoso! Bienvenido ' + user.nombre, 'success');
            
            // Guardar sesión del usuario
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirigir después de 1 segundo
            setTimeout(() => {
                redirectUser(user.tipo);
            }, 1000);
        } else {
            showNotification('Credenciales incorrectas. Verifica tu email y contraseña.', 'error');
        }
    }

    function redirectUser(userType) {
        switch(userType) {
            case 'administrador':
                window.location.href = 'admin/index.html';
                break;
            case 'vendedor':
                window.location.href = 'admin/index.html';
                break;
            case 'cliente':
            default:
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
            ${type === 'success' ? 'background: var(--color-success);' : 'background: var(--color-error);'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Verificar si ya hay una sesión activa
    function checkExistingSession() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            showNotification('Ya hay una sesión activa para ' + user.email, 'info');
            // Redirigir automáticamente
            setTimeout(() => {
                redirectUser(user.tipo);
            }, 2000);
        }
    }

    // Ejecutar verificación al cargar la página
    checkExistingSession();
});