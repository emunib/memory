const grid = document.querySelector(".grid");
const resetBtn = document.querySelector(".reset-btn");
let values = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = [];

let resetTimeoutId = "";

function card(value) {
  const card = document.createElement("div");
  const flipper = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");

  card.classList.add("card");
  flipper.classList.add("card__flipper");
  front.classList.add("card__front");
  back.classList.add("card__back");

  back.innerText = value;

  flipper.append(front, back);
  card.append(flipper);

  card.addEventListener("click", () => {
    openCard(card);
  });

  return card;
}

function reset() {
  cards.forEach((card) => card.classList.remove("open"));
}

function openCard(card) {
  const openCards = cards.filter((card) => card.classList.contains("open"));
  if (openCards.length < 2) {
    clearTimeout(resetTimeoutId);
    resetTimeoutId = setTimeout(reset, 1500);
    card.classList.add("open");
  }
}

values = [...values, ...values].sort((a, b) => 0.5 - Math.random()); // duplicate values and roughly shuffle the order
cards = values.map((val) => card(val));
grid.append(...cards);

resetBtn.addEventListener("click", reset);
