// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
let cardsIndex = 0;

// @todo: Функция создания карточки
function addCard() {
    // если индекс за пределами длинны массива - возвращаемся
    if (initialCards.length - 1 < cardsIndex) {
        return;
    }

    let cardElement = initialCards[cardsIndex];
    cardsIndex += 1;
    let cardTemplateContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    cardTemplateContent.querySelector(".card__title").textContent =
        cardElement.name;
    cardTemplateContent
        .querySelector(".card__image")
        .setAttribute("src", cardElement.link);
    cardList.append(cardTemplateContent);

    // вызов функции удаления карточки
    let cardToDelete = cardList.querySelectorAll(".card__delete-button");

    cardToDelete.forEach((elem) => {
        elem.addEventListener("click", (event) => {
            removeCard(event);
        });
    });
}

// @todo: Функция удаления карточки
function removeCard(event) {
    event.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
addButton.addEventListener("click", () => {
    addCard();
});
