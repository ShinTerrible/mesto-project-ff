import { initialCards } from "./cards";
import { createCard, deleteCard } from "./card";

const formElement = document.forms.editProfile;
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

const formAddImgCard = document.forms.newPlace;
const imgTitle = formAddImgCard.elements.placeName;
const imgUrl = formAddImgCard.elements.link;

let name = document.querySelector(".profile__title");
let job = document.querySelector(".profile__description");
nameInput.value = name.textContent;
jobInput.value = job.textContent;

// Форма редактирования профия
function handleFormSubmit(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    evt.target.closest(".popup_type_edit").classList.remove("popup_is-opened");
}

// Форма добавления новой карточки
function addNewImageCard(evt) {
    evt.preventDefault();

    initialCards.unshift({ name: imgTitle.value, link: imgUrl.value });

    let newElem = createCard(
        { name: imgTitle.value, link: imgUrl.value },
        { deleteCard }
    );

    document.querySelector(".places__list").prepend(newElem);
    imgTitle.value = "";
    imgUrl.value = "";
    evt.target
        .closest(".popup_type_new-card")
        .classList.remove("popup_is-opened");
}

export { formElement, handleFormSubmit, formAddImgCard, addNewImageCard };
