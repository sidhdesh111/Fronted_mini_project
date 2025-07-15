const winner_text = document.querySelector(".winner");
winner_text.textContent = "";
const body_section = document.body;
const reset_btn = document.querySelector(".reset_button");
let count = 0;
let winner_pattern = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6], // Diagonal (top-right to bottom-left)
];

let isX = true;

const allButton = document.querySelectorAll("button");

allButton.forEach((ele) => {
  ele.textContent = "";
  ele.addEventListener("click", function () {
    ele.textContent = isX == true ? "X" : "O";
    isX = !isX;
    count++;
    ele.setAttribute("disabled", "true");
    let isWinner = checkWinner();
    if (isWinner) {
      allButton.forEach((ele) => {
        ele.setAttribute("disabled", "true");
      });
    }
    if (count === 9 && !isWinner) {
      draw_game();
    }
  });
});

function checkWinner() {
  for (const wining_arr of winner_pattern) {
    console.log(wining_arr);
    console.log(
      allButton[wining_arr[0]].innerHTML,
      allButton[wining_arr[1]].innerHTML,
      allButton[wining_arr[2]].innerHTML
    );
    if (
      allButton[wining_arr[0]].innerHTML != "" &&
      allButton[wining_arr[1]].innerHTML != "" &&
      allButton[wining_arr[2]].innerHTML != ""
    ) {
      if (
        allButton[wining_arr[0]].innerHTML ===
          allButton[wining_arr[1]].innerHTML &&
        allButton[wining_arr[1]].innerHTML ===
          allButton[wining_arr[2]].innerHTML
      ) {
        console.log("winner is" + allButton[wining_arr[0]].innerHTML);
        show_winner(allButton[wining_arr[0]].innerHTML);
        return true;
      }
    }
  }
}

function show_winner(winner) {
  winner_text.textContent = `The Winner is : ${winner}`;
  createResetButton();
}

function draw_game() {
  winner_text.textContent = `Game is : Draw`;
  createResetButton();
}

function createResetButton() {
  // Check if a reset button already exists to prevent duplicates
  if (!document.querySelector(".reset_button")) {
    const newResetButton = document.createElement("a"); // Using 'a' for styling as a link
    newResetButton.setAttribute("href", "#"); // Good practice for clickable anchors
    newResetButton.textContent = "Reset Game";
    newResetButton.classList.add("reset_button"); // Use a consistent class name

    // *** IMPORTANT: Attach the event listener to the NEWLY CREATED button ***
    newResetButton.addEventListener("click", function (e) {
      for (const ele of allButton) {
        ele.textContent = "";
        ele.disabled = false;
        count = 0;
        isX = true;
      }
      console.log(newResetButton.parentElement.lastElementChild.remove());
      winner_text.textContent = "";
    });

    body_section.appendChild(newResetButton);
  }
}
