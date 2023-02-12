import React from 'react';
import styled from 'styled-components';
import Burger from '../Burger/Burger';

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  
`

const Navbar = () => {
  return (
    <Nav>
      <Burger />
    </Nav>
  )
}

export default Navbar