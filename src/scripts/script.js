import "../pages/index.css";
import { initialCards } from "./cards";
import { addButton, editButton, openModal } from "./modal";
import {
    formElement,
    handleFormSubmit,
    formAddImgCard,
    addNewImageCard,
} from "./forms.js";
import { createCard, deleteCard } from "./card.js";

// DOM узлы
const cardList = document.querySelector(".places__list");

// Вывести карточки на страницу
initialCards.forEach((cardElement) => {
    const cardTemplateContent = createCard(cardElement, { deleteCard });
    cardList.append(cardTemplateContent);
});

// Отслеживание событий попап
editButton.addEventListener("click", openModal);
addButton.addEventListener("click", openModal);

// Отслеживание событий форм
formElement.addEventListener("submit", handleFormSubmit);
formAddImgCard.addEventListener("submit", addNewImageCard);
