const startBtn = document.querySelector('#startBtn');
const previewVideo = document.querySelector('#preview');
const btnWrap = document.querySelector('.btn-wrap');

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoFile;
    a.download = 'MyRecording.webm';
    document.body.appendChild(a);
    a.click();
};
const handleStart = () => {
    startBtn.innerText = 'Stop Recording';
    startBtn.removeEventListener('click', handleStart);
    startBtn.addEventListener('click', handleStop);

    recorder = new MediaRecorder(stream, {mainType: 'video/webm'});
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        previewVideo.srcObject = null;
        previewVideo.src = videoFile;
        previewVideo.loop = true;
        previewVideo.play();
    };
    recorder.start();
};
const handleStop = () => {
    startBtn.innerText = 'Download Recording';
    startBtn.removeEventListener('click', handleStop);
    startBtn.addEventListener('click', handleDownload);
    recorder.stop();
};
const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {width: 'auto', height: 'auto'}
    });
    previewVideo.srcObject = stream;
    previewVideo.play();
};
init();

startBtn.addEventListener('click', handleStart);