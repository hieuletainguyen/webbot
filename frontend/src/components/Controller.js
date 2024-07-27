import Camera from "./Camera";
import { useRef} from "react";
import "./Controll.css"
export default function Controller (props) {
    const webcamRef = useRef(null);

    return (
        <>
            {props.isLoggedIn.status ?
                <Camera armData={props.armData} setArmData={props.setArmData} webcamRef={webcamRef} 
                            imgSrc={props.imgSrc} setImgSrc={props.setImgSrc} 
                            videoURL={props.videoURL} setVideoURL={props.setVideoURL}
                            videoBlob={props.videoBlob} setVideoBlob={props.setVideoBlob}/>
                :
                <div className="notsignin"> 
                    You need to log in to control the robot
                </div>
            }
                
        </>
    )
}