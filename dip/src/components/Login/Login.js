/* eslint-disable default-case */
import React, { useEffect } from "react";
import "./Login.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import auth from "../utils/Auth";


function Login({ onLogin }) {
    const navigate = useNavigate();

    const [password, setPassword] = React.useState('');
    const [passwordDirty, setPasswordDirty] = React.useState('false');
    const [passwordError, setPasswordError] = React.useState('Поле пароль не может быть пустым');

    const [email, setEmail] = React.useState('');
    const [emailDirty, setEmailDirty] = React.useState('false');
    const [emailError, setEmailError] = React.useState('Поле email не может быть пустым');

    const [formValid, setFormValid] = React.useState('false');

    const handlePassword = (e) => {
        setEmail(e.target.value);
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailRegex.test(String(e.target.value).toLowerCase())) {
            setEmailError('Email неккоректен')
        } else {
            setEmailError('')
        }
    }
    const handleUserName = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 7 || e.target.value.length > 40) {
            setPasswordError('Поле должно содержать не меньше 7 и не больше 40 символов')
            if (!e.target.value) {
                setPasswordError('Поле не может быть пустым')
            }
        } else {
            setPasswordError('')
        }
    }
    const inputsHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break;
            case 'password':
                setPasswordDirty(true)
                break;
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        auth.authorization({ email, password })
            .then(res => {
                if (res.token) localStorage.setItem('token', res.token);
                onLogin();
                navigate("/movies");
            })
            .catch(() => {
                alert("Неккоректно заполнено одно из полей. Попробуйте еще раз.");
                setPassword('')
                setEmail('')
            })

    }
    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])
    return (
        <main>
            <section className="login">
                <div className="login__body">
                    <div className="login__links">
                        <NavLink className="link" to="/">
                            <img className="link__logo" src={headerLogo} alt="лого" />
                        </NavLink>
                    </div>
                    <h2 className="login__title">Рады видеть!</h2>
                    <form className="form" onSubmit={handleSubmit} noValidate>
                        <p className="form__info">E-mail</p>
                        <input
                            type="email"
                            className="form__input"
                            name="email"
                            value={email}
                            onChange={e => handlePassword(e)}
                            onBlur={e => inputsHandler(e)}
                            minLength='7'
                            maxLength='40'
                            required
                        />
                        {(emailDirty && emailError) && <span className="profile__error" style={{ color: '#EE3465' }}>{emailError}</span>}

                        <p className="form__info">Пароль</p>
                        <input
                            type="password"
                            className="form__input caption"
                            name="password"
                            value={password}
                            onBlur={e => inputsHandler(e)}
                            onChange={e => handleUserName(e)}
                            minLength='4'
                            maxLength='40'
                            required
                        />
                        {(passwordDirty && passwordError) && <span className="profile__error" style={{ color: '#EE3465' }}>{passwordError}</span>}
                        <div className="login__container">
                            <span className="error hidden">Что-то пошло не так...</span>
                        </div>
                        <div className="login__inner">
                            <button disabled={!formValid} type="submit" className="form__button blue">
                                Войти
                            </button>
                            <div className="form__redirect">
                                <p className="form__linkinfo">
                                    Ещё не зарегистрированы?
                                </p>
                                <Link className="form__link" to="/signup">
                                    Регистрация
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Login;