// Variables globales para el manejo de vídeos
let currentVideoIndex1 = 1;
let currentVideoIndex2 = 16;

const totalVideosGroup1 = 15;
const totalVideosGroup2 = 30;

function updateVideo(index, player) {
  const videoElement = document.getElementById(`videoPlayer${player}`);
  videoElement.src = `videos/${index}.mp4`;
  videoElement.load();
  videoElement.play();
}

function nextVideo(group) {
  if (group === 1 && currentVideoIndex1 < 15) {
    currentVideoIndex1++;
    updateVideo(currentVideoIndex1, group);
  } else if (group === 2 && currentVideoIndex2 < 30) {
    currentVideoIndex2++;
    updateVideo(currentVideoIndex2, group);
  }
}

function prevVideo(group) {
  if (group === 1 && currentVideoIndex1 > 1) {
    currentVideoIndex1--;
    updateVideo(currentVideoIndex1, group);
  } else if (group === 2 && currentVideoIndex2 > 16) {
    currentVideoIndex2--;
    updateVideo(currentVideoIndex2, group);
  }
}