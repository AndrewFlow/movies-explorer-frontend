import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg"


function Portfolio() {
    return (
        <section className="portfolio" id="portfolio">
            <h5 className="portflolio__title">Портфолио</h5>
            <div className="portfolio__body">
                <div className="portfolio__item">
                    <p className="portfolio__name">Статичный сайт</p>
                    <a  href="#" className="portfolio__link">
                        <img className="portfolio__image" src={arrow} alt="стрелка"></img>
                    </a>
                </div>
                <div className="portfolio__item">
                    <p className="portfolio__name">Адаптивный</p>
                    <a href="#" className="portfolio__link">
                        <img className="portfolio__image" src={arrow} alt="стрелка"></img>
                    </a>
                </div>
                <div className="portfolio__item">
                    <p className="portfolio__name">Одностраничное приложение</p>
                    <a href="#" className="portfolio__link">
                        <img className="portfolio__image" src={arrow} alt="стрелка"></img>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Portfolio;