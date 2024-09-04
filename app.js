let boxes = document.querySelectorAll(".boxes");
let resetBtn = document.querySelector(".rst_btn");
let newGameBtn = document.querySelector(".new_btn");
let msg = document.querySelectorAll(".Msg");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

newGameBtn.hidden = true;
let turnO = true;

const hideMsg = () => {
    for (let m of msg) {
        m.hidden = true;
    }
}

hideMsg();
msg[1].style.color = "yellow";

const resetGame = () => {
    turnO = true;
    newGameBtn.hidden = true;
    resetBtn.hidden = false;
    enableBoxes();
    hideMsg();
    count = 0;
};

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            //playerO
            box.innerText = "O";
            turnO = false;
            box.style.color = "yellow";  // give yellow color for O 
        } else {
            //playerX
            box.innerText = "X";
            box.style.color = "aqua";  // give yellow color for X 
            turnO = true;
        }

        count++;
        if (count == 9) {
            msg[2].hidden = false;
            newGameBtn.hidden = false;
            resetBtn.hidden = true;
        }

        checkWinner();
        box.disabled = true;
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            msg[2].hidden = true;   // hidde draw msg
            if (pos3Val === "X") {
                msg[0].hidden = false;  // X wins
            }
            else {
                msg[1].hidden = false;  // O wins
            }
            disableBoxes();
            break;
        }
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);  