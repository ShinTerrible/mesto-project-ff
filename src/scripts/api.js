const apiVersion = "v1";
const apiHost = "https://mesto.nomoreparties.co";
const baseUrl = `${apiHost}/${apiVersion}/wff-cohort-14`;

const authToken = "c79158e2-992b-4409-beca-f89ef791073b";

const dataConfig = {
    cardUrl: `${baseUrl}/cards`,
    userDataUrl: `${baseUrl}/users/me`,
    authUid: authToken,
    headers: {
        authorization: authToken,
        "Content-Type": "application/json",
    },
};

async function handleResponse(response) {
    if (response.ok) {
        return await response.json();
    }
    return Promise.reject(`Ошибка: ${response.statusText}`);
}

// Получение данных
async function getData(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: dataConfig.headers,
    });
    return handleResponse(response);
}

// Обновление данных карточки/лайка
async function editData(url, data) {
    const response = await fetch(url, {
        method: "PATCH",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

// Отправка данных новой карточки на сервер
async function postData(data) {
    const response = await fetch(dataConfig.cardUrl, {
        method: "POST",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

// Добавление карточки
async function putCardData(cardId, data) {
    const response = await fetch(`${dataConfig.cardUrl}/likes/${cardId}`, {
        method: "PUT",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

// Удаление лайка
async function deleteLikeData(cardId, data) {
    const response = await fetch(`${dataConfig.cardUrl}/likes/${cardId}`, {
        method: "DELETE",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

// Запрос на удаление карточки
async function deleteCardData(cardId) {
    const response = await fetch(`${dataConfig.cardUrl}/${cardId}`, {
        method: "DELETE",
        headers: dataConfig.headers,
    });
    return handleResponse(response);
}

// Проверка валидности картинки
async function checkImgValidity(imgUrl) {
    const response = await fetch(imgUrl, {
        method: "HEAD",
    });
    if (response.ok) {
        return response.headers.get("Content-Type");
    }

    return Promise.reject(`Ошибка: ${response.status}`);
}

export {
    dataConfig,
    getData,
    postData,
    editData,
    putCardData,
    deleteLikeData,
    deleteCardData,
    checkImgValidity,
};
