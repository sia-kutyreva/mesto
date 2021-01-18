import {PopupWithForm} from './PopupWithForm.js';

class PopupWithAvatarForm extends PopupWithForm{
  constructor(popupSelector, {formSubmit}) {
    super(popupSelector, {formSubmit});
    this._popup = document.querySelector(popupSelector);
  }

  _getInputValues() {
    this._formValues = {
      name: this._popup.querySelector('.popup__input_name').value,
    };
    return this._formValues;
  }
}

export { PopupWithAvatarForm };