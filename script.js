const watch = document.getElementById("watch");
const watchDescription = document.getElementById("watch-description");
const buttons = document.getElementById("buttons-container");
const startBTN = document.getElementById("start");

const daysDisplay = document.getElementById("days");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.querySelector(".milliseconds");
const reducedMotion =
  window.matchMedia("(prefers-reduced-motion)").matches ||
  window.matchMedia("(prefers-reduced-motion: reduced)").matches;

let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let mseconds = 0;
let runningMS;

let startMs;
let startSeconds;
let startMinutes;
let startHours;

let nowTime;
let nowMs;
let nowSeconds;
let nowMinutes;
let nowHours;

let isPaused = false;
let isOutOfFocus = false;

function incrementMS() {
  if (isOutOfFocus && isPaused) return;

  mseconds += 10;

  if (mseconds >= 1000) {
    mseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
        if (hours >= 24) {
          hours = 0;
          days++;
        }
      }
    }
  }

  updateWatch();
}

function updateWatch() {
  daysDisplay.innerText = `${
    days > 0 ? `${days < 10 ? `0${days}:` : `${days}:`}` : ""
  }`;
  hoursDisplay.innerText = `${
    hours < 10 ? `0${hours.toFixed(0)}:` : `${hours.toFixed(0)}:`
  }`;
  minutesDisplay.innerText = `${
    minutes < 10 ? `0${minutes.toFixed(0)}:` : `${minutes.toFixed(0)}:`
  }`;
  secondsDisplay.innerText = `${
    seconds < 10 ? `0${seconds.toFixed(0)}` : `${seconds.toFixed(0)}`
  }`;
  millisecondsDisplay.innerText = `${
    mseconds < 100
      ? `:0${(mseconds / 10).toFixed(0)}`
      : `:${(mseconds / 10).toFixed(0)}`
  }`;
  updateDescription();
}

function updateDescription() {
  watchDescription.innerText =
    days > 0
      ? `Days : Hours : Minutes : Seconds ${
          reducedMotion ? " " : ": Milliseconds"
        }`
      : `Hours : Minutes : Seconds ${reducedMotion ? " " : ": Milliseconds"}`;
}

function startWatch() {
  isPaused = false;
  startBTN.innerText = "PAUSE";
  nowTime = new Date();
  runningMS = setInterval(incrementMS, 10);
}

function stopWatch() {
  isPaused = true;
  mseconds > 0
    ? (startBTN.innerText = "RESUME")
    : (startBTN.innerText = "START");
  clearInterval(runningMS);
}

function resetWatch() {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  mseconds = 0;
  stopWatch();
  updateWatch();
}

function handleClick({ target }) {
  const clicked = target.closest("button");
  if (!clicked) return;
  switch (clicked.innerText) {
    case "START":
      startWatch();
      break;
    case "RESUME":
      startWatch();
      break;
    case "PAUSE":
      stopWatch();
      break;
    case "RESET":
      resetWatch();
      break;
    default:
      return;
  }
}
buttons.addEventListener("click", handleClick);

window.addEventListener("visibilitychange", () => {
  if (!isOutOfFocus && !isPaused && document.visibilityState === "hidden" && mseconds > 0) {
    startTime = new Date();
    startMs = +startTime.getMilliseconds();
    startSeconds = +startTime.getSeconds();
    startMinutes = +startTime.getMinutes();
    startHours = +startTime.getHours();

    isOutOfFocus = true;
    stopWatch();
  }
});

window.addEventListener("visibilitychange", () => {
  if (
    isOutOfFocus &&
    isPaused &&
    document.visibilityState !== "hidden" &&
    mseconds > 0
  ) {
    nowTime = new Date();
    nowMs = +nowTime.getMilliseconds();
    nowSeconds = +nowTime.getSeconds();
    nowMinutes = +nowTime.getMinutes();
    nowHours = +nowTime.getHours();
    const difMs = ((nowMs - startMs) % 600) / 10;
    const difS = (nowSeconds - startSeconds) % 60;
    const difM = (nowMinutes - startMinutes) % 60;
    const difH = (nowHours - startHours) % 60;

    console.log(difMs, difS, difM, difH);
    mseconds += Math.abs(difMs);
    seconds += Math.abs(difS);
    minutes += Math.abs(difM);
    hours += Math.abs(difH);
    updateWatch();
    startWatch();
    isOutOfFocus = false;
  }
});
