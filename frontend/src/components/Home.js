import {useState} from "react";
import "./Home.css"
export default function Home() {

    return (
        <>
            <div className="main-container">

                
                    <h1 className='block1'>Title 1</h1>
                    <p className="description1">
                        <table>
                            <tr>
                                - afadfasdf
                            </tr>
                            <tr>
                                - asdggeye
                            </tr>
                            <tr>
                                - afgreqrqe
                            </tr>
                        </table>
                    </p>
                
                
                    <h1 className="block2">Title 2</h1>
                    <p className="description2">Description 2</p>

                    <h1 className="block3">Title 3</h1>
                    <p className="description3">Description 3</p>
                
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
                    <img src="/pictures/postgresql.png" alt="react"/>
                    
                    <p>adsfasrgteg</p>
                </div>

                <div className="card">
                    <img src="/pictures/opencv1.png" alt="react"/>
                    <p>adfafgrcgr</p>
                </div>

            </div>
        </>
    )
}