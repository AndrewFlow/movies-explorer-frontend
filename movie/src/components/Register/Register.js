import React from "react";
import "./Register.css";
import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';


function Register() {
    const defaultInputs = {
        email: "",
        password: ""
    };
    const [inputs, setInputs] = React.useState(defaultInputs);
    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        setInputs((state) => ({ ...state, [name]: value }));
    }

    return (
        <main>


            <section class="register">
                <div class="register__body">
                    <div class="register__links">
                        <NavLink class="link" to="/">
                            <img class="link__logo" src={headerLogo} alt="лого" />
                        </NavLink>
                    </div>
                    <h2 class="register__title">Добро пожаловать</h2>
                    <form class="form" noValidate>
                        <p class="form__info">Имя</p>
                        <input
                            type="name"
                            class="form__input"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        <p class="form__info">E-mail</p>
                        <input
                            type="email"
                            class="form__input"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        <p class="form__info">Пароль</p>
                        <input
                            type="password"
                            class="form__input caption visible"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            minLength='7'
                            maxLength='40'
                            required
                        />
                        <div class="register__container">
                            <span class="error visible">Что-то пошло не так...</span>
                        </div>
                        <div class="register__inner">
                            <button rype="submit" class="form__button blue">
                                Зарегистрироваться
                            </button>
                            <div class="form__redirect">
                                <p class="form__linkinfo">
                                    Уже зарегистрированы?
                                </p>
                                <Link class="form__link" to="/signin">
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