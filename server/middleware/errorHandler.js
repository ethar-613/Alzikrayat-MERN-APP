/**
 * this file compile list of errors that occur in the project 
 * and send clear messages to the user instead of letting the server crash or displaying incomprehensible error messages
*/

// this function to send response: "404 Not Found" If a user sends a request to a path that does not exist
// parameters; req,To determine the request type and URL.
//             res, To send the error message.
// Returns HTTP response with a 404 status code and a message indicating that the path does not exist
const notFound = (req, res)=>{
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}. maybe check the spelling.` });
}


// this function used to handle different types of errors
// parameters; err The error that occurred
//              req Request information
//              res Send the error message
//              next Pass the error to another middleware, if necessary
// Returns HTTP response with suitable status code and appropriate error message 
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    // error in json body 
    if(err.type === 'entity.parse.failed'){
        return res.status(400).json({ errors:['Invalid json in request body'] });
    }

    // check mongoose errors
    if(err.name === 'ValidationError'){
        if (err.errors) {
            return res.status(400).json({ errors: [Object.values(err.errors)[0].message] });
        }
        return res.status(400).json({ errors: [err.message] });
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
