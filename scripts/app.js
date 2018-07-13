var numRows = 10;
var numCols = 4;

// variable to count the turns a user makes
var totalTurns = 0;

// keep track of ow many seconds have gone by
var timeElapsedInSeconds = 0;

// array to store the users current pattern, gets checked and resets every row
var userPattern = [ ];

// get a random pattern
var randomPattern = [];
var colors = [
    'gray', 'red', 'yellow', 'green', 
    'blue', 'purple', 'orange', 'black'
];

for(var i = 0; i < 4; ++i) {
    var randomNum = Math.floor(Math.random() * 7);
    
    randomPattern[i] = colors[randomNum];
}

// get the color buttons
var greyButton = document.getElementById('greyButton');
var redButton = document.getElementById('redButton');
var yellowButton = document.getElementById('yellowButton');
var greenButton = document.getElementById('greenButton');
var blueButton = document.getElementById('blueButton');
var purpleButton = document.getElementById('purpleButton');
var orangeButton = document.getElementById('orangeButton');
var blackButton = document.getElementById('blackButton');

// store buttons in an array
var buttons = [greyButton, redButton, yellowButton, greenButton,
                blueButton, purpleButton, orangeButton, blackButton];
				
var undoButton = document.getElementById('undoButton');

// get the main board and key square elements stored in a 2d array
var mainBoardElements = [
    [], [], [], [], [],
    [], [], [], [], []
];
var keySquareElements = [
    [], [], [], [], [],
    [], [], [], [], []
];

var patternMatchFound = false;
var gameOver = false;

for(var row = 0; row < numRows; ++row) {
    for(var col = 0; col < numCols; ++col) {
        mainBoardElements[row][col] = 
            document.getElementById("square" + row + col);
        
        keySquareElements[row][col] = 
            document.getElementById("keysquare" + row + col);
    }
}

// update the timer
function updateTimer() {
    ++timeElapsedInSeconds;

    var clock = document.getElementById('clock'); 
    
    if(timeElapsedInSeconds < 10) {
        clock.innerHTML = "00:0" + timeElapsedInSeconds;
    }

    if(timeElapsedInSeconds >= 10 && timeElapsedInSeconds < 60) {
        clock.innerHTML = "00:" + timeElapsedInSeconds;
    }

    if(timeElapsedInSeconds >= 60) {
        // how many minutes have passed
        var minute = Math.floor(timeElapsedInSeconds / 60);
        var second = timeElapsedInSeconds - (minute * 60);
        
        if(minute < 10 && second < 10) {
            clock.innerHTML = "0" + minute + ":" + "0" + second;
        }
        else if(minute < 10 && second >= 10) {
            clock.innerHTML = "0" + minute + ":" + second;
        }
        else {
            clock.innerHTML = minute + ":" + second;
        }
    }
}

// timer
var timer = setInterval(updateTimer, 1000);

// reset the game
function resetGame() {
        ++totalTurns;
	if(patternMatchFound) {
                // total score is time elapsed minus extra turns 
                var score = timeElapsedInSeconds - (totalTurns + 10);
                alert('Pattern Match!\nFound in ' + totalTurns + 
                        ' turns\nTime Elapsed: ' + timeElapsedInSeconds +
                        ' seconds\nTotal Score: ' + score);

                alert('Game Reset');
		
	} else {
		alert('Pattern not found! Game reseting...');
	}

	// reset both patterns
	userPattern = [];
	for(var i = 0; i < 4; ++i) {
			var randomNum = Math.floor(Math.random() * 7);
		
			randomPattern[i] = colors[randomNum];
	}
	
	// clear the board
	for(var row = 0; row < numRows; ++row) {
		for(var col = 0; col < numCols; ++col) {
			mainBoardElements[row][col].style.backgroundColor = 'white';
			keySquareElements[row][col].style.backgroundColor = 'white';
		}
	}

        totalTurns = 0; 
	gameOver = false;
        timeElapsedInSeconds = 0;
}

function patternMatch(pattern) {
    for(var i = 0; i < numCols; ++i) {
        if(pattern[i] !== randomPattern[i]) {
            return false;
        }
    }

    return true;
}

function updateKey(pattern, row) {
    // count correct colors in wrong position and colors in correct position
    var correctPosition = 0;
    var correctColor = 0;

    // keep track of what has been checked
    var solnChecked = [false, false, false, false] 
    var userChecked = [false, false, false, false] 

    // check elements in the correct position
    for(var i = 0; i < numCols; ++i) {
        if(pattern[i] === randomPattern[i]) {
            ++correctPosition;
            solnChecked[i] = true;
            userChecked[i] = true;
        } 
    }
   
    // check for elements not in same position 
    for(var i = 0; i < numCols; ++i) {
        for(var j = 0; j < numCols; ++j) {
            if(pattern[i] === randomPattern[j] && !solnChecked[j] && !userChecked[i] && i !== j) {
                ++correctColor;
                solnChecked[j] = true;
                userChecked[i] = true;
            }
        }
    }

 //   alert('correct position: ' + correctPosition + ' wrong position: ' + correctColor);
   
    // color in the key
    for(var i = 0; i < correctPosition + correctColor; ++i) {
        if(i < correctPosition) {
            keySquareElements[row][i].style.backgroundColor = 'red';

        } else {
            keySquareElements[row][i].style.backgroundColor = 'gray';

        }
    }

    ++totalTurns;
}

// current position on board
var currentRow = 0;
var currentCol = 0;

function setSquareColor() {
    if(this.id == 'greyButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'gray';
        userPattern[currentCol] = 'gray';
    }
    if(this.id == 'redButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'red';
        userPattern[currentCol] = 'red';
    }
    if(this.id == 'yellowButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'yellow';
        userPattern[currentCol] = 'yellow';
    }
    if(this.id == 'greenButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'green';
        userPattern[currentCol] = 'green';
    }
    if(this.id == 'blueButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'blue';
        userPattern[currentCol] = 'blue';
    }
    if(this.id == 'purpleButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'purple';
        userPattern[currentCol] = 'purple';
    }
    if(this.id == 'orangeButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'orange';
        userPattern[currentCol] = 'orange';
    }
    if(this.id == 'blackButton') {
        mainBoardElements[currentRow][currentCol].style.backgroundColor = 'black';
        userPattern[currentCol] = 'black';
    }

    ++currentCol;
    if(currentCol > 3) {
        if(patternMatch(userPattern)) {
			patternMatchFound = true;
			gameOver = true;

        } else {
            updateKey(userPattern, currentRow);
        }

        currentCol = 0;
        ++currentRow;
        if(currentRow > 9) {
            gameOver = true;
         }
    }
	
	if(gameOver) {
		currentRow = 0;
		currentCol = 0;
		resetGame();
	}
}

function undoPrevious() {
	mainBoardElements[currentRow][currentCol - 1].style.backgroundColor = 'white';
	currentCol--;
}

// adding listeners
undoButton.addEventListener('click', undoPrevious);
for(var i = 0; i < 8; ++i) {
    buttons[i].addEventListener('click', setSquareColor);
}
