import Camera from "./Camera";
import {useState, useRef} from "react";

export default function Controller (props) {
    const webcamRef = useRef(null);

    return (
        <div>
            <Camera armData={props.armData} setArmData={props.setArmData} webcamRef={webcamRef} height={700} width={700}/>
        </div>
    )
}