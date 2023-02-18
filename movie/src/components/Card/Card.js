import React from 'react';
import { useLocation } from 'react-router-dom';
import './Card.css';
const Card = ({ movie, isSaveMovie, savedMovies, isDeleteMovie }) => {
    const location = useLocation();
    const savedMovie = savedMovies.find((m) => m.movieId === movie.id);
    const Save = movie.id ? savedMovie : location.pathname === '/saved-movies'

    function handleDeleteMovie() {
        isDeleteMovie(movie);
    }
    function handleSaveMovie() {
        if (!savedMovie) {
            isSaveMovie({
                country: String(movie.country),
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            });
        } else {
            isDeleteMovie(savedMovies.filter((m) => m.movieId === movie.id)[0]);
        }
    }

    return (
        <li className='cards__item'>
            <div className="cards__body">
                <div className="cards__info">
                    <h3 className='cards__title'>{movie.nameRU}</h3>
                    <span className='cards__time'>{movie.duration} мин</span>
                </div>
                {location.pathname === '/saved-movies' &&
                <button type='button'
                    aria-label='удалить фильм'
                    className={Save ? 'cards__button-active' : 'cards__button-active'}
                    onClick={handleDeleteMovie}>
                </button>}
            {location.pathname === '/movies' &&
                <button type='button'
                    aria-label='сохранить'
                    className={Save ? 'cards__button-active' : 'cards__button'}
                    onClick={handleSaveMovie}>
                </button>}
            </div>
            <a className='cards__container'
                href={movie.trailerLink}
                target="_blank" rel="noreferrer noopener"
                >
                <img className='cards__image'
                    src={(typeof movie.image === 'string') ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}
                    alt={movie.nameRU}
                />
            </a>
        </li>
    );
};

export default Card;