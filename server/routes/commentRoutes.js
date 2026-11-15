/**
 * this file responsible for specifying comment management routes
*/

const express = require('express');
const commentController = require('../controllers/commentController');
const requireAuth = require('../middleware/auth');
const {validate, commentSchema} = require('../middleware/validation');


const router = express.Router({mergeParams: true}); // mergeParams to let this router to see the :id that came from the parent route

// rout for create comment
router.post('/', requireAuth, validate(commentSchema), commentController.createComment);

// route to get all comments 
router.get('/' ,  commentController.getCommentsForPhoto);

module.exports = router;
