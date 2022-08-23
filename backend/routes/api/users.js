const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    // validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username, confirmPassword } = req.body;

        if (email == "") {
            return res.status(400).json({ error: "Please fill out Email" })

        }
        if (username == "") {
            return res.status(400).json({ error: "Please fill out Username" })
        }

        if (password == "") {
            return res.status(400).json({ error: "Please fill out Password" })
        }
        if (confirmPassword == "") {
            return res.status(400).json({ error: "Please fill out Password" })
        }
        if (password.length > 40) return res.status(400).json({ error: "Password exceeds max length of 40" })
        if (confirmPassword.length > 40) return res.status(400).json({ error: "Confirm password exceeds max length of 40" })

        const user = await User.signup({ email, username, password });
        if (!user) {
            return res.status(400).json({ error: "Invalid Username or Email" })
        }

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

module.exports = router;
