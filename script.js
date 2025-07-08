// Selección de perfil
const artistaBtn = document.getElementById('artista-btn');
const empresaBtn = document.getElementById('empresa-btn');
const perfilInput = document.getElementById('perfil');
const errorPerfil = document.getElementById('error-perfil');

artistaBtn.addEventListener('click', () => {
  artistaBtn.classList.add('selected');
  empresaBtn.classList.remove('selected');
  perfilInput.value = 'artista';
  errorPerfil.textContent = '';
});
empresaBtn.addEventListener('click', () => {
  empresaBtn.classList.add('selected');
  artistaBtn.classList.remove('selected');
  perfilInput.value = 'empresa';
  errorPerfil.textContent = '';
});

// Validación de campos y envío
const form = document.getElementById('form');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const errorNombre = document.getElementById('error-nombre');
const errorEmail = document.getElementById('error-email');

// Placeholder desaparece al escribir
[nombreInput, emailInput].forEach(input => {
  input.addEventListener('input', () => {
    input.placeholder = '';
  });
});

form.addEventListener('submit', function(e) {
  let valido = true;

  // Validar nombre
  if (!nombreInput.value.trim().match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/)) {
    errorNombre.textContent = 'Completa los campos';
    valido = false;
  } else {
    errorNombre.textContent = '';
  }

  // Validar email
  if (!emailInput.value.trim().match(/^\S+@\S+\.\S+$/)) {
    errorEmail.textContent = 'Completa los campos';
    valido = false;
  } else {
    errorEmail.textContent = '';
  }

  // Validar perfil
  if (!perfilInput.value) {
    errorPerfil.textContent = 'Completa los campos';
    valido = false;
  } else {
    errorPerfil.textContent = '';
  }

  if (!valido) {
    e.preventDefault();
  } else {
    // Enviar a Google Sheets (Apps Script)
    fetch('https://script.google.com/macros/s/AKfycbxZvxoO9Ok-UqoGpm6GxGjxdHV9NTWpMKYH8ahjyykc8M03KkfWyvTCO8vagf181SvOtQ/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        nombre: nombreInput.value,
        email: emailInput.value,
        perfil: perfilInput.value
      })
    });
    // Redirección manual tras el envío exitoso
    setTimeout(function() {
      window.location.href = 'gracias.html';
    }, 100);
  }
});

// Menú hamburguesa mobile
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMenuBtn = document.getElementById('close-menu-btn');

if (hamburgerBtn && mobileMenuOverlay) {
  hamburgerBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('show');
  });
}
if (closeMenuBtn && mobileMenuOverlay) {
  closeMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('show');
  });
}
// Cerrar menú al hacer click en un enlace del menú móvil
if (mobileMenuOverlay) {
  mobileMenuOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('show');
    });
  });
} 