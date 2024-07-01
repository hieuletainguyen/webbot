import Camera from "./components/Camera";
import {useRef, useState} from "react";
import {
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Controller from "./components/Controller";
import CodingSpace from "./components/CodingSpace";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";


function App() {
  const webcamRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState({
    status: false,
    username: null
  })

  return (
    <div className="container">
      <NavBar isLoggedIn={isLoggedIn}/>

      <Camera webcamRef={webcamRef} height={500} width={500}/>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

    </div>


    

  );
}

export default App;
