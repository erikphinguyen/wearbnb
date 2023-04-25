const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { restoreUser, requireAuth } = require('../../utils/auth')
const { User, Brand, Booking } = require('../../db/models');

const { bookingValidations } = require('../../validations/bookings.js');
const { validationResult } = require('express-validator');

// GET ALL BOOKINGS TO LOGGED IN USER
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;
    // first option with .findAll
    const bookings = await Booking.findAll({
        include: {
            model: Brand
        }
    })
    // second option with .findByPk
    // const bookings = await Booking.findByPk(Number(id))

    return res.json(bookings)
}))

// EDIT BOOKING
// try using booking validations later
router.put('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    // use req.body instead of req.params bc specific booking not url
    const { id, brandId, userId, startDate, endDate, price, totalPrice } = req.body;

    const booking = await Booking.findByPk(id);
    booking.startDate = startDate;
    booking.endDate = endDate;
    booking.price = price;
    booking.totalPrice = totalPrice
    await booking.save()

    return res.json(booking)
}))


// POST BOOKINGS (can do errorsArray like brands & reviews); bookingValidations taken out
router.post('/', requireAuth, bookingValidations, restoreUser, asyncHandler(async (req, res) => {
    const { brandId, userId, startDate, endDate, price, totalPrice } = req.body;

    let validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        let newBooking = new Booking(req.body)
        await newBooking.save();
        const payload = await Brand.findByPk(newBooking.id);
        return res.json(payload)
    }

    else {
        const errors = validatorErrors.array().map(error => error.msg);
        return res.json(errors)
    }

    // let newBooking = new Booking(req.body);
    // await newBooking.save();

    // const payload = await Brand.findByPk(newBooking.id);
    // return res.json(payload)
}))

// DELETE BOOKINGS
router.delete('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id)
    await booking.destroy();
    res.json({
        message: "booking canceled"
    })
}))


module.exports = router;
