const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { db } = require('../../config');
const { User, Brand, Review } = require('../../db/models')

// GET ALL REVIEWS OF CERTAIN BRAND
router.get('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    let reviews = await Review.findAll({
        where: { id: id }
    });

    return res.json(reviews);
}));

// POST REVIEW
router.post('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { brandImg, name, address, city, country } = req.body;
    const newReview = await Review.create({
        brandImg, name, address, city, country
    });
    // const newReview = new Review({ id, brandImg, name, address, city, country})
    // await newReview.save()
    const payload = await Review.findByPk(newReview.id)
    return res.json(payload);
}))

// DELETE REVIEW
router.delete('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const review = await Review.findByPk(id)
    await review.destroy();
    res.json({
        message: "review deleted"
    })
}))

module.exports = router;
