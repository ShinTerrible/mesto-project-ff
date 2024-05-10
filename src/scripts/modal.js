const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupTypeImage = document.querySelector(".popup_type_image");

// Открытие модального окна
function openModal(popup) {
    popup.classList.add("popup_is-opened");
    window.addEventListener("keydown", closePopupByEsc);
}

// Функция открытия попапа картинки вынесена отдельно и передана в card.js
function openImageModal(event) {
    const image = popupTypeImage.querySelector(".popup__image");
    openModal(popupTypeImage);
    image.setAttribute("src", event.target.src);
    image.setAttribute("alt", event.target.alt);
    popupTypeImage.querySelector(".popup__caption").textContent =
        event.target.alt;
}

// Функции закрытия модального окна
function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    window.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(event) {
    if (event.key === "Escape")
        closeModal(document.querySelector(".popup_is-opened"));
}

function closePopupByOverlay(event) {
    if (event.target === event.currentTarget) closeModal(event.currentTarget);
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
