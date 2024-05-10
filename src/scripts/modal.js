const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

// Открытие модального окна
function openModal(popup) {
    popup.classList.add("popup_is-opened");
    window.addEventListener("keydown", closePopupByEsc);
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
    closeModal,
    closePopupByEsc,
    closePopupByOverlay,
};
