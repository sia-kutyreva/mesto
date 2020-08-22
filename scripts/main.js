//объявление переменных
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupNewCardOpen = document.querySelector('.profile__add-button');
const popupProfileSubmit = popupProfile.querySelector('.popup__submit-button');
const popupProfileForm = popupProfile.querySelector('.popup__container');
const popupNewCardForm = popupNewCard.querySelector('.popup__container');
const popupNewCardSubmit = popupNewCard.querySelector('.popup__submit-button');
const profileInputName = popupProfile.querySelector('.popup__input_name');
const profileInputProfession = popupProfile.querySelector('.popup__input_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const sectionElements = document.querySelector('.elements-list');
const newCardInputName = popupNewCard.querySelector('.popup__input_name-card');
const newCardInputLink = popupNewCard.querySelector('.popup__input_link-card');
const popupImage = popupCardImage.querySelector('.popup__img');
const popupImageTitle = popupCardImage.querySelector('.popup__img-title');

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
    popupCardImage.classList.toggle('popup_open-close');
  });
  console.log(cardElement);
  return cardElement;
};

function renderCard(obj) {
  const newCardElement = getCardElement(obj);
  sectionElements.prepend(newCardElement);
};

function togglePopup(popup) {
  popup.classList.toggle('popup_open-close');
};

function submitProfile(event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileProfession.textContent = profileInputProfession.value;
};

function submitNewCard() {
  event.preventDefault();
  const newCardObj = {
    name: newCardInputName.value,
    link: newCardInputLink.value
  }
  renderCard(newCardObj);
};

popupProfileOpen.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputProfession.value = profileProfession.textContent;
  togglePopup(popupProfile);
});
popupNewCardOpen.addEventListener('click', () => togglePopup(popupNewCard));
popupProfileForm.addEventListener('submit', submitProfile);
popupNewCardForm.addEventListener('submit', submitNewCard);
popupProfileSubmit.addEventListener('click', () => togglePopup(popupProfile));
popupNewCardSubmit.addEventListener('click', () => togglePopup(popupNewCard));
popupCloseButton.forEach((closeButton) => {
  closeButton.addEventListener('click', (event) => togglePopup(event.target.closest('.popup')));
});

function initionProject() {
  initialCards.forEach((item) => {
    renderCard(item);
  });
};

initionProject();