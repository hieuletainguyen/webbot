const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const images = require("../controllers/image")

router.post("/save-image", 
    body("token").not().isEmpty(),
    body("base64_image").not().isEmpty(),
    images.saveImage
)

router.post("/save-video", 
    body("token").not().isEmpty(),
    body("video_url").not().isEmpty(),
    images.saveVideo
)

router.get("/get-images", 
    images.getAllImages
)

router.get("/get-videos", 
    images.getAllVideos
)

router.delete("/delete-image", 
    images.deleteImage
)

router.delete("/delete-video", 
    images.deleteVideo
)

module.exports = router;