const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;

/*
USING csurfMiddleWare from middleware (utils) folder:
const csurfMiddleWare = require('../utils/auth')
router.get('/hello/world', csurfMiddleWare, function (req, res) {
    // console.log(req)
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});
*/

/*
this file could also be written as

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
*/
