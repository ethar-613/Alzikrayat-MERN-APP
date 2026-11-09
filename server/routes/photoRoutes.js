/**
 * this file  
*/

const express = require('express');
const photoController = require('../controllers/photoController');
const requireUser = require('../middleware/requireUser');
const {validate, photoSchema} = require('../middleware/validation');
const uploadPhoto = require('../middleware/upload');


const router = express.Router();

router.post('/', requireUser, uploadPhoto, validate(photoSchema), photoController.createPhoto);

module.exports = router;

