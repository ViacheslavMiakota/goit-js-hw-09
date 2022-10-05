import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delayName: document.querySelector("input[name='delay']"),
  stepName: document.querySelector("input[name='step']"),
  amountName: document.querySelector("input[name='amount']"),
  submitBtn: document.querySelector('form'),
};
console.log(refs.delayName);
console.log(refs.stepName);
console.log(refs.amountName);
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
    });
    refs.delayName;
  });
}
refs.submitBtn.addEventListener('submit', () => {
  let numPosition = 0;
  for (let i = 0; i < refs.amountName.value; i += 1) {
    numPosition += 1;
    console.log(numPosition);
    const dalayTotal = refs.delayName.value + refs.stepName.value;

    createPromise(numPosition, dalayTotal)
      .then(({ position, delay }) => {
        Notify.success('✅ Fulfilled promise ${position} in ${delay}ms', {
          position: 'center-center',
          backOverlay: true,
          clickToClose: true,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure('❌ Rejected promise ${position} in ${delay}ms', {
          position: 'center-center',
          backOverlay: true,
          clickToClose: true,
        });
      });
  }
  event.preventDefault();
});
function preventDefault(event) {
  event.preventDefault();
}
