const express = require('express');

const mongoose = require('mongoose');

const Uploads = require('../models/upload_img');

const cors = require('cors');

const fetch = require('node-fetch');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true) //Stores the file if true
    }else{
        cb(null, false) //Rejects the file if false ie if the file is a Zip file or any other file
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


const router = express.Router();

router.get('/', upload.single("image"), (req, res, next) => {
    Uploads.find()
    .select("image")
    .exec()
    .then((docs) => {
        res.status(200).json({
            msg: 'Details',
            docs
        })
    })
    .catch((e) => {
        res.status(500).json({
            msg: 'Failed to retrieve all uploads'
        })
    })
});


router.post('/fileUpload', upload.single('image'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            msg: 'Please upload an Image'
        })
    } else {
        const image_upload = new Uploads({
            _id: new mongoose.Types.ObjectId(),
            images: req.file.path
        });
        image_upload.save().then((docs) => {
            console.log(req.file)
            docs = req.file.path
            res.status(200).json({
                msg: 'Image Uploaded',
                docs
            })
        })
        .catch((e) => {
            res.status(400).json({
                msg: 'Image Upload Unsuccessful'
            })
        })
    }
});

module.exports = router