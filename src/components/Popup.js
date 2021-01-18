class Popup {
  constructor(popupSelector, formSubmit) {
    this._popup = document.querySelector(popupSelector);
    this._formSubmit = formSubmit;
  }

  open() {
    this._popup.classList.add('popup_open-close');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popup.classList.remove('popup_open-close');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_open-close')) {
      this.close();;
    };
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
			this.close();
    });
    this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }
}

export {Popup};