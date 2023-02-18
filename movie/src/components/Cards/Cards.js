import React from 'react';

import Card from '../Card/Card';
import './Cards.css';


function Cards({
    movies,
    savedMovies,
    isSaveMovie,
    isDeleteMovie,
    loading,
    Searching,
    isRenderMovies,
    moreLoadingButton,
}) {

    const moreButton = moreLoadingButton ? `elements__more` : `elements__morebutton-disabled`;

    return (
        <section className='elements'>
            <ul className='cards'>
                {movies.map((movie) => (
                    <Card
                        movie={movie}
                        key={movie._id || movie.id}
                        savedMovies={savedMovies}
                        isSaveMovie={isSaveMovie}
                        isDeleteMovie={isDeleteMovie}
                    />
                ))}
            </ul>
            {!loading ? Searching
                ? <>
                    <div className='elements__morebutton'>
                        <button
                            onClick={isRenderMovies}
                            className={moreButton}
                            aria-label='Загрузить ещё'
                            type='button'>Ещё</button>
                    </div>
                </>
                : ("")
                : ("")
            }
        </section>
    );
};

export default Cards;