
import "./NavBar.css";
import {
  Container,
  Navbar,
  NavList,
  NavItem,
  StyledNavLink
} from './NavElement';
import { useNavigate } from "react-router-dom";


export default function NavBar(props) {

  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("user");
      props.setIsLoggedIn({
          ...props.isLoggedIn, 
          status: false, 
          username: "" 
      })
      navigate('/');

  }

  return (
    <Container>
      <Navbar>
        <NavList>

          <NavItem >
            <StyledNavLink to="/" activeClassName="active">
              HOME
            </StyledNavLink>
          </NavItem>

          <NavItem >
            <StyledNavLink to="/control" activeClassName="active">
              CONTROL
            </StyledNavLink>
          </NavItem>

          {/* <NavItem>
            <StyledNavLink to="/code-space" activeClassName="active">
              CODE SPACE
            </StyledNavLink>
          </NavItem> */}

          {/* {isLoggedIn.status ? (
            <NavItem>
              <StyledNavLink to="/profile" activeClassName="active">
                PROFILE
              </StyledNavLink>
            </NavItem>
          ) : (
            <NavItem >
              <StyledNavLink to="/sign-in" activeClassName="active">
                SIGN IN
              </StyledNavLink>
            </NavItem>
          )} */}

          {!isLoggedIn.status && (
            <NavItem >
              <StyledNavLink to="/sign-in" activeClassName="active">
                SIGN IN
              </StyledNavLink>
            </NavItem>
          )}


          {!isLoggedIn.status ? 
            <NavItem>
              <StyledNavLink to="/sign-up" activeClassName="active">
                SIGN UP
              </StyledNavLink>
            </NavItem>
            :
            <NavItem>
              <button className="element" onClick={handleLogout}>
                LOGOUT
              </button>
            </NavItem>
          }
        </NavList>
      </Navbar>
    </Container>
  )

}