/**
 * this file protects the routes that need a logged in user (JWT authentication)
 * it reads the token from the header  Authorization: Bearer <token>, verifies its signature and expiry,
 * and then loads the user from the database and puts it in req.user
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware function
// parameters;  req it have the request data that came from the user (the token is inside the Authorization header)
//              res used to send a 401 response if the token is missing, invalid or expired
//              next allow the navigate to the next middleware or controller
// Returns; if the token is valid it sets req.user and calls next(),
//          if not it sends 401 response. If unexpected error occurs, it passes it to next(err)
const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization') || '';
        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ errors: ['Login required to do this'] });
        }

        // verify() checks the signature and the expiry date, and throws an error if anything is wrong
        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            const message = err.name === 'TokenExpiredError'
                ? 'Your session has expired, please login again'
                : 'Invalid token, please login again';
            return res.status(401).json({ errors: [message] });
        }

        // make sure the user of this token still exists in the database
        const user = await User.findById(payload.id);
        if (!user) {
            return res.status(401).json({ errors: ['Invalid user'] });
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = requireAuth;
