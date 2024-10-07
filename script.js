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
  const pillars = document.querySelectorAll('.pilar-card');
  const track = document.querySelector('.carousel-track');
  const logos = [...document.querySelectorAll('.carousel-track img')]; // Usamos array para manipular con más facilidad
  const promoBox = document.getElementById('frater-promo--box');
  const closeButton = document.getElementById('fpromoclose-btn');

  let currentIndex = 0;
  let resetToZero = true; // Controla si los valores deben bajar a 0 o actualizarse con nuevos valores
  let scrollPosition = 0;
  let speed = 0.5; // Ajusta este valor para controlar la velocidad



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
    areasChart.options.scales.y.title.text = newLang === 'es' ? 'Tiempo' : 'Time';
    areasChart.data.datasets[0].label = newLang === 'es' ? 'Enfoque' : 'Focus';
    areasChart.options.scales.x.title.text = newLang === 'es' ? 'Áreas' : 'Areas';

    // Forzar la actualización del tooltip para que muestre el nuevo idioma
    areasChart.options.plugins.tooltip.callbacks.title = function(context) {
      const labels = newLang === 'es' ? ['Mente', 'Cuerpo', 'Recursos', 'Valor', 'Entorno'] : ['Mind', 'Body', 'Resources', 'Value', 'Environment'];
      return labels[context[0].dataIndex];
    };

    areasChart.update(); // Refrescar el gráfico con los nuevos textos
  }

  // Comportamiento al hacer clic en la X (Cerrar caja)
      closeButton.addEventListener('click', function () {
        promoBox.style.display = 'none';
    });

    // Comportamiento al hacer scroll (desaparece la caja)
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        if (scrollY > 50) { // Cambiar el valor de scroll según el comportamiento deseado
            promoBox.style.display = 'none';
        }
    });

  


  pillars.forEach(pillar => {
      pillar.addEventListener('click', (event) => {
          event.stopPropagation(); // Evita que el clic se propague al body
          pillars.forEach(p => {
              if (p !== pillar) {
                  p.classList.add('inactive');  // Oculta los pilares no seleccionados
                  p.classList.remove('active');
              } else {
                  p.classList.remove('inactive');
                  p.classList.add('active');  // Activa el pilar clicado
              }
          });
      });
  });

// Escucha el clic en cualquier parte fuera de las tarjetas
  document.addEventListener('click', (event) => {
      const isClickInside = event.target.closest('.pilar-card');
      if (!isClickInside) {
          pillars.forEach(p => {
              p.classList.remove('active', 'inactive');  // Quita las clases para restaurar el estado inicial
          });
      }
  });



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
        label: 'Focus',
        data: Object.keys(icons).map(label => {
          return label === 'Mind' ? Math.floor(Math.random() * 40) + 50 : Math.floor(Math.random() * 80) + 10;
        }), // "Mind" always between 50% and 90%
        backgroundColor: '#c49102',
        borderColor: '#c49102',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            display: false // Hide only the ticks (values), keep the y-axis line
          },
          grid: {
            drawBorder: true, // Keep the y-axis line visible
            color: '#fff' // Set the color of the y-axis grid line to white
          },
          title: {
            display: true, // Show the title
            text: 'Time', // The title text, this will change with translation
            font: {
              size: 18
            },
            color: '#000'
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

  

  track.addEventListener('mouseover', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('mouseout', () => {
    track.style.animationPlayState = 'running';
  });

// Duplicamos el contenido para asegurar que siempre haya suficientes logos visibles en el track
const cloneLogos = () => {
  logos.forEach(logo => {
    const clonedLogo = logo.cloneNode(true);
    track.appendChild(clonedLogo);
  });
};

// Función para mover el carrusel
const moveLogos = () => {
  scrollPosition -= speed;

  // Si se desplaza un logo fuera de la vista, lo movemos al final
  if (Math.abs(scrollPosition) >= logos[0].offsetWidth) {
    scrollPosition = 0;
    track.appendChild(track.firstElementChild); // Mueve el primer logo al final del track
  }
  
  track.style.transform = `translateX(${scrollPosition}px)`;
  requestAnimationFrame(moveLogos); // Sigue animando
};

// Inicializa el carrusel
cloneLogos(); // Duplicamos logos para hacer el track más largo
moveLogos();  // Inicia la animación

  // Mobile menu toggle
  menuToggle.addEventListener('change', toggleMobileMenu);

  // Language toggle
  languageToggle.addEventListener('click', switchLanguage);

  // Bubble animation
  bubbleContainer.classList.add('bubble-container');
  bubbleSection.appendChild(bubbleContainer);
  setInterval(createBubble, Math.random() * 2000 + 3000); // Create bubbles at random intervals between 3s and 5s
});


