import {useState, useEffect} from "react";
import "./Gallery.css";
import Cookies from "js-cookie";
function Gallery ()  {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    const getImages = async () => {
        const token = Cookies.get("ROBOT_TOKENS");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-images?token=${token}`);
        const data = await response.json();
        console.log(data);
        setImages(data.final_result);
    }

    const getvideos = async () => {
        const token = Cookies.get("ROBOT_TOKENS");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-videos?token=${token}`);
    }

    useEffect(() => {
        getImages()
    }, []);

    return (
        <div className="gallery-container">
            <h1>Gallery</h1>

        </div>
    )
}

export default Gallery;