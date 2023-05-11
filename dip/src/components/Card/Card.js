import React from 'react';
import { useLocation } from 'react-router-dom';

const Card = ({ item, cardSave, SavedCards, cardDelete }) => {

    const isLiked = SavedCards.some((i) => i.movieId === item.id);
    const location = useLocation();

    function handleCard(evt) {
        const like = evt.currentTarget;
        if (like.classList.contains('cards__button_active')) {
            cardDelete(SavedCards.filter(i => i.movieId === item.id)[0]);
        } else if (!like.classList.contains('cards__button_active')) {
            cardSave({
                nameRU: item.nameRU,
                nameEN: item.nameEN,
                movieId: item.id,
                country: item.country,
                image: `https://api.nomoreparties.co${item.image.url}`,
                thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
                trailerLink: item.trailerLink,
                duration: item.duration,
                director: item.director,
                year: item.year,
                description: item.description,
            });
        }
    }
    const deleteCard = () => {
        cardDelete(item);
    }

    return (
        // Важный атрибут: key
        <li key={item.id} className="cards__item">
            <a href={item.trailerLink} target="_blank" rel="noreferrer noopener">
                {location.pathname === '/saved-movies' &&
                    <img className="cards__image" src={item.image} alt="фильм"></img>}
                {location.pathname === '/movies' &&
                    <img className="cards__image" src={`https://api.nomoreparties.co${item.image.url}`} alt="фильм"></img>
                }
            </a>
            <div className="cards__body">
                <div className="cards__info">
                    <h3 className="cards__title">{item.nameRU}</h3>
                    {location.pathname === '/movies' &&
                        <button type='button'
                            className={isLiked ? 'cards__button_active' : 'cards__button'}
                            onClick={handleCard}>
                        </button>}
                    {location.pathname === '/saved-movies' &&
                        <button type='button'
                            className='cards__button_delete'
                            onClick={deleteCard}>
                        </button>}
                </div>
                <span className="cards__time">{item.duration} мин</span>
            </div>
        </li>
    );
};

export default Card;