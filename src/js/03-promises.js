
const delayInput = document.querySelector('input[name=delay]');
const stepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');
const createPromisesBtn = document.querySelector('button');


createPromisesBtn.addEventListener('click', oncreatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}

function oncreatePromise(event) {
  event.preventDefault()
  let delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  
  for (let i = 1; i <= amount; i += 1) {
    let position = i;
     if (i !== 1) {delay += step}
    createPromise(i, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}



  