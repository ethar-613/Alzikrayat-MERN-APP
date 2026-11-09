/**
 * this file 
*/

const multer = require('multer');
const path = require('path');


// when and where storing the photo on the desk
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb)=>{
        const uniqueName = Date.now()+ '-'+ Math.round(Math.random()* 1e9);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `photo-${uniqueName}${ext}`);
    },
});

// to ensure to save only photos
const fileFilter = (_req, file, callback)=>{
    const allowedTypes = /jpeg|jpg|png|gif|webp/ ;
    const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeValid = allowedTypes.test(file.mimetype);

    if(extValid && mimeValid){
        callback(null, true);
    } else{
        error = new Error('only Images files are alowed. Choose a JPG, PNG, WEBP, or GIF image.');
        error.status= 400;
        callback(error);
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
            next(err)
        }
        next();

    });
};


module.exports = uploadPhoto;
