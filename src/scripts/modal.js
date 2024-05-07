const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

// Открытие модального окна
function openModal(event) {
    let elem;

    if (event.target === addButton) {
        elem = popupNewCard;
    } else if (event.target === editButton) {
        elem = popupEdit;
    } else if (event.target.className === "card__image") {
        elem = popupTypeImage;
        let image = popupTypeImage.querySelector(".popup__image");
        image.setAttribute("src", event.target.src);
        image.setAttribute("alt", event.target.alt);
        elem.querySelector(".popup__caption").textContent = event.target.alt;
    }

    elem.classList.add("popup_is-opened");

    closeModal(elem);
}

// Закрытие модального окна
function closeModal(evt) {
    let closeButton = evt.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
        evt.classList.remove("popup_is-opened");
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            evt.classList.remove("popup_is-opened");
        }
    });

    let popup = document.querySelector(`.popup.${evt.classList[1]}`);
    popup.addEventListener("click", (event) => {
        if (event.target === evt) {
            evt.classList.remove("popup_is-opened");
        }
    });
}

export { addButton, editButton, openModal };
