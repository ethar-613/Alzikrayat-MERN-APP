/**
 * thsi file Performing photo related operations; Upload new photo. View all photos. View specific photo. Delete photo 
*/

const fs = require('fs');
const Photo = require('../models/Photo');
const mongoose = require('mongoose');
const path = require('path');
const Comment = require('../models/Comment');


// function to Upload a new photo and store its information in the database
// parameters;  req it have the request data that came from the user
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// returns It returns a response containing the image information and a status code of 201 if the operation is successful, or 400 if no image is found
// If an error happens it is passed to next(err)
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

// function to retrieve all images from the database.
// parameters;  req it have the request data that came from the user
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// Returns response containing an array of all photos and their owners data, with a 200 status code upon success.
const getAllPhotos = async (req, res, next)=>{
    try{
        const photos = await Photo.find()
            .sort({dateTime: -1})
            .populate('userID', 'firstName lastName'); //Retrieve the user information related to the photo

        res.status(200).json(photos);
    } catch(err){
        next(err);
    }
}

// function to retrieve a single photo using its ID
// parameters;  req it have the request data that came from the user, contains the photo ID in req.params.id
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// Returns photo data, if available, 400 if the ID is invalid, 404 if the image does not exist
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


// function to remove photo from the project, requires that the user is the owner of the image.
// parameters;  req it have the request data that came from the user, contains the image ID and the verified user
//              res useing it to send response to the user
//              next allow the navigate to the next middleware or controller
// Returns 400 if the ID is invalid. 404 if the image does not exist. 403 if someone tries to delete an image they do not own. 
//          204 when the deletion is successful.
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

        res.status(204);
    } catch(err){
        next(err);
    }
}



module.exports = {createPhoto, getAllPhotos, getOnePhoto , deletePhoto};


