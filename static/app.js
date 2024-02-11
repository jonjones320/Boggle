let myTimer = setInterval(countDown, 1000);

function updateTimer(newTime) {
        $('#timer').text(newTime);
    }

function outOfTime() {
    $('#timer').text("Time is up...");
}
    
async function countDown() {
    let newTime = parseInt($('#timer').text()) - 1;

    if (newTime >= 0) {
        updateTimer(newTime)
    }
    else {
        clearInterval(myTimer);
        outOfTime();
    }
}

function displayMsg(msg) {
    $('#msgDisplay').text(msg)
}

function addScore(word) {
    console.log("Three")
    let currentScore = parseInt($('#scoreP').text());
    let newScore = (word.length + currentScore)
    $('#scoreP').text(newScore)
}

async function getGuess(e) {
    e.preventDefault();

    let word = $("#guessInput").val().toLowerCase()
    console.log("One")

    result = await axios.get( '/guess', { params: { word : word }})
    console.log("Two")
    
    if (result.data.result === "not-word") {
        displayMsg(`${word} is not a valid word.`);
    }
       
    else if (result.data.result === "not-on-board") {
        displayMsg(`"${word}" is not on the board.`);
    }

    else {
        displayMsg(`${word} is a match.`);
        addScore(word);
    }
        
}


$("#playBttn").on("click", countDown);
$("#guessForm").on("submit", getGuess);