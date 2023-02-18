import React, { useEffect } from "react";
import "./Register.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import auth from "../utils/auth";
import useFormWithValidation from '../hooks/useFormWithValidation';
import Error from '../Error/Error.js';


function Register({ registerError, onRegister }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    //сброс фоормы
    useEffect(() => {
        resetForm({}, {}, false);
    }, [resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(values)
    }

    return (
        <main>
            <section className="register">
                <div className="register__body">
                    <div className="register__links">
                        <NavLink className="link" to="/">
                            <img className="link__logo" src={headerLogo} alt="лого" />
                        </NavLink>
                    </div>
                    <h2 className="register__title">Добро пожаловать</h2>
                    <form onSubmit={handleSubmit} className="form" noValidate>
                        <p className="form__info">Имя</p>
                        <input
                            type="name"
                            className="form__input"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        <Error
                            errorMessage={errors.name}
                        />
                        <p className="form__info">E-mail</p>
                        <input
                            type="email"
                            className="form__input"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        <Error
                            errorMessage={errors.email}
                        />
                        <p className="form__info">Пароль</p>
                        <input
                            type="password"
                            className="form__input caption"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            minLength='7'
                            maxLength='40'
                            required
                        />
                        <Error
                            errorMessage={errors.password}
                        />
                        <div className="register__container">
                            <Error
                                errorMessage={registerError} />
                        </div>
                        <div className="register__inner">
                            <button rype="submit" className="form__button blue">
                                Зарегистрироваться
                            </button>
                            <div className="form__redirect">
                                <p className="form__linkinfo">
                                    Уже зарегистрированы?
                                </p>
                                <Link className="form__link" to="/signin">
                                    Войти
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Register;