const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload
} = require('../../awsS3.js');

const db = require('../../db/models');

const router = express.Router();

router.get('/brands/:id', asyncHandler(async (req, res) => {
  const brandId = req.params.id
  const images = await db.Image.findAll({ where: { brandId } });
  return res.json(images);
}))

router.post('/brands/:id', singleMulterUpload('image'), asyncHandler(async (req, res) => {
    const brandId = req.params.id;
    const imageUrl = await singlePublicFileUpload(req.file);

    const newImage = await db.Image.create({
      brandId,
      imageUrl,
    });

    return res.json(newImage);
  })
)

// router.post('/brands/:id', multipleMulterUpload('image'), asyncHandler(async (req, res) => {
//     const brandId = req.params.id;
//     const imageUrls = await multiplePublicFileUpload(req.files);

//     imageUrls.forEach(async imageUrl => {
//       const newImage = await db.Image.create({
//         brandId,
//         imageUrl
//       })
//     });

//     // return res.end();

//     const newImage = await db.Image.create({
//       brandId,
//       imageUrl,
//     });

//     return res.json(newImage);
// }))

module.exports = router;
