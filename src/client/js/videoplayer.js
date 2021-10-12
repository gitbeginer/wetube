const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const playBtnIcon = playBtn.querySelector("i");
const muteBtnIcon = muteBtn.querySelector("i");
const fullScreenIcon = fullScreenBtn.querySelector("i");

let controlsMovementTimeout = null;
let controlsTimeout = null;
let volumeValue = 0.5;

video.volume = volumeValue;

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
        controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }

    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
};


const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
        //fullScreenBtn.innerText = "Enter Full Screen";
        fullScreenIcon.classList = "fas fa-expand";
    } else {
        videoContainer.requestFullscreen();
        //fullScreenBtn.innerText = "Exit Full Screen";
        fullScreenIcon.classList = "fas fa-compress";
    }
};


const formatTime = (seconds) =>
    //new Date(seconds * 1000).toISOString().substr(11, 8);
    new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";

    volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
};
const handleEnded = () => {
    const { id } = videoContainer.dataset;
    
    fetch(`/api/videos/${id}/view`, {
        method: "POST",
    });
};

video.addEventListener("ended", handleEnded);
video.addEventListener("pause", (e) => { playBtn.innerText = video.paused ? "Play" : "Pause"; });
video.addEventListener("play", (e) => { playBtn.innerText = video.paused ? "Play" : "Pause"; });
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
muteBtn.addEventListener("click", handleMuteClick);
playBtn.addEventListener("click", handlePlayClick);
volumeRange.addEventListener("input", handleVolumeChange);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
videoContainer.addEventListener("click", handlePlayClick);
videoContainer.addEventListener('keydown', (e) => {
    switch (e.code) {
        case "KeyF": handleFullscreen();
            break;
        case "Space": handlePlayClick();
            break;
        case "ArrowDown":
        case "ArrowUp":
            volumeValue += Math.pow(-1, "ArrowDown" == e.code) / 10;
            volumeValue = Math.max(Math.min(1, volumeValue), 0);
            volumeRange.value = volumeValue;
            e.preventDefault();
            break;
        case "ArrowLeft":
        case "ArrowRight":
            timeline.value = video.currentTime + Math.pow(-1, "ArrowLeft" == e.code) * 5;
            video.currentTime = timeline.value;
            break;
        case "KeyM":
            handleMuteClick();
            break;
    }
    handleMouseMove();
});
videoContainer.focus();

if (video.readyState == 4) handleLoadedMetadata();

