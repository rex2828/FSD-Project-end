const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const User = require('../models/userModel');
const generateToken = require('../utils/generateTokens');

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, gender, email, password, mobile, address, pic, appointments } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name, username, gender, email, password, mobile, address, pic, appointments
    });

    if (user) {
        res.status(201).send({
            _id: user._id,
            name: user.name,
            username: user.username,
            gender: user.gender,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            pic: user.pic,
            token: generateToken(user._id),
            appointments: user.appointments
        })
    } else {
        res.status(400)
        throw new Error('Error Occured');
    }

})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            status: 'success',
            _id: user._id,
            name: user.name,
            username: user.username,
            gender: user.gender,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            pic: user.pic,
            token: generateToken(user._id),
            appointments: user.appointments
        })
    }
    else {
        res.status(400).json({ status: 'failed', msg: 'Invalid email or Password' });
        throw new Error('Invalid email or Password');
    }


})

module.exports = { registerUser, authUser };


