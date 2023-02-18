import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";

import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";



function Main() {
    return (
        <>
            <main>
                <Promo></Promo>
                <AboutProject></AboutProject>
                <Techs></Techs>
                <AboutMe></AboutMe>
                <Portfolio></Portfolio>
            </main>
            <Footer></Footer>
        </>
    )
}

export default Main;