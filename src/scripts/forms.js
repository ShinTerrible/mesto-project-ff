import { createCard, deleteCard, addLike } from "./card";
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
    try {
        const userData = await editData(dataConfig.userDataUrl, {
            name: formEditProfilName.value,
            about: formEditProfilDescription.value,
        });
        // Обновление данных профиля
        editProfileFields(userData);
        closeModal(popupEdit);
    } catch (error) {
        console.log(err);
    } finally {
        isLoading(false, popupEdit);
    }
}

// Функция обновления аватара
async function editAvatar(event) {
    event.preventDefault();
    isLoading(true, popupAvatar);
    try {
        const checkValidity = await checkImgValidity(formEditAvatar.value);
        if (checkValidity.includes("image")) {
            const userData = await editData(
                `${dataConfig.userDataUrl}/avatar`,
                {
                    avatar: formEditAvatar.value,
                }
            );

            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            formEditAvatar.value = "";

            // Закрытие модального окна
            closeModal(popupAvatar);
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading(false, popupAvatar);
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
    try {
        const postNewCard = await postData({
            name: formImgTitle.value,
            link: formImgUrl.value,
        });
        const newElem = createCard(postNewCard, postNewCard.owner, {
            addLike,
            openImageModal,
            deleteCard,
        });
        document.querySelector(".places__list").prepend(newElem);
        formAddImgCard.reset();
    } catch (error) {
        console.log(error);
    } finally {
        isLoading(false, popupNewCard);
    }

    // Закрытие модального окна
    closeModal(popupNewCard);
}

// Функция ожидания сохранения
function isLoading(isLoading, elem) {
    elem.querySelector(".popup__button").textContent = isLoading
        ? "Сохранение..."
        : "Сохранить";
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
