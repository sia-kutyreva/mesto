class UserInfo {
  constructor({selectorUserName, selectorUserInfo}) {
    this._userName = document.querySelector(selectorUserName);
    this._userInfo = document.querySelector(selectorUserInfo);
  }

  getUserInfo() {
    this._profile = {};
    this._profile = {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    };
    return this._profile;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.info;
  }
  
}

export { UserInfo };