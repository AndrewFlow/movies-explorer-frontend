/* eslint-disable default-case */
import React, { useEffect } from "react";
import "./Login.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import auth from "../utils/Auth";


function Login({ onLogin }) {

    const [password, setDataName] = React.useState('');
    const [email, setDataMail] = React.useState('');
    const [nameDirty, setNameDirty] = React.useState('false');
    const [emailDirty, setEmailDirty] = React.useState('false');
    const [nameError, setNameError] = React.useState('Поле Имя не может быть пустым');
    const [emailError, setMailError] = React.useState('Поле email не может быть пустым');
    const [formValid, setFormValid] = React.useState('false');
    const navigate = useNavigate();

    const handleDescription = (e) => {
        setDataMail(e.target.value);
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setMailError('Email неккоректен')
        } else {
            setMailError('')
        }
    }
    const handleUserName = (e) => {
        setDataName(e.target.value);
        if (e.target.value.length < 7 || e.target.value.length > 40) {
            setNameError('Поле должно содержать не меньше 7 и не больше 40 символов')
            if (!e.target.value) {
                setNameError('Поле не может быть пустым')
            }
        } else {
            setNameError('')
        }
    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break;
            case 'password':
                setNameDirty(true)
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
                setDataName('')
                setDataMail('')
            })

    }
    useEffect(() => {
        if (emailError || nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError])
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
                            onChange={e => handleDescription(e)}
                            onBlur={e => blurHandler(e)}
                            minLength='7'
                            maxLength='40'
                            required
                        />
                        {(emailDirty && emailError) && <span className="profile__error" style={{ color: 'red' }}>{emailError}</span>}

                        <p className="form__info">Пароль</p>
                        <input
                            type="password"
                            className="form__input caption"
                            name="password"
                            value={password}
                            onBlur={e => blurHandler(e)}
                            onChange={e => handleUserName(e)}
                            minLength='4'
                            maxLength='40'
                            required
                        />
                        {(nameDirty && nameError) && <span className="profile__error" style={{ color: 'red' }}>{nameError}</span>}
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