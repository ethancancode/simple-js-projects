let min, max, answer;
let attempts;
let running;
const rangeContainer = document.getElementById("range_container");
const guessContainer = document.getElementById("guess_container");

document.getElementById("submit").onclick = function () {
    min = document.getElementById("min_range").value;
    max = document.getElementById("max_range").value;
    
    if (min === "" || max === "") {
        document.getElementById("invalid_messages").innerText = "Please enter a value in both fields";
        return;    
    }
    
    min = Number(min);
    max = Number(max);
    answer = Math.floor(Math.random() * (max - min + 1)) + min;
    running = true;
    attempts = 0;
    document.getElementById("invalid_messages").innerText = ""
    
    
    if (max < min) {
        document.getElementById("invalid_messages").innerText = "Maximum can't be greater than minimum!"
        return;
    }
    
    if (min == max) {
        document.getElementById("invalid_messages").innerText = "Enter 2 different numbers!"
        return
    }
    
    rangeContainer.style.display = "none";
    guessContainer.style.display = "block";
    guessContainer.classList.add("slide-up");
}

document.getElementById("guess_button").onclick = function () {
    let guess = document.getElementById("guess_num").value;
    
    if (running) {  
        if (guess === "" ) {
            document.getElementById("guessed_number").innerText = "Please enter a number.";
            return;
        }
        
        guess = Number(guess);
        
        if (guess < min || guess > max) {
            document.getElementById("guessed_number").innerText = `Enter a number between ${min} and ${max}.`;
            return
        } 
        attempts++;
        if (guess === answer) {
            const attemptword = attempts === 1 ? "attempt" : "attempts";
            document.getElementById("guessed_number").innerText = `You guessed correctly! It took you ${attempts} ${attemptword}.`;
            running = false;
        } 
        else if (guess > answer) {
            document.getElementById("guessed_number").innerText = "Try lower!";
        } 
        else if (guess < answer) {
            document.getElementById("guessed_number").innerText = "Try higher!";
        }
    }
}

document.getElementById("redo_button").onclick = function () {
    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });
    
    document.querySelectorAll("label").forEach(label => {
        label.innerText = "";
    });
    
    guessContainer.style.display = "none";
    rangeContainer.style.display = "block";
    rangeContainer.classList.add("slide-up");
}

