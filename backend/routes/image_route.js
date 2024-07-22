const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const images = require("../controllers/image")

router.post("/save-image", 
    body("token").not().isEmpty(),
    images.saveImage
)

router.post("/save-video", 
    body("token").not().isEmpty(),
    images.saveVideo
)

router.get("/get-images", 
    images.getAllImages
)

router.get("/get-videos", 
    images.getAllVideos
)

module.exports = router;