/**
 * This file defines the routes for retrieving statistics.
*/

const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');

// route to get statistics for users, photos, and comments
router.get('/', getStats);

module.exports = router;