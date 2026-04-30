document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contacto-form');
  if (!form) return;
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (event) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(function (field) {
      const ok = field.type === 'checkbox' ? field.checked : String(field.value || '').trim().length > 0;
      field.classList.toggle('error', !ok);
      if (!ok) isValid = false;
    });

    if (!isValid) {
      event.preventDefault();
      alert('Por favor, completá los campos requeridos antes de enviar.');
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando consulta...';
    }
  });
});
