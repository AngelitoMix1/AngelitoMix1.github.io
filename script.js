document.addEventListener("DOMContentLoaded", function () {
    const loginSection = document.getElementById("loginSection");
    const newSection = document.getElementById("Registro");
    const perfilSection = document.getElementById("Perfil");
    const QRSection = document.getElementById("QRform");
    const editarPerfilSection = document.getElementById("editarPerfil");
    const credencialSection = document.getElementById("CredencialD");

    const volverBtnCredencial = document.querySelector(".CredencialDig .image-volver");
    volverBtnCredencial.addEventListener('click', function (event) {
        event.preventDefault();
        perfilSection.style.display = "block";
        credencialSection.style.display = "none";
    });

    const toQRBtn = document.querySelector(".CredencialDig .image-button");
    toQRBtn.addEventListener('click', function (event) {
        event.preventDefault();
        credencialSection.style.display = "none";
        QRSection.style.display = "block";
    });

    const volverBtnQR = document.querySelector(".formulario.QR .image-volverq");
    volverBtnQR.addEventListener('click', function (event) {
        event.preventDefault();
        QRSection.style.display = "none";
        perfilSection.style.display = "block";
    });

    const volverBtnper = document.querySelector(".formulario.Eperfil .image-volverp");
    volverBtnper.addEventListener('click', function (event) {
        event.preventDefault();
        editarPerfilSection.style.display = "none";
        perfilSection.style.display = "block";
    });

    const regForm = document.getElementById("regForm");
    regForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const ncontrol = document.getElementById("ncontrol").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password === confirmPassword) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const user = {
                ncontrol: ncontrol,
                email: email,
                password: password,
                perfil: {
                    nombre: "",
                    apellidos: "",
                    carrera: "",
                    telefono: ""
                }
            };

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registro exitoso. Ahora puede iniciar sesión.");
            newSection.style.display = "none";
            loginSection.style.display = "block";
        } else {
            alert("Las contraseñas no coinciden. Intente nuevamente.");
        }
    });

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.email === email && user.password === password);
        const contenedorQR = document.getElementById('qrspacio');
        
        if (user) {
            perfilSection.style.display = "block";
            loginSection.style.display = "none";
            newSection.style.display = "none";
            editarPerfilSection.style.display = "none";
            credencialSection.style.display = "none";
            QRSection.style.display = "none";

            document.getElementById("perfilNombre").value = user.perfil.nombre;
            document.getElementById("perfilApellidos").value = user.perfil.apellidos;
            document.getElementById("perfilCarrera").value = user.perfil.carrera;
            document.getElementById("perfilTelefono").value = user.perfil.telefono;

            document.getElementById("credencialNombre").value = user.perfil.nombre;
            document.getElementById("credencialNControl").value = user.ncontrol;
            document.getElementById("credencialCarrera").value = user.perfil.carrera;

            localStorage.setItem("currentUser", JSON.stringify(user));

            // Generar el código QR
            contenedorQR.innerHTML = ''; // Limpiar cualquier QR anterior
            const qrCode = new QRCode(contenedorQR, {
                text: user.ncontrol,
                width: 150,
                height: 150
            });
        } else {
            alert("Email o contraseña incorrectos. Intente nuevamente.");
        }
    });

    const registrarseLink = document.getElementById("registrarseLink");
    registrarseLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginSection.style.display = "none";
        newSection.style.display = "block";
        perfilSection.style.display = "none";
        editarPerfilSection.style.display = "none";
        credencialSection.style.display = "none";
        QRSection.style.display = "none";
    });

    const loginLink = document.querySelectorAll("#loginLink");
    loginLink.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            loginSection.style.display = "block";
            newSection.style.display = "none";
            perfilSection.style.display = "none";
            editarPerfilSection.style.display = "none";
            credencialSection.style.display = "none";
            QRSection.style.display = "none";
        });
    });

    const perfilBtn = document.getElementById("perfilBtn");
    perfilBtn.addEventListener('click', function (event) {
        event.preventDefault();
        perfilSection.style.display = "none";
        editarPerfilSection.style.display = "block";
        credencialSection.style.display = "none";
        QRSection.style.display = "none";
    });

    const credencialBtn = document.getElementById("credencialBtn");
    credencialBtn.addEventListener('click', function (event) {
        event.preventDefault();
        perfilSection.style.display = "none";
        editarPerfilSection.style.display = "none";
        QRSection.style.display = "none";
        credencialSection.style.display = "block";
    });

    const qrBtn = document.getElementById("qrBtn");
    qrBtn.addEventListener('click', function (event) {
        event.preventDefault();
        perfilSection.style.display = "none";
        editarPerfilSection.style.display = "none";
        credencialSection.style.display = "none";
        QRSection.style.display = "block";
    });

    const guardarCambiosBtn = document.getElementById("GuardarCambioBtn");
    guardarCambiosBtn.addEventListener('click', function (event) {
        event.preventDefault();
        const nombre = document.getElementById("perfilNombre").value;
        const apellidos = document.getElementById("perfilApellidos").value;
        const carrera = document.getElementById("perfilCarrera").value;
        const telefono = document.getElementById("perfilTelefono").value;

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            currentUser.perfil.nombre = nombre;
            currentUser.perfil.apellidos = apellidos;
            currentUser.perfil.carrera = carrera;
            currentUser.perfil.telefono = telefono;

            let users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("currentUser", JSON.stringify(currentUser));

                alert("Cambios guardados exitosamente.");
            }
        }
    });

    const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");
    cerrarSesionBtn.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem("currentUser");
        loginSection.style.display = "block";
        perfilSection.style.display = "none";
        newSection.style.display = "none";
        editarPerfilSection.style.display = "none";
        credencialSection.style.display = "none";
        QRSection.style.display = "none";

        const elemento = document.getElementById('qrspacio');
        if (elemento && elemento.innerHTML.trim() !== '') {
            elemento.innerHTML = '';
        }
    });
});
