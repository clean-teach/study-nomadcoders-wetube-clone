const startBtn = document.querySelector('#startBtn');

const handleStart = () => {
    const stream = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });
    console.log(stream);
};

startBtn.addEventListener('click', handleStart)