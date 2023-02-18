import React from "react";
import "./Login.css";
import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import useFormWithValidation from '../hooks/useFormWithValidation';
import Error from '../Error/Error';


function Login({ onLogin, loginError }) {

    const { values, handleChange, errors } = useFormWithValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(values)
    }
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
                        <input className="form__input"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                        />
                        <Error
                            errorMessage={errors.email}
                        />
                        <p className="form__info">Пароль</p>
                        <input className="form__input  caption"
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            onChange={handleChange}
                            value={values.password || ''}
                            minLength="4"
                            required
                        />
                        <Error
                            errorMessage={errors.password}
                        />
                        <Error
                            errorMessage={loginError} />
                        <div className="login__inner">
                            <button rype="submit" className="form__button blue">
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