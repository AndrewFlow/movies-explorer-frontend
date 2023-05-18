
import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
import { useLocalStorage } from '../hooks/useLocalStorage';

function App() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentUser, setUser] = useLocalStorage('currentUser',{});
  const [LogIn, setLogIn] = useLocalStorage('LogIn',false);
  const [load, setLoad] = useState(false);
  const [SavedCards, setSavedCards] = useState([]);
  const location = useLocation();


  // Достаем фильмы из API
  useEffect(() => {
    setLoad(true);
    moviesApi.getCards()
      .then((cards) => {
        setCards(cards);
        if (location.pathname === '/movies' && currentUser?._id) {
          mainApi.saveCards()
            .then((res) => {
              setSavedCards(res.filter((i) => i?.owner?._id === currentUser?._id));
            }).catch((err) => {
              console.error(err);
            })
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoad(false);
      })
  }, [LogIn, location.pathname])

  //Проверка токена
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
      auth.checkInToken(token)
        .then((res) => {
          if (res) {
            setLogIn(true)
            setUser(res)
            mainApi.saveCards()
            .then((response) => {
              setSavedCards(response.filter((i) => i?.owner?._id === res?._id));
            }).catch((err) => {
              console.error(err);
            })
            navigate(location)
          }
        })
        .catch(console.error);
    }
  }, [location.pathname]);


  function handleLogin() {
    setLogIn(true);
    navigate("/movies")
  }

  function handleLogout() {
    setLogIn(false);
    localStorage.removeItem("token");
    localStorage.clear();
    setUser({});
    setSavedCards([]);
    setCards([]);
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
    if (LogIn && currentUser?._id && (location.pathname === '/saved-movies' || location.pathname === '/movies')) {
      mainApi.saveCards()
        .then((res) => {
          setSavedCards(res.filter((i) => i?.owner?._id === currentUser?._id));
        }).catch((err) => {
          console.error(err);
        })
    }
  }, [LogIn, location.pathname,currentUser])


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
              {!LogIn ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
            </>
          } />
          <Route exact path="/signup" element={
            <>
              {!LogIn ? <Register onLogin={handleLogin} /> : <Navigate to="/" />}
            </>} />
          <Route path="/*" element={<NotFound />}>
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;