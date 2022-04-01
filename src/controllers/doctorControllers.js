const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const Doctor = require('../models/doctorModel');
const generateToken = require('../utils/generateTokens');

const registerDoctor = asyncHandler(async (req, res) => {
    const { name, category, language, fee, edu, exp, email, password, mobile, clinicaddress, pic, appointments } = req.body;
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
        res.status(400);
        throw new Error('Doctor already exists');
    }
    const doctor = await Doctor.create({
        name, category, language, fee, edu, exp, email, password, mobile, clinicaddress, pic, appointments
    });

    if (doctor) {
        res.status(201).send({
            _id: doctor._id,
            name: doctor.name,
            category: doctor.category,
            lang: doctor.language,
            fee: doctor.fee,
            edu: doctor.edu,
            exp: doctor.exp,
            email: doctor.email,
            mobile: doctor.mobile,
            caddress: doctor.clinicaddress,
            pic: doctor.pic,
            token: generateToken(doctor._id),
            appointments: doctor.appointments
        })
    } else {
        res.status(400)
        throw new Error('Error Occured');
    }

})

const authDoctor = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email })
    if (doctor && (await doctor.matchPassword(password))) {
        res.json({
            status: 'success',
            _id: doctor._id,
            name: doctor.name,
            category: doctor.category,
            lang: doctor.language,
            fee: doctor.fee,
            edu: doctor.edu,
            exp: doctor.exp,
            email: doctor.email,
            mobile: doctor.mobile,
            clinicaddress: doctor.clinicaddress,
            pic: doctor.pic,
            token: generateToken(doctor._id),
            appointments: doctor.appointments
        })
    }
    else {
        res.status(400).json({ status: 'failed', msg: 'Invalid email or Password' });
        throw new Error('Invalid email or Password');
    }


})

module.exports = { registerDoctor, authDoctor };


