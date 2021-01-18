import {Popup} from './Popup.js';
import { popupImage, 
  popupImageTitle } from '../utils/constants.js';

class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupImageTitle.textContent = data.name;
    super.open();
  }
}

export {PopupWithImage};