class Auth {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }
    get _headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        }
    }
    _checkApi(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Возникла ошибка: ${res.status}`);
    }
    register = ({ name, email, password }) => {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(this._checkApi)
    }
    authorize = ({ email, password }) => {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
            .then(this._checkApi)
    }

    editProfile({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, email })
        })
            .then(this._checkApi)
    }
    
  }
  
  const auth = new Auth('https://AndFlowDimpoma.nomoredomains.rocks');
  
  export default auth;