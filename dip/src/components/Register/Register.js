import React, { useEffect } from "react";
import "./Register.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import auth from "../utils/Auth";

function Register({ onLogin }) {
    const [name, setDataName] = React.useState('');
    const [email, setDataMail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [nameDirty, setNameDirty] = React.useState('false');
    const [emailDirty, setEmailDirty] = React.useState('false');
    const [passwordDirty, setPasswordDirty] = React.useState('false');

    const [nameError, setNameError] = React.useState('Поле Имя не может быть пустым');
    const [emailError, setMailError] = React.useState('Поле email не может быть пустым');
    const [passwordError, setPasswordError] = React.useState('Поле email не может быть пустым');

    const [formValid, setFormValid] = React.useState('false');
    const navigate = useNavigate();


    const handleMail = (e) => {
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
        if (e.target.value.length < 3 || e.target.value.length > 40) {
            setNameError('Поле должно содержать не меньше 3 и не больше 40 символов')
            if (!e.target.value) {
                setNameError('Поле не может быть пустым')
            }
        } else {
            setNameError('')
        }
    }
    const handlePassword = (e) => {
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

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break;
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
        auth.registration({ name, email, password })
            .then(() => {
                auth.authorization({ email, password })
                    .then((res) => {
                        if (res.token) localStorage.setItem('token', res.token);
                        onLogin();
                        navigate("/movies");
                    })
            })
            .catch((err) => {
                console.log(err)
                if (err === 'Ошибка: 409') {
                    alert('Email уже зарегестрирован');
                }
                else {
                    alert(`Ошибка. Попробуйте позже`);
                }
            });
    }

    useEffect(() => {
        if (emailError || nameError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, nameError, passwordError])


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
                            value={name}
                            onChange={handleUserName}
                            onBlur={e => blurHandler(e)}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        {(nameDirty && nameError) && <span className="error" >{nameError}</span>}
                        <p className="form__info">E-mail</p>
                        <input
                            type="email"
                            className="form__input"
                            name="email"
                            value={email}
                            onChange={e => handleMail(e)}
                            onBlur={e => blurHandler(e)}
                            minLength='3'
                            maxLength='40'
                            required
                        />
                        {(emailDirty && emailError) && <span className="error" >{emailError}</span>}
                        <p className="form__info">Пароль</p>
                        <input
                            type="password"
                            className="form__input caption visible"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            minLength='7'
                            maxLength='40'
                            required
                        />
                        {(passwordDirty && passwordError) && <span className="error">{passwordError}</span>}
                        <div className="register__inner">
                            <button disabled={!formValid} type="submit" className="form__button blue">
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