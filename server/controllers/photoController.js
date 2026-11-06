/**
 * thsi file  
*/

const fs = require('fs');
const Photo = require('../models/Photo');

const createPhoto = async (req ,res) =>{
    try{
        console.log('FILE:', req.file);
        console.log('BODY:', req.body);
        if(!req.file){
            return res.status(400).json({message: 'Image file is required, you need to upload image'});
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
        console.error('create photo error:' , err.message);
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {createPhoto};


