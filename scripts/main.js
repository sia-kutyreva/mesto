//объявление переменных
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSubmitButton = popup.querySelector('.popup__submit-button');
const inputName = popup.querySelector('.popup__input_name');
const inputProfession = popup.querySelector('.popup__input_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const sectionElements = document.querySelector('.elements-list');
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

function getCardElement(data) {
  console.log(typeof(data));
  const cardTemplate = document.querySelector('.elements').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__text').textContent = data.name;
  cardElement.querySelector('.element__img').src = data.link;
  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__liked');
  });
  const delButton = cardElement.querySelector('.element__del-button');
  delButton.addEventListener('click', function() {
    const card = delButton.closest('.element');
    card.remove();
  });
  const cardImage = cardElement.querySelector('.element__img');
  cardImage.addEventListener('click', function() {
    popupImage.src = data.link;
    popupImageTitle.textContent = data.name;
    popupCard.classList.toggle('popup-card_open-close');
  });
  console.log(cardElement);
  return cardElement;
}

function profileOpenClose() {
  popup.classList.toggle('popup_open-close');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
};

function newCardOpenClose() {
  newCardPopup.classList.toggle('popup_open-close');
};

function imageOpenClose() {
  popupCard.classList.toggle('popup_open-close');
};

function editProfile(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  profileOpenClose();
};

function submitCard() {
  event.preventDefault();
  const newCardObj = {
    name: newCardInputName.value,
    link: newCardInputLink.value
  }
  renderCard(newCardObj);
  newCardOpenClose();
};

function renderCard(obj) {
  const newCardElement = getCardElement(obj);
  sectionElements.prepend(newCardElement);
};

popupOpenButton.addEventListener('click', profileOpenClose);
popupCloseButton.addEventListener('click', profileOpenClose);
popupSubmitButton.addEventListener('click', editProfile);
addNewCardButton.addEventListener('click', newCardOpenClose);
closeNewCardButton.addEventListener('click', newCardOpenClose);
submitNewCardButton.addEventListener('click', submitCard);
popupCardCloseButton.addEventListener('click', imageOpenClose);

function initionProject() {
  initialCards.forEach(function(item) {
    renderCard(item);
  });
};

initionProject();