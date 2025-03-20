const express = require('express');
const userRoutes = require('./users/routes');

const router = express.Router();

router.use('/api/v1/users', userRoutes);
module.exports = router;



