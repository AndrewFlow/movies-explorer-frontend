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


            <section className="register">
                <div className="register__body">
                    <div className="register__links">
                        <NavLink className="link" to="/">
                            <img className="link__logo" src={headerLogo} alt="лого" />
                        </NavLink>
                    </div>
                    <h2 className="register__title">Добро пожаловать</h2>
                    <form className="form" noValidate>
                        <p className="form__info">Имя</p>
                        <input
                            type="name"
                            className="form__input"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        <p className="form__info">E-mail</p>
                        <input
                            type="email"
                            className="form__input"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        <p className="form__info">Пароль</p>
                        <input
                            type="password"
                            className="form__input caption visible"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            minLength='7'
                            maxLength='40'
                            required
                        />
                        <div className="register__container">
                            <span className="error visible">Что-то пошло не так...</span>
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