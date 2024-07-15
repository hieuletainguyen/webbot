import Camera from "./Camera";
import {useState, useRef} from "react";
import "./Controll.css"
export default function Controller (props) {
    const webcamRef = useRef(null);

    return (
        <>
            {props.isLoggedIn.status ?
                <Camera armData={props.armData} setArmData={props.setArmData} webcamRef={webcamRef} 
                            imgSrc={props.imgSrc} setImgSrc={props.setImgSrc} 
                            videoURL={props.videoURL} setVideoURL={props.setVideoURL}/>
                :
                <div className="notsignin"> 
                    You need to log in to control the robot
                </div>
            }
                
        </>
    )
}