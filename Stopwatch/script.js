const displaytime = document.getElementById("displayed_time");
const laptime = document.getElementById("lap_time");
let timer =  null;
let startingTime = 0;
let elapsedTime = 0;
let position = 0;
let lastlaptime = 0;
let isRunning = false;


function start () {
    if(!isRunning) {
        startingTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function update () {
    const currentTime = Date.now();
    elapsedTime = currentTime - startingTime;
    
    displaytime.textContent = formatTime(elapsedTime)  
}

function lap() {
    const lapInterval = elapsedTime - lastlaptime;
    lastlaptime = elapsedTime;
    
    if(isRunning) {
        position++;
        laptime.innerHTML += `<div>${position}: ${formatTime(elapsedTime)} ->  +${formatTime(lapInterval)}</div>`;
    }
}

function formatTime(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let mins = Math.floor(ms / (1000 * 60) % 60 );
    let secs = Math.floor(ms / (1000) % 60 );
    let milisecs = Math.floor(ms % 1000 / 10);
    
    hours = String(hours).padStart(2, "0");
    mins = String(mins).padStart(2, "0");
    secs = String(secs).padStart(2, "0");
    milisecs = String(milisecs).padStart(2, "0");
    
    return `${hours}:${mins}:${secs}:${milisecs}`;
}

function stop() {
    if(isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startingTime;
        isRunning = false;
        
    }
}

function reset () {
    clearInterval(timer);
    startingTime = 0;
    elapsedTime = 0;
    position = 0;
    lastlaptime = 0;
    isRunning = false;
    displaytime.textContent = "00:00:00:00"
    laptime.innerHTML = "";
}