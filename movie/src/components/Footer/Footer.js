import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__body">
                <p className="footer__copyright">© 2022</p>
                <div className="footer__inner">
                    <p className="footer__company">Яндекс.Практикум</p>
                    <p className="footer__github">Github</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;