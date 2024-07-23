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
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;
            console.log("this is result 1")
            console.log(result);

            if (result.length === 1) {
                const query_insert = "INSERT INTO images (username, image) VALUES (?, ?)";
                database.query(query_insert, [decode.username, blob_image], (err, result) => {
                    if (err) throw err;

                    res.status(200).json({message: 'Add image successfully'})
                })
            }
        })
    }
}


const saveVideo = (req, res) => {

    const errors = validationResult(req);
    const {blob_video, token} = req.body;
    const decode = jwt.verify(token, jwtSecretkey);


    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "INSERT INTO videos (username, video) VALUES (?, ?)";
                database.query(query_insert, [decode.username, blob_video], (err, result) => {
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
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "SELECT * FROM images WHERE username = ?";
                database.query(query_insert, [decode.username], (err, result) => {
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
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "SELECT * FROM videos WHERE username = ?";
                database.query(query_insert, [decode.username], (err, result) => {
                    if (err) throw err;

                    res.status(200).json({final_result: result});
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
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "DELETE FROM images WHERE username = ? AND id = ?";
                database.query(query_insert, [decode.username, id], (err, result) => {
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
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_insert = "DELETE FROM videos WHERE username = ? AND id = ?";
                database.query(query_insert, [decode.username, id], (err, result) => {
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