import React, {useState, useEffect, useRef} from "react";
import "./NavBar.css";
import {Link} from "react-router-dom";

export default function NavBar(props) {
  const [activeLeft, setActiveLeft] = useState(0);
  const activeRef = useRef(null);
  const homeRef = useRef(null);
  const controlRef = useRef(null);
  const codeSpaceRef = useRef(null);
  const signinRef = useRef(null);
  const signupRef = useRef(null);
  const profileRef = useRef(null);

  const isLoggedIn = props.isLoggedIn;


  const handleClick = (ref) => {
    setActiveLeft(ref.current.offsetLeft);
  }

  return (
    <div className="container">
      <div className="navbar">
        <ul className="nav--list">
          <li className="active" ref={activeRef} style={{ left: `${activeLeft}px`}}></li>

          <li key='HOME' className="item" onClick={() => handleClick(homeRef)} ref={homeRef}>
            <a href="/">HOME</a>
          </li>

          <li key='CONTROL' className="item " onClick={() => handleClick(controlRef)} ref={controlRef}>
            <a href="/control">CONTROL</a>
          </li>

          <li key='CODE SPACE' className="item" onClick={() => handleClick(codeSpaceRef)} ref={codeSpaceRef}>
            <a href="/code-space">CODE SPACE</a>
          </li>

          <li key='SIGN UP' className="item" onClick={() => handleClick(signupRef)} ref={signinRef}>
            <a href="/sign-up">SIGN UP </a>
          </li>

          {isLoggedIn.status ? 

          <li key='PROFILE' className="item" onClick={() => handleClick(profileRef)} ref={profileRef}>
            <a href="/profile">PROFILE</a>
          </li>
          : 
          <li key='SIGN IN' className="item" onClick={() => handleClick(signinRef)} ref={signinRef}>
            <a href="/sign-in">SIGN IN</a>
          </li>

          }

        </ul>
      </div>
    </div>
  )

}