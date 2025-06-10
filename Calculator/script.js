
let display = document.getElementById("text_container");
let isError = false;

function displaynumber (input) {
    if (isError || checkNaN()) return ;
    display.value += input;
}

function squareroot () {
    if (isError || checkNaN()) return ;

    if (display.value.startsWith('-')) {
        display.value = "Error!";
        isError = true;
    }
    else {
        display.value = Math.sqrt(display.value);
    }
}

function togglesign() {
  if (isError || checkNaN()) return ;

  if (display.value.startsWith('-')) {
    display.value = display.value.slice(1);
  } else {
    display.value = '-' + display.value;
  } 

}

function clearlog () {
    display.value = "";
    isError = false;
}

function calculate () {
    if (isError || checkNaN()) return;
    try {
      display.value= eval(display.value.replace(/÷/g, '/').replace(/X/g, '*')); 
    }
    catch {
      display.value = "Error!";
      isError = true;
    }
}

function checkNaN() {
  if (display.value === "NaN") {
    display.value = "Error!";
    isError = true;
    return true;
  }
  return false;
} 