import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg"


function Portfolio() {
    return (
        <section className="portfolio" id="portfolio">
            <h5 className="portflolio__title">Портфолио</h5>
            <ul className="portfolio__body">
                <li className="portfolio__item">
                    <a href="https://github.com/AndrewFlow/how-to-learn"   target="_blank" rel="noreferrer noopener"  className="portfolio__link">
                        <p className="portfolio__name">Статичный сайт</p>
                        <img className="portfolio__image" src={arrow} alt="стрелка"></img>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://andrewflow.github.io/russian-travel/"  target="_blank" rel="noreferrer noopener" className="portfolio__link">
                        <p className="portfolio__name">Адаптивный сайт</p>
                        <img className="portfolio__image" src={arrow} alt="стрелка"></img>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://andrewflow.github.io/mesto/"  target="_blank" rel="noreferrer noopener" className="portfolio__link">
                        <p className="portfolio__name">Одностраничное приложение</p>
                        <img className="portfolio__image" src={arrow} alt="стрелка"></img>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;