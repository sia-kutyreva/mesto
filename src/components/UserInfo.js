class UserInfo {
  constructor({selectorUserName, selectorUserInfo, id, selectorProfAvatar}) {
    this._userName = document.querySelector(selectorUserName);
    this._userInfo = document.querySelector(selectorUserInfo);
    this._userId = id;
    this._profAvatar = document.querySelector(selectorProfAvatar);
  }

  getUserInfo() {
    this._profile = {};
    this._profile = {
      name: this._userName.textContent,
      link: this._userInfo.textContent,
      _id: this._userId,
      avatar: this._profAvatar
    };
    return this._profile;
  }

  setUserInfo(data) {
    console.log(data)
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userId = data._id;
    this._profAvatar.src = data.avatar;
  }
}

export { UserInfo };