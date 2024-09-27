document.addEventListener('DOMContentLoaded', () => {
    // Elements and Variables
    const menuToggle = document.querySelector('#checkbox');
    const mobileMenu = document.querySelector('.mobile-menu-container');
    const body = document.body;
    const languageToggle = document.querySelector('#languageToggle');
    const elements = document.querySelectorAll('.translatable');
    const langIcon = document.querySelector('#langIcon');
    const currentLang = document.querySelector('#currentLang');
    const bubbleSection = document.querySelector('.header--portrait-container');
    const maxBubbles = 25; // Limit of bubbles
    const bubbleContainer = document.createElement('div');
    const cards = document.querySelectorAll('.area-detail--card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

  
    // Helper Functions
  
    // Toggle the class for opening and closing the mobile menu
    function toggleClass(element, className, condition) {
      element.classList[condition ? 'add' : 'remove'](className);
    }
  
    // Handles the mobile menu opening/closing
    function toggleMobileMenu() {
      const isOpen = menuToggle.checked;
      toggleClass(body, 'menu-open', isOpen);
      mobileMenu.style.bottom = isOpen ? '0' : '-100%';
    }
  
    // Switch language (English/Spanish) and update content accordingly
    function switchLanguage(e) {
      e.preventDefault();
      const isEnglish = langIcon.src.includes('enBtn.svg');
      const newLang = isEnglish ? 'es' : 'en';
      
      // Change flag icon and language text
      langIcon.src = `./assets/icons/${newLang}Btn.svg`;
      currentLang.textContent = isEnglish ? 'Español' : 'English';
      
      // Update the text content of translatable elements
      elements.forEach(element => {
        element.innerHTML = element.getAttribute(`data-${newLang}`);
      });
  
      // Update the document language attribute
      document.documentElement.lang = newLang;
  
      // Update the displayed image based on the current language and active button
      updateMainImage(newLang);
    }

      // Función para actualizar la tarjeta activa y los indicadores
  function updateSlider(index) {
    // Ocultar todas las tarjetas
    cards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Mostrar la tarjeta correspondiente
    cards[index].classList.add('active');
    
    // Actualizar los indicadores
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
  }

  // Función para avanzar a la siguiente tarjeta
  function nextCard() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Volver al inicio si estamos en la última tarjeta
    }
    updateSlider(currentIndex);
  }

  // Función para retroceder a la tarjeta anterior
  function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = cards.length - 1; // Ir al final si estamos en la primera tarjeta
    }
    updateSlider(currentIndex);
  }

  // Event listeners para las flechas
  nextBtn.addEventListener('click', nextCard);
  prevBtn.addEventListener('click', prevCard);

  // Event listeners para los indicadores (puntos)
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
    });
  });

  // Inicializar el slider
  updateSlider(currentIndex);
  
  
    // Create a floating bubble element and animate it
    function createBubble() {
      if (bubbleContainer.children.length < maxBubbles) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        const size = Math.random() * 36 + 14; // Size between 14px and 50px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.animationDuration = `${Math.random() * 5 + 8}s`; // Animation duration between 8s and 13s
        bubbleContainer.appendChild(bubble);
  
        bubble.addEventListener('animationend', () => {
          bubble.remove();
        });
      }
    }
  
    // Event listeners and actions
  
    // Mobile menu toggle
    menuToggle.addEventListener('change', toggleMobileMenu);
  
    // Language toggle
    languageToggle.addEventListener('click', switchLanguage);
  
    // Bubble animation
    bubbleContainer.classList.add('bubble-container');
    bubbleSection.appendChild(bubbleContainer);
    setInterval(createBubble, Math.random() * 2000 + 3000); // Create bubbles at random intervals between 3s and 5s

  });


