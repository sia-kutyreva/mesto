import {Popup} from './Popup.js';

class PopupDeleteCard extends Popup{
  constructor(popupSelector, {formSubmit}, cardId) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formSubmit = formSubmit;
    this._cardData = cardId;
    this._submitForm = this._submitForm.bind(this);
  }

  open(data) {
    super.open();
    this._cardData = data;
    console.log(data)
  }

  _submitForm() {
    this._formSubmit(this._cardData);
    super.close();
  }

  setEventListeners() {
    const delCardButton = this._popup.querySelector('.popup__submit-button');
    delCardButton.addEventListener('click', this._submitForm);
    super.setEventListeners();
  }
}

export { PopupDeleteCard };