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
    'Mind': './assets/icons/mindlightGrey.svg',
    'Body': './assets/icons/bodylightGrey.svg',
    'Resources': './assets/icons/resourceslightGrey.svg',
    'Value': './assets/icons/valorlightGrey.svg',
    'Environment': './assets/icons/enviromentlightGrey.svg'
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

  const areasChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(icons),
      datasets: [{
        label: 'Priority',
        data: Object.keys(icons).map(label => {
          return label === 'Mind' ? Math.floor(Math.random() * 40) + 50 : Math.floor(Math.random() * 80) + 10;
        }), // "Mind" always between 50% and 90%
        backgroundColor: '#fff',
        borderColor: '#c49102',
        borderWidth: 1,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          display: false, // Remove y-axis values
          grid: {
            drawBorder: true, // Keep the y-axis line
            color: '#fff' // Set the color of the y-axis grid line to white
          }
        },
        x: {
          ticks: {
            display: false
          },
          grid: {
            drawBorder: true, // Keep the x-axis line
            color: '#fff' // Set the color of the x-axis grid line to white
          },
          title: {
            display: true,
            text: 'Areas',
            font: {
              size: 18
            },
            color: '#000'
          }
        }
      },
      plugins: {
        afterDatasetsDraw: function(chart) {
          const ctx = chart.ctx;
          chart.data.labels.forEach((label, index) => {
            const image = new Image();
            image.src = icons[label];
            image.onload = function() {
              const x = chart.scales.x.getPixelForValue(index);
              const y = chart.scales.y.bottom + 10;
              ctx.drawImage(image, x - 12, y, 24, 24);
            };
          });
        },
        // Show values inside the bars
        datalabels: {
          display: true,
          color: '#000',
          anchor: 'end',
          align: 'top',
          formatter: function(value) {
            return value + '%'; // Show the percentage value inside the bar
          },
          font: {
            size: 14
          }
        }
      },
      animation: {
        duration: 3000, // Display for 3 seconds
        easing: 'easeInOutQuad',
        onComplete: function() {
          setTimeout(() => {
            updateChartValues();
            areasChart.update();
          }, 1000); // Wait 1 second before updating
        }
      }
    }
  });

  // Function to update the chart values
  function updateChartValues() {
    if (resetToZero) {
      areasChart.options.animation.duration = 2000;
      areasChart.data.datasets[0].data = areasChart.data.labels.map(() => 0);
      resetToZero = false;
    } else {
      areasChart.options.animation.duration = 3000; // Rise for 3 seconds
      areasChart.data.datasets[0].data = areasChart.data.labels.map(label => {
        return label === 'Mind' ? Math.floor(Math.random() * 40) + 50 : Math.floor(Math.random() * 80) + 10;
      });
      resetToZero = true;
    }
  }

  // Start the update cycle every 6 seconds (3s rise, 2s fall, 1s pause)
  setInterval(() => {
    areasChart.update();
  }, 6000);

  // Mobile menu toggle
  menuToggle.addEventListener('change', toggleMobileMenu);

  // Language toggle
  languageToggle.addEventListener('click', switchLanguage);

  // Bubble animation
  bubbleContainer.classList.add('bubble-container');
  bubbleSection.appendChild(bubbleContainer);
  setInterval(createBubble, Math.random() * 2000 + 3000); // Create bubbles at random intervals between 3s and 5s
});


