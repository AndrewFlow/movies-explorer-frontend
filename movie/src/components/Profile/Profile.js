import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css"

function Profile () {
    return (
        <>
            <Header isLoggedIn={true}></Header>
            <section className="profile">
                <h2 className="profile__title">Привет, Виталий!</h2>
                <div className="profile__body">
                    <div className="profile__namecontainer">
                        <span className="profile__name">Имя</span>
                        <span className="profile__nameinner">Виталий</span>
                    </div>
                    <div className="profile__emailcontainer">
                        <span className="profile__email">E-mail</span>
                        <span className="profile__emailinner">pochta@yandex.ru</span>
                    </div>
                </div>
                <div className="profile__edit">
                <Link className="profile__link" to="/">Редактировать</Link>
                <Link className="profile__exit" to="/">Выйти из аккаунта</Link>
                </div>
            </section>
        </>
    )
}

export default Profile;