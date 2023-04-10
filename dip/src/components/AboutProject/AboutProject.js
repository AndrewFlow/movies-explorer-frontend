import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about" id="about">
            <h2 className="about__title">О проекте</h2>
            <div className="about__items">
                <div className="about__item">
                    <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about__info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__item">
                    <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__timeline">
                <div className="about__weeks">
                    <p className="about__week1">1 неделя</p>
                    <p className="about__week2">4 недели</p>
                </div>
                <div className="about__spec">
                    <p className="about__back">Back-end</p>
                    <p className="about__front">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;