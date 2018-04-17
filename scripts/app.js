var numRows = 10;
var numCols = 4;

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

// get the main board and key square elements stored in a 2d array
var mainBoardElements = [
    [], [], [], [], [],
    [], [], [], [], []
];
var keySquareElements = [
    [], [], [], [], [],
    [], [], [], [], []
];

var gameOver = false;

// for debugging purposes
alert(randomPattern[0] + ' ' + randomPattern[1] + ' ' + randomPattern[2] + ' '+ randomPattern[3]);

for(var row = 0; row < numRows; ++row) {
    for(var col = 0; col < numCols; ++col) {
        mainBoardElements[row][col] = 
            document.getElementById("square" + row + col);
        
        keySquareElements[row][col] = 
            document.getElementById("keysquare" + row + col);
    }
}

// check users/AI made pattern
function patternMatch(pattern) {
    for(var i = 0; i < userPattern.length; ++i) {
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
    var hasBeenChecked = [false, false, false, false] 
    for(var i = 0; i < numCols; ++i) {
        if(pattern[i] === randomPattern[i]) {
            ++correctPosition;
            hasBeenChecked[i] = true;
        } 
    }
   
    // check for elements not in same position 
    for(var i = 0; i < numCols; ++i) {
        for(var j = 0; j < numCols; ++j) {
            if(pattern[i] === randomPattern[j] && !hasBeenChecked[j] && i !== j) {
                ++correctColor;
            }
        }
    }

    alert('correct position: ' + correctPosition + ' wrong position: ' + correctColor);
   
    // color in the key
    for(var i = 0; i < correctPosition + correctColor; ++i) {
        if(i < correctPosition) {
            keySquareElements[row][i].style.backgroundColor = 'red';

        } else {
            keySquareElements[row][i].style.backgroundColor = 'gray';

        }
    }
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
            alert('Pattern match');
            gameOver = true;

        } else {
            updateKey(userPattern, currentRow)
        }

        currentCol = 0;
        ++currentRow;
        if(currentRow > 9) {
            gameOver = true 
         }
    }
}

for(var i = 0; i < 8; ++i) {
    buttons[i].addEventListener('click', setSquareColor)
}
