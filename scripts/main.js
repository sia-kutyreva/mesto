let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupSubmitButton = popup.querySelector('.popup__submit-button');
let inputName = popup.querySelector('.popup__input_name');
let inputProfession = popup.querySelector('.popup__input_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

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

popupOpenButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);
popupSubmitButton.addEventListener('click', editProfile);
