const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const {uploadFile, getFile, deleteFile} = require('../../s3')

const Video = require('../../db/models/Video')
const Photo = require('../../db/models/Photo')
