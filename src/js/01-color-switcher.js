
const body = document.body;
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEL = document.querySelector('button[data-stop]');

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

btnStartEl.addEventListener("click", () => {
  intervalId = setInterval(() => {
body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }, 1000);
    
btnStartEl.disabled = true;
});

btnStopEL.addEventListener("click", () => {
  clearInterval(intervalId);
btnStartEl.disabled = false;
});



