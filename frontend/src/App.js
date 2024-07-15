
import {useRef, useEffect, useState} from "react";
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
    "base": 49,
    "arm1": 49,
    "arm2": 49,
    "clawx": 49,
    "clawy": 49,
    "claw": 49
  })
  const [isLoggedIn, setIsLoggedIn] = useState({
    status: true,
    username: null
  })

  const [imgSrc, setImgSrc] = useState(null);
  const [videoURL, setVideoURL] = useState(null);



  return (
    <div className="container">
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/control" element={<Controller isLoggedIn={isLoggedIn} armData={armData} setArmData={setArmData} imgSrc={imgSrc} setImgSrc={setImgSrc}
                                                      videoURL={videoURL} setVideoURL={setVideoURL}/>} />

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
