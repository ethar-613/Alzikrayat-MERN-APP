/**
 * this is the user model
 * this model defines the user properties like name, emil, encrypted password, and optional additional info
*/

const mongoose = require('mongoose');

// creating the schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'first name can not be less than 2 characters'],
        maxlength: [50, 'first name can not be more than 50 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'last name can not be less than 2 characters'],
        maxlength: [50, 'last name can not be more than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [ 
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/ , 
            'Please enter valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [100, 'password can not be more than 100 characters'],
    },
    location: {
        type: String,
        trim: true,
        default: '',
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    occupation: {
        type: String,
        trim: true,
        default: '',
    }
},{timestamps: true} // to add createdAt and updatedAt auto
);

// here turning the schema to real tool to use it to interact with the database, then make it available to the rest of project files
module.exports = mongoose.model('User', userSchema);