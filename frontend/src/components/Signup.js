import {useState} from "react";
import "./Signup-in.css";
import {useNavigate} from "react-router-dom";

export default function Signup (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [correct, setCorrect] = useState(false);
    const navigate = useNavigate();

    const addAccount = async() => {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-account`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        })    
        const data = await result.json();
        console.log(data);
        
        if (data.message === "success"){
            console.log("register account sucessfully")
            setEmail("");
            setPassword("");
            navigate("/");
        } else if (data.message === "email already exists") {
            window.alert("Account already exists");
            setEmail("");
            setPassword("");
        }
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }



    const onButtonClick = async() => {
        if ("" === email){
            window.alert("You need to have a email");
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
                                <input type="password" className="input-style"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)} 
                                        onKeyPress={handleEnterPress}/> 
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