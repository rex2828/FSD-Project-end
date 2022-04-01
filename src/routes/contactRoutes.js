const express = require('express')
const { postContactData } = require('../controllers/contactControllers')
const router = express.Router()
router.route('/postContactData').post(postContactData);

module.exports = router;