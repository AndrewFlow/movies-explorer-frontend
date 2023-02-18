import React from "react";
import "./Header.css"
import { NavLink } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import user from "../../images/profile.svg"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Navbar from "../Navbar/Navbar";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`

const Header = ({ loggedIn }) => {

    return (
        <header className="header">
            {(!loggedIn)
                ? (
                    <>
                        <Link className="header__link" to="/">
                            <img className="header__logo" src={headerLogo} alt="лого" />
                        </Link>
                        <nav className="header__menu">
                            <Link className="header__link" to="/signup">Регистрация</Link>
                            <Link className="header__link header__link_type_blue blue" to="/signin">Войти</Link>
                        </nav>
                    </>
                )
                : (
                    <>
                        <Link className="header__link" to="/">
                            <img className="header__logo" src={headerLogo} alt="лого" />
                        </Link>
                        <nav className="header__body">
                            <Navbar></Navbar>
                        </nav>

                    </>
                )
            }

        </header>
    );
}

export default Header;

