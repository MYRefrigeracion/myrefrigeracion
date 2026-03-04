// Código específico para eliminar el banner de Gamma
(function() {
    // Esperamos a que el DOM cargue completamente
    document.addEventListener('DOMContentLoaded', function() {
        // Removemos el banner específico
        const banner = document.querySelector('.chakra-link[data-id="made-with-gamma-btn"]');
        if (banner) {
            banner.style.display = 'none';
        }

        // Removemos el SVG específico
        const svg = document.querySelector('svg[id="Layer_1"]');
        if (svg) {
            svg.style.display = 'none';
        }

        // Observador para cambios en el DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Solo elementos
                        // Ocultar solo el banner específico
                        if (node.dataset.id === 'made-with-gamma-btn') {
                            node.style.display = 'none';
                        }
                        // Ocultar el SVG específico
                        if (node.id === 'Layer_1' && node.tagName === 'SVG') {
                            node.style.display = 'none';
                        }
                    }
                });
            });
        });

        // Configuración del observador
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    });
})();
