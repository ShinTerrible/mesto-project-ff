import {
    createCard,
    deleteCard,
    addLike,
    profile,
    shouldDisplayDeleteButton,
} from "./create_card";
import { closeModal } from "./modal";
import { openImageModal } from "./script";
import { dataConfig, editData, postData, checkImgValidity } from "./api";

// DOM узлы
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// //Формы
const formEditProfile = document.forms.editProfile;
const formEditProfilName = formEditProfile.elements.profileName;
const formEditProfilDescription = formEditProfile.elements.profileDescription;
const formAddImgCard = document.forms.newPlace;
const formImgTitle = formAddImgCard.elements.placeName;
const formImgUrl = formAddImgCard.elements.link;
const formNewAvatar = document.forms.newAvatar;
const formEditAvatar = formNewAvatar.elements.avatarUrl;

// // Попапы
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_new-avatar");

// Форма редактирования профия
async function editProfilFormSubmit(event) {
    event.preventDefault();
    isLoading(true, popupEdit);
    const userData = await editData(dataConfig.userDataUrl, {
        name: formEditProfilName.value,
        about: formEditProfilDescription.value,
    })
        .catch((err) => console.log(err))
        .finally(() => {
            isLoading(false, popupEdit);
        });

    // Обновление данных профиля
    editProfileFields(userData);
    closeModal(popupEdit);
}

// Функция обновления аватара
async function editAvatar(event) {
    event.preventDefault();
    isLoading(true, popupAvatar);
    const checkValidity = await checkImgValidity(formEditAvatar.value);
    if (checkValidity.includes("image")) {
        const userData = await editData(`${dataConfig.userDataUrl}/avatar`, {
            avatar: formEditAvatar.value,
        })
            .catch((err) => console.log(err))
            .finally(() => {
                isLoading(false, popupAvatar);
            });

        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        // Закрытие модального окна
        closeModal(popupAvatar);
    }
}

// Обновление данных профиля
function editProfileFields(userData) {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
}

// Инициализация данных профиля при загрузке страницы
function initProfileFields(userData) {
    editProfileFields(userData);
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

// Форма добавления новой карточки
async function addNewImageCard(event) {
    event.preventDefault();
    isLoading(true, popupNewCard);
    const postNewCard = await postData({
        name: formImgTitle.value,
        link: formImgUrl.value,
        _id: profile._id,
    })
        .catch((err) => console.log(err))
        .finally(() => {
            isLoading(false, popupNewCard);
        });

    const newElem = createCard(postNewCard, {
        deleteCard,
        addLike,
        openImageModal,
    });

    document.querySelector(".places__list").prepend(newElem);
    formAddImgCard.reset();

    // Вызов функции отображения кнопки удаления
    shouldDisplayDeleteButton(postNewCard, newElem);

    // Закрытие модального окна
    closeModal(popupNewCard);
}

// Функция ожидания сохранения
function isLoading(isLoading, elem) {
    if (isLoading) {
        elem.querySelector(".popup__button").textContent = "Сохранение...";
    } else {
        elem.querySelector(".popup__button").textContent = "Сохранить";
    }
}

export {
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
    profileImage,
    initProfileFields,
    formNewAvatar,
    popupAvatar,
    editAvatar,
};
