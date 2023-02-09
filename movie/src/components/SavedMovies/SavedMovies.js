import React from "react";
import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import Footer
    from "../Footer/Footer";
function SavedMovies() {
    return (
        <>
            <Header isLoggedIn={true}></Header>
            <section className="saved">
                <section className="movies">
                    <form className="forms">
                        <div className="forms__container">
                            <input
                                name="query"
                                className="forms__input"
                                type="text"
                                placeholder="Фильм">

                            </input>
                            <button className="forms__button blue" type="submit">Поиск</button>
                        </div>
                        <label className="forms__checkboxes">
                            <input type="checkbox"></input>
                            <span className="checkbox-swtich"></span>
                            <span className="movies__type">Короткометражки</span>
                        </label>
                    </form>
                </section>
                <Cards></Cards>
                <Footer></Footer>
            </section>
        </>
    )
}

export default SavedMovies;