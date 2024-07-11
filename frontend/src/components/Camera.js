import Webcam from "react-webcam";
import {useRef, useState} from "react";
import "./Camera.css"

export default function Camera(props) {
    const webcamRef = useRef(null);
    const [isShow, setIsShow] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const armData = props.armData;
    

    const handleOnChange = () => {

    }

    const handleStart = () => {
        setIsShow(true);
    }

    const handleStop = () => {
        setIsShow(false);
    }

    const handleSnapshot = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }

    const handleRecord = () => {

    }

    const updateValue = async (event, name) => {
        const newArmData = {
            ...armData,
            [name]: event.target.value
        }
        props.setArmData(newArmData);
        const response = await fetch( `${process.env.BACKEND_SERVER_URL}/arm-data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newArmData)
          });
    
          if (response.status === 200){
            console.log("Arm data sent successfully");
          } else {
            console.log(response);
          }
    };

    return (
        <>
            <div className="camera-container">
                <div className="camera-frame">
                    
                    {isShow ? <Webcam 
                        
                        mirrored={true}
                        audio={false}
                        height="100%"
                        width="100%" 
                        imageSmoothing={true}
                        ref={webcamRef} 
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            facingMode: 'user',
                        }}
                    /> : 
                    <img src="../pictures/stop_image.jpg" width="100%" />
                    }

                </div>

                <div className="right-frame">
                
                    <h2>Control Robot Arm</h2>
                    <br />
                    <div className="table-container">
                        <table>
                            <tbody>
                                <tr className="control-row">
                                    
                                    <td>Base</td>
                                    <td>
                                        <input type="range" min="0" max="180"  class="slider" 
                                                id="baseSlider" onChange={(e) => updateValue(e, "base")}/>
                                    </td>
                                    <td>{armData.base}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Arm 1</td>
                                    <td>
                                        <input type="range" min="0" max="180"  class="slider" 
                                                id="arm1Slider" onChange={(e) => updateValue(e, "arm1")}/>
                                    </td>
                                    <td>{armData.arm1}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Arm 2</td>
                                    <td>
                                        <input type="range" min="0" max="180"  class="slider" 
                                                id="baseSlider" onChange={(e) => updateValue(e, "arm2")}/>
                                    </td>
                                    <td>{armData.arm2}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Claw X</td>
                                    <td>
                                        <input type="range" min="0" max="180" class="slider" 
                                                id="baseSlider" onChange={(e) => updateValue(e, "clawx")}/>
                                    </td>
                                    <td>{armData.clawx}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Claw Y</td>
                                    <td>
                                        <input type="range" min="0" max="180" class="slider" 
                                                id="baseSlider" onChange={(e) => updateValue(e, "clawy")}/>
                                    </td>
                                    <td>{armData.clawy}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Claw</td>
                                    <td>
                                        <input type="range" min="0" max="180" class="slider" 
                                                id="baseSlider" onChange={(e) => updateValue(e, "claw")}/>
                                    </td>
                                    <td>{armData.claw}</td>


                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div> 

            </div>
            
            <div className="buttonContainer">
                <button className="buttonCss" onClick={handleStart} disabled={isShow}>START</button>
                <button className="buttonCss" onClick={handleStop} disabled={!isShow}>STOP</button>
                <button className="buttonCss" disabled={!isShow}>RECORD</button>
                <button className="buttonCss" onClick={handleSnapshot} disabled={!isShow}>SNAPSHOT</button>
            </div>
        </>
    )
};