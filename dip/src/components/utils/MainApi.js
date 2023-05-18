class MainApi {
    constructor({ url }) {
        this._url = url;
    }
    _check(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
    // Редактирование пользователя
    setInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            })
        })
            .then(res => this._check(res))
    }

    saveCard(item) {
        return fetch(`${this._url}/movies`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(item)
        })
        .then(res => this._check(res))
    }
    saveCards() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => this._check(res))
    }
    deleteCards(card) {
        return fetch(`${this._url}/movies/${card}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(res => this._check(res))
    }

}

const mainApi = new MainApi({
    url: 'https://AndFlowDimpoma.nomoredomains.rocks',
});

export default mainApi;