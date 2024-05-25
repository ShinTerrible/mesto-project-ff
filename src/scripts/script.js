import "../pages/index.css";
import "./cards";
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
    formEditProfilName,
    formEditProfilDescription,
    profileName,
    profileDescription,
    popupEdit,
    popupNewCard,
    formImgTitle,
    formImgUrl,
    initProfileFields,
    profileImage,
    formNewAvatar,
    popupAvatar,
    editAvatar,
} from "./forms.js";
import { createCard, addLike } from "./create_card.js";
import {
    validationConfig,
    enableValidation,
    clearValidation,
} from "./validation.js";
import { dataConfig, getData } from "./api.js";

// DOM узлы
const cardList = document.querySelector(".places__list");
const closeButton = document.querySelectorAll(".popup__close");
const popup = document.querySelectorAll(".popup");
const popupTypeImage = document.querySelector(".popup_type_image");

export function openImageModal(event) {
    const image = popupTypeImage.querySelector(".popup__image");
    openModal(popupTypeImage);
    image.setAttribute("src", event.target.src);
    image.setAttribute("alt", event.target.alt);
    popupTypeImage.querySelector(".popup__caption").textContent =
        event.target.alt;
}

Promise.all([getData(dataConfig.cardUrl), getData(dataConfig.userDataUrl)])
    .then((responsesData) => {
        // Выведение карточек при загрузке страницы
        const [cardData, userData] = responsesData;
        cardData.forEach((cardElement) => {
            const cardTemplateContent = createCard(cardElement, {
                addLike,
                openImageModal,
            });
            cardList.append(cardTemplateContent);
        });

        // Инициализация данных профиля при загрузке страницы
        initProfileFields(userData);
    })
    .catch((err) => console.log(err));

// Отслеживание событий Открытия попап
// // открытие попапа редактирования
editButton.addEventListener("click", () => {
    formEditProfilName.value = profileName.textContent;
    formEditProfilDescription.value = profileDescription.textContent;
    openModal(popupEdit);
    clearValidation(popupEdit, validationConfig);
});

// // открытие попапа добавления карточки
addButton.addEventListener("click", () => {
    formImgTitle.value = "";
    formImgUrl.value = "";
    openModal(popupNewCard);
    clearValidation(popupNewCard, validationConfig);
});

// // открытие попапа обновления аватара
profileImage.addEventListener("click", () => {
    openModal(popupAvatar);
    clearValidation(popupAvatar, validationConfig);
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
formNewAvatar.addEventListener("submit", editAvatar);
//функция валидации форм
enableValidation(validationConfig);
