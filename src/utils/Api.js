class Api {
  constructor(config) {
    this._headers = config.headers;
    this._link = config.link;
  }

  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`https://mesto.${this._link}cards`, {
      headers: this._headers,
    })
      .then(this._errorHandler)
  }

  setUserInfo(data) {
    return fetch(`https://mesto.${this._link}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._errorHandler);
  }

  getInitialUser() {
    return fetch(`https://mesto.${this._link}users/me`, {
      headers: this._headers,
    }).then(this._errorHandler)
  }

  getInitialAll() {
    return Promise.all([this.getInitialCards(), this.getInitialUser()])
  }

  addCard(name, link) {
    return fetch(`https://mesto.${this._link}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._errorHandler);
  }
  removeCard(id) {
    return fetch(`https://mesto.${this._link}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`https://mesto.${this._link}cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  updateAvatar(data) {
    return fetch(`https://mesto.${this._link}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._errorHandler);
  }
}

export const api = new Api({
  link: 'nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: "a3c4c669-5a31-4540-bf35-d0918cf22e48",
    "content-type": "application/json",
  }
})
