const User = require('../models/User.model');
const Event = require('../models/Event.model');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10 
const mongoose = require('mongoose');
const { isLoggedIn, isLoggedOut} = require('../middleware/route-guard.js');


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
        .then((events) => {
            res.render('events/event-list', {events})
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

router.get('/signup', isLoggedOut, (req, res) => {
    // data = {userInSession:req.session.currentUser}
    res.render('auth/signup')
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
            res.redirect('/')
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
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

router.get('/login', isLoggedOut,  (req, res) => {
    console.log(req.session)
    res.render('auth/login')
})

// add custom middleware here 

router.post('/login', (req, res) => {
    console.log("SESSION =====>", req.session)
    console.log(req.body)
    const {email,password} = req.body

    if(!email || !password){
        res.render('auth/login',{errorMessage:'please enter an email or password'})
    return
    }

    User.findOne({email})
    .then(user => {
        console.log(user)
        if(!user) {
            res.render('auth/login', {errorMessage: "User not found please sign up. No account associated with email."})
        } else if (bcrypt.compareSync(password, user.passwordHash)) {
            req.session.currentUser = user
            res.redirect('/user-profile')
        } else {
            res.render('auth/login', {errorMessage: "Incorrect password"})
        }
    })
    .catch((err) => console.log(err));
})


router.get('/user-profile', isLoggedIn, (req, res) => {
    res.render('user/user-profile', {userInSession:req.session.currentUser})
})

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  });

  router.post('/events/:id/delete', async (req, res) => {
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      res.redirect('/events');
    } catch (error) {
      console.log(error);
      res.redirect('/events');
    }
  });




// Make delete route
// Create “My Trips” - still do 
// Add an event to “My Trips” - still to do 
// Delete an event from “My Trips” - Work in progress
// Create an event for “My Trip” - done need to populate on my trips page.
// 

module.exports = router