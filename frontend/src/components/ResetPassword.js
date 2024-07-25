import {useState} from "react";

function ResetPassword () {
    const [email, setEmail] = useState('');



    return (
        <div className="container">
            <h1>New Password</h1>
            <input type="text" />
        </div>
    )

}

export default ResetPassword;