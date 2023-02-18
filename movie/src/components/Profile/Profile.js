import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css"
import { CurrentUserContext } from "../context/CurrentUserContext";
import useFormWithValidation from '../hooks/useFormWithValidation';

function Profile({ onUpdateUser, onSignOut, profileMessage }) {
    const { values, setValues, errors, setErrors, handleChange, isValid, setIsValid } = useFormWithValidation();
    const [profileMessageText, setProfileMessageText] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    //изменение имени
    const handleChangeName = (evt) => {
        if (evt.target.value === currentUser.name || evt.target.value === currentUser.email) {
            setIsValid(false);
            setErrors({
                errors: errors.name,
                [evt.target.name]: 'Имя должно отличаться от установленного'
            })
        } else {
            handleChange(evt);
        }
    };

    //изменение почты
    const handleChangeEmail = (evt) => {
        if (evt.target.value === currentUser.name || evt.target.value === currentUser.email) {
            setIsValid(false);
            setErrors({
                errors: errors.name,
                [evt.target.name]: 'Email должен отличаться от установленного'
            });
        } else {
            handleChange(evt);
        }
    };

    //сохранить
    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: values.name,
            email: values.email,
        });
    }
    useEffect(() => {
        setIsValid(false);
        setValues({
            name: currentUser.name,
            email: currentUser.email,
        });
    }, [onUpdateUser])

    return (
        <>
            <main>
                <section className="profile">
                    <h2 className="profile__title">Привет, {values.name}</h2>
                    <form className='profile__form' onSubmit={handleSubmit}>
                    <fieldset className='profile__body'>
                        <label className='profile__container'>
                            <p className='profile__name'>Имя</p>
                            <input className='profile__input'
                                type='text'
                                id='input-name'
                                name='name'
                                value={values.name || ''}
                                placeholder='Имя'
                                onChange={handleChangeName}
                                minLength="2"
                                pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                                required />
                        </label>
                        <span className='profile__error'>{errors.name || ''}</span>
                        
                        <label className='profile__container'>
                            <p className='profile__email'>E-mail</p>
                            <input className='profile__input'
                                type='email'
                                name='email'
                                id='edit-email'
                                value={values.email || ''}
                                pattern="^\S+@\S+\.\S+$"
                                placeholder='E-mail'
                                onChange={handleChangeEmail}
                                required />
                        </label>
                        <span className='profile__error'>{errors.email || ''}</span>
                        <span className="profile__error-text">{profileMessageText}</span>
                    </fieldset>

                    <div className='profile__edit'>
                    <button
                            type="submit"
                            className="profile__link">Редактировать</button>
                        <Link className='profile__exit' to='/signin' onClick={onSignOut}>Выйти из аккаунта</Link>
                    </div>
                </form>
                </section>
            </main>
        </>
    )
}

export default Profile;