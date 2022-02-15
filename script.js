const watch = document.getElementById("watch");
const watchDescription = document.getElementById("watch-description");
const buttons = document.getElementById("buttons-container");
const startBTN = document.getElementById("start");

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
  watch.innerText = `${
    days > 0 ? `${days < 10 ? `0${days}:` : `${days}:`}` : ""
  }${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  }:${seconds < 10 ? `0${seconds}` : `${seconds}`}:${
    mseconds < 100 ? `0${mseconds / 10}` : `${mseconds / 10}`
  }`;
  updateDescription();
}

function updateDescription() {
  watchDescription.innerText =
    days > 0
      ? "Days:Hours:Minutes:Seconds:Milliseconds"
      : "Hours:Minutes:Seconds:Milliseconds";
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
