const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

console.log(body);
let timerId = null;
btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    const currentColor = getRandomHexColor();
    body.style.backgroundColor = currentColor;
  }, 1000);
  btnStart.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
  console.log(`Interval has stopped!`);
});
