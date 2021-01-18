class Card {
  constructor({data, handleCardClick, handleDeleteCard, handleLikeCard, handleDelLikeCard}, templateSelector, userId) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._likes = data.likes.length;
    this._likesArray = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard.bind(this);
    this._handleLikeCard = handleLikeCard.bind(this);
    this._handleDelLikeCard = handleDelLikeCard.bind(this);
  }

  _clickLikeButton() {
    if (!this._element.querySelector('.element__like-button').classList.contains('element__liked')) {
      this._handleLikeCard(this._data);
    } else {
      this._handleDelLikeCard(this._data);
    }
  }

  likeCard() {
    this._likes += 1;
    this._element.querySelector('.element__like-count').textContent = this._likes;
    this._element.querySelector('.element__like-button').classList.add('element__liked');
  }

  deletelikeCard() {
    this._likes -= 1;
    this._element.querySelector('.element__like-count').textContent = this._likes;
    this._element.querySelector('.element__like-button').classList.remove('element__liked');
  }

  _countLikes() {
    if (this._likes > 0) {
      const arrayLikes = this._likesArray.map(function(item) {
        return item._id
      });
      return arrayLikes
    } else {
      const arrayLikes = ''
      return arrayLikes
    }
  }

  _setLike() {
    const arrayLike = this._countLikes();
    if (Array.isArray(arrayLike)) {
      arrayLike.forEach(element => {    
        if (element == this._userId) {
          this._element.querySelector('.element__like-button').classList.add('element__liked');
        }
      });
    }
  }

  removeCard() {
    this._element.remove();
  }
  
  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {this._clickLikeButton()});
    this._element.querySelector('.element__img').addEventListener('click', () => {this._handleCardClick(this._data)});
  }
  
  _cardTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setDeleteButton() {
    if (this._userId != this._data.owner._id) {
      this._element.querySelector('.element__del-button').remove();
    } else {
      this._element.querySelector('.element__del-button').addEventListener('click', () => {this._handleDeleteCard(this._data)});
    }
  }

  generateCard() {
    this._element = this._cardTemplate();
    this._setDeleteButton();
    this._setEventListeners();
    this._setLike();
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').id = this._data._id;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__like-count').textContent = this._likes;
    return this._element;
  }
}

export {Card};