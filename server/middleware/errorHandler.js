/**
 * 
*/


const notFound = (req, res)=>{
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}. maybe check the spelling.` });
}


//
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    // error in json body 
    if(err.type === 'entity.parse.failed'){
        return res.status(400).json({ errors:['Invalid json in request body'] });
    }

    // check mongoose errors
    if(err.name === 'ValidationError'){
        if (err.errors) {
            return res.status(400).json({ error: Object.values(err.errors)[0].message });
        }
        return res.status(400).json({ error: err.message });
    }

    // unique duplicate error
    if(err.code === 11000){
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({errors: [`${field} already exists`]});
    }

    // objectId not valid
    if(err.name === 'CastError'){
        return res.status(400).json({errors: ['invalid ID format']});
    }

    // multer error
    if(err.name === 'MulterError'){
        return res.status(400).json({errors: [err.message]});
    }

    // unhandles error
    res.status(err.status || 500).json({errors: [err.message || 'Internal Server Error']});
}

module.exports = {errorHandler , notFound};
