// Funciones para manejar la reproducción de videos
const videoPlayer1 = document.getElementById('videoPlayer1');
const videoPlayer2 = document.getElementById('videoPlayer2');

// Configuración de los videos
const videosConfig = {
    player1: {
        start: 0,
        end: 14,
        current: 0,
        path: 'aa/'
    },
    player2: {
        start: 1,
        end: 16,
        current: 1,
        path: 'hf/'
    }
};

// Función para actualizar el video
function updateVideo(player, config) {
    const videoPath = `videos/${config.path}${config.current}.mp4`;
    player.src = videoPath;
    player.load();
    player.play();
}

// Funciones de navegación
function prevVideo(playerNumber) {
    const config = playerNumber === 1 ? videosConfig.player1 : videosConfig.player2;
    const player = playerNumber === 1 ? videoPlayer1 : videoPlayer2;
    
    if (config.current > config.start) {
        config.current--;
        updateVideo(player, config);
    }
}

function nextVideo(playerNumber) {
    const config = playerNumber === 1 ? videosConfig.player1 : videosConfig.player2;
    const player = playerNumber === 1 ? videoPlayer1 : videoPlayer2;
    
    if (config.current < config.end) {
        config.current++;
        updateVideo(player, config);
    }
}

// Inicializar los reproductores
window.addEventListener('load', () => {
    updateVideo(videoPlayer1, videosConfig.player1);
    updateVideo(videoPlayer2, videosConfig.player2);
});
