import '../pages/index.css';
import {Card} from '../components/Cards.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards} from '../utils/initialCards.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';;
import { 
  profileInputProfession,
  profileInputName,
  popupNewCard,
  popupProfile,
  popupProfOpen,
  popupNewCardOpen,
  parameters,
  profileInputList, 
  newCardInputList,
  profileSubmitButton,
  newCardSubmitButton
   } from '../utils/constants.js';

const profileValidator = new FormValidator(parameters, popupProfile);
profileValidator.enableValidation();
const newCardValidator = new FormValidator(parameters, popupNewCard);
newCardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elements',
      function handleCardClick() {
        popupImage.open(item);
      }
    );
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
'.elements-list'
);
cardsList.renderItems();

const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserInfo: '.profile__profession'
});

const popupProfileForm = new PopupWithForm(
  '.popup_type_profile', {
    formSubmit: (data) => {
      userInfo.setUserInfo(data);
    }
  }
);
popupProfileForm.setEventListeners();

const popupNewCardForm = new PopupWithForm(
  '.popup_type_new-card', {
    formSubmit: (item) => {
      const card = new Card(item, '.elements', 
        function handleCardClick() {
          popupImage.open(item);
        }
      );
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  }
);
popupNewCardForm.setEventListeners();

popupProfOpen.addEventListener('click', () => {
  popupProfileForm.open();
  profileInputList.forEach((inputElement) =>
    profileValidator.hideInputError(inputElement)
  );
  const info = userInfo.getUserInfo();
  profileInputName.value = info.name;
  profileInputProfession.value =info.info;
  profileValidator.toggleButtonState(profileInputList, profileSubmitButton);
});

popupNewCardOpen.addEventListener('click', () => {
  popupNewCardForm.open();
  newCardInputList.forEach((inputElement) =>
    newCardValidator.hideInputError(inputElement)
  );
  newCardValidator.toggleButtonState(newCardInputList, newCardSubmitButton);
});