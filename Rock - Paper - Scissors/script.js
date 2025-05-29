let choice = ['Rock', 'Paper', 'Scissors'];
let player_score = 0;
let comp_score = 0;

function playgame (playerchoice) {
    let computerchoice = choice[Math.floor(Math.random() * 3)];

    if (playerchoice === computerchoice ){
        document.getElementById("victory_message").innerText = "IT'S A TIE!";
    }
    else {
        switch(playerchoice) {
            case "Rock" :
                document.getElementById("victory_message").innerText = (computerchoice === 'Scissors') ? "YOU WIN!" : "YOU LOSE!"
                break;
            case "Paper" :
                document.getElementById("victory_message").innerText = (computerchoice === 'Rock') ? "YOU WIN!" : "YOU LOSE!"
                break;
            case "Scissors" :
                document.getElementById("victory_message").innerText = (computerchoice === 'Paper') ? "YOU WIN!"  : "YOU LOSE!"
                break;   
        }
    }

    document.getElementById("player_choice").innerText = `Player chose: ${playerchoice}`;
    document.getElementById("comp_choice").innerText = `Computer chose: ${computerchoice}`;

    document.getElementById("victory_message").classList.remove("green_text" , "red_text");

    switch(document.getElementById("victory_message").innerText) {
        case "YOU WIN!" :
            document.getElementById("victory_message").classList.add("green_text");
            player_score++;
            document.getElementById("playerscore_num").innerText = player_score;
            break;
        case "YOU LOSE!" :
            document.getElementById("victory_message").classList.add("red_text");
            comp_score++;
            document.getElementById("compscore_num").innerText = comp_score;
            break;    
    }


}