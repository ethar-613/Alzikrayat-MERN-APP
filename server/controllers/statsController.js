/**
 * This controller handles the retrieval of statistics for users, photos, and comments.
*/

const User = require('../models/User');
const Photo = require('../models/Photo');
const Comment = require('../models/Comment');

// this function retrieves the total counts of users, photos, and comments from the database
// it uses Promise.all to fetch all counts concurrently for better performance
// its parameters are req is the request object, 
//                      res is the response object, and 
//                      next is the function to pass control to the next middleware
// returns a json response containing the counts of users, photos, and comments
const getStats = async (req, res, next) => {
  try {
    const [userCount, photoCount, commentCount] = await Promise.all([
      User.countDocuments(),
      Photo.countDocuments(),
      Comment.countDocuments(),
    ]);

    res.json({
      users: userCount,
      photos: photoCount,
      comments: commentCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };