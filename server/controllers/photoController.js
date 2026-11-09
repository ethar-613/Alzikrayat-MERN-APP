/**
 * thsi file  
*/

const fs = require('fs');
const Photo = require('../models/Photo');
const mongoose = require('mongoose');
const path = require('path');
const Comment = require('../models/Comment');


// function to create/upload photo
const createPhoto = async (req ,res, next) =>{
    try{
        if(!req.file){
            return res.status(400).json({errors: ['Image file is required, you need to upload image']});
        }


        const photo = await Photo.create({
            userID: req.user._id,
            fileName: req.file.filename,
            title: req.body.title,
            description: req.body.description,
        });

        res.status(201).json(photo);

    } catch(err){
        if(req.file) fs.unlink(req.file.path , ()=>{});
        next(err);
    }
};

// function to get uploaded photo metadata
const getAllPhotos = async (req, res, next)=>{
    try{
        const photos = await Photo.find()
            .sort({dateTime: -1})
            .populate('userID', 'firstName lastName');

        res.status(200).json(photos);
    } catch(err){
        next(err);
    }
}

// function to get one photo metadata
const getOnePhoto = async (req, res, next)=>{
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({errors: ['Invalid photo id']});
        }

        const photo = await Photo.findById(req.params.id)
            .populate('userID', 'firstName lastName');
        
            if(!photo){
                return res.status(404).json({errors: ['photo not found']});
            }
        res.status(200).json(photo);
    } catch(err){
        next(err);
    }
}


// function to let the owner of a photo to delete it
const deletePhoto = async (req, res, next)=>{
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).json({errors: ['Invalid photo id']});
        }

        const photo = await Photo.findById(req.params.id);        
        if(!photo){
            return res.status(404).json({errors: ['photo not found']});
        }

        if(!photo.userID.equals(req.user._id)){
            return res.status(403).json({errors: ['you can not delete this photo. you can only delete your own photos']});
        }

        // deleting the comment related to this photo and the photo itself from the database
        await Comment.deleteMany({photoId: photo._id});
        await photo.deleteOne();

        // deleting the photo file from the disk
        const filePath = path.join(__dirname, '..' , 'uploads' , photo.fileName);
        fs.unlink(filePath , (err)=>{
            if(err) next(err);
        });

        res.status(204).json({message: 'Photo Deleted Successfully'});
    } catch(err){
        next(err);
    }
}



module.exports = {createPhoto, getAllPhotos, getOnePhoto , deletePhoto};


