/**
 * 
*/

const Photo = require('../models/Photo');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');



//create comment
const createComment = async(req, res, next)=>{
    try{

        console.log('comment create params id = ', req.params.id);
        console.log('comment create  body = ', req.body);
        console.log('comment create x-user-id = ', req.headers['x-user-id']);
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