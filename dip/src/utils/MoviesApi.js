class MoviesApi {
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

    getMovies() {
        return fetch(`${this._url}/beatfilm-movies`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(this._check)
    }
}

const moviesApi = new MoviesApi({
    url: `https://api.nomoreparties.co`,
});

export default moviesApi;