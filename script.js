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

function incrementMS() {
  mseconds += 10;

  if (mseconds === 1000) {
    mseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
        if (hours === 24) {
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
  hoursDisplay.innerText = `${hours < 10 ? `0${hours}:` : `${hours}:`}`;
  minutesDisplay.innerText = `${minutes < 10 ? `0${minutes}:` : `${minutes}:`}`;
  secondsDisplay.innerText = `${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  millisecondsDisplay.innerText = `${
    mseconds < 100 ? `:0${mseconds / 10}` : `:${mseconds / 10}`
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
  startBTN.innerText = "STOP";
  runningMS = setInterval(incrementMS, 10);
}

function stopWatch() {
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
    case "STOP":
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
