import React from "react";
import "./Movies.css";
import { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Cards from "../Cards/Cards";




function Movies({cards}) {

    return (
        <>
            <Header isLoggedIn={true}></Header>
            <main>
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
                            <button className="forms__button blue" type="submit">Найти</button>
                        </div>
                        <label className="forms__checkboxes">
                            <input type="checkbox"></input>
                            <span className="checkbox-swtich"></span>
                            <span className="movies__type">Короткометражки</span>
                        </label>
                    </form>
                </section>
                <Cards cards={cards}></Cards>
            </main>
            <Footer></Footer>
        </>
    )
}

export default Movies;