/**
 * this file  
*/

const express = require('express');
const commentController = require('../controllers/commentController');
const requireUser = require('../middleware/requireUser');
const {validate, commentSchema} = require('../middleware/validation');


const router = express.Router({mergeParams: true}); // mergeParams to let this router to see the :id that came from the parent route
// rout for create comment
router.post('/', requireUser, validate(commentSchema), commentController.createComment);

// route to get all comments 
router.get('/' ,  commentController.getCommentsForPhoto);

module.exports = router;
