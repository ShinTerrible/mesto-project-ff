// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//  Функция создания карточки
export function createCard(
    cardElement,
    { deleteCard, addLike, openImageModal }
) {
    const cardTemplateContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);

    cardTemplateContent.querySelector(".card__title").textContent =
        cardElement.name;

    const cardName = cardTemplateContent.querySelector(".card__image");
    cardName.setAttribute("src", cardElement.link);
    cardName.setAttribute("alt", cardElement.name);

    //Отслеживание событий попапов открывающих карточку с картинкой
    cardName.addEventListener("click", openImageModal);

    // вызов функции удаления карточки
    cardTemplateContent
        .querySelector(".card__delete-button")
        .addEventListener("click", deleteCard);

    //кнопка лайк
    const likeButton = cardTemplateContent.querySelector(".card__like-button");
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
export function addLike(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}
