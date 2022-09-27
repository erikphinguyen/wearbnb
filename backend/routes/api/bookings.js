const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth.js')
// forgot if we need line 6?
const db = require('../../db/models')

// GET BOOKINGS
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    console.log('INSIDE BOOKINGS ROUTE');
    const { id } = req.params;
    // first option with .findAll
    const bookings = await Bookings.findAll(
        {
            where: { id }
        }
    )
    // second option with .findByPk
    // const bookings = await Bookings.findByPk(Number(id))

    return res.json(bookings)
}))

module.exports = router;
