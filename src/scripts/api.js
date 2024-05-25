// Карточки;
const dataConfig = {
    cardUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-14/cards",
    userDataUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-14/users/me",
    authUid: "c79158e2-992b-4409-beca-f89ef791073b",
    headers: {
        authorization: "c79158e2-992b-4409-beca-f89ef791073b",
        "Content-Type": "application/json",
    },
};

// Получение данных
async function getData(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: dataConfig.headers,
    });
    if (response.ok) {
        return await response.json();
    }

    return Promise.reject(`Ошибка: ${response.statusText}`);
}

// Обновление данных карточки/лайка
async function editData(url, data) {
    const response = await fetch(url, {
        method: "PATCH",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return await response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

// Отправка данных новой карточки на сервер
async function postData(data) {
    const response = await fetch(dataConfig.cardUrl, {
        method: "POST",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return await response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
}

// Добавление карточки
async function putCardData(cardId, data) {
    const response = await fetch(`${dataConfig.cardUrl}/likes/${cardId}`, {
        method: "PUT",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return await response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
}

// Удаление лайка
async function deleteLikeData(cardId, data) {
    const response = await fetch(`${dataConfig.cardUrl}/likes/${cardId}`, {
        method: "DELETE",
        headers: dataConfig.headers,
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return await response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
}

// Запрос на удаление карточки
async function deleteCardData(cardId) {
    const response = await fetch(`${dataConfig.cardUrl}/${cardId}`, {
        method: "DELETE",
        headers: dataConfig.headers,
    });
    if (response.ok) {
        return await response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
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