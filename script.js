document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('#checkbox');
  const languageToggle = document.querySelector('#languageToggle');
  const mobileMenu = document.querySelector('.mobile-menu-container');
  const mobileLangMenu = document.querySelector('.language-menu');
  const body = document.body;
  const langIcon = document.querySelector('#langIcon');
  
  // Mobile Menu Toggle
  menuToggle.addEventListener('change', () => {
    if (menuToggle.checked) {
      body.classList.add('menu-open');
      mobileMenu.style.bottom = '0';  // Ensure mobile menu slides up
    } else {
      body.classList.remove('menu-open');
      mobileMenu.style.bottom = '-100%';  // Hide mobile menu
    }
  });

  // Language Menu Toggle
  languageToggle.addEventListener('click', (e) => {
    e.preventDefault();
    mobileLangMenu.classList.toggle('active');
    
    if (mobileLangMenu.classList.contains('active')) {
      body.classList.add('menu-open');
      mobileLangMenu.style.bottom = '0';  // Slide the language menu up
    } else {
      body.classList.remove('menu-open');
      mobileLangMenu.style.bottom = '-100%';  // Hide the language menu
    }
  });

  // Language Selection Logic
  const languageLinks = document.querySelectorAll('.language-menu a');
  languageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = e.target.getAttribute('data-lang');

      if (selectedLang === 'en') {
        // Set English
        langIcon.src = './assets/icons/enBtn.svg';
      } else if (selectedLang === 'es') {
        // Set Spanish
        langIcon.src = './assets/icons/esBtn.svg'; // Assuming you have a Spanish icon
      }

      // Close the language menu after selection
      mobileLangMenu.style.bottom = '-100%';
      mobileLangMenu.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Close Language Menu on Outside Click (Optional)
  document.addEventListener('click', (e) => {
    if (!languageToggle.contains(e.target) && !mobileLangMenu.contains(e.target)) {
      mobileLangMenu.style.bottom = '-100%';
      mobileLangMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const bubbleSection = document.querySelector('.header--portrait-container');
  const bubbleContainer = document.createElement('div');
  bubbleContainer.classList.add('bubble-container');
  bubbleSection.appendChild(bubbleContainer);

  function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${Math.random() * 36 + 14}px`; // Tamaño reducido (antes 60+20px)
    bubble.style.height = bubble.style.width;
    bubble.style.animationDuration = `${Math.random() * 5 + 8}s`; // Más tiempo de animación
    bubbleContainer.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
      bubble.remove();
    });
  }

  setInterval(createBubble, Math.random() * 2000 + 3000); // Intervalo entre 3-5 segundos
});
