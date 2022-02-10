const grid = document.querySelector(".grid");
const resetBtn = document.querySelector(".reset-btn");
let values = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = [];

let resetTimeoutId = "";

function card(value) {
  const card = document.createElement("div");
  const bg = document.createElement("div");
  const flipper = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");

  card.classList.add("card");
  bg.classList.add("card__bg");
  flipper.classList.add("card__flipper");
  front.classList.add("card__front");
  back.classList.add("card__back");

  bg.innerText = value;
  back.innerText = value;
  card.setAttribute("data-id", value);

  flipper.append(front, back);
  card.append(bg);
  card.append(flipper);

  card.addEventListener("click", () => {
    openCard(card);
  });

  return card;
}

function clear() {
  cards.forEach(card => {if (!card.classList.contains('matched')) card.classList.remove("open", "shake")});
}
function reset() {
  cards.forEach(card => card.classList.remove("open", "shake", "matched"));
}

function getOpenCards() {
  return cards.filter((card) => card.classList.contains("open") && !card.classList.contains("matched"));
}

function openCard(card) {
  if (getOpenCards().length < 2) {
    clearTimeout(resetTimeoutId);
    resetTimeoutId = setTimeout(clear, 1500);
    card.classList.add("open");

    const openCards = getOpenCards();
    if (openCards.length === 2) {
      if (
        openCards[0].getAttribute("data-id") ===
        openCards[1].getAttribute("data-id")
      ) {
        clearTimeout(resetTimeoutId);
        openCards.forEach((card) => card.classList.add("matched"));
      } else {
        setTimeout(() => {
          openCards.forEach((card) => card.classList.add("shake"));
        }, 1000);
      }
    }
  }
}

values = [...values, ...values].sort((a, b) => 0.5 - Math.random()); // duplicate values and roughly shuffle the order
cards = values.map((val) => card(val));
grid.append(...cards);

resetBtn.addEventListener("click", reset);
