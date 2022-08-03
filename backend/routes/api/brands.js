const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Brand, Review } = require('../../db/models');

// GET ALL BRANDS
router.get('/', asyncHandler(async function (req, res) {
    const brands = await Brand.findAll();
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
