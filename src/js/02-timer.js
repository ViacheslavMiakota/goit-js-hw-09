import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerRef: document.querySelector('.timer'),
  styleValue: document.querySelector('.value'),
};
refs.startBtn.disabled = true;
let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates);
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Вибрано не вірно час!', {
        position: 'center-center',
        backOverlay: true,
        clickToClose: true,
      });
      return;
    }
    refs.startBtn.disabled = false;
    Notify.success('Можемо починати!', {
      position: 'center-center',
      backOverlay: true,
      clickToClose: true,
    });
    selectedDate = selectedDates[0];
  },
};
flatpickr('#datetime-picker', options);
const timer = {
  intervalId: null,
  refs: {},
  start() {
    refs.startBtn.disabled = true;
    this.getRefs(refs.timerRef);
    this.intervalId = setInterval(() => {
      console.log(selectedDate);
      const diff = selectedDate.getTime() - Date.now();
      if (diff <= 1000) {
        clearInterval(this.intervalId);
        Notify.success('Дедлайн настав', {
          position: 'center-center',
          backOverlay: true,
          clickToClose: true,
        });
      }
      const data = this.convertMs(diff);
      this.refs.days.textContent = this.addLeadingZero(data.days);
      this.refs.hours.textContent = this.addLeadingZero(data.hours);
      this.refs.minutes.textContent = this.addLeadingZero(data.minutes);
      this.refs.seconds.textContent = this.addLeadingZero(data.seconds);
    }, 1000);
  },
  getRefs(rootSelector) {
    this.refs.days = rootSelector.querySelector('[data-days]');
    this.refs.hours = rootSelector.querySelector('[data-hours]');
    this.refs.minutes = rootSelector.querySelector('[data-minutes]');
    this.refs.seconds = rootSelector.querySelector('[data-seconds]');
  },
  convertMs(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    return { days, hours, minutes, seconds };
  },
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};
refs.startBtn.addEventListener('click', timer.start.bind(timer));
