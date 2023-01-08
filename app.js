let number = '';
let temp = '';
let operator = '';
let isDone = false;

function initialize() {
  number = '';
  temp = '';
  operator = '';
  isDone = false;

  indicator.textContent = '';
}

const calculater = (() => {
  const sum = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  return {
    sum,
    sub,
    mul,
    div
  }
})();


function operate(numOne, numTwo, selection) {
  return calculater[selection](numOne, numTwo);
}

const tasker = (() => {
  function clear() {
    initialize();
    updateDisplay('0');
  };
  function backspace() {
    number = number.slice(0, -1);
    updateDisplay(number || '0');
  };
  function equal() {
    if (number && temp && operator) {
      temp = operate(parseInt(number), parseInt(temp), operator);
      isDone = true;
      indicator.textContent = '';
      updateDisplay(temp);
    }
  };
  return {
    clear,
    backspace,
    equal
  };
})();


const display = document.querySelector('.result');
const indicator = document.querySelector('.indicator');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const functionButtons = document.querySelectorAll('.function');

function updateDisplay(value) {
  display.textContent = value;
}

function inputNumber() {
  if (isDone) { // begin a new start if the calculation has been completed
    initialize();
  }
  number += this.id.slice(-1);
  updateDisplay(number);
}

function inputOperator() {
  operator = this.id;
  temp = number;
  number = '';

  indicator.textContent = this.id;
}

function inputFunction() {
  tasker[this.id]();
}

numberButtons.forEach(numberButton => numberButton.addEventListener('click', inputNumber));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', inputOperator));
functionButtons.forEach(functionButton => functionButton.addEventListener('click', inputFunction));