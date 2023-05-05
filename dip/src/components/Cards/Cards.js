import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import "./Cards.css";
import Preloader from '../Preloader/Preloader';

function Cards({ cards, SavedCards, cardSave, cardDelete, handeCard, savedMovie }) {
    const [value, setValue] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const [visible, setVisible] = useState(8);
    const [isLoading, setIsLoading] = useState(true);
    function widthCounterHandler() {
        if (window.innerWidth >= 1280) {
            return 8
        }
        else if (window.innerWidth <= 1279) {
            return 6
        } else if (window.innerWidth <= 768) {
            return 4
        }
    }
    const showMoreItems = () => {
        setVisible(prevState => prevState + widthCounterHandler())
    }

    const chechboxCards = [...cards].filter((v) => v.duration < 40);
    const chechboxCardsDone = chechboxCards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase())

    })
    const filtredCards = cards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase())

    })


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setVisible(8);
            }
            else if (window.innerWidth <= 1279) {
                setVisible(6);
            } else if (window.innerWidth <= 768) {
                setVisible(4);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            {isLoading ? (<Preloader />) : (
                <>
                    <form className="forms">
                        <div className="forms__container">
                            <input
                                onChange={(e) => setValue(e.target.value)}
                                className="forms__input"
                                type="text"
                                placeholder="Фильм"
                                required>
                            </input>
                            <button className="forms__button blue" type="submit">Найти</button>
                        </div>
                        <label className="forms__checkboxes">
                            <input onChange={() => setCheckBox(!checkBox)} type="checkbox"></input>
                            <span className="checkbox-swtich"></span>
                            <span className="movies__type">Короткометражки</span>
                        </label>
                    </form>
                    {filtredCards.length === 0 ? (
                        <div className="elements_inner">
                            <span className="elements__none">
                                Нет совпадений
                            </span>
                        </div>) : (
                        <section className="elements">
                            <ul className='cards'>
                                {!checkBox ? (
                                    filtredCards.slice(0, visible).map((item) => (
                                        <Card
                                            item={item}
                                            key={item._id || item.id}
                                            SavedCards={SavedCards}
                                            handeCard={handeCard}
                                            cardSave={cardSave}
                                            cardDelete={cardDelete}
                                        />
                                    ))
                                ) : (chechboxCardsDone.map((item) => (
                                    <Card
                                        item={item}
                                        key={item._id || item.id}
                                        handeCard={handeCard}
                                        SavedCards={SavedCards}
                                        cardSave={cardSave}
                                        cardDelete={cardDelete}
                                    />
                                )))}

                            </ul>
                            {!checkBox ? (
                                <div className='elements__morebutton'>
                                    {(visible < filtredCards.length) && (
                                        <button className="elements__more" onClick={showMoreItems}>Ещё</button>
                                    )}
                                </div>
                            ) : (
                                <div className='elements__morebutton'>
                                    {(visible < chechboxCardsDone.length) && (
                                        <button className="elements__more" onClick={showMoreItems}>Ещё</button>
                                    )}
                                </div>
                            )}
                        </section>)
                    }
                </>
            )}
        </>
    )
}

export default Cards;

