// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");

// @todo: Функция создания карточки
function createCard(cardElement, { deleteCard }) {
    const cardTemplateContent = cardTemplate
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
            deleteCard(event);
        });
    return cardTemplateContent;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardElement) => {
    const cardTemplateContent = createCard(cardElement, { deleteCard });
    cardList.append(cardTemplateContent);
});
