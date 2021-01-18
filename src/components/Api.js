class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }


  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  };
  
  updateUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.link
      })
    })
      .then(res => this._getResponseData(res))
  };

  addNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => this._getResponseData(res))
  };

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res)) 
  };

  updateAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.name
      })
    })
      .then(res => this._getResponseData(res))
  };

  likeCard(item) {
    console.log(item)
    return fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
    };

  delLikeCard(item) {
    return fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  };
}

export {Api};