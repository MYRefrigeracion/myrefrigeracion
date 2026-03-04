document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contacto form');
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    form.parentNode.insertBefore(notificacion, form);

    // Contenedor para los comentarios
    const comentariosContainer = document.createElement('div');
    comentariosContainer.className = 'comentarios-container';
    form.parentNode.insertBefore(comentariosContainer, form);

    // Cargar comentarios al inicio
    function cargarComentarios() {
        fetch('/myrefrigeracion/comentarios.php')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const comentarios = data.comentarios;
                    comentariosContainer.innerHTML = comentarios.map(comentario => `
                        <div class="comentario">
                            <div class="comentario-header">
                                <span class="nombre">${comentario.nombre}</span>
                                <span class="fecha">${comentario.fecha}</span>
                            </div>
                            <div class="comentario-contenido">
                                ${comentario.mensaje}
                            </div>
                        </div>
                    `).join('');
                }
            })
            .catch(error => {
                console.error('Error al cargar comentarios:', error);
            });
    }

    // Cargar comentarios al inicio
    cargarComentarios();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Deshabilitar el botón durante el envío
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        fetch('/myrefrigeracion/comentarios.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                notificacion.className = 'notificacion exito';
                notificacion.textContent = data.message;
                form.reset();
                // Recargar los comentarios después de enviar
                cargarComentarios();
            } else {
                notificacion.className = 'notificacion error';
                notificacion.textContent = data.message;
            }
        })
        .catch(error => {
            notificacion.className = 'notificacion error';
            notificacion.textContent = 'Error al enviar el comentario. Por favor, intenta nuevamente.';
        })
        .finally(() => {
            // Restaurar el botón después de 2 segundos
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                // Ocultar la notificación después de 5 segundos
                setTimeout(() => {
                    notificacion.className = 'notificacion';
                }, 5000);
            }, 2000);
        });
    });
});
