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
        maxlength: 50
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
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
});

// here turning the schema to real tool to use it to interact with the database, then make it available to the rest of project files
module.exports = mongoose.model('User', userSchema);