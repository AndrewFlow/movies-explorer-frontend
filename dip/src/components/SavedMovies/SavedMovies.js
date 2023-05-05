import React, { useEffect, useState } from 'react'
import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import Footer
    from "../Footer/Footer";


function SavedMovies({ SavedCards, cardDelete }) {

    return (
        <>
            <Header isLoggedIn={true}></Header>
            <main className='saved-movies'>
                <Cards
                    cards={SavedCards}
                    SavedCards={SavedCards}
                    cardDelete={cardDelete}
                />
            </main>
            <Footer></Footer>
        </>
    )
}

export default SavedMovies;