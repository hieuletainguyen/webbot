import {useState} from "react";
import "./Signup-in.css";
import {useNavigate} from "react-router-dom";

function ForgotPassword (props) {
    const allowedToReset = props.allowedToReset;
    const [email, setEmail] = useState('');

    const validate = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            })
        })

        const data = await response.json();
        if (data.message === "send recover email successfully") {
            props.setAllowedToReset(data.allowedToReset)
            setTimeout(() => {
                props.setAllowedToReset(false)
            }, 1000*60*60);
        } else {
            console.log(data)
        }

    }

    const onButtonClick = () => {
        if ("" === email){
            window.alert("You need to enter an email");
            return;
        }
        validate();
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            onButtonClick();
        }
    }

    return (
        <>
            {
                props.allowedToReset ?
                
                <div className="sent-recovery-email">
                    The Recovery Email Has Been Sent. Check your email
                </div>
                
                :

                <div className="signup-subcontainer">
                    <h2>Forgot Password</h2>
                    <table className="table-container">
                        <tbody>
                            <tr>
                                <td>Enter your email address below and we will send you a link to reset your password</td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" className="input-style" 
                                            placeholder="Enter your email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyPress={handleEnterPress}/> 
                                </td>
                            </tr>
                        </tbody>

                    </table>

                    <div>
                        <input type="button" value={"Submit"} onClick={onButtonClick}/>
                    </div>
                </div>
            }
        </>
    )
}

export default ForgotPassword;