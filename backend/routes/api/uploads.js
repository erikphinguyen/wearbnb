const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const {uploadFile, getFile, deleteFile} = require('../../s3')

const Photo = require('../../db/models/Photo')
const Video = require('../../db/models/Video')

router.post('/', upload.single('video'), async (req, res) => {
    const file = req.file;
    const photoId = req.body.photoId;
    const result = await uploadFile(file);

    if (result) {
        let photo = new Photo({
            photo: photoId,
            filepath: result.Key
        })
        await Photo.findByIdAndUpdate(photoId, {visited: true});
        await photo.save();
    }

    await unlinkFile(file.path);
    res.send({photoPath: `/uploads/${result.Key}`});
})
