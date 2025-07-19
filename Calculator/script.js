const display = document.getElementById('display_container');
const extradigits = document.getElementById("all_digits_container");
const resultcontainer = document.getElementById("result_container");
let working = true;
let storedDigits = '';
let result = '';

function append(value) {
  if (!working) return;
  
  if (value === '.') { //prevent double decimal
    const currentNumber = display.innerText.split(/[\+\-\x\/%]/).pop();
    if (currentNumber.includes('.')) return;
  }  
  
  if (result) { //after an operation of large number, helps to use the complete sum instead of using the display value
    if(!checkSymbol(value)) return; //after result only allow symbols to concatenate
    storedDigits = result;
    result = '';
    display.innerText = '';
  }
  
  extradigits.style.display = "none";
  resultcontainer.style.display = "none";
  
  const lastChar = display.innerText.slice(-1);
  
  if (display.innerText === '0') {
    if (checkSymbol(value)) {
      display.innerText += value;
    } else {
      display.innerText = value;
    }
    return;
  }
  
  if (checkSymbol(value)) {
    if (checkSymbol(lastChar)) { //prevent double symbol
      return;
    } else if (display.innerText.length >= 8) {
      storedDigits += display.innerText;
      display.innerText = value; 
    } else {
      display.innerText += value;
    }
    return;
  }
  
  
  if (display.innerText.length === 8) { //to store numbers larger than 8 digits for later operation
    storedDigits += display.innerText;
    display.innerText = value;
  } else  {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = '0';
  working = true;
  storedDigits = '';
  result = '';
  extradigits.style.display = "none";
  resultcontainer.style.display = "none";
}

function backspace() {
  if (!working) return;
  extradigits.style.display = "none";
  resultcontainer.style.display = "none";
  
  if (display.innerText.length === 1) {
    if (storedDigits.length > 0) {
      display.innerText = storedDigits.slice(-8); //bring last 8 storedDigits
      storedDigits = storedDigits.slice(0, -8); //remove those last 8 digits from storedDigits
    } else {
      display.innerText = '0';
    }
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculate() {
  try {
    let fullExpression = storedDigits + display.innerText;
    fullExpression = fullExpression.replace(/%/g, '/100').replace(/x/g, '*'); //replace all % and x with /100 and *
    result = String(eval(fullExpression));
    if(result.length > 8) { 
      extradigits.style.display = "flex"; //show extradigits button
    }
    display.innerText = result.slice(0, 8);
    storedDigits = '';
  } catch (e) {
    display.innerText = 'Error';
    working = false;
  }
}

function displayExtraDigits() {
  resultcontainer.textContent = result;
  resultcontainer.style.display = "block";
}

function checkSymbol(char) {
  return ['+', '-', 'x', '/', '%'].includes(char);
}

document.addEventListener('keydown', (e) => { //for keyboard
  const key = e.key; 
  
  if (key === 'C' || key ==='c') {
    clearDisplay();
    return;
  }
  
  if (!working) return;
  
  if (!isNaN(key) && key.length === 1) {
    append(key);
  }
  
  else if (key === '+') {
    append('+');
  }
  else if (key === '-') {
    append('-');
  }
  else if (key === '/') {
    append('/');
  }
  else if (key === '%') {
    append('%');
  }
  else if (key === 'x' || key === 'X') {
    append('x');
  }
  else if (key === '.') {
    append('.');
  }
  
  else if (key === '=') {
    calculate();
  }
  else if (key === 'Backspace') {
    backspace();
  }
});