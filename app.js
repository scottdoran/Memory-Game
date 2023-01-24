let cardArray = [];
const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const infoDisplay = document.querySelector("#info");
const resetButton = document.querySelector("#resetBtn");
resetButton.addEventListener("click", resetBoard);
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

function setupCards() {
  cardArray = [];
  cardsChosen = [];
  cardsChosenIds = [];
  cardsWon = [];
  cardArray = [
    {
      name: "fries",
      img: "/images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "/images/cheeseburger.png",
    },
    {
      name: "hotdog",
      img: "/images/hotdog.png",
    },
    {
      name: "ice-cream",
      img: "/images/ice-cream.png",
    },
    {
      name: "milkshake",
      img: "/images/milkshake.png",
    },
    {
      name: "pizza",
      img: "/images/pizza.png",
    },
    {
      name: "fries",
      img: "/images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "/images/cheeseburger.png",
    },
    {
      name: "hotdog",
      img: "/images/hotdog.png",
    },
    {
      name: "ice-cream",
      img: "/images/ice-cream.png",
    },
    {
      name: "milkshake",
      img: "/images/milkshake.png",
    },
    {
      name: "pizza",
      img: "/images/pizza.png",
    },
  ];
  cardArray.sort(() => 0.5 - Math.random());
  createBoard();
}

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    card.classList.add("card");
    gridDisplay.append(card);
  }
}

setupCards();

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    infoDisplay.innerHTML = "You have clicked the same image!";
  }

  if (cardsChosen[0] == cardsChosen[1]) {
    infoDisplay.style.color = "green";
    infoDisplay.innerHTML = "You found a match!";
    setTimeout(clearInfoDisplay, 5000);

    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    infoDisplay.style.color = "darkred";
    infoDisplay.innerHTML = "Sorry, try again!";
    setTimeout(clearInfoDisplay, 5000);
  }
  resultDisplay.innerHTML = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    infoDisplay.style.color = "green";
    infoDisplay.innerHTML = "Congratulations, you found them all!";
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length == 2) {
    setTimeout(checkMatch, 1000);
  }
}

function clearInfoDisplay() {
  infoDisplay.innerHTML = "";
}

function resetBoard() {
  resultDisplay.innerHTML = "";

  let element = document.getElementById("grid");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  setupCards();
}
