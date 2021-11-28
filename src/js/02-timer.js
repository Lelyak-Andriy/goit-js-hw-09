import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";


const inputEl= document.querySelector('#datetime-picker');
const timerBtnEl = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
 
let timerId = null;
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
   minuteIncrement: 1,
   deltaTime: '',
   endDate: '',
   onClose(selectedDates) {
     options.endDate = selectedDates[0].getTime();
    //  console.log(selectedDates[0].getTime());
options.deltaTime = options.endDate - options.defaultDate;
  if (options.endDate < options.defaultDate) {
    // clearInterval(timerId);
      window.alert("Please choose a date in the future")
    timerBtnEl.disabled = true;
     
     }
  else {
    timerBtnEl.disabled = false;
     }
    //  console.log(options.defaultDate);
   },
   
  onTimerStart() {
 
    setInterval(() => {
     timerBtnEl.disabled = true;
    options.deltaTime = options.endDate - Date.now();
      const time = convertMs(options.deltaTime);
timerBtnEl.removeEventListener('click', options.onTimerStart);
      updateClockFace(time);
      if (options.deltaTime <= 0) {
        clearInterval(timerId);
        clearTimer();
      }
   
  }, 1000 )
}
}

flatpickr(inputEl, options);

function updateClockFace(evt) {
      daysSpan.textContent = evt.days;
      hoursSpan.textContent = evt.hours;
      minutesSpan.textContent = evt.minutes;
      secondsSpan.textContent = evt.seconds;
}

function clearTimer() {
  daysSpan.textContent = '00';
  hoursSpan.textContent = '00';
  minutesSpan.textContent = '00';
  secondsSpan.textContent = '00';
}


timerBtnEl.addEventListener('click', options.onTimerStart);

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
};