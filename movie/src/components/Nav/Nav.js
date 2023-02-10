
import React from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import user from "../../images/profile.svg"
import headerLogo from "../../images/logo.svg"
import "./Nav.css";

const Ul = styled.ul`
  @media (max-width: 768px) {
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  }
`;

const Nav = ({ open }) => {
  return (
  <>
    <Ul className='rightnav' open={open}>
      <li className='rightnav__gap'></li>
      <li className='rightnav__item'>
        <NavLink to="/" className={({ isActive }) =>
                isActive
                  ? "rightnav__authlink rightnav__authlink_type_main rightnav__authlink_type_active"
                  : "rightnav__authlink rightnav__authlink_type_main"
              }>Главная</NavLink>
        <NavLink to="/movies" className={({ isActive }) =>
                isActive
                  ? "rightnav__authlink rightnav__authlink_type_active"
                  : "rightnav__authlink"
              }>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={({ isActive }) =>
                isActive
                  ? "rightnav__authlink rightnav__authlink_type_active"
                  : "rightnav__authlink"
              }>Сохранённые фильмы</NavLink>
      </li>
      <li className='rightnav__item'>
        <NavLink to="/profile" className="rightnav__profile">
          <span className="rightnav__profile-name">Аккаунт</span>
          <img src={user} alt="Аккаунт" className="rightnav__profile-image" />
        </NavLink>
      </li>
    </Ul>
  </>
  )
}

export default Nav;