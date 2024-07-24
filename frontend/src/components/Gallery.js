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
        setImages(data.final_result);
    }

    const downloadImage = (imgSrc) => {
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const removeImage = async (imageId) => {
        const token = Cookies.get("ROBOT_TOKENS");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-image?token=${token}&id=${imageId}`, {
            method: "DELETE"
        });

        const data = await response.json();
        
        if (data.message === "delete image successfully"){
            getImages();
        }
    }

    const downloadVideo = (videoSrc) => {
        const link = document.createElement('a');
        link.href = videoSrc;
        link.download = 'recorded-video.webm';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const removeVideo = async (videoId) => {
        const token = Cookies.get("ROBOT_TOKENS");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/delete-video?token=${token}&id=${videoId}`, {
            method: "DELETE"
        })
        const data = await response.json();
        if (data.message === "delete video successfully"){
            getVideos();
        }
    }
    

    const getVideos = async () => {
        const token = Cookies.get("ROBOT_TOKENS");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get-videos?token=${token}`);
        const data = await response.json();
        setVideos(data.final_result);
        console.log(data.final_result)

    }

    useEffect(() => {
        getImages();
        getVideos();
        console.log(images)
    }, []);

    return (
        <div className="gallery-container">
            <h1>IMAGES</h1>
            <div className="image-container">
                
                {  images.length > 0 &&
                    images.map((image) => 
                        <div className="image-card">
                            <img src={image.image} key={image.id} alt="Buffered Image"/>
                            <div className="button-area">
                                <button className="image-card-button" onClick={() => downloadImage(image.image)}>Download</button>
                                <button className="image-card-button" onClick={() => removeImage(image.id)}>Remove</button>
                            </div>
                        </div>
                    )
                }
            </div>
            
            <h1>VIDEOS</h1>
            <div className="video-container">
                
                {videos.length > 0 &&
                    videos.map((video) => 
                        <div className="image-card" key={video.id}>
                            <video src={video.video} key={video.id} controls alt="Buffered Video" />
                            <div className="button-area">
                                <button className="image-card-button"  onClick={() => downloadVideo(video.video)}>Download</button>
                                <button className="image-card-button"  onClick={() => removeVideo(video.id)} >Remove</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Gallery;