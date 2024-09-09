document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.pilars-container--card');
  let activeCardIndex = 0; // Índice de la tarjeta activa

  // Función para actualizar la tarjeta visible
  function updateActiveCard() {
    cards.forEach((card, index) => {
      card.style.display = index === activeCardIndex ? 'block' : 'none';
    });
  }

  // Inicializa la primera tarjeta como visible
  updateActiveCard();

  // Evento para el botón "Anterior"
  document.querySelector('.slider-prev').addEventListener('click', () => {
    activeCardIndex = activeCardIndex > 0 ? activeCardIndex - 1 : cards.length - 1;
    updateActiveCard();
  });

  // Evento para el botón "Siguiente"
  document.querySelector('.slider-next').addEventListener('click', () => {
    activeCardIndex = activeCardIndex < cards.length - 1 ? activeCardIndex + 1 : 0;
    updateActiveCard();
  });

  // Función para ajustar la visibilidad de las tarjetas en el cambio de tamaño de la ventana
  function adjustCardVisibilityForWindowSize() {
    if (window.innerWidth > 750) {
      // Muestra todas las tarjetas si la ventana es más ancha que 750px
      cards.forEach(card => {
        card.style.display = 'block';
      });
    } else {
      // Llama a updateActiveCard para asegurar que solo la tarjeta activa se muestre en pantallas pequeñas
      updateActiveCard();
    }
  }

  // Añade el escuchador de eventos de cambio de tamaño de la ventana
  window.addEventListener('resize', adjustCardVisibilityForWindowSize);

  // Ajusta la visibilidad de las tarjetas inicialmente en caso de que la ventana ya sea más ancha que 750px
  adjustCardVisibilityForWindowSize();
});

