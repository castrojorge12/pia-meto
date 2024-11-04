document.addEventListener("DOMContentLoaded", function () {
    // Validación para el formulario de registro
    const registrationForm = document.querySelector("#registration-form form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const registerButton = registrationForm.querySelector("button");

    // Desactiva el botón inicialmente
    registerButton.disabled = true;

    // Función para habilitar o deshabilitar el botón de registro
    function validateRegistrationForm() {
        let isValid = true;

        if (usernameInput.value.trim() === "") {
            isValid = false;
        }
        if (passwordInput.value.trim() === "" || passwordInput.value.length < 8) {
            isValid = false;
        }
        if (confirmPasswordInput.value.trim() === "" || passwordInput.value !== confirmPasswordInput.value) {
            isValid = false;
        }

        registerButton.disabled = !isValid;
    }

    // Agregar eventos de entrada para validar en tiempo real
    usernameInput.addEventListener("input", validateRegistrationForm);
    passwordInput.addEventListener("input", validateRegistrationForm);
    confirmPasswordInput.addEventListener("input", validateRegistrationForm);

    // Validación final al intentar enviar el formulario
    registrationForm.addEventListener("submit", function (event) {
        let errors = [];

        if (usernameInput.value.trim() === "") {
            errors.push("El nombre de usuario es obligatorio.");
        }

        if (passwordInput.value.trim() === "") {
            errors.push("La contraseña es obligatoria.");
        } else if (passwordInput.value.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres.");
        }

        if (confirmPasswordInput.value.trim() === "") {
            errors.push("La confirmación de la contraseña es obligatoria.");
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push("Las contraseñas no coinciden.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            event.preventDefault(); // Evita que el formulario se envíe
        }
    });

    // Validación para el formulario de inicio de sesión
    const loginForm = document.querySelector("#login-form form");
    const loginUsernameInput = document.getElementById("login-username");
    const loginPasswordInput = document.getElementById("login-password");
    const loginButton = loginForm.querySelector("button");

    // Desactiva el botón inicialmente
    loginButton.disabled = true;

    // Función para habilitar o deshabilitar el botón de inicio de sesión
    function validateLoginForm() {
        if (loginUsernameInput.value.trim() !== "" && loginPasswordInput.value.trim() !== "") {
            loginButton.disabled = false;
        } else {
            loginButton.disabled = true;
        }
    }

    // Agregar eventos de entrada para validar en tiempo real
    loginUsernameInput.addEventListener("input", validateLoginForm);
    loginPasswordInput.addEventListener("input", validateLoginForm);

    // Validación final al intentar enviar el formulario de inicio de sesión
    loginForm.addEventListener("submit", function (event) {
        let errors = [];

        if (loginUsernameInput.value.trim() === "") {
            errors.push("El nombre de usuario es obligatorio.");
        }

        if (loginPasswordInput.value.trim() === "") {
            errors.push("La contraseña es obligatoria.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            event.preventDefault(); // Evita que el formulario se envíe
        }
    });
});
