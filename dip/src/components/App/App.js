
import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import moviesApi from "../../utils/MoviesApi";


function App() {
  
  const [cards, setCards] = useState([])
  useEffect(() => {
    Promise.all([moviesApi.getMovies()])
    .then(([cards]) => {
      setCards(cards)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies cards={cards} />} />
        <Route path="/saved-movies" element={<SavedMovies cards={cards}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/*" element={<NotFound />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;