
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import shorts from "../utils/Shorts";
import ProtectedRoute from "../ProjectedRoute/ProtectedRoute";
import { CurrentUserContext } from '../context/CurrentUserContext';

import moviesApi from '../utils/MoviesApi';
import mainApi from '../utils/MainApi';
import auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [defaultMovies, setDefaultMovies] = useState(0)
  const [moreMovies, setMoreMovies] = useState(0)
  const [savedMovies, setSavedMovies] = useState([]);
  const [SearchEnd, setSearchEnd] = useState('');
  const [Searching, setSearching] = useState(false);
  const [request, setRequest] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loading, startLoading] = useState(false);
  const [moreLoadingButton, setMoreLoadingButton] = useState(false);
  const [profileMessage, ProfileError] = useState('');
  const windowInnerWidth = window.innerWidth;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('moviesStorage')) {
      const initialSearch = JSON.parse(localStorage.getItem('moviesStorage'));
      const searchResult = shorts(initialSearch, request, checkboxStatus);
      setFilteredMovies(searchResult);
      setSearching(true);
    }
  }, [currentUser])

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
        .then((res) => {
          const findSavedMovies = res.filter((m) => m.owner._id === currentUser._id)
          localStorage.setItem("savedMovies", JSON.stringify(findSavedMovies));
          setSavedMovies(findSavedMovies);

        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  //Register
  function handleRegister(user) {
    auth.register(user)
      .then(() => {
        handleLogin({
          email: user.email,
          password: user.password
        });
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          setRegisterError('Ошибка сервера');
        }
        if (err === 'Ошибка: 409') {
          setRegisterError('Email уже зарегестрирован');
        }
        else {
          setRegisterError('Произошла ошибка');
        }
      });
  }

  //Login
  function handleLogin(user) {
    return auth
      .authorize(user)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
          window.location.reload();
        }
      })
      .catch(() => {
        setLoginError('Что-то пошло не так');
      })
  }
  //LogOut
  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
    navigate('/');
  };

  //chechToken
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getUserInfo(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setCurrentUser(res)
            navigate(location)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  // EditProfile
  function handleUpdateUser(user) {
    const token = localStorage.getItem('jwt');
    auth
      .editProfile(user, token)
      .then((updateUser) => {
        setLoggedIn(true);
        setCurrentUser(updateUser);
        localStorage.setItem('name', updateUser.name);
        localStorage.setItem('email', updateUser.email);
        ProfileError('Профиль успешно обновлен!');
      })
      .catch(() => {
        ProfileError('Произошла ошибка');
      })
  }

  React.useEffect(() => { // эффект, который берет все фильмы из API
    moviesApi.getMovies()
        .then((movies) => {
          startLoading(true);
          setInitialMovies(movies);
        })
        .catch(() => {
          setSearchEnd('Ошибка.Попруйте еще раз')
        })
        .finally(() => {
          startLoading(false);
        })
}, [])

  //Loading

  function initialLoading() {
    startLoading(true);
    setTimeout(() => startLoading(false), 1000);
  }
  //Search

  function setMovies () {
    initialLoading();
    setRenderedMovies([]);
    startLoading(true);
    moviesApi
    .getMovies()
    .then((movies) => {
      setInitialMovies(movies);
      localStorage.setItem('initialMovies', JSON.stringify(movies));
    })
    .finally(() => {
      startLoading(false);
    })
  }

  function handleSearchMovie(request, checkboxStatus) {
    initialLoading();
    setRenderedMovies([]);
    setRequest(request);
    setCheckboxStatus(checkboxStatus);
    const initialMoviesInStorage = JSON.parse(localStorage.getItem('initialMovies'));
    if (!initialMoviesInStorage) {
      startLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          setInitialMovies(movies);
          localStorage.setItem('initialMovies', JSON.stringify(movies));
        })
        .catch(() => {
          setSearchEnd('Ошибка.Попруйте еще раз')
        })
        .finally(() => {
          startLoading(false);
        })
    } else {
      setInitialMovies(initialMoviesInStorage);
    }
  }

  useEffect(() => {
    if (initialMovies.length > 0) {
      const moviesStorage = shorts(initialMovies, request, checkboxStatus);
      localStorage.setItem('moviesStorage', JSON.stringify(moviesStorage));
      localStorage.setItem('request', request);
      localStorage.setItem('checkboxStatus', checkboxStatus);
      setFilteredMovies(moviesStorage);
      setSearching(true);
    }
  }, [initialMovies, request, checkboxStatus]);

  useEffect(() => {
    if (renderedMovies.length === filteredMovies.length) {
      setMoreLoadingButton(false);
    }
  }, [renderedMovies, filteredMovies]);

  //SaveMovie

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        const updatedSavedMovies = [...savedMovies, { ...res, id: res.movieId }];
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err));
  };

  //DeleteMovie

  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(m => m._id !== movie._id)
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err))
  };

  //ShowMoreCards
  useEffect(() => {
    if (windowInnerWidth < 767) {
      setDefaultMovies(9)
      setMoreMovies(6)
    } else if (windowInnerWidth > 1279) {
      setDefaultMovies(9)
      setMoreMovies(9)
    }
  })

  useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > defaultMovies) {
        setRenderedMovies(filteredMovies.slice(0, defaultMovies));
        setMoreLoadingButton(true);
      } else {
        setRenderedMovies(filteredMovies);
      }
    }
  }, [filteredMovies, defaultMovies]);

  function renderMovies() {
    setRenderedMovies((previousCount) => filteredMovies.slice(0, previousCount.length + moreMovies));
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>

          <Route path="/" element={
            <>
              <Header loggedIn={loggedIn} />
              <Main />
            </>
          }
          />
          <Route exact path="/signup" element={
            <>
              <Register
                onRegister={handleRegister}
                registerError={registerError}
              />
            </>} />
          <Route exact path='/signin' element={
            <>
              <Login onLogin={handleLogin}
                loginError={loginError}
              />
            </>
          } />
          <Route path={'/movies'} element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header
                  loggedIn={loggedIn} />
                <Movies
                  loggedIn={loggedIn}
                  onMovie={setMovies}
                  onSearch={handleSearchMovie}
                  loading={loading}
                  Searching={Searching}
                  SearchEnd={SearchEnd}
                  isDeleteMovie={handleDeleteMovie}
                  moreLoadingButton={moreLoadingButton}
                  isRenderMovies={renderMovies}
                  renderedMovies={renderedMovies}
                  savedMovies={savedMovies}
                  isSaveMovie={handleSaveMovie}

                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route path={'/saved-movies'} element={
            <ProtectedRoute loggedIn={loggedIn}
              renderedMovies={renderedMovies}>
              <>
                <Header
                  loggedIn={loggedIn} />
                <SavedMovies
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  isDeleteMovie={handleDeleteMovie}
                />
                <Footer />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route path={'/profile'} element={
            <ProtectedRoute
              loggedIn={loggedIn}>
              <>
                <Header
                  loggedIn={loggedIn} />
                <Profile
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  profileMessage={profileMessage}
                  onSignOut={handleLogOut}
                />
              </>
            </ProtectedRoute>}>
          </Route>
          <Route path="/*" element={<NotFound />}>
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;