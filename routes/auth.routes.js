const User = require('../models/User.model');
const Event = require('../models/Event.model');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10 
const mongoose = require('mongoose');
// const { isLoggedIn, isLoggedOut} = require('../middeleware/route-guard.js');


// create the event routes 
// this route has the same action of the post form in create hbs page 

router.post('/add-event', (req, res) => {
    const { eventName, description, category, price, image, city } = req.body
    Event.create({ eventName, description, category, price, image, city })
        .then((result) => {
            console.log("event has been created")
            res.redirect('/events')
        })
        .catch((err) => console.log(err));
})

// read the document by finding all the events and render them

router.get('/events', (req, res) => {
    Event.find()
        .then((result) => {
            const eventsObject = { result }
            console.log(eventsObject)
            res.render('events/event-list', eventsObject)
        })
        .catch((err) => console.log(err));
})

// create the document and make the form visible to used to add an event 

router.get('/add-event', (req, res) => {
    res.render('events/create')
})

// read one document using params 

router.get('/events/:eventId', (req, res) => {
    Event.findById(req.params.eventId)
        .then((singleEvent) => {
            res.render('events/event-details', singleEvent)
        })
        .catch((err) => console.log(err));
})

// create the currentUser

router.get('/signup', (req, res) => {
    console.log(req.session)
    data = { userInsession: req.session.currentUser }
    console.log(data)
    res.render('auth/signup', data)
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
        res.render('auth/signup', { errorMessage: "Please fill in all mandatory fields. Email and password are required." })
        return
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!regex.test(password)) {
        res.render('auth/signup', { errorMessage: "Please input a password at least 8 characters long, with a lowercase and uppercase letter." })
        return
    }
    bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
            console.log("Salt: ", salt)
            return bcrypt.hash(password, salt)
        })
        .then(hashedPassword => {
            console.log("Hashed Password: ", hashedPassword)
            return User.create({
                email: email,
                passwordHash: hashedPassword
            })
        })
        .then(() => {
            res.redirect('/event-list')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.VallidationError) {
                res.status(500).render('auth/signup', { errorMessage: error.message });
            }
            else if (error.code === 11000) {
                res.render('auth/signup', { errorMessage: "There is already an account associated with the email please sign in or sign up with a new email" })
            }
            else {
                next(error);
            }
        });
})

// Tomoz download bcryptjs (look into Hashedpassword)
// Set up user pages & Routes

// look into setting up the salt rounds
// look into setting up the middleware - route-guard.js

module.exports = router