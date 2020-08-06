let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.edit-button');
let popupCloseButton = popup.querySelector('.close-button');
let popupSubmitButton = popup.querySelector('.submit-button');
let inputName = popup.querySelector('.popup__name');
let inputProfession = popup.querySelector('.popup__prof');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

const popupOpenClose = function() {
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
  event.preventDefault()
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupOpenClose();
}

popupOpenButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);
popupSubmitButton.addEventListener('click', editProfile);
