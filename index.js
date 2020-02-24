var breakLength = 5;
var sessionLength = 25;
var remainingTime = 1500;
var minutes;
var seconds;
var displayTime;
var playing = false;
var status = "SESSION";
var tickTock;
//selectors

// break length
var breakInc = document.getElementById("break-increment");
var breakDec = document.getElementById("break-decrement");
var breakLengthText = document.getElementById("break-length");

// session length
var sessionInc = document.getElementById("session-increment");
var sessionDec = document.getElementById("session-decrement");
var sessionLengthText = document.getElementById("session-length");

// control buttons
var playButton = document.getElementById("start_stop");
var resetButton = document.getElementById("reset");

// remaining time
var remainingTimeText = document.getElementById("remaining-time");
var timerLabel = document.getElementById("timer-label");
var alarm = document.getElementById("beep");

// timer length controller event listeners
breakInc.addEventListener("click", () => {
  if (breakLength < 60 && !playing) {
    breakLength++;
    breakLengthText.textContent = breakLength;
  }
});

breakDec.addEventListener("click", () => {
  if (breakLength > 1 && !playing) {
    breakLength--;
    breakLengthText.textContent = breakLength;
  }
});

sessionInc.addEventListener("click", () => {
  if (sessionLength < 60 && !playing) {
    sessionLength++;
    Reset();
  }
});

sessionDec.addEventListener("click", () => {
  if (sessionLength > 1 && !playing) {
    sessionLength--;
    Reset();
  }
});

// control button event listeners

playButton.addEventListener("click", () => {
  playing ? Pause() : Resume();
});

resetButton.addEventListener("click", () => {
  sessionLength = 25;
  breakLength = 5;
  breakLengthText.textContent = breakLength;
  Reset();
});

const Timer = time => {
  minutes = Math.floor(time / 60);
  seconds = Math.floor(time % 60);
  displayTime = `
    ${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}
    `;
  remainingTimeText.textContent = displayTime;
};

const Pause = () => {
  playing = false;
  clearInterval(tickTock);
  playButton.innerHTML = `<i class="fas fa-play"></i>`;
};

const Resume = () => {
  tickTock = setInterval(() => {
    remainingTime--;
    if (remainingTime === -1) {
      Transition();
      Timer(remainingTime);
    }
    Timer(remainingTime);
    if (remainingTime === 0) {
      alarm.play();
    }
  }, 1000);
  playing = true;
  playButton.innerHTML = `<i class="fas fa-pause"></i>`;
};

const Reset = () => {
  sessionLengthText.textContent = sessionLength;
  timerLabel.textContent = "Session";
  status = "SESSION";
  remainingTime = sessionLength * 60;
  Timer(remainingTime);
  Pause();
  alarm.pause();
  alarm.currentTime = 0;
};

const Transition = () => {
  if (status === "SESSION") {
    timerLabel.textContent = "Break";
    remainingTime = breakLength * 60;
    status = "BREAK";
  } else {
    timerLabel.textContent = "Session";
    remainingTime = sessionLength * 60;
    status = "SESSION";
  }
};
