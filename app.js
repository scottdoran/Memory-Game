let cardArray = [];
const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const infoDisplay = document.querySelector("#info");
const resetButton = document.querySelector("#resetBtn");
const attempts = document.querySelector("#attempts");
resetButton.addEventListener("click", resetBoard);
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];
let noOfAttempts = 0;

const coinsSorted = new Audio("./sounds/coinsSortedSound.wav")
const golfClap = new Audio("./sounds/golfClapSound.wav")
const bell = new Audio("./sounds/bellSound.wav")

function setupCards() {
  cardArray = [];
  cardsChosen = [];
  cardsChosenIds = [];
  cardsWon = [];
  cardArray = [
    {
      name: "betty",
      img: "./images/betty.jpg",
    },
    {
      name: "tag",
      img: "./images/tag.png",
    },
    {
      name: "norrie",
      img: "./images/norrie.png",
    },
    {
      name: "roly",
      img: "./images/roly.png",
    },
    {
      name: "happy",
      img: "./images/happy.png",
    },
    {
      name: "duggee",
      img: "./images/duggee.png",
    },
    {
      name: "betty",
      img: "./images/betty.jpg",
    },
    {
      name: "tag",
      img: "./images/tag.png",
    },
    {
      name: "norrie",
      img: "./images/norrie.png",
    },
    {
      name: "roly",
      img: "./images/roly.png",
    },
    {
      name: "happy",
      img: "./images/happy.png",
    },
    {
      name: "duggee",
      img: "./images/duggee.png",
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
  }

  if (cardsChosen[0] == cardsChosen[1]) {
    bell.play()
    infoDisplay.style.color = "green";
    infoDisplay.innerHTML = "You found a match!";
    setTimeout(clearInfoDisplay, 3000);

    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cards[optionOneId].classList.remove('card')
    cards[optionTwoId].classList.remove('card')
    cards[optionOneId].classList.add("card-chosen")
    cards[optionTwoId].classList.add("card-chosen")
    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    infoDisplay.style.color = "yellow";
    infoDisplay.innerHTML = "Try again!";
    setTimeout(clearInfoDisplay, 3000);
  }

  const cards2 = document.querySelectorAll(".card");
  addEventListenerList(cards2, 'click', flipCard)

  resultDisplay.innerHTML = cardsWon.length;
  cardsChosen = [];
  cardsChosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    golfClap.play()
    infoDisplay.style.color = "green";
    infoDisplay.innerHTML = "Congratulations, you found them all!";
  }
}

function flipCard() {
  coinsSorted.play();
  this.removeEventListener('click', flipCard)
  const cards = document.querySelectorAll("#grid img");
  const cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    removeEventListenerList(cards, 'click', flipCard)
    setTimeout(checkMatch, 1000);
    noOfAttempts++;
    attempts.innerHTML = noOfAttempts;
  }
}

function removeEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].removeEventListener(event, fn, false);
  }
}

function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

function clearInfoDisplay() {
  infoDisplay.innerHTML = "";
}

function resetBoard() {
  resultDisplay.innerHTML = "";
  noOfAttempts = 0;
  attempts.innerHTML = "";

  let element = document.getElementById("grid");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  setupCards();
}
