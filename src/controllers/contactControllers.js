const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const contact = require('../models/contactModel');

const postContactData = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;
    const mess = await contact.create({
        name, email, phone, message
    });

    if (mess) {
        res.status(201).send({
            _id: mess._id,
            name: mess.name,
            email: mess.email,
            phone: mess.phone,
            message: mess.message
        })
    } else {
        res.status(400)
        throw new Error('Error Occured');
    }

})

module.exports = { postContactData }