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
        res.send('Nope!')
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


module.exports = { auth, checkUser, adminauth };