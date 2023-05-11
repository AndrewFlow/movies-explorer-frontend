import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css"
import { CurrentUserContext } from '../context/CurrentUserContext';

function Profile({ onLogout, onUpdateUser }) {

    const [name, setDataName] = React.useState('');
    const [email, setDataMail] = React.useState('');
    const [nameDirty, setNameDirty] = React.useState('false');
    const [emailDirty, setEmailDirty] = React.useState('false');
    const [nameError, setNameError] = React.useState('');
    const [emailError, setMailError] = React.useState('');

    const [disabled, setDisabled] = React.useState('false');

    const currentUser = React.useContext(CurrentUserContext);

    const handleDescription = (e) => {
        e.preventDefault();
        setDataMail(e.target.value);
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setMailError('Email неккоректен')
        } else {
            setMailError('')
        }
    }
    const handleUserName = (e) => {
        e.preventDefault();
        setDataName(e.target.value);
        if (e.target.name !== currentUser.name || e.target.email !== currentUser.email) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
        if (e.target.value.length < 2 || e.target.value.length > 40) {
            setNameError('Поле должно содержать не меньше 2 и не больше 40 символов')
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
                break
            case 'name':
                setNameDirty(true)
                break
        }
    }
    //сохранить
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            email,
        });
    }
    React.useEffect(() => {
        setDataName(currentUser.name);
        setDataMail(currentUser.email);
    }, [currentUser]);



    return (
        <>
            <Header isLoggedIn={true}></Header>
            <main>
                <section className="profile">
                    <h2 className="profile__title">Привет, {currentUser.name}</h2>
                    <form name="prfl" className="profile__form" onSubmit={handleSubmit}>
                        <fieldset className="profile__body">
                            <div className="profile__namecontainer">
                                <span className="profile__name">Имя</span>
                                <input className="profile__nameinner" id="name-input" onBlur={e => blurHandler(e)} onChange={e => handleUserName(e)} value={name} name="name" type="text" required
                                    minLength="2" maxLength="40" />
                            </div>
                            {(nameDirty && nameError) && <span className="profile__error" style={{ color: 'red' }}>{nameError}</span>}
                            <div className="profile__emailcontainer">
                                <span className="profile__email">E-mail</span>
                                <input className="profile__nameinner" id="mail-input" onBlur={e => blurHandler(e)} onChange={e => handleDescription(e)} value={email} name="email" type="email" required
                                    minLength="2" maxLength="40" />
                            </div>
                            {(emailDirty && emailError) && <span className="profile__error" style={{ color: 'red' }}>{emailError}</span>}
                        </fieldset>
                        <div className="profile__edit">
                            {disabled ? (<button
                                type="submit"
                                className="profile__link" disabled
                            >Сохранить</button>) : (<button
                                type="submit"
                                className="profile__link"
                            >Сохранить</button>)}
                            <Link className="profile__exit" onClick={onLogout} to='/'>Выйти из аккаунта</Link>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Profile;