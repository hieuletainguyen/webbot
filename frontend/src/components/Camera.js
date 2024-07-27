import Webcam from "react-webcam";
import {useRef, useState, useEffect} from "react";
import "./Camera.css"
import Cookies from "js-cookie"

export default function Camera(props) {
    const imgSrc = props.imgSrc;
    const videoURL = props.videoURL;
    const videoBlob = props.videoBlob;
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isShow, setIsShow] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const armData = props.armData;
    

    const handleStart = () => {
        setIsShow(true);
    }

    const handleStop = () => {
        setIsShow(false);
    }

    const handleSnapshot = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        props.setImgSrc(imageSrc);

    }

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const saveImage = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/save-image`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                token: Cookies.get("ROBOT_TOKENS"),
                base64_image: imgSrc
            })
        });

        const data = await response.json();

        if (response.ok && data.message === "Add image successfully") {
            props.setImgSrc(null);
            window.alert("Image Save Successfully");
        }

    }
    //==================== VIDEO RECORD ==================================================

    const handleRecord = () => {
    
        setRecordedChunks([]);
        const stream = webcamRef.current.stream;

        mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "video/webm"
        });

        mediaRecorderRef.current.addEventListener(
            "dataavailable", 
            handleDataAvailable
        );
        mediaRecorderRef.current.start();

        setRecording(true);
    }

    const handleDataAvailable = (e) => {
        if (e.data.size > 0) {
            setRecordedChunks((prev) => prev.concat(e.data));
            console.log('im here');
            console.log(recordedChunks);
        }
        console.log(e.data);
    }

    const handleStopRecord = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);

        mediaRecorderRef.current.addEventListener("stop", () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            props.setVideoBlob(blob);
            const url = URL.createObjectURL(blob);
            props.setVideoURL(url);
        });
        
    }



    const downloadVideo = () => {
        if (recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'recorded-video.webm';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const saveVideo = async () => {
        const blob = new Blob(recordedChunks, {
            type: "video/webm"
        });
        
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onloadend = async () => {
            console.log(reader.result)
            const base64data = reader.result.split(',')[1];

            console.log(base64data)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/save-video`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    token: Cookies.get("ROBOT_TOKENS"),
                    video_url: reader.result
                })
            });

            if (response.ok) {
                props.setVideoBlob(null);
                props.setVideoURL(null);
                window.alert("Video Save Successfully");
            }
        }
    }

    // ====================================================================================

    const updateValue = async (event, name) => {
        const newArmData = {
            ...armData,
            [name]: event.target.value
        }
        props.setArmData(newArmData);
        const response = await fetch( `${process.env.REACT_APP_BACKEND_URL}/arm-data`, {
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


    useEffect(() => {
        if (recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            props.setVideoURL(url);

            // Clean up the URL object when the component unmounts
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [recordedChunks]);



    return (
        <>
            <div className="camera-container">
                <div className="left-frame">
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

                    <div className="buttonContainer">
                        <button className="buttonCss" onClick={handleStart} disabled={isShow}>START</button>
                        <button className="buttonCss" onClick={handleStop} disabled={!isShow}>STOP</button>
                        
                        {recording ? 
                            <button className="buttonCss" onClick={handleStopRecord} disabled={!isShow}>STOP RECORD</button>
                            :
                            <button className="buttonCss" onClick={handleRecord} disabled={!isShow}>RECORD</button>
                        }
                        
                        <button className="buttonCss" onClick={handleSnapshot} disabled={!isShow}>SNAPSHOT</button>
                    </div>
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
                                        <input type="range" min="0" max="180" 
                                                id="baseSlider" onChange={(e) => updateValue(e, "base")}/>
                                    </td>
                                    <td>{armData.base}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Arm 1</td>
                                    <td>
                                        <input type="range" min="0" max="180"  
                                                id="arm1Slider" onChange={(e) => updateValue(e, "arm1")}/>
                                    </td>
                                    <td>{armData.arm1}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Arm 2</td>
                                    <td>
                                        <input type="range" min="0" max="180"  
                                                id="baseSlider" onChange={(e) => updateValue(e, "arm2")}/>
                                    </td>
                                    <td>{armData.arm2}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Claw Y</td>
                                    <td>
                                        <input type="range" min="0" max="180"
                                                id="baseSlider" onChange={(e) => updateValue(e, "clawy")}/>
                                    </td>
                                    <td>{armData.clawy}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>Claw Z</td>
                                    <td>
                                        <input type="range" min="0" max="180"
                                                id="baseSlider" onChange={(e) => updateValue(e, "clawz")}/>
                                    </td>
                                    <td>{armData.clawz}</td>


                                </tr>

                                <tr className="control-row">
                                    <td>End effector</td>
                                    <td>
                                        <input type="range" min="0" max="180" 
                                                id="baseSlider" onChange={(e) => updateValue(e, "ee")}/>
                                    </td>
                                    <td>{armData.ee}</td>


                                </tr>
                            </tbody>
                        </table>
                       
                    </div>
                    
                         
                    {imgSrc && 
                        <>
                            <img className='taking-image' src={imgSrc} />   
                            <button className="buttonCss-right-frame" onClick={downloadImage}>Download</button> 
                            <button className="buttonCss-right-frame" onClick={saveImage}>Save</button>
                            <button className="buttonCss-right-frame" onClick={() => props.setImgSrc(null)}>Clear</button> 
                             
                        </>
                    
                    }
                    
                    {videoURL && 
                        <>
                            <video className='taking-image' src={videoURL} controls />
                            <button className="buttonCss-right-frame" onClick={downloadVideo}>Download</button> 
                            <button className="buttonCss-right-frame" onClick={saveVideo}>Save</button> 
                            <button className="buttonCss-right-frame" onClick={() => {props.setVideoURL(null); setRecordedChunks([]);}}>Clear</button>
                            
                        </>
                    }
                </div> 
            </div>
        </>
    )
};