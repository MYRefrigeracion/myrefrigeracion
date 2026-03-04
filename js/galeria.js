// Variables globales para los videos
let currentVideo1 = 0;
let currentVideo2 = 0;
const videoPlayer1 = document.getElementById('videoPlayer1');
const videoPlayer2 = document.getElementById('videoPlayer2');

// Función para cambiar al video anterior
function prevVideo(playerNumber) {
    if (playerNumber === 1) {
        if (currentVideo1 > 0) {
            currentVideo1--;
            updateVideo(playerNumber);
        }
    } else if (playerNumber === 2) {
        if (currentVideo2 > 0) {
            currentVideo2--;
            updateVideo(playerNumber);
        }
    }
}

// Función para cambiar al video siguiente
function nextVideo(playerNumber) {
    if (playerNumber === 1) {
        currentVideo1++;
        updateVideo(playerNumber);
    } else if (playerNumber === 2) {
        currentVideo2++;
        updateVideo(playerNumber);
    }
}

// Función para actualizar el video
function updateVideo(playerNumber) {
    if (playerNumber === 1) {
        videoPlayer1.src = `videos/aa/${currentVideo1}.mp4`;
        videoPlayer1.load();
        // No reproducir automáticamente
        if (videoPlayer1.paused) {
            videoPlayer1.play();
        }
        // Pausar el otro video si está reproduciéndose
        if (!videoPlayer2.paused) {
            videoPlayer2.pause();
        }
    } else if (playerNumber === 2) {
        videoPlayer2.src = `videos/hf/${currentVideo2}.mp4`;
        videoPlayer2.load();
        // No reproducir automáticamente
        if (videoPlayer2.paused) {
            videoPlayer2.play();
        }
        // Pausar el otro video si está reproduciéndose
        if (!videoPlayer1.paused) {
            videoPlayer1.pause();
        }
    }
}

// Inicializar los videos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Configurar eventos de clic en los botones de play/pause
    videoPlayer1.addEventListener('play', () => {
        if (!videoPlayer2.paused) {
            videoPlayer2.pause();
        }
    });
    
    videoPlayer2.addEventListener('play', () => {
        if (!videoPlayer1.paused) {
            videoPlayer1.pause();
        }
    });

    // Asegurar que los videos no se reproduzcan automáticamente
    videoPlayer1.pause();
    videoPlayer2.pause();
});
