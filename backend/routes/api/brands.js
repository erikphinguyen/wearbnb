const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Brand, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js')

// GET ALL BRANDS
router.get('/', asyncHandler(async function (req, res) {
    const brands = await Brand.findAll();
    console.log("GET ALL BRANDS", brands)
    return res.json(brands);
}))

// GET INDIVIDUAL BRAND
router.get('/:id(\\d+)', asyncHandler(async function (req, res) {
    console.log('GET INDIVIDUAL BRAND BACKEND', req.params)
    const { id } = req.params;
    const brand = await Brand.findByPk(Number(id),
        {
            include: [{
                model: Review,
                where: {
                    brandId: id
                }
            }]
        })
    console.log(brand)
    console.log('GET INDIVIDUAL BRAND', brand)


    return res.json(brand)
}))

// POST BRAND
router.post('/', requireAuth, asyncHandler(async function (req, res) {
    console.log('POST BRAND IN BACKEND ROUTE', req.body)
    // const id = await Brand.create(req.body);

    let { brandImg } = req.body;

    if (brandImg.length == 0) {
        return res.status(400).json({ error: "No input" })
    }

    // let splitBrandImg = brandImg.split(".")
    // let splitBrandImgStr = String(splitBrandImg[splitBrandImg.length - 1])


    // if (splitBrandImgStr != jpg || splitBrandImgStr != png) {
    //     console.log('---------------------------------------WHAT IS SPLITBRANDIMG STRING', splitBrandImgStr)
    //     return res.status(400).json({ error: "This is not a .jpg or .png" })
    // }

    let newBrand = new Brand(req.body)

    await newBrand.save();
    // console.log('FINDING NEW BRAND', newBrand)
    // console.log('FINDING ID IN POST BRAND', id)
    let review = new Review({
        userId: req.body.userId,
        brandid: newBrand.id,
        review: ""
    })
    await review.save();
    const { fromModal } = req.body;
    return res.json(newBrand);
}))

// PUT BRAND
router.put('/:id', asyncHandler(async (req, res) => {
    const { brandImg, name, address, city, country } = req.body;
    if (brandImg.length === 0) {
        return res.status(400).json({ error: "This is an empty editted brand image" })
    }
    if (name.length === 0) {
        return res.status(400).json({ error: "This is an empty editted brand name" })
    }
    if (address.length === 0) {
        return res.status(400).json({ error: "This is an empty editted brand address" })
    }
    if (city.length === 0) {
        return res.status(400).json({ error: "This is an empty editted brand city" })
    }
    if (country.length === 0) {
        return res.status(400).json({ error: "This is an empty editted brand country" })
    }
    const id = parseInt(req.params.id);
    const brand = await Brand.findByPk(id);
    brand.brandImg = brandImg;
    brand.name = name;
    brand.address = address;
    brand.city = city;
    brand.country = country;
    await brand.save();



    return res.json(brand);
}))

// DELETE BRAND
router.delete('/:id(\\d+)', async (req, res) => {

    const { id } = req.params;

    const brands = await Brand.findByPk(id);
    // console.log(brands)
    await brands.destroy();
    return res.json({
        message: "brand deleted"
    })
})

module.exports = router;
