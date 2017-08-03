const express = require('express');
const router = express.Router();
const User = require('../models/user');

const passport = require('passport');
const jwt = require('jsonwebtoken');

// REGISTER NEW USER
router.post('/new', (req, res, next) => {
    // EXTRACT FORM DATA
    const { username, email, password } = req.body;

    // INSERT USER DATA INTO AN OBJECT
    let newUser = { username, email, password };

    // CHECK IF USERNAME IS VALID (NOT EMPTY)
    if(!username){
        return res.status(400).json({
            success: false,
            message: "Username is required"
        });
    }
    // CHECK IF EMAIL IS VALID (NOT EMPTY)
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    // CHECK IF PASSWORD IS VALID (NOT EMPTY)
    if(!password){
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    // CHECK EMAIL IF IT IS FORMATTED CORRECTLY 
    if(!User.validateEmail(email)){
        return res.status(400).json({
            success: false,
            message: 'Please use a valid email'
        });
    } else {

        // USE MODEL TO REGISTER A NEW USER
        User.addUser(newUser)
            .then(user => {
                res.status(201).json({ 
                    success: true, 
                    message: 'User registered',
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    } 
                });
            }).catch(err => console.error(err));
    }
});

// PROFILE
// PROTECTED ROUTE
// IF TOKEN IS VALID THE USER WILL BE ABLE TO SEE THEIR PROFILE INFORMATION
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ 
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        } 
    });
});

// AUTHENTICATE/LOG IN
// SEND BACK A TOKEN IF THE USER SUCCESSFULLY LOGS IN
router.post('/authenticate', (req, res, next) => {
    // EXTRACT FORM DATA
    const { username, password } = req.body;

    // CHECK IF USERNAME IS VALID (NOT EMPTY)
    if(!username){
        return res.status(400).json({
            success: false,
            message: "Username is required"
        });
    }
    // CHECK IF PASSWORD IS VALID (NOT EMPTY)
    if(!password){
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    // FIND USER BY USERNAME
    User.findByUserName(username)
        .then(user => {
            // IF A USER ISN'T FOUND
            if(!user){
                return res.status(401).json({ success: false, message: "User not found" });
            }
            // IF A USER IS FOUND, CONTINUE AND COMPARE PASSWORD WITH HASH
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                // IF PASSWORDS MATCH
                if(isMatch){
                    // CREATE A TOKEN
                    const token = jwt.sign(user, process.env.SECRET_KEY, {
                        expiresIn: 604800 // 1 WEEK
                    });
                    // SEND JSON OBJECT ALONG WITH TOKEN
                    res.status(200).json({
                        success: true,
                        token: 'JWT ' +token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    return res.status(401).json({ success: false, message: "Wrong password" });
                }
            });
        });
});

module.exports = router;