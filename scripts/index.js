// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
let cardsIndex = 0;

// @todo: Функция создания карточки
function createCard(cardElement) {
    let cardTemplateContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    cardTemplateContent.querySelector(".card__title").textContent =
        cardElement.name;
    cardTemplateContent
        .querySelector(".card__image")
        .setAttribute("src", cardElement.link);
    cardTemplateContent
        .querySelector(".card__image")
        .setAttribute("alt", cardElement.name);

    // вызов функции удаления карточки
    cardTemplateContent
        .querySelector(".card__delete-button")
        .addEventListener("click", (event) => {
            removeCard(event);
        });
    return cardTemplateContent;
}

function addCard() {
    if (initialCards.length - 1 < cardsIndex) {
        return;
    }
    const cardElement = initialCards[cardsIndex];
    cardsIndex += 1;
    const cardTemplateContent = createCard(cardElement);
    cardList.append(cardTemplateContent);
}

// @todo: Функция удаления карточки
function removeCard(event) {
    event.target.closest(".places__item").remove();
}

// @todo: Функция добавления карточки
addButton.addEventListener("click", () => {
    addCard();
});

// @todo: Вывести карточки на страницу
initialCards.forEach((cardElement) => {
    const cardTemplateContent = createCard(cardElement);
    cardList.append(cardTemplateContent);
});
