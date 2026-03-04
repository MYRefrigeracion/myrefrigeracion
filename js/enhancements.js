// Mejoras de interactividad y funcionalidades

// Lazy Loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img.lazyload');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
});

// FAQ Interactivo
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}

// Botón de WhatsApp
function initWhatsApp() {
  const whatsappButton = document.querySelector('.whatsapp-float');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
      window.open('https://wa.me/543815862899', '_blank');
    });
  }
}

// Chat en vivo
function initChatWidget() {
  const chatButton = document.querySelector('.chat-button');
  const chatWidget = document.querySelector('.chat-widget');
  
  if (chatButton && chatWidget) {
    chatButton.addEventListener('click', () => {
      chatWidget.classList.toggle('active');
    });
  }
}

// Notificaciones Push
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(function(result) {
      if (result === 'granted') {
        console.log('Notificaciones permitidas');
      }
    });
  }
}

// Validación mejorada del formulario
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Por favor, complete todos los campos obligatorios');
      }
    });
  });
});

// Inicialización de todas las mejoras
document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
  initWhatsApp();
  initChatWidget();
  requestNotificationPermission();
});
