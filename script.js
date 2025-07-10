document.getElementById('translateBtn').addEventListener('click', function() {
    const elements = document.querySelectorAll('.translatable');
    const currentLang = document.documentElement.lang;

    // Alternar entre idiomas
    const newLang = currentLang === 'en' ? 'es' : 'en';
    const newFlagSrc = newLang === 'en' ? './assets/icons/esBtn.svg' : './assets/icons/enBtn.svg';
    this.src = newFlagSrc; // Cambiar la bandera

    // Cambiar el contenido de la página al nuevo idioma
    elements.forEach(function(element) {
        // Usar innerHTML para preservar la estructura interna
        element.innerHTML = element.getAttribute(`data-${newLang}`);
    });

    // Actualizar el idioma en el atributo lang del documento
    document.documentElement.lang = newLang;
});