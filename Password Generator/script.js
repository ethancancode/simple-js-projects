const lowercasebox = document.getElementById("lowercase_char");
const uppercasebox = document.getElementById("uppercase_char");
const numbersbox = document.getElementById("numbers_box");
const specialbox = document.getElementById("special_char");
let currentpassword = [];

function generatepassword () {
    let passwordlength = document.getElementById("pass_len").value;
    const lowercasechar = "abcdefghijklmnopqrstuvwxyz";
    const uppercasechar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const specialchar = "!@#$%^&*~_-.;:?";
    
    let allchars = "";
    let password = [];
    
    //Guarantee atleast one instance of the ticked box
    if (lowercasebox.checked) {
        allchars += lowercasechar;
        password.push(lowercasechar[Math.floor(Math.random() * lowercasechar.length)]);
    }
    
    if (uppercasebox.checked) {
        allchars += uppercasechar;
        password.push(uppercasechar[Math.floor(Math.random() * uppercasechar.length)]);
    }
    
    if (numbersbox.checked) {
        allchars += numbers;
        password.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    
    if (specialbox.checked) {
        allchars += specialchar;
        password.push(specialchar[Math.floor(Math.random() * specialchar.length)]);
    }
    
    
    if(allchars == "") {
        window.alert("Please tick atleast one box!");
        return;
    }
    
    if (passwordlength == "" || passwordlength <= 0) {
        alert("Enter a valid length!");
        return;
    }
    
    passwordlength = Number(passwordlength);
    
    if (password.length > passwordlength) {
        alert("Password length too short for selected options.");
        return;
    }
    
    for(let i = password.length; i < passwordlength ; i++) {
        const randomindex = Math.floor(Math.random() * (allchars.length))
        password.push(allchars[randomindex]);
    }  
    
    //Password shuffler
    function shufflePassword(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    currentpassword = shufflePassword(password);
    
    document.getElementById("generated_password").innerHTML = `Generated password is: <br> ${currentpassword.join("")}`;
    document.getElementById("copy_button").style.display = "block"; 
}

function copytext () {
    navigator.clipboard.writeText(currentpassword.join(""))
    alert("Password copied to clipboard!");
}