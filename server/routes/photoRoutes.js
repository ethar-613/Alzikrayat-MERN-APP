/**
 * this file  
*/

const express = require('express');
const photoController = require('../controllers/photoController');
const requireUser = require('../middleware/requireUser');
const {validate, photoSchema} = require('../middleware/validation');
const uploadPhoto = require('../middleware/upload');


const router = express.Router();

// rout for create/upload photo
router.post('/', requireUser, uploadPhoto, validate(photoSchema), photoController.createPhoto);

// route to get all photos uploaded
router.get('/' ,  photoController.getAllPhotos);

// route to get specifix photo uploaded
router.get('/:id' ,  photoController.getOnePhoto);

// route to delete photo uploaded
router.delete('/:id' , requireUser ,  photoController.deletePhoto);

module.exports = router;

