const database = require("../database/db");
const {validatonResult, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const {jwtSecretkey } = require("../secret-data");

const saveImage = (req, res) => {
    const errors = validationResult(req);
    const {base64_image, token} = req.body;
    const decode = jwt.verify(token, jwtSecretkey);
    const blob_image = Buffer.from(base64_image, "base64");

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;
            console.log("this is result 1")
            console.log(result);

            if (result.length === 1) {
                const query_insert = "INSERT INTO images (email, image) VALUES (?, ?)";
                database.query(query_insert, [decode.email, blob_image], (err, result) => {
                    if (err) throw err;

                    res.status(200).json({message: 'Add image successfully'})
                })
            }
        })
    }
}


const saveVideo = (req, res) => {

    console.log(req.body);

    const errors = validationResult(req);
    const {token, video_url} = req.body;
    const decode = jwt.verify(token, jwtSecretkey);
    const base64_video = Buffer.from(video_url, "base64");
    

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "INSERT INTO videos (email, video) VALUES (?, ?)";
                database.query(query_insert, [decode.email, base64_video], (err, result) => {
                    if (err) throw err;

                    res.status(200).json({message: 'Add video successfully'})
                })
            }
        })
        
    }

}

const getAllImages = (req, res) => {
    const errors = validationResult(req);
    const token = req.query.token;
    const decode = jwt.verify(token, jwtSecretkey);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "SELECT * FROM images WHERE email = ?";
                database.query(query_insert, [decode.email], (err, result) => {
                    if (err) throw err;

                    console.log(result);

                    const results = result.map(r => {
                        const base64Image = r.image.toString('base64');
                        return {
                            id: r.id, 
                            image: base64Image.replace("dataimage/jpegbase64", "data:image/jpeg;base64,")
                        };
                    });

                    res.status(200).json({final_result: results});
                })
            }
        })
        
    }
}

const getAllVideos = (req, res) => {

    const errors = validationResult(req);
    const token = req.query.token;
    const decode = jwt.verify(token, jwtSecretkey);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "SELECT * FROM videos WHERE email = ?";
                database.query(query_insert, [decode.email], (err, result) => {
                    if (err) throw err;
                    const results = result.map(r => {
                        const base64Video = r.video.toString('base64');
                        return {
                            id: r.id, 
                            video: base64Video.replace("datavideo/webmbase64", "data:video/webm;base64,")
                        };
                    });

                    console.log("This is new results")
                    console.log(results)
                    res.status(200).json({final_result: results});
                })
            }
        })
        
    }

}

const deleteImage = (req, res) => {
    const errors = validationResult(req);
    const token = req.query.token;
    const id = req.query.id;
    const decode = jwt.verify(token, jwtSecretkey);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "DELETE FROM images WHERE email = ? AND id = ?";
                database.query(query_insert, [decode.email, id], (err, result) => {
                    if (err) throw err;

                    res.status(200).json({message: "delete image successfully"});
                })
            }
        })
        
    }
}


const deleteVideo = (req, res) => {
    const errors = validationResult(req);
    const token = req.query.token;
    const id = req.query.id;
    const decode = jwt.verify(token, jwtSecretkey);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "DELETE FROM videos WHERE email = ? AND id = ?";
                database.query(query_insert, [decode.email, id], (err, result) => {
                    if (err) throw err;

                    res.status(200).json({message: "delete video successfully"});
                })
            }
        })
        
    }
}

module.exports = {
    saveImage,
    saveVideo, 
    getAllImages, 
    getAllVideos, 
    deleteImage,
    deleteVideo
}