import React, { useState } from 'react';

import "./Cards.css";


function Cards({cards}) {

    const [isActive, setState] = React.useState(true)
    function handleClick() {
        setState(!isActive);
    };
    const cardLikeButtonClassName = `cards__button ${isActive ? 'cards__button_active' : ''}`;
    return (
        <>
            <section className="elements">
                <ul className="cards">
                    {cards.map((item, i) => (
                        // Важный атрибут: key
                        <li key={item.id} className="cards__item">
                        <img className="cards__image" src={`https://api.nomoreparties.co${item.image.url}`} alt="фильм"></img>
                        <div className="cards__body">
                            <div className="cards__info">
                                <h3 className="cards__title">{item.nameRU}</h3>
                                <button className={cardLikeButtonClassName} onClick={handleClick}></button>
                            </div>
                            <span className="cards__time">{item.duration} мин</span>
                        </div>
                    </li>
                    ))}

                </ul>
                <div className='elements__morebutton'>
                    <button className="elements__more">
                        Ещё
                    </button>
                </div>
            </section>
        </>
    )
}

export default Cards;