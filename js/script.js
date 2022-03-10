const grid = document.querySelector(".grid");
const resetBtn = document.querySelector(".reset-btn");
const timer = document.querySelector(".timer");

const icons = [
  "ghost",
  "ice-cream",
  "fire-flame-curved",
  "guitar",
  "meteor",
  "bolt-lightning",
  "sun",
  "paw",
  "feather-pointed",
  "burger",
  "paper-plane",
  "futbol",
  "sailboat",
  "money-bill-1-wave",
  "face-smile",
];
const n = 4;
const diagonals = [];
for (let i = 0; i < 2 * n - 1; i++) {
  const arr = [];
  let j = i < n ? i + 1 : (2 * n - 1) % i;
  let k = i < n ? i * n : ((i + 1) % n) + n * n - n;

  for (let l = 0; l < j; l++) {
    arr.push(k - l * (n - 1));
  }
  diagonals.push(arr);
}
let cards = [];

let resetTimeoutId = "";

function icon(value) {
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", `fa-${value}`);
  return icon;
}

function card(value) {
  const card = document.createElement("div");
  const bg = document.createElement("div");
  const flipper = document.createElement("div");
  const back = document.createElement("div");
  const front = document.createElement("div");

  card.classList.add("card");
  bg.classList.add("card__bg");
  flipper.classList.add("card__flipper");
  back.classList.add("card__back");
  front.classList.add("card__front");

  bg.appendChild(icon(value));
  front.appendChild(icon(value));
  card.setAttribute("data-id", value);

  flipper.append(back, front);
  card.append(bg);
  card.append(flipper);

  card.addEventListener("click", () => {
    timer.classList.remove("paused");
    openCard(card);
  });

  return card;
}

function clear() {
  cards.forEach((card) => {
    if (!card.classList.contains("matched"))
      card.classList.remove("open", "shake");
  });
}
function reset() {
  const delay = 120;
  grid.classList.add("reset");
  diagonals.forEach((d, i) => {
    d.forEach((j) => {
      setTimeout(() => {
        cards[j].classList.remove("open");
      }, i * delay);
    });
  });
  timer.classList.remove("fail");
  timer.classList.add("reset");

  setTimeout(() => {
    grid.innerHTML = "";
    const values = shuffleArray(icons).slice(0, 2 * n);
    cards = shuffleArray([...values, ...values]).map((val) => card(val));
    grid.append(...cards);
    timer.classList.add("start", "paused");
    timer.classList.remove("reset");
    grid.classList.remove("reset");
  }, n * 2 * delay);
}

function getOpenCards() {
  return cards.filter(
    (card) =>
      card.classList.contains("open") && !card.classList.contains("matched")
  );
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
        openCards.forEach((card) => card.classList.add("shake"));
      }
    }
  }
}

// reset();
grid.innerHTML = "";
const values = shuffleArray(icons).slice(0, 2 * n);
cards = shuffleArray([...values, ...values]).map((val) => card(val));
grid.append(...cards);

resetBtn.addEventListener("click", () => {
  if (!resetBtn.classList.contains("hidden")) {
    reset();
    resetBtn.classList.remove("visible");
    resetBtn.classList.add("hidden");
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

timer.addEventListener("animationend", () => {
  if (timer.classList.contains("start")) {
    clearTimeout(resetTimeoutId);
    timer.classList.remove("start");
    timer.classList.add("fail");
    cards.forEach((card) => {
      card.classList.add("open", "fail");
      card.classList.remove("matched");
    });
  } else {
    resetBtn.classList.remove("hidden");
    resetBtn.classList.add("visible");
  }
});
