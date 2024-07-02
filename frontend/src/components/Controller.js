import Camera from "./Camera";
import {useState, useRef} from "react";
import "./Controll.css"
export default function Controller (props) {
    const webcamRef = useRef(null);

    return (
        <>
            {props.isLoggedIn.status ?
                <Camera armData={props.armData} setArmData={props.setArmData} webcamRef={webcamRef} height={700} width={700}/>
                :
                <div className="notsignin"> 
                    You need to log in to control the robot
                </div>
            }
                
        </>
    )
}