const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true,
        },
        fee: {
            type: Number,
            required: true,
        },
        edu: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        experience: {
            type: Number
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        mobile: {
            type: String,
            min: 10,
            max: 10,
            required: true,
        },
        clinic_address: {
            type: String,
        },
        pic: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        appointments: [{
            id: String,
            doctor: String,
            dateOfAppointment: Date,
            timeOfAppointment: Number,
        }]
    },
    {
        timestamps: true,
    }
);

doctorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

doctorSchema.methods.matchPassword = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}


const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor;