document.getElementById('translateBtn').addEventListener('click', function() {
    const elements = document.querySelectorAll('.translatable');
    const currentLang = document.documentElement.lang;

    // Alternar entre idiomas
    const newLang = currentLang === 'en' ? 'es' : 'en';
    const newFlagSrc = newLang === 'en' ? './assets/icons/esBtn.svg' : './assets/icons/enBtn.svg';
    this.src = newFlagSrc; // Cambiar la bandera

    // Cambiar el contenido de la página al nuevo idioma
    elements.forEach(function(element) {
        // Usar innerHTML para preservar la estructura interna
        element.innerHTML = element.getAttribute(`data-${newLang}`);
    });

    // Actualizar el idioma en el atributo lang del documento
    document.documentElement.lang = newLang;
});

// Botones deshabilitados con mensaje divertido
document.querySelectorAll('.social-icon[data-disabled="true"]').forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();

    const lang = document.documentElement.lang;
    const funnyMessages = {
      es: [
        "¡Oops! Aún estamos decorando esta red 🤭",
        "¡Tranquilo! Pronto estaremos allí también 📱",
        "Este botón está en vacaciones... vuelve pronto ☀️"
      ],
      en: [
        "Oops! We're still decorating this network 🤭",
        "Hang tight! We’ll be there soon 📱",
        "This button is on vacation... check back later ☀️"
      ]
    };

    const messages = funnyMessages[lang] || funnyMessages['es'];
    const message = messages[Math.floor(Math.random() * messages.length)];
    showToast(message);
  });
});

// Función para mostrar el toast
function showToast(message) {
  // Evitar duplicados
  if (document.querySelector('.toast-message')) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;

  document.body.appendChild(toast);

  // Eliminar después de 3s
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

