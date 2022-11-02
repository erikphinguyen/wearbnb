const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const {uploadFile, getFile, deleteFile} = require('../../s3.js')

const Video = require('../../db/models/video')
const Photo = require('../../db/models/photo')
const Brand = require('../../db/models/brand')

router.post('/videos', upload.single('video'), async (req, res) => {
    const file = req.file;
    const brandId = req.body.brandId;
    const result = await uploadFile(file);

    if (result) {
        let video = new Video({
            brandId,
            filepath: result.Key
        })
        await Brand.findByIdAndUpdate(brandId, {visited: true});
        await video.save();
    }

    await unlinkFile(file.path);
    res.send({videoPath: `/uploads/${result.Key}`});
})

router.get('/photos', (res, req) => {
    const key = req.params.key;
})

router.post('/photos', upload.single('photo'), async (req, res) => {
    const file = req.file;
    console.log('WHAT IS FILE UPLOADS.JS', file)
    const result = await uploadFile(file);
    console.log('WHAT IS RESULT UPLOADS.JS', result)
    if (result) {
        let photo = new Photo({
            brandId,
            filepath: result.Key
        })
        await photo.save()
    }
    await unlinkFile(file.path);
    res.send({photoPath: `/uploads/${result.Key}`});
})

module.exports = router;
