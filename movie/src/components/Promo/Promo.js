import React from "react";
import "./Promo.css";
import { Link } from 'react-router-dom';


function Promo() {
    return (
        <div className="promo">
            <h1 className="promo__title title">Учебный проект студента факультета Веб-разработки.</h1>
            <nav className="promo__nav">
                <ul className="promo__list">
                    <li className="promo__item">
                        <a className="promo__link" href="#about">О проекте</a>
                    </li>
                    <li className="promo__item">
                        <a  className="promo__link" href="#techs">Технологии</a>
                    </li>
                    <li className="promo__item">
                        <a className="promo__link" href="#aboutme">Студент</a>
                    </li>
                </ul>
                
            </nav>
        </div>
    )
}

export default Promo;