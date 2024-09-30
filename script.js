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
  const ctx = document.getElementById('areasChart').getContext('2d');

  let currentIndex = 0;
  let resetToZero = true; // Controla si los valores deben bajar a 0 o actualizarse con nuevos valores

  const icons = {
    'Mente': './assets/icons/mindlightGrey.svg',
    'Cuerpo': './assets/icons/bodylightGrey.svg',
    'Recursos': './assets/icons/resourceslightGrey.svg',
    'Valor': './assets/icons/valorlightGrey.svg',
    'Entorno': './assets/icons/enviromentlightGrey.svg'
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

    // Cambiar el icono de la bandera y el texto del idioma
    langIcon.src = `./assets/icons/${newLang}Btn.svg`;
    currentLang.textContent = isEnglish ? 'Español' : 'English';

    // Actualizar el contenido de texto de los elementos traducibles
    elements.forEach(element => {
      element.innerHTML = element.getAttribute(`data-${newLang}`);
    });

    // Actualizar las imágenes según el idioma
    document.querySelectorAll('.translatable-image').forEach(img => {
      img.src = img.getAttribute(`data-${newLang}`);
    });

    // Actualizar el atributo de idioma del documento
    document.documentElement.lang = newLang;

    // Cambiar títulos del gráfico según el idioma
    // Cambiar títulos del gráfico según el idioma
    areasChart.options.scales.y.title.text = newLang === 'es' ? 'Tiempo (%)' : 'Time (%)';
    areasChart.data.datasets[0].label = newLang === 'es' ? 'Prioridad' : 'Priority';
    areasChart.options.scales.x.title.text = newLang === 'es' ? 'Áreas' : 'Areas';

    areasChart.update(); // Refrescar el gráfico con los nuevos textos
  }

  // Función para actualizar la tarjeta activa y los indicadores
  function updateSlider(index) {
    cards.forEach(card => {
      card.classList.remove('active');
    });

    cards[index].classList.add('active');

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

  // Gráfica de Áreas con Chart.js
  const areasChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(icons), // Using the area names as labels
      datasets: [{
        label: 'Priority',
        data: Object.keys(icons).map(() => Math.floor(Math.random() * 80) + 10), // Generar valores aleatorios
        backgroundColor: '#c49102',
        borderColor: '#c49102',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10 // Mostrar valores en pasos de 10%
          },
          title: {
            display: true,
            text: 'Time (%)'
          }
        },
        x: {
          ticks: {
            display: false // Oculta las etiquetas de texto
          },
          title: {
            display: true,
            text: 'Areas'
          }
        }
      },
      plugins: {
        // Adding the custom icons to the x-axis labels
        afterDatasetsDraw: function(chart) {
          const ctx = chart.ctx;
          chart.data.labels.forEach((label, index) => {
            const image = new Image();
            image.src = icons[label];
            image.onload = function() {
              const x = chart.scales.x.getPixelForValue(index);
              const y = chart.scales.y.bottom + 10;
              ctx.drawImage(image, x - 12, y, 24, 24); // Tamaño y posición ajustados
            };
          });
        }
      },
      animation: {
        duration: 3000, // Duración de la animación de 3 segundos
        easing: 'easeInOutQuad',
        loop: false, // No hacer que la animación se repita sola
      },
      plugins: {
        afterDraw: function(chart) {
          if (!chart.stopUpdate) {
            chart.stopUpdate = setInterval(() => {
              if (resetToZero) {
                // Fase de bajar los valores a 0
                chart.data.datasets[0].data = chart.data.labels.map(() => 0);
                resetToZero = false;
              } else {
                // Fase de actualizar con nuevos valores entre 10% y 90%
                chart.data.datasets[0].data = chart.data.labels.map(() => {
                  return Math.floor(Math.random() * 80) + 10; // Nuevos valores aleatorios
                });
                resetToZero = true;
              }
              chart.update(); // Actualizar el gráfico con los nuevos valores
            }, 5000); // El ciclo completo dura 5 segundos: 3 segundos para animar y 2 de pausa
          }
        }
      }
      
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener('change', toggleMobileMenu);

  // Language toggle
  languageToggle.addEventListener('click', switchLanguage);

  // Bubble animation
  bubbleContainer.classList.add('bubble-container');
  bubbleSection.appendChild(bubbleContainer);
  setInterval(createBubble, Math.random() * 2000 + 3000); // Create bubbles at random intervals between 3s and 5s
});


