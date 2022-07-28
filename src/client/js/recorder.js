const startBtn = document.querySelector('#startBtn');
const previewVideo = document.querySelector('#preview');

const handleStart = () => {
    const stream = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {width: 'auto', height: 'auto'}
    });
    previewVideo.srcObject = stream;
    previewVideo.play();
};

startBtn.addEventListener('click', handleStart)