document.addEventListener('DOMContentLoaded', () => {
  // Elements and Variables
  const menuToggle = document.querySelector('#checkbox');
  const mobileMenu = document.querySelector('.mobile-menu-container');
  const body = document.body;
  const languageToggle = document.querySelector('#languageToggle');
  const elements = document.querySelectorAll('.translatable'); // Textos traducibles
  const langIcon = document.querySelector('#langIcon');
  const currentLang = document.querySelector('#currentLang');
  const bubbleSection = document.querySelector('.header--portrait-container');
  const maxBubbles = 25; // Límite de burbujas
  const buttons = document.querySelectorAll('.principles-grid-buttons button');
  const displayImage = document.getElementById('principlesdisplayImage');
  const displayText = document.getElementById('displayText');
  const scrollContainer = document.querySelector(".principles-grid-buttons ul");
  const dots = document.querySelectorAll(".dot");

  let activeButton = null; // Variable para rastrear el botón activo
  const defaultImages = { // Imágenes por defecto para la portada
      en: './assets/imgs/areaF-en.png',
      es: './assets/imgs/areaF-es.png'
  };
  const defaultText = { // Texto por defecto para la portada
      en: '___',  // Cambia el texto si es necesario
      es: '___'
  };

  let currentSlide = 0;
  const totalSlides = buttons.length; // Total de botones

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

      // Cambiar la portada según el nuevo idioma
      if (!activeButton) {
          displayImage.src = defaultImages[newLang]; // Actualizar imagen de portada
          displayText.textContent = defaultText[newLang]; // Actualizar texto de portada
      }
  }

  // Attach the language switch event
  if (languageToggle) {
      languageToggle.addEventListener('click', switchLanguage);
  }

  // Función para cambiar de slide
  function changeSlide(index) {
      const button = buttons[index];
      const lang = document.documentElement.lang || "en";
      const newImg = button.getAttribute(`data-img-${lang}`);
      const newText = button.getAttribute(`data-text-${lang}`);

      // Cambiar la imagen
      displayImage.src = newImg;
      displayText.innerHTML = newText; // innerHTML para soportar etiquetas HTML como <br>

      // Actualizar los dots
      updateDots(index);

      // Mantener el estado del botón activo
      activeButton = button;
  }

  // Actualizar el estado de los dots
  function updateDots(index) {
      dots.forEach((dot, idx) => {
          if (idx === index + 1) {
              dot.classList.add("active");
          } else {
              dot.classList.remove("active");
          }
      });
  }

  // Detectar scroll y actualizar el slide en consecuencia
  function handleScroll() {
      const scrollLeft = scrollContainer.scrollLeft;
      const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const scrollFraction = scrollLeft / scrollWidth;

      const newSlide = Math.round(scrollFraction * (totalSlides - 1));

      if (newSlide !== currentSlide) {
          currentSlide = newSlide;
          changeSlide(newSlide);
      }
  }

  // Evento para cambiar slide al presionar un botón
  buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
          currentSlide = index;
          changeSlide(index);
          scrollContainer.scrollLeft = button.offsetLeft - scrollContainer.offsetLeft;
      });
  });

  // Añadir evento de scroll
  scrollContainer.addEventListener("scroll", handleScroll);

  // Inicializar el primer slide como portada
  function initializeFirstSlide() {
      const lang = document.documentElement.lang || "en";
      displayImage.src = defaultImages[lang]; // Usar la imagen por defecto para la portada
      displayText.textContent = defaultText[lang]; // Usar el texto por defecto para la portada
      activeButton = null; // Asegurar que la portada sea tratada como "sin botón seleccionado"
      dots[0].classList.add("invisible");
      updateDots(0);
  }

  initializeFirstSlide();

  // Función para crear burbujas animadas
  function createBubble() {
      if (!bubbleSection || document.querySelectorAll('.bubble').length >= maxBubbles) return;

      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 5 + 8}s`; // Animación entre 8 y 13 segundos
      const size = Math.random() * 36 + 14; // Tamaño entre 14px y 50px
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      bubbleSection.appendChild(bubble);

      bubble.addEventListener("animationend", () => {
          bubble.remove();
      });
  }

  // Crear burbujas cada 3-5 segundos
  setInterval(createBubble, Math.random() * 2000 + 3000);
});
