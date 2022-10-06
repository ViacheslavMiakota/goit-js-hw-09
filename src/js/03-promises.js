import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  submitBtn: document.querySelector('form'),
};
console.log(refs.submitBtn);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
refs.submitBtn.addEventListener('submit', event => {
  event.preventDefault();
  // const { delay, step, amount } = event.currentTarget.elements;
  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          position: 'center-center',
          backOverlay: true,
          clickToClose: true,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          position: 'center-center',
          backOverlay: true,
          clickToClose: true,
        });
      });
    delay += step;
  }
});
function preventDefault(event) {
  event.preventDefault();
}
