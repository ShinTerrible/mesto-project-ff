import { openModal } from "./modal";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(cardElement, { deleteCard }) {
    const cardTemplateContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    cardTemplateContent.querySelector(".card__title").textContent =
        cardElement.name;
    let cardNmae = cardTemplateContent.querySelector(".card__image");
    cardNmae.setAttribute("src", cardElement.link);
    cardNmae.setAttribute("alt", cardElement.name);

    //Отслеживание событий попап
    cardNmae.addEventListener("click", openModal);

    // вызов функции удаления карточки
    cardTemplateContent
        .querySelector(".card__delete-button")
        .addEventListener("click", (event) => {
            deleteCard(event);
        });

    //кнопка лайк
    let likeButton = cardTemplateContent.querySelector(".card__like-button");
    likeButton.addEventListener("click", (event) => {
        addLike(event);
    });

    return cardTemplateContent;
}

// Функция удаления карточки
export function deleteCard(event) {
    event.target.closest(".places__item").remove();
}

// Функция добавления лайка
function addLike(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}
