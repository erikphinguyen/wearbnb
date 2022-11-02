const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const {uploadFile, getFile, deleteFile} = require('../../s3')

const video = require('../../db/models/video')
const photo = require('../../db/models/photo')
const brand = require('../../db/models/brand')

router.post('/videos', upload.single('video'), async (req, res) => {
    const file = req.file;
    const brandId = req.body.brandId;
    const result = await uploadFile(file);

    if (result) {
        let video = new video({
            brandId,
            filepath: result.Key
        })
        await brand.findByIdAndUpdate(brandId, {visited: true});
        await video.save();
    }

    await unlinkFile(file.path);
    res.send({videoPath: `/uploads/${result.Key}`});
})

router.post('/photos', upload.single('photo'), async (req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    if (result) {
        let photo = new photo({
            brandId,
            filepath: result.Key
        })
        await photo.save()
    }
    await unlinkFile(file.path);
    res.send({photoPath: `/uploads/${result.Key}`});
})

module.exports = router;
