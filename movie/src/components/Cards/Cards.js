import React, { useState } from 'react';
import "./Cards.css";
import cardImage from "../../images/poster.jpg"


function Cards(props) {
    const [isActive, setState] = React.useState(true)
    function handleClick() {
        setState(!isActive);
    };
    const cardLikeButtonClassName = `cards__button ${isActive ? 'cards__button_active' : ''}`;
    return (
        <>
            <section className="elements">
                <ul className="cards">
                    <li className="cards__item">
                        <div className="cards__body">
                            <div className="cards__info">
                                <h3 className="cards__title">Рик и Морти</h3>
                                <span className="cards__time">2 ч</span>
                            </div>
                            <button className={cardLikeButtonClassName} onClick={handleClick}></button>
                        </div>
                        <img className="cards__image" src={cardImage} alt="фильм"></img>
                    </li>
                    <li className="cards__item">
                        <div className="cards__body">
                            <div className="cards__info">
                                <h3 className="cards__title">Рик и Морти</h3>
                                <span className="cards__time">2 ч</span>
                            </div>
                            <button className={cardLikeButtonClassName} onClick={handleClick}></button>
                        </div>
                        <img className="cards__image" src={cardImage} alt="фильм"></img>
                    </li>
                    <li className="cards__item">
                        <div className="cards__body">
                            <div className="cards__info">
                                <h3 className="cards__title">Рик и Морти</h3>
                                <span className="cards__time">2 ч</span>
                            </div>
                            <button className={cardLikeButtonClassName} onClick={handleClick}></button>
                        </div>
                        <img className="cards__image" src={cardImage} alt="фильм"></img>
                    </li>
                </ul>
                <div className='cards__morebutton'>
                    <button className="cards__more">
                        Ещё
                    </button>
                </div>
            </section>
        </>
    )
}

export default Cards;