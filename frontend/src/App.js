
import {useState, useEffect} from "react";
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
import BookingCalendar from "./components/BookingCalendar";
import MySchedule from "./components/MySchedule";
import Gallery from "./components/Gallery";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Cookies from "js-cookie";


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
    status: false,
    username: null
  })

  const [imgSrc, setImgSrc] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);

  const [allowedToReset, setAllowedToReset] = useState(false);

  useEffect(() => {
    const auth = async () => {
      const token = Cookies.get("ROBOT_TOKENS");
      if (token) {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth_token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token})
        });
        const data = await response.json();
        setIsLoggedIn({
          status: true,
          username: data.username
        });
        console.log(isLoggedIn)
        console.log(data)
      }
    }

    auth();
  }, [])



  return (
    <div className="container">
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/control" element={<Controller isLoggedIn={isLoggedIn} armData={armData} setArmData={setArmData} imgSrc={imgSrc} setImgSrc={setImgSrc}
                                                      videoURL={videoURL} setVideoURL={setVideoURL} videoBlob={videoBlob} setVideoBlob={setVideoBlob}/>} />
          

          {!isLoggedIn.status && <Route path="/sign-in" element={<Signin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />}

          {!isLoggedIn.status && <Route path="/sign-up" element={<Signup />} />}

          <Route path="/profile" element={<UserProfile />} />

          <Route path="/code-space" element={<CodingSpace /> } />

          {isLoggedIn.status && <Route path="/gallery" element={<Gallery />} />}

          {isLoggedIn.status && <Route path="/booking-calendar" element={<BookingCalendar />} />}
        
          {isLoggedIn.status && <Route path="/my-booking-schedule" element={<MySchedule />} />}
        
          {
            !isLoggedIn.status && <Route path="/forgot-password" element={<ForgotPassword allowedToReset={allowedToReset} setAllowedToReset={setAllowedToReset}/>} />
          }

          {
            !isLoggedIn.status && <Route path="/reset-password" element={<ResetPassword />} />
          }
        </Routes>
      </Router>

    </div>


    

  );
}

export default App;
