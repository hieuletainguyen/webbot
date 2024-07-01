import Webcam from "react-webcam";
import {useRef} from "react"

export default function Camera(props) {
    const webcamRef = useRef(null);

    return (
        <div >
            <Webcam height={props.height} width={props.width} ref={webcamRef} />
        </div>
    )
};