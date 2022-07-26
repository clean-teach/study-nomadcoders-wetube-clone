const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const muteBtn = document.getElementById('mute');
const volumeRange = document.getElementById('volume');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const timeline = document.getElementById('timeline');
const fullScreenBtn = document.getElementById('fullScreen');
const videoContainer = document.getElementById('videoContainer')

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

const formatTime = (seconds) => {
	return new Date(seconds * 1000).toISOString().substring(11,19);
}

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
    const {target: {value}} = event;
    video.currentTime = value;
};

const handeFullscreen = () => {
    const fullScreen = document.fullscreenElement;
    if(fullScreen){
        document.exitFullscreen();
        fullScreenBtn.innerText = 'Enter Full Screen';
    }else{
        videoContainer.requestFullscreen();
        fullScreenBtn.innerText = 'Exit Full Screen';
    }
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
timeline.addEventListener('input', handleTimelineChange)
fullScreenBtn.addEventListener('click', handeFullscreen);