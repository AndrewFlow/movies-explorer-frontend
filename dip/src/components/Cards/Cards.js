import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import "./Cards.css";
import Preloader from '../Preloader/Preloader';
import {shorts,largeCards,mediumCards,smallCards,largeScreen,mediumScreen,smallScreen} from '../utils/constants'
import { useLocalStorage } from '../hooks/useLocalStorage';

function Cards({ cards, SavedCards, cardSave, cardDelete, handeCard}) {
    const [value, setValue] = useLocalStorage('value','');
    const [checkBox2, setCheckBox2] = useLocalStorage('checkBox2',false);
    const [visible, setVisible] = useState(8);
    const [isLoading, setIsLoading] = useState(true);

    function widthCounterHandler() {
        if (window.innerWidth >= largeScreen) {
            return largeCards
        }
        else if (window.innerWidth <= mediumScreen) {
            return mediumCards
        } else if (window.innerWidth <= smallScreen) {
            return smallCards
        }
    }
    const showMoreItems = () => {
        setVisible(prevState => prevState + widthCounterHandler())
    }

    const chechboxCards = [...cards].filter((v) => v.duration < shorts);
    const chechboxCardsDone = chechboxCards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value?.toLowerCase())

    })
    const filtredCards = cards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value?.toLowerCase())

    })


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= largeScreen) {
                return largeCards
            }
            else if (window.innerWidth <= mediumScreen) {
                return mediumCards
            } else if (window.innerWidth <= smallScreen) {
                return smallCards
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
                                value={value}
                                required>
                            </input>
                            <button className="forms__button blue" type="submit">Найти</button>
                        </div>
                        <label className="forms__checkboxes">
                            <input onChange={(e) => {
                                setCheckBox2(!checkBox2)
                            }} value={checkBox2} checked={checkBox2} type="checkbox"></input>
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
                                {!checkBox2 ? (
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
                                ) : (chechboxCardsDone.slice(0, visible).map((item) => (
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
                            {!checkBox2 ? (
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