import {Popup} from './Popup.js';

class PopupWithForm extends Popup{
  constructor(popupSelector, {formSubmit}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formSubmit = formSubmit;
    this._submitForm = this._submitForm.bind(this);
  }

  _getInputValues() {
    this._formValues = {};
    this._formValues = {
      name: this._popup.querySelector('.popup__input_name').value,
      info: this._popup.querySelector('.popup__input_info').value
    };
    return this._formValues;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._formSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    this._popup.addEventListener('submit', this._submitForm);
    super.setEventListeners();
  }

  close() {
    //this._popup.removeEventListener('submit', this._submitForm);
    super.close();
    const form = this._popup.querySelector('.popup__container');
    form.reset();
  }
}

export { PopupWithForm };