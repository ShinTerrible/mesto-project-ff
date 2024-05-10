import "../pages/index.css";
import { initialCards } from "./cards";
import {
    addButton,
    editButton,
    openModal,
    closeModal,
    closePopupByOverlay,
} from "./modal";
import {
    formEditProfile,
    editProfilFormSubmit,
    formAddImgCard,
    addNewImageCard,
    editProfilName,
    editProfilJob,
    name,
    job,
    popupEdit,
    popupNewCard,
} from "./forms.js";
import { createCard, deleteCard, addLike } from "./card.js";

// DOM узлы
const cardList = document.querySelector(".places__list");
const closeButton = document.querySelectorAll(".popup__close");
const popup = document.querySelectorAll(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");

// "Файл должен быть в index.js"
// Функция открытия попапа картинки вынесена отдельно и передана в card.js
export function openImageModal(event) {
    const image = popupTypeImage.querySelector(".popup__image");
    openModal(popupTypeImage);
    image.setAttribute("src", event.target.src);
    image.setAttribute("alt", event.target.alt);
    popupTypeImage.querySelector(".popup__caption").textContent =
        event.target.alt;
}

// Выведение карточек при загрузки страницы
initialCards.forEach((cardElement) => {
    const cardTemplateContent = createCard(cardElement, {
        deleteCard,
        addLike,
        openImageModal,
    });
    cardList.append(cardTemplateContent);
});

// Отслеживание событий Открытия попап
// // открытие попапа редактирования
editButton.addEventListener("click", () => {
    editProfilName.value = name.textContent;
    editProfilJob.value = job.textContent;
    openModal(popupEdit);
});

// // открытие попапа добавления карточки
addButton.addEventListener("click", () => {
    openModal(popupNewCard);
});

// Отслеживание событий Закрытия попап
// // Закрытие по кнопке х
closeButton.forEach((elem) => {
    elem.addEventListener("click", () => {
        closeModal(elem.closest(".popup"));
    });
});

// // Закрытие по оверлею
popup.forEach((popupElem) => {
    popupElem.addEventListener("click", (event) => {
        closePopupByOverlay(event);
    });
});

// Отслеживание событий форм
formEditProfile.addEventListener("submit", editProfilFormSubmit);
formAddImgCard.addEventListener("submit", addNewImageCard);
