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
  let numPosition = 0;
  const delayTotal =
    Number(event.currentTarget.delay.value) +
    Number(event.currentTarget.step.value);
  for (let i = 0; i < Number(event.currentTarget.amount.value); i++) {
    createPromise(numPosition, delayTotal)
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
    numPosition += event.currentTarget.step.value;
  }
});
function preventDefault(event) {
  event.preventDefault();
}

// let delay = 1000;
// const step = 500;
// const amount = 5;

// for (let i = 0; i < amount; i++) {
//   createPromise(i + 1, delay)
//     .then(({ position, delay }) => {
//       console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     })
//     .catch(({ position, delay }) => {
//       console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//     });
//   delay += event.currentTarget.step.value;
// }
