
import "./NavBar.css";
import {
  Container,
  Navbar,
  NavList,
  NavItem,
  StyledNavLink
} from './NavElement';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export default function NavBar(props) {
  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();

  const handleLogout = async () => {
      // const response = await fetch(`${process.env.BACKEND_SERVER_URL}/logout`, {
      //   method: "POST",
      //   credentials: "include", 
      //   headers: {"Content-Type" : "application/json"}, 
      //   body: JSON.stringify({
      //     token: Cookies.get("ROBOT_TOKENS")
      //   })
      // })

      // Cookies.remove("ROBOT_TOKENS");

      // if (response.ok){
        props.setIsLoggedIn({
            ...props.isLoggedIn, 
            status: false, 
            username: "" 
        })
        navigate('/');
      // } else {
      //   console.log(response);
      // }

  }

  return (
    <Container>
      <Navbar>
        <NavList>

          <NavItem >
            <StyledNavLink to="/" activeclassname="active">
              HOME
            </StyledNavLink>
          </NavItem>

          <NavItem >
            <StyledNavLink to="/control" activeclassname="active">
              CONTROL
            </StyledNavLink>
          </NavItem>
          {isLoggedIn.status && 
            <NavItem>
              <StyledNavLink to="/booking-calendar" activeclassname="active">
                BOOKING
              </StyledNavLink>
            </NavItem>
          }

          {/* <NavItem>
            <StyledNavLink to="/code-space" activeclassname="active">
              CODE SPACE
            </StyledNavLink>
          </NavItem> */}

          {/* {isLoggedIn.status ? (
            <NavItem>
              <StyledNavLink to="/profile" activeclassname="active">
                PROFILE
              </StyledNavLink>
            </NavItem>
          ) : (
            <NavItem >
              <StyledNavLink to="/sign-in" activeclassname="active">
                SIGN IN
              </StyledNavLink>
            </NavItem>
          )} */}

          {!isLoggedIn.status && (
            <NavItem >
              <StyledNavLink to="/sign-in" activeclassname="active">
                SIGN IN
              </StyledNavLink>
            </NavItem>
          )}


          {!isLoggedIn.status ? 
            <NavItem>
              <StyledNavLink to="/sign-up" activeclassname="active">
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