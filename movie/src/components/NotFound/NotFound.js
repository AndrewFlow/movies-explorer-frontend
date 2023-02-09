import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"

function NotFound() {
    return (
        <>
            <section className="notfound">
                <div className="notfound__container">
                    <h1 className="notfound__title">
                        404
                    </h1>
                    <p className="notfound__subtitle">Страница не найдена</p>
                </div>
                <Link className="notfound__link" to="/">Назад</Link>
            </section>
        </>
    )
}

export default NotFound;