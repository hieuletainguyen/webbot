import {useState} from "react";


function ForgotPassword (props) {
    const allowedToReset = props.allowedToReset;
    const [email, setEmail] = useState('');

    const validate = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email})
        })

        const data = await response.json();
        

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
        <div>
            <h1>Forgot Password</h1>
            <p>Enter your email address below and we will send you a link to reset your password</p>
            <input type="text" onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleEnterPress}/> 
        </div>
    )
}

export default ForgotPassword;