/**
 * thsi file  
*/

const fs = require('fs');
const Photo = require('../models/Photo');

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

module.exports = {createPhoto};


