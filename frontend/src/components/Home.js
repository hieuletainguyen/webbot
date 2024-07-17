import {useState} from "react";
import "./Home.css"
export default function Home() {

    return (
        <>
            <div className="main-container">

                
                    <h1 className='block1'>WECLOME</h1>
                    <div className="description1">
                        <p>Welcome to Webbot, where you can step into the future of robotics. </p>
                        <p>Operate our advanced robot arm remotely, book your sessions, and dive into real-time control with live video feedback. </p>
                        <p>Join us and discover the next frontier in interactive robotics today!</p>
                    </div>
                
                
                    <h1 className="block2">Robot Arm</h1>
                    <div className="description2">
                                
                        <img className="sub-block-img" alt="robot-arm" src="/pictures/robot_6.jpg" />
                        
                        <table>
                            <tbody>
                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>
                            </tbody>
                        </table>
                            
                    </div>

                    <h1 className="block3">Vision</h1>
                    <div className="description3">
                        <img className="sub-block-img" alt="vision" src="/pictures/eye-to-hand.png" />
                            
                        <table>
                            <tbody>
                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>

                                <tr>
                                    <td>- adfadsq qe ef  qa d dfaaad adf rgafg gafg f</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                
            </div>

            <div className="cards">
                <div className="card">
                    <img src="/pictures/esp32.jpg" alt="esp32"/>
                    <div className="content">
                        <p>Using React to create a front end afa fafa fafa fafa fafafa afafafaf afaf afafa fafa fafafafa fafaf</p>
                    </div>
                </div>

                <div className="card">
                    <img src="/pictures/react.png" alt="react"/>
                </div>

                <div className="card">
                    <img src="/pictures/xpressjs.png" alt="xpressjs"/>
                </div>

                <div className="card">
                    <img src="/pictures/postgresql.png" alt="postgresql"/>
                    
                    <p>adsfasrgteg</p>
                </div>

                <div className="card">
                    <img src="/pictures/opencv1.png" alt="opencv1"/>
                    <p>adfafgrcgr</p>
                </div>

                <div className="card">
                    <img src="/pictures/gcp.png" alt="gcp"/>
                    <p>adfafgrcgr</p>
                </div>


                <div className="card">
                    <img src="/pictures/iot.jpg" alt="gcp"/>
                    <p>adfafgrcgr</p>
                </div>

                <div className="card">
                    <img src="/pictures/docker-compose.png" alt="docker-compose"/>
                    <p>adfafgrcgr</p>
                </div>

                <div className="card">
                    <img src="/pictures/docker.png" alt="docker-compose"/>
                    <p>adfafgrcgr</p>
                </div>

            </div>
        </>
    )
}