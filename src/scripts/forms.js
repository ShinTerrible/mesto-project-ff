import { createCard, deleteCard, addLike } from "./card";
import { closeModal } from "./modal";
import { openImageModal } from "./script";

const formEditProfile = document.forms.editProfile;
const editProfilName = formEditProfile.querySelector(".popup__input_type_name");
const editProfilJob = formEditProfile.querySelector(
    ".popup__input_type_description"
);
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formAddImgCard = document.forms.newPlace;
const imgTitle = formAddImgCard.elements.placeName;
const imgUrl = formAddImgCard.elements.link;
const name = document.querySelector(".profile__title");
const job = document.querySelector(".profile__description");

// Форма редактирования профия
function editProfilFormSubmit(event) {
    event.preventDefault();

    name.textContent = editProfilName.value;
    job.textContent = editProfilJob.value;

    closeModal(popupEdit);
}

// Форма добавления новой карточки
function addNewImageCard(event) {
    event.preventDefault();

    const newElem = createCard(
        { name: imgTitle.value, link: imgUrl.value },
        { deleteCard, addLike, openImageModal }
    );

    document.querySelector(".places__list").prepend(newElem);
    formAddImgCard.reset();

    closeModal(popupNewCard);
}

export {
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
};
