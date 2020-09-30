//объявление переменных
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
const popupList = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('.elements').content;

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector('.element__img');
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardElement.querySelector('.element__text').textContent = data.name;
  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__liked');
  });
  const delButton = cardElement.querySelector('.element__del-button');
  delButton.addEventListener('click', function() {
    const card = delButton.closest('.element');
    card.remove();
  });
  cardImg.addEventListener('click', function() {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupImageTitle.textContent = data.name;
    openPopup(popupCardImage);
  });
  return cardElement;
};

function renderCard(obj) {
  const newCardElement = getCardElement(obj);
  sectionElements.prepend(newCardElement);
};

function openPopup(popup) {
  popup.classList.add('popup_open-close');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_open-close');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
};

function submitProfile(event) {
  event.preventDefault();
  profileName.textContent = profileInputName.value;
  profileProfession.textContent = profileInputProfession.value;
  closePopup(popupProfile);
};

function submitNewCard(event) {
  event.preventDefault();
  const newCardObj = {
    name: newCardInputName.value,
    link: newCardInputLink.value
  }
  renderCard(newCardObj);
  closePopup(popupNewCard);
};

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open-close');
    closePopup(openedPopup);
  };
};

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_open-close')) {
    closePopup(evt.target);
  };
};

function disabledSubmitButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__submit-button_inactive');
};

popupProfileOpen.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputProfession.value = profileProfession.textContent;
  openPopup(popupProfile);
  disabledSubmitButton(popupProfileSubmit);
});
popupNewCardOpen.addEventListener('click', () => {
  newCardInputName.value = '';
  newCardInputLink.value = '';
  openPopup(popupNewCard);
  disabledSubmitButton(popupNewCardSubmit);
});
popupProfileForm.addEventListener('submit', submitProfile);
popupNewCardForm.addEventListener('submit', submitNewCard);
popupCloseButton.forEach((closeButton) => {
  closeButton.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});

function initionProject() {
  initialCards.forEach((item) => {
    renderCard(item);
  });
};

initionProject();