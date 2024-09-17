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

    // Update the displayed image based on the current language
    updateButtonImages(newLang);
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

    // Update the main display image and text
    displayImage.src = newImage;
    displayText.textContent = button.getAttribute(`data-text-${lang}`);

    // Set the active state for the clicked button
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
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
});
