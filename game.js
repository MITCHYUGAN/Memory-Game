const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let started = false


$(document).keydown(function () {
    if(!started){
        $('#level-title').text(`Level ${level}`)
        nextSequence()
        started = true;
    }
})

$('.btn').click(function(){
    const userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        console.log(gamePattern)
        console.log(userClickedPattern)
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        startOver()
    }
}

function nextSequence(){
    userClickedPattern = [];
    level+=1
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}

function playSound(name){
    const playSound = new Audio('./sounds/' + name + '.mp3')
    playSound.play()
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 200)
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}