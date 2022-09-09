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
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ max: 40 })
        .withMessage('Password must be 40 characters or less.'),
    check('confirmPassow')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('confirmPassow')
        .exists({ checkFalsy: true })
        .isLength({ max: 40 })
        .withMessage('Password must be 40 characters or less.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    // validateSignup,
    asyncHandler(async (req, res) => {
        console.log('WHAT IS RES.BODY', req.body)
        const { email, password, username, confirmPassword } = req.body;
        let errorsArray = []
        if (email == "") {
            errorsArray.push("Please fill out Email")
            // return res.status(400).json({ error: "Please fill out Email" })
        }
        if (!email.includes('@') && !email.includes('.com') && !email.includes('.edu')) {
            errorsArray.push("Please provide a valid Email")
        }
        if (username == "") {
            errorsArray.push("Please fill out Username")
            // return res.status(400).json({ error: "Please fill out Username" })
        }

        if (password == "") {
            errorsArray.push("Please fill out Password")
            // return res.status(400).json({ error: "Please fill out Password" })
        }
        if (confirmPassword == "") {
            errorsArray.push("Please fill out Password")
            // return res.status(400).json({ error: "Please fill out Password" })
        }
        if (password.length < 5) {
            errorsArray.push("Password needs to be at least 5 characters long")
            // return res.status(400).json({ error: "Password needs to be at least 5 characters long" })
        }
        if (password.length > 40) {
            errorsArray.push("Password exceeds max length of 40")
            // return res.status(400).json({ error: "Password exceeds max length of 40" })
        }
        if (confirmPassword.length < 5) {
            errorsArray.push("Password needs to be at least 5 characters long")
            // return res.status(400).json({ error: "Password needs to be at least 5 characters long" })
        }
        if (confirmPassword.length > 40) {
            errorsArray.push("Confirm password exceeds max length of 40")
            // return res.status(400).json({ error: "Confirm password exceeds max length of 40" })
        }
        if (password !== confirmPassword) errorsArray.push("Passwords do not match")
        // const matchUser = await User.findOne({where: {username: username}}) means the same as bottom
        const matchUser = await User.findOne({ where: { username } })
        const matchEmail = await User.findOne({ where: { email } })

        if (matchUser) {
            errorsArray.push("User already exists")
        }
        if (matchEmail) {
            errorsArray.push("Email already exists")
        }

        if (errorsArray.length) return res.status(400).json({ error: errorsArray })
        const user = await User.signup({ email, username, password });
        if (!user) {
            errorsArray.push("Invalid Signup")
            // return res.status(400).json({ error: "Invalid Username or Email" })
        }
        await setTokenCookie(res, user);
        return res.json({
            user,
        });
    }),
);

module.exports = router;
