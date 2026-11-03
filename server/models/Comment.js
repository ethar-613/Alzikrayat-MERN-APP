/**
 * this is the comment model
 * this model links the comment with the photo that commented in it and the user who wrote/own the comment
*/

const mongoose = require('mongoose');

// creating the schema
const commentSchema = new mongoose.Schema({
    photoId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Photo', 
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: [true , 'Comment words is required'],
        trim: true
    },
    dateTime : {
        type: Date,
        default: Date.now,
    }
});

// here turning the schema to real tool to use it to interact with the database, then make it available to the rest of project files
module.exports = mongoose.model('Comment' , commentSchema);