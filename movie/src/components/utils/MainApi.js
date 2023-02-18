

class MainApi {
    constructor({ baseUrl }) {
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

    getUserInfo = () => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkApi)
    }

    saveMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._checkApi)
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkApi)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkApi)
    }
}

const mainApi = new MainApi({
    baseUrl: 'http://localhost:3001',
});

export default mainApi;