const PubSub = require('../helpers/pub_sub.js');
const RandMotivation = require("../models/smoking_facts.js")
const MotivationView = function (element) {
  this.element = element;
  this.text = null;
};

MotivationView.prototype.bindEvents = function () {
const randMotivation = new RandMotivation();
  PubSub.subscribe('FormView:new-user', (event) => {
    this.text = randMotivation.get();
    this.createMotivContainer();


  });

  PubSub.subscribe('SmokedView:user-smoked', (event) => {
    const motivContainer = document.getElementById('motive-container');
    this.element.removeChild(motivContainer);
    this.text = randMotivation.get();
    this.createMotivContainer();
  });

};

MotivationView.prototype.createMotivContainer = function () {
  const container = document.createElement('div');
  container.id = 'motive-container';
  const motive = document.createElement('p');
  motive.classList.add('motive-text');
  motive.textContent = `${this.text}`;
  container.appendChild(motive);
  this.element.appendChild(container);
};


// const motivation = randMotivation.get();
// const message = `  ${motivation}.`;
// messageElement.textContent = message;

module.exports = MotivationView;