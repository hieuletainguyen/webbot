
import {useRef, useState} from "react";
import {
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavigatorBar";
import Controller from "./components/Controller";
import CodingSpace from "./components/CodingSpace";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";


function App() {
  const [armData, setArmData] = useState({
    base: 0,
    arm1: 0,
    arm2: 0,
    clawx: 0,
    clawy: 0,
    claw: 0
  })
  const [isLoggedIn, setIsLoggedIn] = useState({
    status: true,
    username: null
  })

  return (
    <div className="container">
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/control" element={<Controller armData={armData} setArmData={setArmData}/>} />

          <Route path="/sign-in" element={<Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />

          <Route path="/sign-up" element={<Signup />} />

          <Route path="/profile" element={<UserProfile />} />

          <Route path="/code-space" element={<CodingSpace /> } />
        </Routes>
      </Router>

    </div>


    

  );
}

export default App;
