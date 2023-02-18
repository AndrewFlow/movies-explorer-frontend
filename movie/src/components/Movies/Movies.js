import React from "react";
import "./Movies.css";
import SearchForm from '../SearchForm/SearchForm';
import Cards from "../Cards/Cards";
import Preloader from '../Preloader/Preloader'

function Movies({
    onSearch,
    loading,
    Searching,
    SearchEnd,
    renderedMovies,
    savedMovies,
    isSaveMovie,
    isDeleteMovie,
    moreLoadingButton,
    isRenderMovies,
}) {
    return (
        <>
            <main className='movies'>
                <SearchForm
                    onSearch={onSearch} />
                {loading ?
                    <div className="movies__preloader">
                        <Preloader />
                    </div>
                    : Searching
                        ? renderedMovies.length > 0
                            ? <Cards
                                movies={renderedMovies}
                                savedMovies={savedMovies}
                                isSaveMovie={isSaveMovie}
                                isDeleteMovie={isDeleteMovie}
                                loading={loading}
                                Searching={Searching}
                                isRenderMovies={isRenderMovies}
                                moreLoadingButton={moreLoadingButton}
                            />
                            : (!loading ?
                                <div className="movies__container">
                                    <span className="movies__empty">Нет совпадений</span>
                                </div>
                                :
                                <div className="movies__container">
                                    <span className="movies__text">{SearchEnd}</span>
                                </div>
                            )
                        : ("")
                }
            </main>

        </>
    )
}

export default Movies;