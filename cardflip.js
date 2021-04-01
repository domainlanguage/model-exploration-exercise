console.log("Hello world");

// utility for explicit error handling
function getChildByClass(element, className) {
  const child = element.getElementsByClassName(className);
  if (child.length === 0) {
    throw new Error("Element " + element.id + " has no child of class " + className + ", expected 1");
  }
  if (child.length > 1) {
    throw new Error("Element " + element.id + " has multiple children of class " + className + ", expected 1");
  }
  return child[0];
}

// setup
const rawCards = document.getElementsByClassName("card");

// get data in the right format
const cards = [];
for (rawCard of rawCards) {
  const question = getChildByClass(rawCard, "question");
  const answer = getChildByClass(rawCard, "answer");
  cards.push({ question: question, answer: answer });
}

// now that we have all the cards, we know how to hide them.
function hideAllCards() {
  for (card of cards) {
    hideAnswer(card)();
  }
}
document.getElementById("hide-all").addEventListener("click", hideAllCards)

// initialize all cards
for (card of cards) {
  console.log("got a card");
  card.question.addEventListener("click", showAnswer(card))
  card.answer.addEventListener("click", hideAnswer(card))
}

// the actual things that do something
function showAnswer(card) {
  return function (clickEvent) {
    hideAllCards();
    card.question.classList.add("revealed");
    card.answer.classList.add("revealed");
  }
}

function hideAnswer(card) {
  return function () {
    card.question.classList.remove("revealed");
    card.answer.classList.remove("revealed");
  }
}