import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import "./Cards.css";

function Cards({ cards, savedMovies, isSaveMovie, isDeleteMovie }) {

    const [value, setValue] = useState('');
    const [checkBox, setCheckBox] = useState(false);

    const chechboxCards = [...cards].filter((v) => v.duration < 40);
    const chechboxCardsDone = chechboxCards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase())

    })
    const filtredCards = cards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase())

    })

    

    return (
        <>
            {filtredCards.length === 0 ? (
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
                            <input type="checkbox"></input>
                            <span className="checkbox-swtich"></span>
                            <span className="movies__type">Короткометражки</span>
                        </label>
                    </form>
                    <div className="elements_inner">
                        <span className="elements__none">Нет совпадений</span>
                    </div>
                </>) : (
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
                    <section className="elements">
                        <ul className='cards'>
                            {!checkBox ? (
                                filtredCards.map((item) => (
                                    //
                                    <Card
                                        item={item}
                                        key={item._id || item.id}
                                        savedMovies={savedMovies}
                                        isSaveMovie={isSaveMovie}
                                        isDeleteMovie={isDeleteMovie}
                                    //
                                    />
                                ))
                            ) : (chechboxCardsDone.map((item) => (
                                //
                                <Card
                                    item={item}
                                    key={item._id || item.id}
                                    savedMovies={savedMovies}
                                    isSaveMovie={isSaveMovie}
                                    isDeleteMovie={isDeleteMovie}
                                //
                                />
                            )))}

                        </ul>
                        <div className='elements__morebutton'>
                            <button className="elements__more" >Ещё</button>
                        </div>
                    </section>
                </>

            )}
        </>
    )
}

export default Cards;


import React, { useState, useEffect ,useReducer} from 'react';
import Card from '../Card/Card';
import "./Cards.css";

function Cards({ cards, savedMovies, isSaveMovie, isDeleteMovie }) {

    const [checkBox, setCheckBox] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [objects, setObjects] = useState(cards.slice(0, 8));
    const [visibleObjectsCount, setVisibleObjectsCount] = useState(8);

    const showMoreObjects = () => {
        const newVisibleObjectsCount = visibleObjectsCount + 8;
        const newObjects = cards.slice(0, newVisibleObjectsCount);
        setObjects(newObjects);
        setVisibleObjectsCount(newVisibleObjectsCount);
      };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredObjects = objects.filter(object => {
        return object.nameRU.toLowerCase().includes(searchTerm.toLowerCase())
    });
    const chechboxCards = [...cards].filter((v) => v.duration < 40);
    const chechboxCardsDone = chechboxCards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase())

    })
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setVisibleObjectsCount(8);
            } else {
                setVisibleObjectsCount(6);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log(filteredObjects)
    return (
        <>
            {filteredObjects.length === 0 ? (
                <>
                    <form className="forms">
                        <div className="forms__container">
                            <input
                                onChange={handleSearch}
                                className="forms__input"
                                type="text"
                                placeholder="Фильм"
                                required>
                            </input>
                            <button className="forms__button blue" type="submit">Найти</button>
                        </div>
                        <label className="forms__checkboxes">
                            <input type="checkbox"></input>
                            <span className="checkbox-swtich"></span>
                            <span className="movies__type">Короткометражки</span>
                        </label>
                    </form>
                    <div className="elements_inner">
                        <span className="elements__none">Нет совпадений</span>
                    </div>
                </>) : ( 
                <>
                    <form className="forms">
                        <div className="forms__container">
                            <input
                                onChange={handleSearch}
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
                    <section className="elements">
                        <ul className='cards'>
                            {!checkBox ? (
                                filteredObjects.map((item) => (
                                    //
                                    <Card
                                        item={item}
                                        key={item._id || item.id}
                                        savedMovies={savedMovies}
                                        isSaveMovie={isSaveMovie}
                                        isDeleteMovie={isDeleteMovie}
                                    //
                                    />
                                ))
                            ) : (chechboxCardsDone.map((item) => (
                                //
                                <Card
                                    item={item}
                                    key={item._id || item.id}
                                    savedMovies={savedMovies}
                                    isSaveMovie={isSaveMovie}
                                    isDeleteMovie={isDeleteMovie}
                                //
                                />
                            )))}
                        </ul>
                        {!checkBox ? (
                            <div className='elements__morebutton'>
                                {(visibleObjectsCount < cards.length) && (
                                    <button className="elements__more" onClick={showMoreObjects}>Показать еще</button>
                                )}
                            </div>
                        ) : (
                            <div className='elements__morebutton'>
                                {(visibleObjectsCount < cards.length) && (
                                    <button className="elements__more" onClick={showMoreObjects}>Показать еще</button>
                                )}
                            </div>
                        )}

                    </section>
                </>

            )}
        </>
    )
}

export default Cards;