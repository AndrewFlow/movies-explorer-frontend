import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./NotFound.css"

function NotFound() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }
    return (
        <main>
            <section className="notfound">
                <div className="notfound__container">
                    <h1 className="notfound__title">
                        404
                    </h1>
                    <p className="notfound__subtitle">Страница не найдена</p>
                </div>

            </section>
            <Link className="notfound__link" onClick={goBack}>Назад</Link>
        </main>
    )
}

export default NotFound;