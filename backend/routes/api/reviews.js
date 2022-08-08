const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Image } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { db } = require('../../config');
const { Review } = require('../../db/models')

// GET ALL REVIEWS OF CERTAIN BRAND
router.get('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    let reviews = await Comment.findAll({
        where: { id: id }
    });

    return res.json(reviews);
}));

// POST COMMENT
router.post('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { content, imageId } = req.body;
    const newComment = await Comment.create({
        content, imageId
    });
    // const newComment = new Comment({ content, id})
    // await newComment.save()
    const payload = await Comment.findByPk(newComment.id)
    return res.json(payload);
}))

//  // DELETE COMMENT
router.delete('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findByPk(id)
    await comment.destroy();
    res.json({
        message: "comment deleted"
    })
}))

module.exports = router;
