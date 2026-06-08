window.onload = function() {
    
    // Captura de elementos del DOM
    var form = document.getElementById('form-suscripcion');
    var tituloBienvenida = document.getElementById('titulo-bienvenida');

    var campos = {
        nombre: document.getElementById('nombre'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        repetirPassword: document.getElementById('repetirPassword'),
        edad: document.getElementById('edad'),
        telefono: document.getElementById('telefono'),
        direccion: document.getElementById('direccion'),
        ciudad: document.getElementById('ciudad'),
        codigoPostal: document.getElementById('codigoPostal'),
        dni: document.getElementById('dni')
    };

    var errores = {};


    // FUNCIONES DE VALIDACIÓN


    function validarNombre(valor) {
        if (valor.length <= 6) return "Debe tener más de 6 letras.";
        if (valor.indexOf(' ') === -1 || valor.trim().indexOf(' ') === 0 || valor.trim().lastIndexOf(' ') === valor.trim().length - 1) {
            return "Debe contener al menos un espacio intermedio.";
        }
        return "";
    }

    function validarEmail(valor) {
        var expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!expresionEmail.test(valor)) return "Formato de email inválido.";
        return "";
    }

    function validarPassword(valor) {
        if (valor.length < 8) return "Debe tener al menos 8 caracteres.";
        var tieneLetras = false;
        var tieneNumeros = false;
        for (var i = 0; i < valor.length; i++) {
            var c = valor.charCodeAt(i);
            if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) tieneLetras = true;
            if (c >= 48 && c <= 57) tieneNumeros = true;
        }
        if (!tieneLetras || !tieneNumeros) return "Debe contener letras y números.";
        return "";
    }

    function validarRepetirPassword(valor) {
        if (valor !== campos.password.value) return "Las contraseñas no coinciden.";
        return "";
    }

    function validarEdad(valor) {
        var num = parseInt(valor, 10);
        if (isNaN(num) || num.toString() !== valor.trim()) return "Debe ingresar un número entero.";
        if (num < 18) return "Debe ser mayor o igual a 18 años.";
        return "";
    }

    function validarTelefono(valor) {
        if (valor.length < 7) return "Debe tener al menos 7 dígitos.";
        for (var i = 0; i < valor.length; i++) {
            var c = valor.charCodeAt(i);
            if (c < 48 || c > 57) return "No se aceptan espacios, guiones ni paréntesis.";
        }
        return "";
    }

    function validarDireccion(valor) {
        if (valor.length < 5) return "Debe tener al menos 5 caracteres.";
        var tieneLetras = false;
        var tieneNumeros = false;
        for (var i = 0; i < valor.length; i++) {
            var c = valor.charCodeAt(i);
            if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122)) tieneLetras = true;
            if (c >= 48 && c <= 57) tieneNumeros = true;
        }
        if (valor.indexOf(' ') === -1 || valor.trim().indexOf(' ') === 0) return "Debe incluir un espacio intermedio.";
        if (!tieneLetras || !tieneNumeros) return "Debe contener letras y números.";
        return "";
    }

    function validarCiudad(valor) {
        if (valor.trim().length < 3) return "Debe tener al menos 3 caracteres.";
        return "";
    }

    function validarCodigoPostal(valor) {
        if (valor.trim().length < 3) return "Debe tener al menos 3 caracteres.";
        return "";
    }

    function validarDni(valor) {
        if (valor.length < 7 || valor.length > 8) return "Debe tener 7 u 8 dígitos.";
        for (var i = 0; i < valor.length; i++) {
            var c = valor.charCodeAt(i);
            if (c < 48 || c > 57) return "El DNI debe contener solo números.";
        }
        return "";
    }

    function validarCampo(id, valor) {
        switch(id) {
            case 'nombre': return validarNombre(valor);
            case 'email': return validarEmail(valor);
            case 'password': return validarPassword(valor);
            case 'repetirPassword': return validarRepetirPassword(valor);
            case 'edad': return validarEdad(valor);
            case 'telefono': return validarTelefono(valor);
            case 'direccion': return validarDireccion(valor);
            case 'ciudad': return validarCiudad(valor);
            case 'codigoPostal': return validarCodigoPostal(valor);
            case 'dni': return validarDni(valor);
            default: return "";
        }
    }

 
    // ASIGNACIÓN DE EVENTOS (BLUR Y FOCUS)
  

    Object.keys(campos).forEach(function(key) {
        var input = campos[key];
        var errorSpan = document.getElementById('error-' + input.id);

        input.addEventListener('blur', function() {
            var mensaje = validarCampo(input.id, input.value);
            if (mensaje !== "") {
                errorSpan.textContent = mensaje;
                errores[input.id] = mensaje;
            } else {
                errorSpan.textContent = "";
                delete errores[input.id];
            }
        });

        input.addEventListener('focus', function() {
            errorSpan.textContent = "";
        });
    });


    // TÍTULO DINÁMICO EN TIEMPO REAL

    function actualizarTitulo() {
        var textoNombre = campos.nombre.value.trim();
        if (textoNombre === "") {
            tituloBienvenida.textContent = "HOLA";
        } else {
            tituloBienvenida.textContent = "HOLA " + textoNombre.toUpperCase();
        }
    }

    campos.nombre.addEventListener('keydown', function() {
        setTimeout(actualizarTitulo, 10);
    });
    campos.nombre.addEventListener('focus', actualizarTitulo);



    // EVENTO SUBMIT (BOTÓN ENVIAR)
  
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var resumenMensaje = "";
        var hayErrores = false;

        Object.keys(campos).forEach(function(key) {
            var input = campos[key];
            var errorSpan = document.getElementById('error-' + input.id);
            var mensaje = validarCampo(input.id, input.value);

            if (mensaje !== "") {
                errorSpan.textContent = mensaje;
                errores[input.id] = mensaje;
                hayErrores = true;
            }
        });

        if (hayErrores) {
            resumenMensaje = "El formulario contiene errores de validación:\n\n";
            Object.keys(campos).forEach(function(key) {
                var input = campos[key];
                var msn = validarCampo(input.id, input.value);
                if (msn !== "") {
                    resumenMensaje += "- " + input.previousElementSibling.textContent.replace(":", "") + ": " + msn + "\n";
                }
            });
        } else {
            resumenMensaje = "Suscripción exitosa con los siguientes datos:\n\n";
            Object.keys(campos).forEach(function(key) {
                var input = campos[key];
                resumenMensaje += "- " + input.previousElementSibling.textContent.replace(":", "") + ": " + input.value + "\n";
            });
        }

        alert(resumenMensaje);
    });
};