import {useEffect, useState} from "react";
import "./Signup-in.css";
import {useSearchParams , useNavigate} from "react-router-dom";
function ResetPassword (props) {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const navigate = useNavigate();

    useEffect(() => {
        console.log("searchParams: ", searchParams);
        console.log('Token:', token);
        console.log('Email:', email);
      }, [token, email]);


    const validate = async () => {
        if (password !== password2) {
            alert('Passwords do not match');
        } else {
            console.log(token);
            console.log(email);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email, 
                    password, 
                    token
                })
            })

            const data = await response.json();
            console.log(data)
            if (data.message === "Update password completed") {
                alert('Password updated successfully');
                navigate("/sign-in");
            }
        }
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }



    const onButtonClick = async() => {
        if ("" === password2){
            window.alert("You need to retype your new password");
            return;
        }

        if ("" === password) {
            window.alert("You need to set a new password");
            return ;
        }


        validate();
    }

    return (
        <div className="signup-subcontainer">
                    <h2>Reset Password</h2>
                    <table className="table-container">
                        <tbody>
                            <tr>
                                <td className="title-styled">New Password</td>
                                <td>
                                    <input type="text" className="input-style" 
                                            placeholder="Enter your new password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            /> 
                                </td>
                            </tr>

                            <tr>
                                <td className="title-styled">Retype Password</td>
                                <td>
                                    <input type="text" className="input-style" 
                                            placeholder="Retype your password"
                                            onChange={(e) => setPassword2(e.target.value)}
                                            onKeyPress={handleEnterPress}/> 
                                </td>
                            </tr>
                        </tbody>

                    </table>

                    <div>
                        <input type="button" value={"Submit"} onClick={onButtonClick}/>
                    </div>
                </div>
    )

}

export default ResetPassword;