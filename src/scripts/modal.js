const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Открытие модального окна
function openModal(event) {
    if (event.target === addButton) {
        event = popupNewCard;
    } else if (event.target === editButton) {
        event = popupEdit;
    }

    event.classList.add("popup_is-opened");
}

// Функция открытия попапа картинки вынесена отдельно и передана в card.js
// по заданияю: Функцию, которая обрабатывает клик по изображению, нужно, как и лайк,
// передать аргументом в функцию создания карточки.
function openImageModal(event) {
    const image = popupTypeImage.querySelector(".popup__image");
    popupTypeImage.classList.add("popup_is-opened");
    image.setAttribute("src", event.target.src);
    image.setAttribute("alt", event.target.alt);
    popupTypeImage.querySelector(".popup__caption").textContent =
        event.target.alt;
}

// Функции закрытия модального окна
function closeModal() {
    document
        .querySelector(".popup_is-opened")
        .classList.remove("popup_is-opened");
}

function closePopupByEsc(event) {
    if (event.key === "Escape") closeModal();
}

function closePopupByOverlay(event) {
    if (event.target === event.currentTarget) closeModal();
}

export {
    addButton,
    editButton,
    openModal,
    openImageModal,
    closeModal,
    closePopupByEsc,
    closePopupByOverlay,
};
