const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const auth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'jwtsecret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                const user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

const adminauth = async (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    } else {
        res.redirect('/verified?error=err&m1=404 Not Found&m2= ')
    }
}
const doctorauth = async (req, res, next) => {
    if (req.user.isDoctor) {
        next()
    } else {
        res.send('/verified?error=err&m1=404 Not Found&m2= ')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'jwtsecret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};


module.exports = { auth, checkUser, adminauth, doctorauth };