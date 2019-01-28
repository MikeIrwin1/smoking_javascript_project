const TimerFunction = require('../models/timer-function.js');
const PubSub = require('../helpers/pub_sub.js');

const TimerView = function (element) {
  this.element = element;
};

TimerView.prototype.bindEvents = function () {
  const timer = new TimerFunction();

  PubSub.subscribe('FormView:new-user', (event) => {
    this.createTimer();
    timer.runTimer();
  });

  PubSub.subscribe('SmokedView:user-smoked', (event) => {
    const timerContainer = document.getElementById('timer-container');
    timerContainer.innerHTML = '';
    this.createTimer();
    timer.runTimer();
  });

};


TimerView.prototype.createTimer = function () {
  const container = document.createElement('div');
  container.id = 'timer-container';
  const timer = document.createElement('time');
  timer.classList.add('timer-zeros');
  timer.textContent = "00:00:00:00";
  container.appendChild(timer);
  this.element.appendChild(container);
};



module.exports = TimerView;
