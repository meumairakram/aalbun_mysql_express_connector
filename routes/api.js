const express = require('express');

const router = express.Router();

const connection = require('./../utils/connection');

const handlers = require('./api/index');

// console.log(handlers.get_data)
router.use('/get_data',handlers.get_data);





module.exports = router;