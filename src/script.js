const song = document.querySelector('.song'),
  play = document.querySelector('.play'),
  replay = document.querySelector('.replay'),
  outlineCircle = document.querySelector('.moving-outline circle'),
  video = document.querySelector('.vid-container video'),
  sounds = document.querySelectorAll('.sound-picker button'),
  timeDisplay = document.querySelector('.time-display'),
  outlineLength = outlineCircle.getTotalLength(),
  timeSelect = document.querySelectorAll('.time-select button');
let duration = 600;

outlineCircle.style.strokeDasharray = outlineLength;
outlineCircle.style.strokeDashoffset = outlineLength;

// Pick different sounds
sounds.forEach((sound) => {
  sound.addEventListener('click', function () {
    song.src = this.getAttribute('data-sound');
    video.src = this.getAttribute('data-video');
    checkPlaying(song);
  });
});

// Play sound
play.addEventListener('click', () => {
  checkPlaying(song);
});

// Replay sound
const replaySound = (song) => {
  let currentTime = song.currentTime;
  song.currentTime = 0;
};

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Select sound
timeSelect.forEach((option) => {
  option.addEventListener('click', function () {
    duration = this.getAttribute('data-time');
    timeDisplay.textContent = `${addZero(Math.floor(duration / 60))}:${addZero(
      Math.floor(duration % 60)
    )}`;
  });
});

// Function for stop and play the sounds
const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = '/meditation-app/assets/image/svg/pause.svg';
  } else {
    song.pause();
    video.pause();
    play.src = '/meditation-app/assets/image/svg/play.svg';
  }
};

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = duration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  // Animate the circle
  let progress = outlineLength - (currentTime / duration) * outlineLength;
  outlineCircle.style.strokeDashoffset = progress;

  // Animate the text
  timeDisplay.textContent = `${addZero(minutes)}:${addZero(seconds)}`;
  if (currentTime >= duration) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = '/meditation-app/assets/image/svg/play.svg';
  }
};

replay.addEventListener('click', function () {
  replaySound(song);
});
