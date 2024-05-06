let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
	handleSymbol(value);
  } else {
	handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      previousOperator = null;
      break;
    case '←':
      buffer =
        buffer.length === 1 ? '0' : buffer.substring(0, buffer.length - 1);
      break;
    case '+':
    case '−': // Note: this is the HTML &minus; character, not a hyphen (-)
    case '×':
    case '÷':
      handleMath(symbol);
      break;
    case '=':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = '' + runningTotal;
      runningTotal = 0;
      break;
  }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') { // Note: this is the HTML &minus; character, not a hyphen (-)
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();