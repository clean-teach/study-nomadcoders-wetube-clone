const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const time = document.getElementById('time');
const volumeRange = document.getElementById('volume');

let volumeValue = .5;
video.volume = volumeValue;

const handlePlayClick = (event) => {
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtn.innerText = video.paused ? 'play' : 'Pause';
};
const handleMute = (event) => {
    if(video.muted){
        video.muted = false;
    }else{
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
    volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeChange = (event) => {
    const {
        target: { value }
    } = event;
    muteBtn.innerText = value >= 0.1 ? 'Mute' : 'Unmute';
    volumeValue = value;
    video.volume = value;
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);