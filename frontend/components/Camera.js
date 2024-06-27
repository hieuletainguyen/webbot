import Webcam from "react-webcam";
import {useRef} from "react"

export default function Camera(props) {
    const webcamRef = useRef(null);

    return (
        <div className="camera-container">
            <Webcam height={600} width={600} ref={webcamRef} />
        </div>
    )
};

