import React from "react";
import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import Footer
    from "../Footer/Footer";
function SavedMovies() {
    return (
        <>
            <Header isLoggedIn={true}></Header>
            <main>
                <section className="saved">
                    <section className="movies">
                        <form className="forms">
                            <div className="forms__container">
                                <input
                                    name="query"
                                    className="forms__input"
                                    type="text"
                                    placeholder="Фильм"
                                    required>

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
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}

export default SavedMovies;