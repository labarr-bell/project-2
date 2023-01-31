const User = require('../models/User.model');
const Event = require('../models/Event.model');
const router = require('express').Router();
// const {isAdmin} = require('../middleware/route-guard.js');
const Trip = require('../models/Trip.model');


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
            res.render('events/event-list', { events })
        })
        .catch((err) => console.log(err));
})

// create the document and make the form visible to used to add an event 

router.get('/add-event', (req, res) => {
    res.render('events/create')
})

// read one document using params 

router.get('/events/:eventId', (req, res) => {
    let trips = []
    Trip.find({
        user: req.session.currentUser._id
    })
        .then((tripForUser) => {
            trips = tripForUser
            console.log(trips)
            return Event.findById(req.params.eventId)
        })
        .then((singleEvent) => {
            res.render('events/event-details', { singleEvent, trips })
        })
        .catch((err) => console.log(err));
})

router.post('/events/:eventId/delete', (req, res, next) => {
    Event.findByIdAndRemove(req.params.eventId)
    .then(() => {
        res.redirect('/events')
    })
    .catch((err)=> {
        console.log('The error while deleting the event-details is, ', err)
    })
})

module.exports = router;