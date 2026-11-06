/**
 * this file 
*/

const multer = require('multer');
const path = require('path');

const allowedTypes = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/gif', '.gif'],
]);

// when and where storing the photo on the desk
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()* 1e9)}`;
        cb(null, uniqueName + path.extname(file.originalname).toLowerCase());
    },
});

// to ensure to save only photos
const fileFilter = (_req, file, callback)=>{
    if(!allowedTypes.has(file.mimetype)){
        error = new Error('only Images files are alowed. Choose a JPG, PNG, WEBP, or GIF image.');
        error.status= 400;
        callback(error);
    } else{
        callback(null, true);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024, files: 1}
});

const uploadPhoto = (req, res , next)=>{
    upload.single('photo')(req, res , (err)=>{
        if(err){
            return res.status(400).json({message: err.message});
        }
        next();

    });
};


module.exports = uploadPhoto;
