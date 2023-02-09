import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from '../Nav/Nav';

const StyledBurger = styled.div`
  width: 22px;
  height: 2rem;
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 22px;
    height: 2.5px;
    background-color: #000000;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg) translateX(4.5px)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg) translateX(4.5px)' : 'rotate(0)'};
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
      </StyledBurger>
      <Nav open={open} />
    </>
  )
}

export default Burger