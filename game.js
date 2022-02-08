let gamePattern = [];
let buttonColours = ["red","blue","green","yellow"];
let randomChosenColour = buttonColours[nextSequence()];
//gamePattern.push(randomChosenColour);
let gamerPattern = [];

let len = prompt("Please enter the length of the game.");

for (let i = 0; i < len; ++i) {
    gamePattern.push(buttonColours[nextSequence()]);
}
let stage = 0;
//Stage counts how many buttons played, clicked and only if they are equal our code will measure our performance, and for example we don't
//want to hear wrong.mp3 everytime we use our mouse at body after we lose, I incremented stage so that else if isn't going to trigger.

setTimeout(() => {
    playPattern();
}, 2000);

$("div.btn").click(function() {
    playKey(this.id);
    gamerPattern.push(this.id);
});
$("body").mouseover(function() {//checking if our pattern is right
    let isSame = true;
    if (gamePattern.length === gamerPattern.length) {
        for (let index = 0; index < gamePattern.length; index++) {
            if (gamePattern[index] != gamerPattern[index]) {
                isSame = false;
                break;
            }
        }
    }else {
        isSame = false;
    }
    if (isSame) {
        $("#level-title").text("You Won!");
    }else if(stage === 2 * gamePattern.length) {
        let failureSound = new Audio("sounds/wrong.mp3");
        failureSound.play();
        $("#level-title").text("You Lost!");
        stage += 1;//+1 so that you won't be spammed with WRONG.MP3 
    }
});
function playKey(id) {
    playSound(id);
    $("#"+id).addClass("pressed");
    setTimeout(() => {
        $("#"+id).removeClass("pressed");
    }, 100);
    stage += 1;
}
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}
function playSound(key) {
    let sound = new Audio("sounds/red.mp3");;
    switch (key) {
        case "red":
            sound = new Audio("sounds/red.mp3");
            sound.play();
            break;
        case "blue":
            sound = new Audio("sounds/blue.mp3");
            sound.play();
            break;
        case "green":
            sound = new Audio("sounds/green.mp3");
            sound.play();
            break;
        case "yellow":
            sound = new Audio("sounds/yellow.mp3");
            sound.play();
            break;
        default:
            console.log("Couldn't load a sound!");
            break;
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function playPattern() {
    for (let i = 0; i < gamePattern.length; i++) {
        playKey(gamePattern[i]);
        await sleep(1000);
    }
    console.log('Played pattern.');
}