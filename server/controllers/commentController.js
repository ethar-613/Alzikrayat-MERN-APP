/**
 * this file responisple for controlling comments processes, creating comment, and getting sll the comments for specific photo
*/

const Photo = require('../models/Photo');
const Comment = require('../models/Comment');


// this function is to create a comment to photo
// parameters;  req it have the request data that came from the user, Contains the image ID, comment text, and user ID
//              res useing it to send response to the user, To send the new comment.
//              next allow the navigate to the next middleware or controller
// returns the new comment data along with the auther information, or error message if the image does not exist or the comment is empty.
// if any error happened it will catch it and let the errorHandler to handle it 
const createComment = async(req, res, next)=>{
    try{

        const photo = await Photo.findById(req.params.id);
        if(!photo){
            return res.status(404).json({errors: ['photo not found']});
        }

        const {comment} = req.body;
        if(!comment || comment.trim() ===''){
            return res.status(400).json({errors: ['comment words is required']});
        }

        const newComment = await Comment.create({
            photoId: photo._id,
            userId: req.user._id,
            comment: comment.trim()
        });

        const populated = await newComment.populate('userId', 'firstName lastName');

        res.status(201).json(populated);

    }catch(err){
        next(err)
    }
} 

// function to get all comments related to specific photo
// parameters;  req it have the request data that came from the user,  Contains the image ID in req.params.id
//              res useing it to send response to the user, To send the list of comments.
//              next allow the navigate to the next middleware or controller
// returns array containing the comments associated with the photo, along with information about their authors, or pass the error to the error handler.
const getCommentsForPhoto = async(req, res, next)=>{
    try{

        const comments = await Comment.find({photoId: req.params.id})
            .populate('userId', 'firstName lastName')
            .sort({dateTime: 1})
        ;

        
        res.status(200).json(comments);

    }catch(err){
        next(err)
    }
} 




module.exports = {createComment , getCommentsForPhoto}