const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Brand, Review } = require('../../db/models');

// GET ALL BRANDS
router.get('/', asyncHandler(async function (req, res) {
    const brands = await Brand.findAll();
    console.log("GET ALL BRANDS", brands)
    return res.json(brands);
}))

// GET INDIVIDUAL BRAND
router.get('/:id(\\d+)', asyncHandler(async function (req, res) {

    const {id} = req.params;
    const brand = await Brand.findByPk(id,
        {
            include: [{
                model: Review,
                where: {
                    brandId: id
                }
            }]
        })
        console.log(brand)
        return res.json(brand)
}))

// POST BRAND
router.post('/', asyncHandler(async function (req,res) {
    const id = await Brand.create(req.body);
    return res.json(id);
}))

// PUT BRAND
router.put('/:id', asyncHandler(async (req, res) => {
    const {brandImg, name, address, city, country} = req.body;
    const id  = parseInt(req.params.id);
    const brand = await Brand.findByPk(id);
    brand.brandImg = brandImg;
    brand.name = name;
    brand.address = address;
    brand.city = city;
    brand.country = country;
    await brand.save();

    res.json(brand);
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
