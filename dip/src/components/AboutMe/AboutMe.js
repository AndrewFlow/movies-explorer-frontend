import React from "react";
import "./AboutMe.css";
import myimage from '../../images/test.png';

function AboutMe() {
    return (
        <section className="aboutme" id="aboutme">
            <h2 className="aboutme__subtitle">Студент</h2>
            <div className="aboutme__content">
                <div className="aboutme__body">
                    <h4 className="aboutme__name">Андрей</h4>
                    <p className="aboutme__spec">Фронтенд-разработчик, 29 лет</p>
                    <p className="aboutme__info">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                        После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
                        и ушёл с постоянной работы.</p>
                    <a href="https://github.com/AndrewFlow" target="_blank"  className="aboutme__link">Github</a>
                </div>
                <img className="aboutme__image" src={myimage} alt="фото"></img>
            </div>
        </section>
    )
}

export default AboutMe;