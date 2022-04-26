const express = require('express');
const { registerDoctor, getDoctors, approveDoctor, deleteDoctor, doctorappointments } = require('../controllers/doctorControllers');
const { auth, adminauth, doctorauth } = require('../middleware/auth')
const router = express.Router();
router.route('/register').post(auth, registerDoctor);
router.route('/getdoctors').get(getDoctors);
router.route('/approve').get(auth, adminauth, approveDoctor);
router.route('/deleteDoctor').get(auth, adminauth, deleteDoctor);
router.route('/doctorappointments').get(auth, doctorauth, doctorappointments);
module.exports = router;