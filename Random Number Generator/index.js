document.getElementById("button1").onclick = function() {
  let values = [];
  let min = document.getElementById("min1").value;
  let max = document.getElementById("max1").value;
  let amt = document.getElementById("amt").value;
  let unique = document.getElementById("unique").checked;
  if (min === "" || max === "" || amt === "") {
    alert("Please enter a number in all fields!");
    return;
  }  
  
  min = Number(min);
  max = Number(max);
  amt = Number(amt);
  
  if(min > max) {
    alert("Minimum can't be greater than Maximum!")
    return;
  }
  if (amt < 1){
    alert("Amount for generating a number should be atleast or greater than 1!")
    return;
  }
  
  if (unique && amt > (max - min + 1)) {
    alert("You can't generate that many unique numbers in the given range!");
    return;
  }
  
  while (values.length < amt) {
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if (unique) {
      if (!values.includes(value)) {
        values.push(value);
      }
    } else {
      values.push(value);
    }
  }
  
  if(amt == 1 ) {
    document.getElementById("result_container").innerHTML = `Number is: <br> ${values.join(", ")}`;
  }
  else{
    document.getElementById("result_container").innerHTML = `Numbers are: <br> ${values.join(", ")}`;
  } 
}

