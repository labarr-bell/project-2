const User = require('../models/User.model');

const Event = require('../models/Event.model');

const router = require('express').Router();

const bcrypt = require('bcryptjs');

const saltRounds = 10 

const mongoose = require('mongoose');

const { isLoggedIn, isLoggedOut} = require('../middeleware/route-guard.js');


router.get('/signup', (req, res) => {
    console.log(req.session)
    let data = {}
    data = {userInsession:req.session.currentUser}
    console.log(data)
    res.render('auth/signup', data)
})

// Tomoz download bcryptjs (look into Hashedpassword)
// Set up user pages & Routes

// look into setting up the salt rounds
// look into setting up the middleware - route-guard.js

module.exports = router