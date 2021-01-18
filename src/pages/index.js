import '../pages/index.css';
import {Api} from '../components/Api.js';
import {Card} from '../components/Cards.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupDeleteCard} from '../components/PopupDeleteCard.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithAvatarForm} from '../components/PopupWithAvatarForm.js';
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
  newCardSubmitButton,
  profileAvatar,
  profileProf,
  profileName,
  profileAvatarOverlay
   } from '../utils/constants.js';

const profileValidator = new FormValidator(parameters, popupProfile);
profileValidator.enableValidation();
const newCardValidator = new FormValidator(parameters, popupNewCard);
newCardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '2c549586-52b7-4f7d-b209-4e4d6520fcf2',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorUserInfo: '.profile__profession',
  selectorProfAvatar: '.profile__avatar'
});

function renderLoading(popupSelector, isLoading) {
  const popup = document.querySelector(popupSelector);
  if (isLoading) {
    popup.querySelector('.popup__submit-button').textContent = 'Сохранение...'
  } else {
    popup.querySelector('.popup__submit-button').textContent = 'Готово'
  }
}

function returnButtonText(popupSelector, text) {
  const popup = document.querySelector(popupSelector);
  popup.querySelector('.popup__submit-button').textContent = text;
}

const createCard = (data, userId) => {
  const card = new Card({
    data: data,
    handleCardClick: (data) => {
      popupImage.open(data);
    },
    handleDeleteCard: () => {
      popupDeleteCard.open(card);
    },
    handleLikeCard: (data) => {
      api.likeCard(data)
        .then(() => {
          card.likeCard();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelLikeCard: (data) => {
      api.delLikeCard(data)
        .then(() => {
          card.deletelikeCard();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    },
    '.elements',
    userId
  )
  return card.generateCard()
}

const cardsList = new Section({
    items: {},
    renderer: (item, userId) => {
      cardsList.addItemRender(createCard(item, userId));
    },
  },
  '.elements-list'
);

const popupProfileForm = new PopupWithForm(
  '.popup_type_profile', {
    formSubmit: (item) => {
      renderLoading('.popup_type_profile', true);
      api.updateUserInfo(item)
        .then((result) => {
          profileAvatar.src = result.avatar;
          profileProf.textContent = result.about;
          profileName.textContent = result.name;
          popupProfileForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading('.popup_type_profile', false);
          setTimeout(returnButtonText, 1000, '.popup_type_profile', 'Сохранить');
        })
    }
  }
);

const popupDeleteCard = new PopupDeleteCard(
  '.popup_type_delete-card', 
    {formSubmit: (card) => {
      renderLoading('.popup_type_delete-card', true);
      api.deleteCard(card)
        .then(() => {
          card.deleteCard();
          popupDeleteCard.close();
        })
        .catch((err) => console.log(`Ошибка при удалении: ${err}`))
        .finally(() => {
          renderLoading('.popup_type_delete-card', false);
          setTimeout(returnButtonText, 1000, '.popup_type_delete-card', 'Да');
        })
    }}
);

const popupNewAvatarForm = new PopupWithAvatarForm(
  '.popup_type_new-avatar', {
    formSubmit: (item) => {
      renderLoading('.popup_type_new-avatar', true);
      console.log(item)
      api.updateAvatar(item)
        .then((res) => {
          profileAvatar.src = res.avatar;
          popupNewAvatarForm.close();
        })
        .catch((err) => console.log(`Ошибка при сохранении: ${err}`))
        .finally(() => {
          renderLoading('.popup_type_new-avatar', false);
          setTimeout(returnButtonText, 1000, '.popup_type_new-avatar', 'Сохранить');
        })
    }
  }
);

const popupNewCardForm = new PopupWithForm(
  '.popup_type_new-card', {
    formSubmit: (item) => {
      renderLoading('.popup_type_new-card', true);
      api.addNewCard(item)
        .then((result) => {
          const userId = userInfo.getUserInfo()._id;
          cardsList.addItemNewCard(createCard(result, userId));
          popupNewCardForm.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading('.popup_type_new-card', false);
          setTimeout(returnButtonText, 1000, '.popup_type_new-card', 'Создать');
        })
    }
  }
);

const promises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(promises)
  .then(([userInfoResult, cardsResult]) => {
    userInfo.setUserInfo(userInfoResult);
    cardsList.setItems(cardsResult);
    cardsList.renderItems(userInfo.getUserInfo()._id);
  })
  .catch((err) => {
    console.log(err);
  })

popupNewCardForm.setEventListeners();
popupNewAvatarForm.setEventListeners();
popupDeleteCard.setEventListeners();
popupProfileForm.setEventListeners();

profileAvatarOverlay.addEventListener('click', () => popupNewAvatarForm.open());
popupProfOpen.addEventListener('click', () => {
  popupProfileForm.open();
  profileInputList.forEach((inputElement) =>
    profileValidator.hideInputError(inputElement)
  );
  const info = userInfo.getUserInfo();
  profileInputName.value = info.name;
  profileInputProfession.value =info.link;
  profileValidator.toggleButtonState(profileInputList, profileSubmitButton);
});

popupNewCardOpen.addEventListener('click', () => {
  popupNewCardForm.open();
  newCardInputList.forEach((inputElement) =>
    newCardValidator.hideInputError(inputElement)
  );
  newCardValidator.toggleButtonState(newCardInputList, newCardSubmitButton);
});

  