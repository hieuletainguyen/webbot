import "./Home.css"
export default function Home() {

    return (
        <>
            <div className="main-container">

                
                    <h1 className='block1'>WELCOME</h1>
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
                    <img src="/pictures/esp32.jpeg" alt="esp32"/>
                    <div className="content">
                        <p>Using ESP32 connecting the backend from google cloud vm to get the data for the arm from the front end </p>
                    </div>
                </div>

                <div className="card">
                    <img src="/pictures/react.jpg" alt="react"/>
                    <p> Using react js to design UI to control the robot arm</p>
                </div>

                <div className="card">
                    <img src="/pictures/xpressjs.png" alt="xpressjs"/>
                    <p> Using express js to design the server to connect the UI, database and robot arm</p>
                </div>

                <div className="card">
                    <img src="/pictures/mysql.png" alt="mysql"/>
                    <div>
                        <p>Design the database to store</p>
                        <p>- booking schedule</p>
                        <p>- user accounts</p>
                        <p>- videos</p>
                        <p>- images</p>
                    </div>
                </div>

                <div className="card">
                    <img src="/pictures/gcp.jpg" alt="gcp"/>
                    <p>Using the Google Cloud Virtual Machine to put the server and database on the Cloud</p>
                </div>
               

                <div className="card">
                    <img src="/pictures/docker.png" alt="docker"/>
                    <p>Using Docker to dockerize the website</p>
                </div>

            </div>
        </>
    )
}