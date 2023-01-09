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

function adjustFontsize(value) {
  if (value.length >= 18) {
    result.style.fontSize = `${270 / value.length * 1.5}px`;
  } else {
    result.style.fontSize = '24px';
  }
}

const calculator = (() => {
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
  return calculator[selection](numOne, numTwo);
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
      temp = operate(parseFloat(number), parseFloat(temp), operator).toString(10);
      isDone = true;
      indicator.textContent = '';
      adjustFontsize(temp);
      updateDisplay(temp);
    }
  };
  return {
    clear,
    backspace,
    equal
  };
})();


const result = document.querySelector('.result');
const indicator = document.querySelector('.indicator');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const functionButtons = document.querySelectorAll('.function');
const periodButton = document.querySelector('#period');

function updateDisplay(value) {
  result.textContent = value;
}

function inputNumber(value) {
  if (isDone) { // begin a new start if the calculation has been completed
    initialize();
  }
  number += value;
  if (number === '0') { // prevent meaningless zeros
    number = '';
  }
  adjustFontsize(number);
  updateDisplay(number || '0');
}

function inputPeriod() {
  if (!number.includes('.')) {
    number += '.';
  };
  updateDisplay(number);
}

function inputOperator(value) {
  operator = value;
  temp = number;
  number = '';

  indicator.textContent = value;
}

function inputFunction(value) {
  tasker[value]();
}

function inputKeyboard(key) {
  console.log(key);
  if (['1','2','3','4','5','6','7','8','9','0'].includes(key)) {
    inputNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    switch (key) {
      case '+':
        inputOperator('sum');
        break;
      case '-':
        inputOperator('sub');
        break;
      case '*':
        inputOperator('mul');
        break;
      case '/':
        inputOperator('div');
        break
      default:
        
    }
  } else if (['Enter', 'Backspace'].includes(key)) {
    inputFunction(key === 'Enter' ? 'equal' : 'backspace');
  } else if (key === '.') {
    inputPeriod();
  }
}

numberButtons.forEach(numberButton => numberButton.addEventListener('click', function() {inputNumber(this.id.slice(-1));}));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', function() {inputOperator(this.id);}));
functionButtons.forEach(functionButton => functionButton.addEventListener('click', function() {inputFunction(this.id);}));
periodButton.addEventListener('click', inputPeriod);
document.addEventListener('keydown', e => inputKeyboard(e.key)); // enable keyboard input