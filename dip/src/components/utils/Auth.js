class Auth {
  constructor(url) {
    this._url = url;
  }
  _check(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
  }

  checkInToken = () => {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      method: 'GET'
    })
      .then(res => this._check(res))
  }

  registration({ name, email, password }) {
    const url = `${this._url}/signup`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    })
      .then(res => this._check(res))
  }

  authorization({ email, password }) {
    const url = `${this._url}/signin`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then(res => this._check(res))
      .catch((err) => { throw err });
  }

}

const auth = new Auth('https://AndFlowDimpoma.nomoredomains.rocks');

export default auth;