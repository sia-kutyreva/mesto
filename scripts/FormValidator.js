const parameters = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._formSelector =  data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputError(form, inputElement, errorMessage) {
    const formError = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    formError.classList.add(this._errorClass);
    formError.textContent = errorMessage;
  }
  
  _hideInputError(form, inputElement) {
    const formError = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  }

  _isValid(form, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(form, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElement = form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const form = this._formElement.querySelector(this._formSelector);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(form);
  }
}

export {FormValidator, parameters};