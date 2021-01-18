class UserInfo {
  constructor({selectorUserName, selectorUserInfo, id, profAvatar}) {
    this._userName = document.querySelector(selectorUserName);
    this._userInfo = document.querySelector(selectorUserInfo);
    this._id = id;
    this._profAvatar = profAvatar;
  }

  getUserInfo() {
    this._profile = {};
    this._profile = {
      name: this._userName.textContent,
      link: this._userInfo.textContent,
      _id: this._id,
      avatar: this._profAvatar
    };
    return this._profile;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._id = data._id;
    this._profAvatar = data.avatar;
  }
}

export { UserInfo };