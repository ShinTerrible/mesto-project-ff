const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

function hasValidInput(inputList) {
    return inputList.every((element) => {
        return element.validity.valid && element.value !== "";
    });
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasValidInput(inputList)) {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function showError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(
        formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        config.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}

function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.patternMismatch) {
        showError(
            formElement,
            inputElement,
            inputElement.setCustomValidity(inputElement.dataset.errorMessage),
            validationConfig
        );
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            config
        );
    } else {
        inputElement.setCustomValidity("");
        hideError(formElement, inputElement, config);
    }
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        setEventListeners(formElement, config);
    });
}

function clearValidation(formElement, config) {
    const form = formElement.querySelector(config.formSelector);
    const input = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);
    toggleButtonState(input, buttonElement, config);

    input.forEach((elem) => {
        hideError(form, elem, config);
    });
}

export { validationConfig, enableValidation, clearValidation };
