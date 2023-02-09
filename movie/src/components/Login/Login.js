import React from "react";
import "./Login.css";
import { Link, NavLink } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';


function Login() {
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
        <section className="login">
            <div className="login__body">
                <div className="login__links">
                    <NavLink className="link" to="/">
                        <img className="link__logo" src={headerLogo} alt="лого" />
                    </NavLink>
                </div>
                <h2 className="subtitle">Рады видеть!</h2>
                <form className="form" noValidate>
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
                        className="form__input  caption"
                        name="password"
                        value={inputs.password}
                        onChange={handleChange}
                        minLength='7'
                        maxLength='40'
                        required
                    />
                    <div className="error__container">
                        <span className="error hidden">Что-то пошло не так...</span>
                    </div>
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
    )
}

export default Login;