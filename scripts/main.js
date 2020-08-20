//объявление переменных
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');
const popupCloseButton = document.querySelectorAll('.close-button');
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
const popupImage = popupCardImage.querySelector('.popup-card__img');
const popupImageTitle = popupCardImage.querySelector('.popup-card__title');

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

function openClosePopup(event) {
  console.log('1')
  if (event.target.closest('.popup') !== null) {
    event.target.closest('.popup').classList.toggle('popup_open-close');
    console.log('2')
  } else if ((event.target === popupProfileOpen) || (event.target.classList.contains('profile__edit-button-img'))) {
    popupProfile.classList.toggle('popup_open-close');
    console.log('3')
    if (popupProfile.classList.contains('popup_open-close')) {
      profileInputName.value = profileName.textContent;
      profileInputProfession.value = profileProfession.textContent;
      console.log('4')
      return
    }
  } else if ((event.target === popupNewCardOpen) || (event.target.classList.contains('profile__add-button-img'))) {
      popupNewCard.classList.toggle('popup_open-close');
      console.log('5')
      return
  } else {
    event.target.closest('.popup').classList.toggle('popup_open-close');
    console.log('6')
  }
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

function renderCard(obj) {
  const newCardElement = getCardElement(obj);
  sectionElements.prepend(newCardElement);
};

popupProfileOpen.addEventListener('click', openClosePopup);
popupNewCardOpen.addEventListener('click', openClosePopup);
popupProfileForm.addEventListener('submit', submitProfile);
popupNewCardForm.addEventListener('submit', submitNewCard);
popupProfileSubmit.addEventListener('click', openClosePopup);
popupNewCardSubmit.addEventListener('click', openClosePopup);
popupCloseButton.forEach((closeButton) => {
  closeButton.addEventListener('click', openClosePopup)
});

function initionProject() {
  initialCards.forEach(function(item) {
    renderCard(item);
  });
};

initionProject();