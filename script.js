function checkWin() {
    if (
        (boardArray[0] !== "" && boardArray[0] === boardArray[1] && boardArray[0] === boardArray[2]) ||
        (boardArray[3] !== "" && boardArray[3] === boardArray[4] && boardArray[3] === boardArray[5]) ||
        (boardArray[6] !== "" && boardArray[6] === boardArray[7] && boardArray[6] === boardArray[8]) ||
        (boardArray[0] !== "" && boardArray[0] === boardArray[3] && boardArray[0] === boardArray[6]) ||
        (boardArray[1] !== "" && boardArray[1] === boardArray[4] && boardArray[1] === boardArray[7]) ||
        (boardArray[2] !== "" && boardArray[2] === boardArray[5] && boardArray[2] === boardArray[8]) ||
        (boardArray[0] !== "" && boardArray[0] === boardArray[4] && boardArray[0] === boardArray[8]) ||
        (boardArray[2] !== "" && boardArray[2] === boardArray[4] && boardArray[2] === boardArray[6])) {
            if ((checkTurn().previousClass === "circle" && createPlayers().player1.mark === "circle") ||
            (checkTurn().previousClass === "x" && createPlayers().player1.mark === "x")) {
            endGame();
            announceWinner(`${createPlayers().player1.name} wins!`);
            restartGame();
            } else if ((checkTurn().previousClass === "circle" && createPlayers().player2.mark === "circle") ||
            (checkTurn().previousClass === "x" && createPlayers().player2.mark === "x")) {
            endGame();
            announceWinner(`${createPlayers().player2.name} wins!`);
            restartGame();
            }
        } else if(boardArray.every(isNotEmpty)) {
            endGame();
            announceWinner(`It's a Tie!`);
            restartGame();
    }
};

function isNotEmpty(value) {
    return value !== "";
};

const boardArray = ["", "", "", "", "", "", "", "", ""];
const board = document.getElementById("board");
for (let i = 0; i <= boardArray.length - 1; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    board.appendChild(cell);
};

function createPlayers() {
    function players(name, mark) {
        return {
            name: name,
            mark: mark,
        };
    };
    const player1 = players(document.getElementById("name-1").value, document.getElementById("mark-1").value);
    const player2 = players(document.getElementById("name-2").value, document.getElementById("mark-2").value);
    return { player1, player2 };
};

function checkTurn() {
    let player1Turn = true;
    const array1 = boardArray.filter((cell) => cell === "");
    if (array1.length % 2 === 1) {
        player1Turn;
        } else {
        player1Turn = false;
    }
    const currentClass = player1Turn ? createClasses().player1Class : createClasses().player2Class;
    const previousClass = player1Turn ? createClasses().player2Class : createClasses().player1Class;
    return { currentClass, previousClass };
};

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", function () {
    if ( document.getElementById("name-1").value === "" || document.getElementById("name-2").value === "" ) {
        alert("Please fill in the player names!");
        return;
    } else if ( document.getElementById("mark-1").value === document.getElementById("mark-2").value ) {
        alert("Please choose a mark for each player!");
        return;
    } else {
        document.getElementById("form").classList.add("hide");
        board.classList.remove("hide");
        this.classList.add("hide");
        createPlayers();
        createClasses();
        setHover();
    }
});

function createClasses() {
    let player1Class = createPlayers().player1.mark;
    let player2Class = createPlayers().player2.mark;
    return { player1Class, player2Class };
};

function setHover() {
    board.classList.remove("circle");
    board.classList.remove("x");
    board.classList.add(checkTurn().currentClass);
};

cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(cell, index) {
    this.classList.add(checkTurn().currentClass);
    boardArray.splice(parseInt(this.getAttribute("data-index")), 1, checkTurn().currentClass);
    checkWin();
    checkTurn();
    setHover();
};

function endGame() {
    board.classList.remove("circle");
    board.classList.remove("x");
    cells.forEach((cell) => {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.addEventListener("click", handleClick, { once: true });
    });
    boardArray.fill("");
    const winningMessage = document.getElementById("winningMessage");
    winningMessage.classList.add("show");
};

function announceWinner(winner) {
    winningMessageText = document.getElementById("winning-message-text");
    winningMessageText.innerText = winner;
};

function restartGame() {
    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
        document.getElementById("winningMessage").classList.remove("show");
        board.classList.add("hide");
        document.getElementById("form").classList.remove("hide");
        startBtn.classList.remove("hide");
        document.getElementById("name-1").value = "";
        document.getElementById("mark-1").value = "";
        document.getElementById("name-2").value = "";
        document.getElementById("mark-2").value = "";
    });
};