import {Card} from './Cards.js';
import {initialCards} from './initialCards.js';
import {FormValidator} from './FormValidator.js';

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
const newCardInputList = Array.from(popupNewCard.querySelectorAll('.popup__input'));
const profileInputList = Array.from(popupProfile.querySelectorAll('.popup__input'));
const parameters = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
const profileValidator = new FormValidator(parameters, popupProfile);
const newCardValidator = new FormValidator(parameters, popupNewCard);

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
  const card = new Card(newCardObj, '.elements');
  const cardElement = card.generateCard();
  sectionElements.prepend(cardElement);
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

popupProfileOpen.addEventListener('click', () => {
  profileInputName.value = profileName.textContent;
  profileInputProfession.value = profileProfession.textContent;
  openPopup(popupProfile);
  profileValidator.toggleButtonState(profileInputList, popupProfileSubmit);
});
popupNewCardOpen.addEventListener('click', () => {
  newCardInputName.value = '';
  newCardInputLink.value = '';
  openPopup(popupNewCard);
  newCardValidator.toggleButtonState(newCardInputList, popupNewCardSubmit);
});
popupProfileForm.addEventListener('submit', submitProfile);
popupNewCardForm.addEventListener('submit', submitNewCard);
popupCloseButton.forEach((closeButton) => {
  closeButton.addEventListener('click', (event) => {
    closePopup(event.target.closest('.popup'));
  });
});
sectionElements.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__img')) {
    popupImage.src = event.target.src;
    popupImageTitle.textContent = event.target.alt;
    openPopup(popupCardImage);
  }
})

function initionProject() {
  initialCards.forEach((item) => {
    const card = new Card(item, '.elements');
    const cardElement = card.generateCard();
    sectionElements.append(cardElement);
  });
  profileValidator.enableValidation();
  newCardValidator.enableValidation();
};

initionProject();