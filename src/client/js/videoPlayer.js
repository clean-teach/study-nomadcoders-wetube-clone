const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const time = document.getElementById('time');
const volume = document.getElementById('volume');

const handlePlayClick = (e) => {
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
};
const handleMute = (e) => {};
const handlePlay = (e) => {playBtn.innerText = 'Pause';};
const handlePause = (e) => {playBtn.innerText = 'Play';};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
video.addEventListener('play', handlePlay);
video.addEventListener('pause', handlePause);