let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
}

function reset() {
  clearInterval(intervalId);
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00";
  lapsContainer.innerHTML = "";
}

function lap() {
  if (!isRunning) return;

  const li = document.createElement("li");
  li.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatTime(elapsedTime)}`;
  lapsContainer.appendChild(li);
}
