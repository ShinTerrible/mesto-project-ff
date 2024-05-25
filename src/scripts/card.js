import { putCardData, deleteLikeData, deleteCardData } from "./api.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const showCounter = (element) => (element.style.display = "none");

//  Функция создания карточки
function createCard(
    cardElement,
    userData,
    { addLike, openImageModal, deleteCard }
) {
    const cardTemplateContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);
    const cardCounter = cardTemplateContent.querySelector(
        ".card__like-counter"
    );
    const cardName = cardTemplateContent.querySelector(".card__image");

    cardTemplateContent.querySelector(".card__title").textContent =
        cardElement.name;
    cardName.setAttribute("src", cardElement.link);
    cardName.setAttribute("alt", cardElement.name);
    cardName.setAttribute("id", cardElement._id);

    // Отображение иконки Удаления карточки
    shouldDisplayDeleteButton(cardElement, cardTemplateContent, userData, {
        deleteCard,
    });

    //Отслеживание событий попапов открывающих карточку с картинкой
    cardName.addEventListener("click", openImageModal);

    //кнопка лайк
    const likeButton = cardTemplateContent.querySelector(".card__like-button");
    if (cardElement.likes.length === 0) {
        cardCounter.style.display = "none";
    } else {
        cardCounter.style.display = "block";
        cardCounter.textContent = cardElement.likes.length;
    }

    // Отображения количества лайков
    if (cardElement.likes.some((elem) => elem._id === userData._id)) {
        likeButton.classList.add("card__like-button_is-active");
    }

    likeButton.addEventListener("click", (event) => {
        addLike(event, userData);
    });

    return cardTemplateContent;
}

// Функция удаления карточки
async function deleteCard(event) {
    try {
        const cardId = event.target
            .closest(".card")
            .querySelector(".card__image").id;
        await deleteCardData(cardId);
        event.target.closest(".places__item").remove();
    } catch (error) {
        console.log(error);
    }
}

// Функция добавления лайка
async function addLike(event, userData) {
    try {
        const cardId = event.target
            .closest(".card")
            .querySelector(".card__image").id;
        const likeCounter = event.target
            .closest(".card")
            .querySelector(".card__like-counter");
        if (!event.target.classList.contains("card__like-button_is-active")) {
            await putNewLike(cardId, likeCounter, event, userData);
        } else if (
            event.target.classList.contains("card__like-button_is-active")
        ) {
            await removeLike(cardId, likeCounter, event, userData);
        }
    } catch (error) {
        console.log(error);
    }
}
// // Отображение лайка
async function putNewLike(cardId, likeCounter, event, userData) {
    const data = await putCardData(cardId, userData);
    likeCounter.style.display = "block";
    event.target.classList.add("card__like-button_is-active");
    likeCounter.textContent = data.likes.length;
}

// // Удаление лайка
async function removeLike(cardId, likeCounter, event, userData) {
    const data = await deleteLikeData(cardId, userData);
    if (data.likes.length === 0) showCounter(likeCounter);
    event.target.classList.remove("card__like-button_is-active");
    likeCounter.textContent = data.likes.length;
}

// Проверка владельца карточки
function shouldDisplayDeleteButton(
    cardElement,
    cardTemplateContent,
    userData,
    { deleteCard }
) {
    if (cardElement.owner._id !== userData._id) return;

    const deleteButton = cardTemplateContent.querySelector(
        ".card__delete-button"
    );
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", deleteCard);
}

export { createCard, deleteCard, addLike };
