// Funciones para manejar la navegación entre videos
let currentVideoAA = 0; // Índice del video actual para Aire Acondicionados
let currentVideoHF = 0; // Índice del video actual para Heladeras y Freezer

// Función para cambiar entre categorías de videos
function changeVideoCategory(category) {
    // Ocultar todos los grupos
    document.querySelectorAll('.video-group').forEach(group => {
        group.classList.remove('active');
    });
    
    // Mostrar el grupo seleccionado
    document.getElementById(`videos-${category}`).classList.add('active');
}

// Función para cambiar a video anterior
function prevVideo(playerId) {
    const videoPlayer = document.getElementById(`videoPlayer${playerId}`);
    const videoContainer = videoPlayer.closest('.video-group');
    const category = videoContainer.id.includes('aa') ? 'aa' : 'hf';
    
    if (category === 'aa') {
        currentVideoAA = (currentVideoAA - 1 + 5) % 5; 
        videoPlayer.src = `videos/${category}/${currentVideoAA}.mp4`;
    } else {
        currentVideoHF = (currentVideoHF - 1 + 5) % 5;
        videoPlayer.src = `videos/${category}/${currentVideoHF}.mp4`;
    }
    
    videoPlayer.load();
}

// Función para cambiar a video siguiente
function nextVideo(playerId) {
    const videoPlayer = document.getElementById(`videoPlayer${playerId}`);
    const videoContainer = videoPlayer.closest('.video-group');
    const category = videoContainer.id.includes('aa') ? 'aa' : 'hf';
    
    if (category === 'aa') {
        currentVideoAA = (currentVideoAA + 1) % 5;
        videoPlayer.src = `videos/${category}/${currentVideoAA}.mp4`;
    } else {
        currentVideoHF = (currentVideoHF + 1) % 5;
        videoPlayer.src = `videos/${category}/${currentVideoHF}.mp4`;
    }
    
    videoPlayer.load();
}

// Inicializar la galería cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    // Agregar evento click a las categorías
    document.querySelectorAll('.video-categories a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('href').substring(1);
            changeVideoCategory(category);
            
            // Actualizar clase activa en las categorías
            document.querySelectorAll('.video-categories a').forEach(a => {
                a.classList.remove('active');
            });
            link.classList.add('active');
        });
    });
});
