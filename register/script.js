
let selectedType = "";
const artistBtn = document.getElementById("artistBtn");
const companyBtn = document.getElementById("companyBtn");

artistBtn.onclick = () => {
    selectedType = "artist";
    artistBtn.classList.add("active");
    companyBtn.classList.remove("active");
    document.getElementById("accountTypeError").innerText = "";
};

companyBtn.onclick = () => {
    selectedType = "company";
    companyBtn.classList.add("active");
    artistBtn.classList.remove("active");
    document.getElementById("accountTypeError").innerText = "";
};

document.getElementById("registerForm").onsubmit = function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    if (!selectedType) {
        document.getElementById("accountTypeError").innerText = "Selecciona un tipo de cuenta.";
        valid = false;
    }

    if (!name || !email || !pass || !confirm) {
        alert("Completa todos los campos obligatorios.");
        valid = false;
    }

    if (pass !== confirm) {
        document.getElementById("passwordError").innerText = "Las contraseñas no coinciden.";
        valid = false;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    if (!terms) {
        document.getElementById("termsError").innerText = "Debes aceptar los términos.";
        valid = false;
    } else {
        document.getElementById("termsError").innerText = "";
    }

    if (valid) {
        window.location.href = selectedType === "artist" ? "/registro/artista" : "/registro/empresa";
    }
};
