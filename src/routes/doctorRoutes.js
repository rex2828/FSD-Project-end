const express = require('express')
const { registerDoctor, authDoctor } = require('../controllers/doctorControllers')
const router = express.Router()
router.route('/register').post(registerDoctor);
router.route('/login').post(authDoctor);

module.exports = router;