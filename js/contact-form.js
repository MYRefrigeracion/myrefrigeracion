// Función para mostrar el mensaje de éxito
function showSuccessMessage() {
  const successOverlay = document.getElementById('success-overlay');
  successOverlay.style.display = 'flex';
  
  // Ocultar después de 2 segundos
  setTimeout(() => {
    successOverlay.classList.add('fade-out');
    setTimeout(() => {
      successOverlay.style.display = 'none';
      successOverlay.classList.remove('fade-out');
    }, 500);
  }, 2000);
}

// Manejar el envío del formulario
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contacto-form');
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
      // Validar campos requeridos
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        alert('Por favor, complete todos los campos requeridos');
        return;
      }

      // Deshabilitar el botón de envío
      submitButton.disabled = true;
      submitButton.textContent = 'Consulta enviada';
      
      // Limpiar el formulario
      this.reset();
      
      // Mostrar mensaje de éxito
      showSuccessMessage();
      
      // Habilitar el botón de envío después de 2 segundos
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Consulta';
      }, 2000);
    });
  }
});
