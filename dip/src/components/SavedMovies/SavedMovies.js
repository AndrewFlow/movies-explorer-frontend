import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Card from '../Card/Card';
import Footer
    from "../Footer/Footer";
    import Preloader from '../Preloader/Preloader';
import {shorts} from '../utils/constants'
import { useLocalStorage } from '../hooks/useLocalStorage';


function SavedMovies({ SavedCards, cardSave, cardDelete, handeCard }) {

    const [value, setValue] = useLocalStorage('value','');
    const [checkBox1, setCheckBox1] = useLocalStorage('checkBox1',false);
    const [isLoading, setIsLoading] = useState(true);

    const chechboxCards = [...SavedCards].filter((v) => v.duration < shorts);
    const chechboxCardsDone = chechboxCards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase())

    })
    const filtredCards = SavedCards.filter(movie => {
        return movie.nameRU.toLowerCase().includes(value.toLowerCase())

    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);



    return (
        <>
            <Header isLoggedIn={true}></Header>
            <main className='saved-movies'>
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
                            <input onChange={() => setCheckBox1(!checkBox1)} value={checkBox1} checked={checkBox1} type="checkbox"></input>
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
                                {!checkBox1 ? (
                                    filtredCards.map((item) => (
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
                        </section>)
                    }
                </>
            )}
        </>
            </main>
            <Footer></Footer>
        </>
    )
}

export default SavedMovies;