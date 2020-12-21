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
  parameters 
   } from '../utils/constants.js';

const profileValidator = new FormValidator(parameters, popupProfile);
profileValidator.enableValidation();
const newCardValidator = new FormValidator(parameters, popupNewCard);
newCardValidator.enableValidation();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elements', {
    handleCardClick: (evt) => {
      const imageInfo = {
        name: evt.target.alt,
        info: evt.target.src
      };
      const popupImage = new PopupWithImage('.popup_type_image');
      popupImage.open(imageInfo);
      popupImage.setEventListeners();
    }
  });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
'.elements-list'
);

cardsList.renderItems();


popupProfOpen.addEventListener('click', () => {
  const popupForm = new PopupWithForm(
    '.popup_type_profile', {
      formSubmit: (data) => {
        const info = new UserInfo({
          selectorUserName: '.profile__name',
          selectorUserInfo: '.profile__profession'});
        info.setUserInfo(data);
    }});
  popupForm.open();
  const info = new UserInfo({
    selectorUserName: '.profile__name',
    selectorUserInfo: '.profile__profession'});
  const userInfo = info.getUserInfo();
  profileInputName.value = userInfo.name;
  profileInputProfession.value = userInfo.info;
  popupForm.setEventListeners();
});

popupNewCardOpen.addEventListener('click', () => {
  const popupForm = new PopupWithForm(
    '.popup_type_new-card', {
      formSubmit: (data) => {
        const card = new Card(data, '.elements', {
          handleCardClick: (evt) => {
            const imageInfo = {
              name: evt.target.alt,
              info: evt.target.src
            };
            const popupImage = new PopupWithImage('.popup_type_image');
            popupImage.open(imageInfo);
            popupImage.setEventListeners();
        }});
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }});
  popupForm.open();
  popupForm.setEventListeners();
});
