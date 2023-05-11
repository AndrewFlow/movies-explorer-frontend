
import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import moviesApi from "../utils/MoviesApi";
import mainApi from '../utils/MainApi';
import { CurrentUserContext } from '../context/CurrentUserContext';
import ProtectedRoute from "../ProjectedRoute/ProtectedRoute";
import auth from '../utils/Auth';
import Preloader from '../Preloader/Preloader';

function App() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentUser, setUser] = useState({});
  const [LogIn, setLogIn] = useState(false);
  const [load, setLoad] = useState(false);
  const [SavedCards, setSavedCards] = useState([]);

  // Достаем фильмы из API
  useEffect(() => {
    setLoad(true);
    moviesApi.getCards()
      .then((cards) => {
        setCards(cards);

      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoad(false);
      })
  }, [])

  //Проверка токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkInToken(token)
        .then((res) => {
          if (res) {
            setLogIn(true)
            setUser(res)
            navigate("/movies")
          }
        })
        .catch(console.error);
    }
  }, [LogIn]);

  function handleLogin() {
    setLogIn(true);
    window.location.reload();
    navigate("/movies")
  }

  function handleLogout() {
    setLogIn(false);
    localStorage.removeItem("token");
  }

  // редактирование профиля
  function handleUpdateInfo(data) {
    mainApi.setInfo(data).then((newUser) => {
      setLogIn(true);
      setUser(newUser);
      alert('Профиль успешно обновлен!');
    })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          alert('Email уже используется');
        } else { alert('Произошла ошибка.Попробуйте еще раз') }
      })
  }

  // DeleteCard
  function handleDeleteCard(card) {
    mainApi.deleteCards(card._id).then(() => {
      setSavedCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    })
  }

  //SaveMovie
  function handleSaveCard(card) {
    mainApi
      .saveCard(card)
      .then((res) => {
        setSavedCards([...SavedCards, { ...res }]);
      }).catch((err) => {
        console.error(err);
      })
  };

  //Достаем сохраненные карточки
  useEffect(() => {
    if (LogIn) {
      mainApi.saveCards()
        .then((res) => {
          setSavedCards(res.filter((i) => i.owner._id === currentUser._id));
        }).catch((err) => {
          console.error(err);
        })
    }
  }, [LogIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <Main LogIn={LogIn} />} />
          <Route path={'/movies'} element={
            <ProtectedRoute LogIn={LogIn}>
              <>
                <Movies
                  fallback={<Preloader />}
                  LogIn={LogIn}
                  cards={cards}
                  load={load}
                  cardSave={handleSaveCard}
                  cardDelete={handleDeleteCard}
                  SavedCards={SavedCards}
                />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route path="/saved-movies" element={<SavedMovies
            LogIn={LogIn}
            SavedCards={SavedCards}
            cardSave={handleSaveCard}
            cardDelete={handleDeleteCard}
          />} />
          <Route path={'/profile'} element={
            <ProtectedRoute
              LogIn={LogIn}>
              <>
                <Profile
                  LogIn={LogIn}
                  onLogout={handleLogout}
                  onUpdateUser={handleUpdateInfo}
                />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route exact path='/signin' element={
            <>
              <Login onLogin={handleLogin} />
            </>
          } />
          <Route exact path="/signup" element={
            <>
              <Register onLogin={handleLogin} />
            </>} />
          <Route path="/*" element={<NotFound />}>
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;