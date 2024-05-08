import { createCard, deleteCard, addLike } from "./card";
import { closeModal } from "./modal";

const formEditProfile = document.forms.editProfile;
const editProfilName = formEditProfile.querySelector(".popup__input_type_name");
const editProfilJob = formEditProfile.querySelector(
    ".popup__input_type_description"
);
const formAddImgCard = document.forms.newPlace;
const imgTitle = formAddImgCard.elements.placeName;
const imgUrl = formAddImgCard.elements.link;

// Инпуты заполненны текущей информацие с уже готового профиля, они могут редактироваться и перезаписываться.
// Из задания: 4. Редактирование имени и информации о себе
// При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
// Исходя из указаний задания, поля уже должны быть с текущей информацией при открытии попапа
let name = document.querySelector(".profile__title");
let job = document.querySelector(".profile__description");
editProfilName.value = name.textContent;
editProfilJob.value = job.textContent;

// Форма редактирования профия
function editProfilFormSubmit(event) {
    event.preventDefault();

    name.textContent = editProfilName.value;
    job.textContent = editProfilJob.value;

    closeModal();
}

// Форма добавления новой карточки
function addNewImageCard(event) {
    event.preventDefault();

    let newElem = createCard(
        { name: imgTitle.value, link: imgUrl.value },
        { deleteCard, addLike }
    );

    document.querySelector(".places__list").prepend(newElem);
    formAddImgCard.reset();

    closeModal();
}

export {
    formEditProfile,
    editProfilFormSubmit,
    formAddImgCard,
    addNewImageCard,
};
