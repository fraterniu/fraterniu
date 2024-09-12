document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('#checkbox');
  const mobileMenu = document.querySelector('.mobile-menu-container');
  const body = document.body;

  // Mobile Menu Toggle
  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      body.classList.add('menu-open');
      mobileMenu.style.bottom = '0'; // Open the menu
    } else {
      body.classList.remove('menu-open');
      mobileMenu.style.bottom = '-100%'; // Close the menu
    }
  });

 // Language Toggle Logic
const languageToggle = document.querySelector('#languageToggle');
const elements = document.querySelectorAll('.translatable');
const langIcon = document.querySelector('#langIcon');
const currentLang = document.querySelector('#currentLang');

languageToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isEnglish = langIcon.src.includes('enBtn.svg');
    const newLang = isEnglish ? 'es' : 'en';
    
    // Cambiar el ícono de la bandera y el texto del idioma
    langIcon.src = isEnglish ? './assets/icons/esBtn.svg' : './assets/icons/enBtn.svg';
    currentLang.textContent = isEnglish ? 'Español' : 'English';
    
    // Cambiar el contenido de los elementos traducibles
    elements.forEach(element => {
        element.innerHTML = element.getAttribute(`data-${newLang}`);
    });

    // Cambiar el atributo de idioma del documento
    document.documentElement.lang = newLang;
});

});



document.addEventListener('DOMContentLoaded', () => {
  const bubbleSection = document.querySelector('.header--portrait-container');
  const bubbleContainer = document.createElement('div');
  bubbleContainer.classList.add('bubble-container');
  bubbleSection.appendChild(bubbleContainer);

  const maxBubbles = 25; // Limite de burbujas

  function createBubble() {
    // Verificar si hay más de maxBubbles
    if (bubbleContainer.children.length < maxBubbles) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.width = `${Math.random() * 36 + 14}px`; // Tamaño reducido
      bubble.style.height = bubble.style.width;
      bubble.style.animationDuration = `${Math.random() * 5 + 8}s`; // Duración de animación
      bubbleContainer.appendChild(bubble);

      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    }
  }

  setInterval(createBubble, Math.random() * 2000 + 3000); // Intervalo entre 3-5 segundos
});

