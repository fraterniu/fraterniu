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
    const buttons = document.querySelectorAll('.principles-grid-buttons button');
    const displayImage = document.getElementById('principlesdisplayImage');
    const displayText = document.getElementById('displayText');
  
    let activeButton = null; // Variable to track the active button
    const defaultImages = { // Imágenes por defecto para la portada
      en: './assets/imgs/areaF-en.png',
      es: './assets/imgs/areaF-es.png'
    };
    const defaultText = { // Texto por defecto para la portada
      en: '',
      es: ''
    };
  
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
  
    // Función para actualizar la imagen principal según el idioma y el botón activo o imagen por defecto
    function updateMainImage(lang) {
      if (activeButton) {
        // Si hay un botón activo, cambia la imagen según el botón
        const newImage = getImageForScreenSize(activeButton, lang);
        displayImage.src = newImage;
        displayText.textContent = activeButton.getAttribute(`data-text-${lang}`);
      } else {
        // Si no hay un botón activo, mostrar la imagen y texto por defecto
        displayImage.src = defaultImages[lang];
        displayText.textContent = defaultText[lang];
      }
  
      // Aplicar filtro si corresponde a las imágenes de área E
      if (displayImage.src.includes('areaE-en.png') || displayImage.src.includes('areaE-es.png')) {
        displayImage.style.filter = 'drop-shadow(0 0 0 10px rgba(0,0,0,.8))';
      } else {
        displayImage.style.filter = 'none';
      }
    }
  
    // Get the correct image for the current screen size and language
    function getImageForScreenSize(button, lang) {
      const smallScreenImage = button.getAttribute(`data-img-${lang}`);
      const largeScreenImage = button.getAttribute(`data-img-${lang}-large`);
      
      // Use the large image if screen is wider than 600px, otherwise use the small one
      return window.matchMedia('(min-width: 600px)').matches ? largeScreenImage || smallScreenImage : smallScreenImage;
    }
  
    // Update button images dynamically (but not the icons) based on language and screen size
    function updateButtonImages(lang) {
      buttons.forEach(button => {
        const newImage = getImageForScreenSize(button, lang);
        
        // Update the displayed image if the button is active
        if (button.classList.contains('active')) {
          displayImage.src = newImage;
        }
      });
    }
  
    // Handle the visual update of the selected button and update the image displayed above
    function updateDisplay(button) {
      const lang = document.documentElement.lang || 'en';
      const newImage = getImageForScreenSize(button, lang);
  
      // Actualizar la imagen principal con base en el botón clickeado
      displayImage.src = newImage;
      displayText.textContent = button.getAttribute(`data-text-${lang}`);
  
      // Aplicar filtro solo a las imágenes PNG específicas
      if (newImage.includes('areaE-en.png') || newImage.includes('areaE-es.png')) {
        displayImage.style.filter = 'drop-shadow(0 0 0 10px rgba(0,0,0,1))';
      } else {
        displayImage.style.filter = 'none';
      }
  
      // Cambiar el estado activo del botón y guardar el botón activo
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeButton = button; // Actualizamos el botón activo
    }
  
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
  
    // Update display when a button is clicked
    buttons.forEach(button => {
      button.addEventListener('click', () => updateDisplay(button));
    });
  
    // Adjust images on screen size change
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    mediaQuery.addListener(() => {
      const currentLang = document.documentElement.lang || 'en';
      updateButtonImages(currentLang);
    });
  
    // Bubble animation
    bubbleContainer.classList.add('bubble-container');
    bubbleSection.appendChild(bubbleContainer);
    setInterval(createBubble, Math.random() * 2000 + 3000); // Create bubbles at random intervals between 3s and 5s

    // NUEVA PARTE DEL CODIGO

    // Arreglo para almacenar las palabras seleccionadas
let selectedWords = [];

// Selecciona todas las tarjetas (cards) que contienen las palabras
const cards = document.querySelectorAll('.vuca-card');

// Función para actualizar la caja de selección
function updateSelectionBox() {
    const selectionBox = document.getElementById('selection-vuca-box');
    selectionBox.innerHTML = selectedWords.join(', ');  // Muestra las palabras seleccionadas
}

// Función para validar la selección de palabras
function validateSelection() {
    // Lanza el confeti cuando se validan las palabras
    lanzarConfeti();
    
    // Aquí puedes agregar la lógica de validación según las palabras seleccionadas
    console.log('Palabras seleccionadas: ', selectedWords);
    
    // Restablece la selección de palabras después de la validación
    selectedWords = [];
    updateSelectionBox();  // Limpia la caja de selección
}

// Función para lanzar confeti desde la parte inferior central
function lanzarConfeti() {
    confetti({
        particleCount: 100,  // Número de partículas
        angle: 90,           // Ángulo de salida (90 para que vaya hacia arriba)
        spread: 70,          // Dispersión hacia los lados
        origin: { 
            x: 0.5,          // Centro en el eje X (parte media de la pantalla)
            y: 1             // Parte inferior de la pantalla
        }
    });
}

// Manejar los eventos para seleccionar las cartas
cards.forEach(card => {
    card.addEventListener('click', () => {
        const word = card.getAttribute(`data-${currentLang}`);  // Obtiene la palabra según el idioma actual

        // Verifica si la palabra ya ha sido seleccionada y si no se ha alcanzado el límite de 4 palabras
        if (!selectedWords.includes(word) && selectedWords.length < 4) {
            selectedWords.push(word);  // Agrega la palabra seleccionada
            updateSelectionBox();      // Actualiza la caja de selección
        }

        // Si se seleccionan 4 palabras, se valida la selección y se lanza el confeti
        if (selectedWords.length === 4) {
            validateSelection();
        }
    });
});

  });


