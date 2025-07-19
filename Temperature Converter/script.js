input1 = document.getElementById("input1");
FtoC = document.getElementById("FtoC");
CtoF = document.getElementById("CtoF");
button1 = document.getElementById("button1");
ans = document.getElementById("conversion_div");
let temp;
function convert(e) { 
    if (FtoC.checked) {
        temp = Number(input1.value);
        temp = temp * 9 /5 + 32;
        ans.textContent = temp.toFixed(1) + "F";
    }
    else if(CtoF.checked)  {
        temp= Number(input1.value);
        temp= (temp- 32) * (5/9);
        ans.textContent = temp.toFixed(1) + "C";
    }
    else {
        ans.textContent = "Select a unit!";
    }
}