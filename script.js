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
  e.preventDefault();

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
    document.getElementById('spinner-index').style.display = 'none';
    return;
  }
  // Mostrar spinner
  document.getElementById('spinner-index').style.display = 'flex';

  fetch('https://script.google.com/macros/s/AKfycbwYL8XYGMsmZ6J56KCr_--mCYFPz6tuAs52QRZxQo8pBMj1AdaEnV-EzeDb_JoKcZ134A/exec', {
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
  }).then(() => {
    if (perfilInput.value === 'artista') {
      window.location.href = 'registro-artistas.html';
    } else {
      window.location.href = 'gracias.html';
    }
  });
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

// Inicialización de FilePond para el input de imagen de perfil
if (document.getElementById('archivo')) {
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginImageTransform
  );
  FilePond.create(document.getElementById('archivo'), {
    labelIdle: 'Arrastra tu foto o <span class="filepond--label-action">Explora</span>',
    imagePreviewHeight: 170,
    imageCropAspectRatio: '1:1',
    imageResizeTargetWidth: 300,
    imageResizeTargetHeight: 300,
    stylePanelAspectRatio: 1,
    imageTransformOutputQuality: 80,
    allowImageCrop: true,
    allowImagePreview: true,
    allowImageResize: true,
    allowImageTransform: true,
    allowMultiple: false,
    acceptedFileTypes: ['image/*'],
    maxFiles: 1
  });
}

// Galería de artistas dinámica
async function cargarArtistas() {
  try {
    const response = await fetch('https://backendsavemyevent.onrender.com/api/artistas');
    const artistas = await response.json();
    const carrusel = document.querySelector('.artistas-carrusel');
    if (!carrusel) return;
    if (!artistas.length) {
      carrusel.innerHTML = '<p style="text-align:center;color:#666;font-family:\'Lexend\',Arial,sans-serif;">No hay artistas registrados aún. ¡Sé el primero!</p>';
      return;
    }
    carrusel.innerHTML = artistas.map((artista, idx) => {
      const descripcionCorta = artista.descripcion && artista.descripcion.length > 60;
      return `
        <div class="tarjeta-artista" data-idx="${idx}">
          <div class="tarjeta-imagen">
            ${artista.fileUrl ? `<img src="${artista.fileUrl}" alt="${artista.nombre}" loading="lazy">` : '<div class="placeholder-imagen">Sin imagen</div>'}
          </div>
          <div class="tarjeta-contenido">
            <div class="artista-campo-titulo">Nombre</div>
            <div class="artista-campo-texto">${artista.nombre || ''}</div>
            <div class="artista-campo-titulo">Ciudad</div>
            <div class="artista-campo-texto">${artista.ciudad || ''}</div>
            <div class="artista-campo-titulo">Talento</div>
            <div class="artista-campo-texto">${artista.talento || ''}</div>
            <div class="artista-campo-titulo">Descripción</div>
            <div class="artista-descripcion">${artista.descripcion || ''}</div>
            ${descripcionCorta ? '<button class="ver-mas-btn">Ver más</button>' : ''}
            ${artista.redSocial ? `<a href="${artista.redSocial}" class="btn-seguir" target="_blank">Sígueme</a>` : ''}
          </div>
        </div>
      `;
    }).join('');
    // Funcionalidad ver más
    document.querySelectorAll('.ver-mas-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const tarjeta = this.closest('.tarjeta-artista');
        tarjeta.classList.toggle('expandida');
        this.textContent = tarjeta.classList.contains('expandida') ? 'Ver menos' : 'Ver más';
      });
    });
  } catch (error) {
    console.error('Error al cargar artistas:', error);
    const carrusel = document.querySelector('.artistas-carrusel');
    if (carrusel) {
      carrusel.innerHTML = '<p style="text-align:center;color:#666;font-family:\'Lexend\',Arial,sans-serif;">Error al cargar los artistas</p>';
    }
  }
}

function mostrarCargandoGaleria() {
  const carrusel = document.querySelector('.artistas-carrusel');
  if (carrusel) {
    carrusel.innerHTML = `
      <div class="spinner-cargando">
        <div class="loader"></div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarCargandoGaleria();
  cargarArtistas();
}); 
