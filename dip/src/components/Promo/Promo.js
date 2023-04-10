import React from "react";
import "./Promo.css";
import { Link } from 'react-router-dom';
import promo from '../../images/promo.svg';


function Promo() {
    return (
        <div className="promo">
            <div className="promo__body">
                <h1 className="promo__title title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__info">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a href="#about" className="promo__more">Узнать больше</a>
            </div>
            <img className="promo__image" src={promo}></img>
        </div>
    )
}

export default Promo;