const express = require('express')
const { postContactData, bookappointment, getappointments, deleteAppointment, payment } = require('../controllers/apiControllers')
const router = express.Router()
const { auth, doctorauth } = require('../middleware/auth')
router.route('/postContactData').post(postContactData);
router.route('/bookappointment').post(auth, bookappointment);
router.route('/getappointments').get(auth, getappointments);
router.route('/deleteAppointment').get(auth, doctorauth, deleteAppointment);
router.route('/create-checkout-session').post(auth, payment);
module.exports = router;