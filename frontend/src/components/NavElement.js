import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  min-height: 15vh;
  position: relative;
  overflow-y: hidden;
  z-index: 10000000;
`;

export const Navbar = styled.div`
  height: 10%;
  min-width: 700px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

export const NavList = styled.ul`
  display: flex;
  position: relative;
  list-style: none;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);

`;

export const ActiveItem = styled.li`
  position: absolute;
  width: 120px;
  height: 40px;
  background: #00bfb2;
  border-radius: 50px;
  transition: left 300ms cubic-bezier(1, -0.5, 0, 1.5);
  border-top: 5px solid #000;
  border-bottom: 5px solid #000;
  border-left: 5px solid #fa742b;
  border-right: 5px solid #fa742b;
`;

export const NavItem = styled.li`
  height: 100%;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledNavLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  font-size: 17px;
  letter-spacing: 1.5px;
  z-index: 10;
  color: black;
  font-weight: bold;

  &.active {
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    vertical-align: middle;
    color: #000;
    font-size: 17px;  
  }
`;
