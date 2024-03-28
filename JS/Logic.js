let gameOver = new Audio("./Assets/gameover.mp3");
let ting = new Audio("./Assets/ting.mp3");

let turn = "X";
let isGameOver = false;

// to change the turns
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// playing logic and match draw
let boxes = document.getElementsByClassName("box");
let count = 0;
Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector(".boxtext");

    element.addEventListener("click", () => {
        if (boxText.innerText === "") {
            boxText.innerText = turn;
            count += 1;
            turn = changeTurn();
            checkWin();

            if (!isGameOver && count != 9){
                ting.play();
                document.querySelector(".turn").innerText = `Turn for : ${turn}`;
            }
            else if (!isGameOver && count == 9) {
                document.querySelector(".turn").innerText = `Match Tied`;
                let i = count - 1;
                while (i >= 0) {
                    document.getElementsByClassName("box")[i].style.backgroundColor = "violet";
                    i -= 1;
                }
            }
        }
    });
});
// to check for winning the game
const checkWin = () => {
    let boxText = document.getElementsByClassName("boxtext");
    wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach((e) => {
        if (boxText[e[0]].innerText === boxText[e[1]].innerText &&
            boxText[e[1]].innerText === boxText[e[2]].innerText &&
            boxText[e[0]].innerText != "") {
            document.querySelector(".turn").innerText =
                boxText[e[0]].innerText + " Won";
            isGameOver = true;
            document.querySelector("img").style.width = "250px";

            for (i in e) {
                document.getElementsByClassName("box")[e[i]].style.backgroundColor =
                    "lightgreen";
            }
            turn = "";  
        }
    });
};
// reset button
document.querySelector("button").addEventListener("click", () => {
    let boxTexts = document.querySelectorAll(".boxtext");
    Array.from(boxTexts).forEach((element) => {
        element.innerText = "";
        element.parentElement.style.backgroundColor = "";
    });

    document.querySelector("img").style.width = "0px";
    document.querySelector(".turn").innerText = "Turn for : X";
    isGameOver = false;
    turn = "X";
});
