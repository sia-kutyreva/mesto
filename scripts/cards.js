const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;

  }

  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__liked');
  }

  _deleteCard() {
    this._element.remove();
  }
  
  _setEventListeners() {
    this._element.querySelector('.element__del-button').addEventListener('click', () => {this._deleteCard()});
    this._element.querySelector('.element__like-button').addEventListener('click', () => {this._likeCard()});
  }
  
  _cardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._cardTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    return this._element;
  }
}

export {initialCards, Card}