import {useState} from "react";
import "./Signup-in.css";
import {useNavigate} from "react-router-dom";

export default function Signup (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [correct, setCorrect] = useState(false);
    const navigate = useNavigate();

    const addAccount = async() => {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-account`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })    
        const data = await result.json();
        console.log(data);
        
        if (data.message === "success"){
            console.log("register account sucessfully")
            setUsername("");
            setPassword("");
            navigate("/");
        } else if (data.message === "username already exists") {
            window.alert("Account already exists");
            setUsername("");
            setPassword("");
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

        addAccount();
    }

    return (
        
            
            <div className="signup-subcontainer">
                <h2>Sign Up</h2>
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

                    </tbody>

                </table>

                <div>
                    <input type="button" value={"Sign up"} onClick={onButtonClick}/>
                </div>
            </div>

            
    )
}