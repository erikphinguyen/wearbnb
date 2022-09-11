const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

const { db } = require('../../config');
const { User, Brand, Review } = require('../../db/models');
const e = require('express');

// GET ALL REVIEWS OF CERTAIN BRAND
router.get('/:id(\\d+)', restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log('WHAT IS ID BACKEND', id)
    const brand = await Brand.findByPk(id);
    let reviews = await Review.findAll({
        where: { brandId: id }
    });

    return res.json(reviews);
}));

// EDIT REVIEWS
router.put('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.body;
    let review = await Review.findByPk(id);
    review.review = req.body.review;

    let errorsArray = [];
    if (req.body.review.length === 0) {
        errorsArray.push("This is an empty editted review")
    }
    if (req.body.review.length > 255) {
        errorsArray.push("Review length cannot exceed 255 characters")
    }
    console.log('WHAT IS ERRORS ARRAY', errorsArray)
    if (errorsArray.length) return res.status(400).json({error: errorsArray})

    await review.save();
    return res.json(review);
}))

// POST REVIEW
router.post('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, brandId, review } = req.body;

    let errorsArray = [];
    if (review.length === 0) {
       errorsArray.push("This is an empty review")
    }
    if (review.length > 255) {
        errorsArray.push("Review length cannot exceed 255 characters")
    }
    if (errorsArray.length) return res.status(400).json({error: errorsArray})

    // const newReview = await Review.create({
    //     userId, brandId, review
    // });
    let newReview = new Review(req.body)
    await newReview.save();

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
