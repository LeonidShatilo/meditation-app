const song = document.querySelector('.song'),
  play = document.querySelector('.play'),
  outline = document.querySelector('.moving-outline circle'),
  video = document.querySelector('.vid-container video'),
  sounds = document.querySelectorAll('.sound-picker button'),
  timeDisplay = document.querySelector('.time-display'),
  outlineLength = outline.getTotalLength(),
  timeSelect = document.querySelectorAll('.time-select button');
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

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

// Select sound
timeSelect.forEach((option) => {
  option.addEventListener('click', function () {
    fakeDuration = this.getAttribute('data-time');
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
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
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);

  // Animate the circle
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  // Animate the text
  timeDisplay.textContent = `${minutes}:${seconds}`;
  if (currentTime >= fakeDuration) {
    song.pause();
    video.pause();
    song.currentTime = 0;
    play.src = '/meditation-app/assets/image/svg/play.svg';
  }
};
