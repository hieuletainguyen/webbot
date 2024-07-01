import React, {useState, useEffect, useRef} from "react";
import "./NavBar.css";
import {
  Container,
  Navbar,
  NavList,
  ActiveItem,
  NavItem,
  StyledNavLink
} from './NavElement';

export default function NavBar(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLoggedIn = props.isLoggedIn;
  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Container>
      <Navbar>
        <NavList>

          <NavItem onClick={() => handleClick(0)}>
            <StyledNavLink to="/" activeClassName="active">
              HOME
            </StyledNavLink>
          </NavItem>

          <NavItem onClick={() => handleClick(1)}>
            <StyledNavLink to="/control" activeClassName="active">
              CONTROL
            </StyledNavLink>
          </NavItem>

          <NavItem onClick={() => handleClick(2)}>
            <StyledNavLink to="/code-space" activeClassName="active">
              CODE SPACE
            </StyledNavLink>
          </NavItem>

          {!isLoggedIn.status && (
            <NavItem onClick={() => handleClick(3)}>
              <StyledNavLink to="/sign-up" activeClassName="active">
                SIGN UP
              </StyledNavLink>
            </NavItem>
          )}

          {isLoggedIn.status ? (
            <NavItem onClick={() => handleClick(4)}>
              <StyledNavLink to="/profile" activeClassName="active">
                PROFILE
              </StyledNavLink>
            </NavItem>
          ) : (
            <NavItem onClick={() => handleClick(5)}>
              <StyledNavLink to="/sign-in" activeClassName="active">
                SIGN IN
              </StyledNavLink>
            </NavItem>
          )}
        </NavList>
      </Navbar>
    </Container>
  )

}