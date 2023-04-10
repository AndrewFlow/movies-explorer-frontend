import React from "react";
import "./Techs.css";

function Techs() {
    return (
        <div className="techs" id="techs">
            <h2 className="techs__subtitle subtitle">Технологии</h2>
            <h4 className="techs__title">7 технологий</h4>
            <p className="techs__info">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__list">
                <li className="techs__item">HTML</li>
                <li className="techs__item">CSS</li>
                <li className="techs__item">JS</li>
                <li className="techs__item">React</li>
                <li className="techs__item">Git</li>
                <li className="techs__item">Express.js</li>
                <li className="techs__item">mongoDB</li>
            </ul>
        </div>
    )
}

export default Techs;