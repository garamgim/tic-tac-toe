
const Player = (name, marker) => {
    return { name, marker };
}

const you = Player('You', '');
const computer = Player('Computer', '');

const board = (() => {

    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < 9; i++) {

        // Making 9 cells for the gameboard
        const div = document.createElement('div');
        div.className = 'cell';
        div.setAttribute('id', `cell${i}`);
        gameBoard.appendChild(div);

        // Making a button that covers a cell so that it's clickable
        const button = document.createElement('button');
        button.className = 'cell-button';
        button.setAttribute('id', `button${i}`);
        div.appendChild(button);

    }

    const buttons = document.querySelectorAll('.cell-button');

    return {
        gameBoard,
        buttons
    };

})();



const displayController = (() => {

    // Game array for the entire game control
    let gameArray = [];

    for (let i = 0; i < 3; i++) {
        gameArray[i] = [];
        for (let j = 0; j < 3; j++) {
            gameArray[i].push('');
        }
    }

    // Mark on the cell and put marker in the game array
    const markCell = (button, marker) => {

        let markerEmoji = '';

        if (marker === 'x') {
            markerEmoji = '&#127773';
        } else {
            markerEmoji = '&#127770';
        }

        const buttonid = button.id;
        const cellNum = buttonid.charAt(buttonid.length - 1);
        const row = Math.floor(cellNum / 3);
        const col = cellNum % 3;

        if (gameArray[row][col] === '') {
            gameArray[row][col] = marker;
            button.innerHTML = markerEmoji;
        }

    }

    return {
        gameArray,
        markCell
    }

})();



const gameController = (() => {

    const gameArray = displayController.gameArray;

    // Click a cell to play a game
    board.buttons.forEach((button) => {
        button.addEventListener('click', () => {

            displayController.markCell(button, you.marker);
            checkWinner();
            setTimeout(function () {
                computerTurn()
            }, 500);
            console.log(gameArray);

        });
    });

    // Computer playing...
    const computerTurn = () => {
        let emptyCellCounter = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameArray[i][j] === '') {
                    emptyCellCounter++;
                }
            }
        }

        // Computer will click on random cell and mark
        function returnRandomButton() {
            let randomButton = Element;

            // Computer will skip to the next random button if it is already marked
            // Loop won't work if there is only one cell left
            do {
                randomButton = board.buttons[Math.floor(Math.random() * 9)];
            } while (randomButton.innerHTML !== '' && emptyCellCounter > 1);

            return randomButton;
        }

        // Computer will stop playing if player won
        if (!returnRandomButton().disabled) {
            displayController.markCell(returnRandomButton(), computer.marker);
        }

        checkWinner();
    }

    const checkWinner = () => {

        // 3 winning status (horizontally marked & vertically marked & diagonally marked)
        const horizontalWin = (marker) => {
            let boolArray = [];
            for (let i = 0; i < 3; i++) {
                boolArray.push(gameArray[i].every(cell => cell === marker));
            }
            return boolArray.includes(true);
        }

        const verticalWin = (marker) => {
            let boolArray1 = [];
            let boolArray2 = [];
            let boolArray3 = [];
            for (let i = 0; i < 3; i++) {
                boolArray1.push(gameArray[i][0]);
                boolArray2.push(gameArray[i][1]);
                boolArray3.push(gameArray[i][2]);
            }
            return boolArray1.every(cell => cell === marker) || boolArray2.every(cell => cell === marker) || boolArray3.every(cell => cell === marker);
        }

        const diagonalWin = (marker) => {
            let boolArray1 = [];
            let boolArray2 = [];

            for (let i = 0; i < 3; i++) {
                boolArray1.push(gameArray[i][i]);
                boolArray2.push(gameArray[i][gameArray.length - (i + 1)]);
            }

            return boolArray1.every(cell => cell === marker) || boolArray2.every(cell => cell === marker);
        };

        // finish game if winning status detected
        if (horizontalWin(you.marker) || verticalWin(you.marker) || diagonalWin(you.marker)) {
            console.log("You won!");
            finishGame();
        } else if (horizontalWin(computer.marker) || verticalWin(computer.marker) || diagonalWin(computer.marker)) {
            console.log("Computer won...");
            finishGame();
        }
    }

    const finishGame = () => {
        board.buttons.forEach((button) => {
            button.disabled = true;
        });
    }

    return {

    }

})();

const starter = (() => {


    const playButton = document.getElementById("play");
    let order = "";

    // Show player & order selection dialog upon page load

    document.addEventListener("DOMContentLoaded", () => {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
    })


    // Send selected marker & order data upon submission (submit button)

    playButton.addEventListener("click", (e) => {
        e.preventDefault();

        // Assigning marker to Player objects
        you.marker = document.querySelector('input[name="player"]:checked').value;
        computer.marker = (you.marker === 'x' ? 'o' : 'x');

        dialog.close();
    })

    return {
    }

})();
