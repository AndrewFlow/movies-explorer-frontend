import React from "react";
import "./Movies.css";
import { useEffect, useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Cards from "../Cards/Cards";

function Movies({
    cards,
    SavedCards,
    cardSave,
    cardDelete,
    load
}) {

    return (
        <>
            <Header isLoggedIn={true}></Header>
            <main>
                <Cards
                    cards={cards}
                    SavedCards={SavedCards}
                    cardSave = {cardSave}
                    cardDelete={cardDelete}
                    load = {load}
                    ></Cards>
            </main>
            <Footer></Footer>
        </>
    )
}

export default Movies;