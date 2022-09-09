const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    // validateLogin,
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;
        let errorsArray = []
        if (credential == "") {
            errorsArray.push("Please fill out Username or Email")
            // return res.status(400).json({error: "Please fill out Username or Email"})
        }
        if (password == "") {
            errorsArray.push("Please fill out Password")
            // return res.status(400).json({error: "Please fill out Password"})
        }

        const user = await User.login({ credential, password });

        if (!user) {
            errorsArray.push("Invalid Login")
            // return res.status(400).json({error: "Invalid Login"})
        }

        // if (!user) {
        //     const err = new Error('Login failed');
        //     err.status = 401;
        //     err.title = 'Login failed';
        //     err.errors = ['The provided credentials were invalid.'];
        //     return next(err);
        // }

        if (errorsArray) return res.status(400).json({ error: errorsArray })

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);

module.exports = router;
