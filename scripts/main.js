//объявление переменных
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSubmitButton = popup.querySelector('.popup__submit-button');
const inputName = popup.querySelector('.popup__input_name');
const inputProfession = popup.querySelector('.popup__input_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const sectionElements = document.querySelector('.section-elements');
const newCardPopup = document.querySelector('.new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const closeNewCardButton = newCardPopup.querySelector('.new-card__close-button');
const submitNewCardButton = newCardPopup.querySelector('.new-card__submit-button');
const newCardInputName = newCardPopup.querySelector('.new-card__input_name');
const newCardInputLink = newCardPopup.querySelector('.new-card__input_link');
const popupCard = document.querySelector('.popup-card');
const popupImage = popupCard.querySelector('.popup-card__img');
const popupImageTitle = popupCard.querySelector('.popup-card__title');
const popupCardCloseButton = popupCard.querySelector('.popup-card__close-button');

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

//создание карточек при загрузке страницы
initialCards.forEach(function(item) {
  const cardTemplate = document.querySelector('.elements').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = item.name;
  cardElement.querySelector('.element__img').src = item.link;
  sectionElements.append(cardElement);
});

function addNewCard(event) {
  event.preventDefault();
  const cardTemplate = document.querySelector('.elements').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = newCardInputName.value;
  cardElement.querySelector('.element__img').src = newCardInputLink.value;
  sectionElements.prepend(cardElement);
  newCardOpenClose();
}

function delCard(event) {
  if (!event.target.matches('.element__del')) {
    return
  } else {
    const card = event.target.closest('.element');
    card.remove();
  }
}

function likeCard(event) {
  if (!event.target.matches('.element__like')) {
    return
  } else if (event.target.classList.contains('active')) {
    event.target.src = './images/element-like.svg';
    event.target.classList.toggle('active');
  } else {
    event.target.src = './images/element-like-click.svg';
    event.target.classList.toggle('active');
  }};

function newCardOpenClose() {
  newCardPopup.classList.toggle('new-card_open-close');
}

function popupOpenClose() {
  popup.classList.toggle('popup_open-close');
  if (popup.classList.contains('popup_open-close') === true) {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
  } else {
    inputName.value = '';
    inputProfession.value = '';
  }
}

function editProfile(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupOpenClose();
}

function openImage(event) {
  if (!event.target.matches('.element__img')) {
    return
  } else {
    const info = event.target.nextElementSibling;
    const imageTitle = info.firstElementChild;
    popupImage.src = event.target.src;
    popupImageTitle.textContent = imageTitle.textContent;
    popupCard.classList.toggle('popup-card_open-close');
  }
}

function closeImage() {
  popupCard.classList.toggle('popup-card_open-close');
}

//обработчики событий для реагирования на действия пользователя
popupOpenButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);
popupSubmitButton.addEventListener('click', editProfile);
addNewCardButton.addEventListener('click', newCardOpenClose);
closeNewCardButton.addEventListener('click', newCardOpenClose);
submitNewCardButton.addEventListener('click', addNewCard);
sectionElements.addEventListener('click', likeCard);
sectionElements.addEventListener('click', delCard);
sectionElements.addEventListener('click', openImage);
popupCardCloseButton.addEventListener('click', closeImage);