import "../pages/index.css";
import { initialCards } from "./cards";
import {
    addButton,
    editButton,
    openModal,
    openImageModal,
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
