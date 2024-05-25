import {
    dataConfig,
    getData,
    putCardData,
    deleteLikeData,
    deleteCardData,
} from "./api.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const profile = await getData(dataConfig.userDataUrl);
const showCounter = (element) => (element.style.display = "none");

//  Функция создания карточки
function createCard(cardElement, { addLike, openImageModal }) {
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
    shouldDisplayDeleteButton(cardElement, cardTemplateContent);

    if (
        cardElement.likes.length === 0 ||
        cardElement.likes.length === undefined
    ) {
        cardCounter.style.display = "none";
    } else {
        cardCounter.style.display = "block";
        cardCounter.textContent = cardElement.likes.length;
    }

    //Отслеживание событий попапов открывающих карточку с картинкой
    cardName.addEventListener("click", openImageModal);

    //кнопка лайк
    const likeButton = cardTemplateContent.querySelector(".card__like-button");

    // Отображения количества лайков
    cardElement.likes.forEach((elem) => {
        if (elem._id === profile._id) {
            likeButton.classList.add("card__like-button_is-active");
        }
    });
    likeButton.addEventListener("click", (event) => {
        addLike(event);
    });

    return cardTemplateContent;
}

// Функция удаления карточки
async function deleteCard(event) {
    event.target.closest(".places__item").remove();
    let cardId = event.target.closest(".card").querySelector(".card__image").id;
    await deleteCardData(cardId);
}

// Функция добавления лайка
async function addLike(event) {
    let cardId = event.target.closest(".card").querySelector(".card__image").id;
    const likeCounter = event.target
        .closest(".card")
        .querySelector(".card__like-counter");
    if (!event.target.className.includes("card__like-button_is-active")) {
        await putNewData(cardId, likeCounter, event);
    } else if (event.target.className.includes("card__like-button_is-active")) {
        await removeData(cardId, likeCounter, event);
    }
}

async function putNewData(cardId, likeCounter, event) {
    const data = await putCardData(cardId, profile);
    likeCounter.style.display = "block";
    event.target.classList.add("card__like-button_is-active");
    likeCounter.textContent = data.likes.length;
}

async function removeData(cardId, likeCounter, event) {
    const data = await deleteLikeData(cardId, profile);
    if (data.likes.length === 0) showCounter(likeCounter);
    event.target.classList.remove("card__like-button_is-active");
    likeCounter.textContent = data.likes.length;
}

function shouldDisplayDeleteButton(cardElement, cardTemplateContent) {
    if (cardElement.owner._id !== profile._id) return;

    const deleteButton = cardTemplateContent.querySelector(
        ".card__delete-button"
    );
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", deleteCard);
}

export { profile, createCard, deleteCard, addLike, shouldDisplayDeleteButton };
