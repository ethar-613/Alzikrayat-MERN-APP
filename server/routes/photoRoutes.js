/**
 * this file responsible for specifying photo management routes
*/

const express = require('express');
const photoController = require('../controllers/photoController');
const requireAuth = require('../middleware/auth');
const {validate, photoSchema} = require('../middleware/validation');
const uploadPhoto = require('../middleware/upload');


const router = express.Router();

// rout for create/upload photo
router.post('/', requireAuth, uploadPhoto, validate(photoSchema), photoController.createPhoto);

// route to get all photos uploaded
router.get('/' ,  photoController.getAllPhotos);

// route to get specifix photo uploaded
router.get('/:id' ,  photoController.getOnePhoto);

// route to delete photo uploaded
router.delete('/:id' , requireAuth ,  photoController.deletePhoto);

module.exports = router;

