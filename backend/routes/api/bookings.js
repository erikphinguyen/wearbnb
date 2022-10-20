const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { restoreUser, requireAuth } = require('../../utils/auth')
const { User, Brand, Booking } = require('../../db/models');

const { bookingValidations } = require('../../validations/bookings');
const { validationResult } = require('express-validator')

// GET BOOKINGS
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;
    // first option with .findAll

    let user = new User({
        userId: req.body.userId,
    })

    let brand = new Brand({
        brandId: req.body.brandId
    })
    // console.log('WHAT IS BOOKING SINGULAR', user)
    // console.log('WHAT IS BOOKING SINGULAR', brand)

    // const bookings = await Booking.findAll(
    //     {
    //         where: {
    //             brandId,
    //             userId
    //         }
    //     }
    // )

    // second option with .findByPk
    // const bookings = await Booking.findByPk(Number(id))

    // third option with includes
    const bookings = await Booking.findAll({
            where: {
                userId: id
            }
    })

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.log('--------- WHAT IS BOOKINGS', bookings)
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


// POST BOOKINGS (can do errorsArray like brands & reviews)
router.post('/:id(\\d+)', bookingValidations, requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { brandId, userId, startDate, endDate, price, totalPrice } = req.body;

    let validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const booking = await Booking.create({ brandId, userId, startDate, endDate, price, totalPrice })
        return res.json(booking)
    }

    else {
        const errors = validatorErrors.array().map(error => error.msg);
        return res.json(errors)
    }
}))

// DELETE BOOKINGS
router.delete('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id)
    await review.destroy();
    res.json({
        message: "booking canceled"
    })
}))


module.exports = router;
