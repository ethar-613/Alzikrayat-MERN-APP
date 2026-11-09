/**
 * this is the photo model
 * this model saves the path or filename of the image uploaded to the server , its title, description, 
 * and the refrence of th euploader from the users table
*/

const mongoose = require('mongoose');

// creating the schema
const photoSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',
        required: [true, 'photo need to belong to user'],
        index: true,
    },
    fileName: {
        type: String,
        required: [true, 'file name is required'],
    },
    title:{
        type: String,
        required: [true, 'Title is required'],      
        trim: true,
        maxlength: [200, 'photo title can not be more than 200 characters'],
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    dateTime: {
        type: Date,
        default: Date.now,
    },
});

// here turning the schema to real tool to use it to interact with the database, then make it available to the rest of project files
module.exports = mongoose.model('Photo', photoSchema);