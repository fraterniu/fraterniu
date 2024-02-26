let checkbox = document.getElementById('checkbox');
    let mobileMenu = document.querySelector('.mobile-menu-container');
    let overlay = document.querySelector('.mobile-menu-container.overlay');
    let header = document.querySelector('.header');
    let hr = document.getElementById('header--hline');

document.addEventListener('DOMContentLoaded', function () {
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            console.log('Menú abierto');
            // Muestra el menú y el fondo de superposición
            mobileMenu.style.bottom = '0';
            overlay.style.display = 'block';
            document.body.classList.add('menu-open');
        } else {
            console.log('Menú cerrado');
            // Oculta el menú y el fondo de superposición
            mobileMenu.style.bottom = '-100%';
            overlay.style.display = 'none';
            document.body.classList.remove('menu-open');
        }
    });

    // Cierra el menú si se hace clic en el fondo de superposición
    overlay.addEventListener('click', function () {
        checkbox.checked = false;
        // También puedes agregar lógica adicional aquí, si es necesario
    });
});
