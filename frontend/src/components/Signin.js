import {useState} from "react";
import "./Signup-in.css";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export default function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    

    const validate = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        const data = await response.json();
        if (data.message === 'success') {
            localStorage.setItem("user", JSON.stringify({email, token: data.token}))
            props.setIsLoggedIn({
                ...props.isLoggedIn, 
                status: true, 
                email: email
            });
            
            Cookies.set("ROBOT_TOKENS", data.token, {expires: 1});
            navigate('/');
        }  else if(data.message === "Invalid email or password") {
            window.alert("Incorrect password or email");

        } else {
            console.log(data);
        }
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }



    const onButtonClick = async() => {
        if ("" === email){
            window.alert("You need to enter an email");
            return;
        }

        if ("" === password) {
            window.alert("You need to set password");
            return ;
        }


        validate();
    }

    const showPasswordOnClick = () => {
        setShowPassword(!showPassword);
        console.log(showPassword)
    }
   

    return (
        
            
            <div className="signup-subcontainer">
                <h2>Sign In</h2>
                <table className="table-container">
                    <tbody>
                        <tr>
                            <td className="title-styled">Email</td>
                            <td>
                                <input type="text" className="input-style" 
                                        placeholder="Enter your email"
                                        onChange={(e) => setEmail(e.target.value)}/> 
                            </td>
                        </tr>

                        
                        <tr>
                            <td className="title-styled">Password</td>
                            <td>
                                <input type={showPassword ? "text": "password"} className="input-style"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={handleEnterPress}/> 
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                            <input type='checkbox' value={showPassword} onClick={showPasswordOnClick}/>
                            <label>Show Password</label>
                            </td>
                        </tr>

                        

                    </tbody>

                </table>

                <div>
                    <input type="button" value={"Sign in"} onClick={onButtonClick}/>
                    <input type="button" value={"Forget Password"} onClick={() => navigate('/forgot-password')}/>
                </div>
            </div>

            
    )
}