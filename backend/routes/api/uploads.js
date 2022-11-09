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

router.get('/brands', asyncHandler(async (req, res) => {
  const brandId = req.params.id
  console.log('WHAT IS BRANDID IN GET ROUTE', brandId)
  const images = await db.Image.findAll({ where: { brandId } });
  return res.json(images);
}))

router.post('/brands', singleMulterUpload('image'), asyncHandler(async (req, res) => {
  const brandId = req.params.id;
  console.log('WHAT IS BRANDID IN POST ROUTE', brandId)

  const imageUrl = await singlePublicFileUpload(req.file);
  console.log('WHAT IS IMAGEURL', imageUrl)
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
