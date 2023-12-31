const bluredDiv = document.querySelector(".blured-div");
const rulesButtonDiv = document.querySelector(".rules-button-div");
const rulesButton = document.querySelector(".rules-button");
const scoreNumber = document.querySelector(".score-number");
const container = document.querySelector(".container");
const rulesPage = document.querySelector(".rules-page");
const rulesPageDesktop = document.querySelector(".rules-page-desktop");
const closeIcon = document.querySelector(".close-icon");
const closeIconDesktop = document.querySelector(".close-icon-desktop");
const gameIcons = document.querySelectorAll(".icon");
const content = document.querySelector(".content");
const preStep2 = document.querySelector(".pre-step2");
const playerChoice = document.querySelector(".player-choice");
const houseIcon = document.querySelector(".house-icon");
const computerChoiceImage = document.querySelector(".computer-choice");
const scissors = document.querySelector(".scissors");
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const spock = document.querySelector(".spock");
const lizard = document.querySelector(".lizard");
const resultDesktopText = document.getElementById("result-text-desktop");
const resultText = document.getElementById("result-text");
const playAgainDesktopButton = document.getElementById("play-again-desktop");
const playAgainButton = document.getElementById("play-again");

// Creating an empty array to store player choices
const playerChoose = [];
const iconsArray = ["scissors", "paper", "rock", "lizard", "spock"];
let score = 0;

rulesButton.addEventListener("click", () => {
  if (window.innerWidth <= 1440) {
    container.style.display = "none";
    rulesPage.style.display = "flex";
    rulesButton.style.display = "none";
  }

  if (window.innerWidth >= 1440) {
    rulesPageDesktop.style.display = "flex";
    rulesPageDesktop.style.zIndex = "10";
    bluredDiv.style.display = "block";
  }
});

closeIcon.addEventListener("click", () => {
  container.style.display = "block";
  rulesPage.style.display = "none";
  rulesButton.style.display = "block";
});

closeIconDesktop.addEventListener("click", () => {
  if (window.innerWidth >= 1440) {
    container.style.display = "block";
    rulesPageDesktop.style.display = "none";
    container.style.background = "";
    rulesButton.style.display = "block";
    bluredDiv.style.display = "none";
  }
});

gameIcons.forEach((icon) => {
  icon.addEventListener("click", function () {
    // Get the class of the clicked icon and push it to the playerChoose array
    const choice = icon.classList[1];
    playerChoose.push(choice);

    preStep2.style.display = "flex";
    content.style.display = "none";

    playerChoice.src = `./assets/icon-${choice}.svg`;

    resultText.classList.remove("visible");
    computerChoiceImage.classList.remove("visible");
    playAgainButton.classList.remove("visible");

    const randomIndex = Math.floor(Math.random() * iconsArray.length);
    const computerChoice = iconsArray[randomIndex];

    setTimeout(function () {
      houseIcon.style.opacity = 0;

      computerChoiceImage.src = "./assets/icon-" + computerChoice + ".svg";
      computerChoiceImage.classList.add("visible");
    }, 1000);

    // Determine the result after a 1-second delay
    setTimeout(function () {
      if (choice === computerChoice) {
        resultText.textContent = "DRAW";
        playAgainButton.style.display = "block";
        rulesButton.style.marginTop = "52px";

        if (window.innerWidth >= 1440) {
          resultDesktopText.textContent = "DRAW";
          playAgainDesktopButton.style.display = "block";
        }
      } else if (
        (choice === "rock" &&
          (computerChoice === "scissors" || computerChoice === "lizard")) ||
        (choice === "scissors" &&
          (computerChoice === "paper" || computerChoice === "lizard")) ||
        (choice === "paper" &&
          (computerChoice === "rock" || computerChoice === "spock")) ||
        (choice === "lizard" &&
          (computerChoice === "spock" || computerChoice === "paper")) ||
        (choice === "spock" &&
          (computerChoice === "rock" || computerChoice === "scissors"))
      ) {
        resultText.textContent = "YOU WIN";
        playAgainButton.style.display = "block";
        rulesButton.style.marginTop = "52px";
        score++;
        scoreNumber.textContent = score;
        if (window.innerWidth >= 1440) {
          resultDesktopText.textContent = "YOU WIN";
          playAgainDesktopButton.style.display = "block";
        }
      } else {
        resultText.textContent = "YOU LOSE";
        playAgainButton.style.display = "block";
        rulesButton.style.marginTop = "52px";
        if (score > 0) {
          score--;
          scoreNumber.textContent = score;
        }

        if (window.innerWidth >= 1440) {
          resultDesktopText.textContent = "YOU LOSE";
          playAgainDesktopButton.style.display = "block";
        }
      }

      // Set the result and "PLAY AGAIN" button to be visible with animation
      resultText.classList.add("visible");
      playAgainButton.classList.add("visible");

      setTimeout(function () {
        if (window.innerWidth >= 1440) {
          resultDesktopText.classList.add("visible");
          playAgainDesktopButton.classList.add("visible");
        }
      }, 700);
    }, 2000);
  });
});

// Reset elements and CSS classes
playAgainButton.addEventListener("click", function () {
  resultText.textContent = "";
  playAgainButton.style.display = "none";
  preStep2.style.display = "none";
  content.style.display = "block";
  houseIcon.style.opacity = 0.2;
  computerChoiceImage.src = "";
});

playAgainDesktopButton.addEventListener("click", function () {
  resultDesktopText.textContent = "";
  playAgainDesktopButton.style.display = "none";
  preStep2.style.display = "none";
  content.style.display = "block";
  houseIcon.style.opacity = 0.2;
  computerChoiceImage.src = "";
});
