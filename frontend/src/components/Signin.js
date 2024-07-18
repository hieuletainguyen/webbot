import {useState} from "react";
import "./Signup-in.css";
import {useNavigate} from "react-router-dom";


export default function Signin(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validate = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })

        const data = await response.json();
        if (data.message === 'success') {
            localStorage.setItem("user", JSON.stringify({username, token: data.token}))
            props.setIsLoggedIn({
                ...props.isLoggedIn, 
                status: true, 
                username: username
            });
            
            navigate('/');
        }  else if(data.message === "fail") {
            window.alert("Incorrect password or username");

        }
    }



    const onButtonClick = async() => {
        if ("" === username){
            window.alert("You need to have a username");
            return;
        }

        if ("" === password) {
            window.alert("You need to set password");
            return ;
        }


        validate();
    }

    return (
        
            
            <div className="signup-subcontainer">
                <h2>Sign In</h2>
                <table className="table-container">
                    <tbody>
                        <tr>
                            <td className="title-styled">Username</td>
                            <td>
                                <input type="text" className="input-style" 
                                        placeholder="Enter your username"
                                        onChange={(e) => setUsername(e.target.value)}/> 
                            </td>
                        </tr>

                        <br/>
                        
                        <tr>
                            <td className="title-styled">Password</td>
                            <td>
                                <input type="password" className="input-style"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}/> 
                            </td>
                        </tr>

                        <br/>
                    </tbody>

                </table>

                <div>
                    <input type="button" value={"Sign in"} onClick={onButtonClick}/>
                </div>
            </div>

            
    )
}