import React, { useEffect, useState } from 'react'
import SearchForm from '../SearchForm/SearchForm';
import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader'
import shorts from '../utils/Shorts'

import "./SavedMovies.css";

function SavedMovies({ savedMovies, isDeleteMovie }) {
    const [loading, startLoading] = useState(false);
    const [isSearchDone, setIsSearchDone] = useState(false);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [checkboxStatus, setCheckboxStatus] = useState(false);
    const [request, setRequest] = useState('');

    function handleSearchSavedMovie(request, checkboxStatus) {
        initialLoading();
        const searchResult = shorts(savedMovies, request, checkboxStatus);
        setFilteredSavedMovies(searchResult);
        setRequest(request);
        setCheckboxStatus(checkboxStatus);
        setIsSearchDone(true);
    }
    function initialLoading() {
        startLoading(true);
        setTimeout(() => startLoading(false), 1000);
    }
    useEffect(() => {
        if (filteredSavedMovies.length > 0) {
            const searchResult = shorts(savedMovies, request, checkboxStatus);
            setFilteredSavedMovies(searchResult);
        }
    }, [savedMovies]);
    return (
        <>
        <main className='saved-movies'>
            <SearchForm
                onSearch={handleSearchSavedMovie}
            />
            {loading ?
                <div className="saved-movies__preloader">
                    <Preloader />
                </div>
                : isSearchDone
                    ? filteredSavedMovies.length > 0
                        ?
                        <Cards
                            movies={filteredSavedMovies}
                            savedMovies={savedMovies}
                            isDeleteMovie={isDeleteMovie}
                        />
                        : (
                            <div className="saved-movies__container">
                                <span className="saved-movies__empty">Нет совпадений</span>
                            </div>
                        )
                    : (
                        <Cards
                            movies={savedMovies}
                            savedMovies={savedMovies}
                            isDeleteMovie={isDeleteMovie}
                        />
                    )
            }

        </main>
        </>
    )
}

export default SavedMovies;