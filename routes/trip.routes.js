const User = require("../models/User.model");
const Event = require("../models/Event.model");
const router = require("express").Router();
const Trip = require("../models/Trip.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

// create the event routes
// this route has the same action of the post form in create hbs page

router.post("/add-trip", isLoggedIn, (req, res) => {
  const { tripName, description } = req.body;
  Trip.create({ tripName, description, user: req.session.currentUser._id })
    .then((result) => {
      console.log("Trip has been created");
      res.redirect("/events");
    })
    .catch((err) => console.log(err));
});

// read the document by finding all the events and render them

router.get("/trips", isLoggedIn, (req, res) => {
  res.render("user/create-trip", { userInSession: req.session.currentUser });
});

// creating trip with user id
router.post("/trips/:eventId", isLoggedIn, (req, res, next) => {
  const { eventId } = req.params;
  const { tripId } = req.body;
  Trip.findByIdAndUpdate(tripId, { $push: { event: eventId } }, { new: true })
    .then((foundPost) => res.redirect(`/trips/${tripId}`))
    .catch((err) => {
      console.log(`Err while getting a single post from the  DB: ${err}`);
      next(err);
    });
});

//   reading trip for specific userID
router.get("/trips/:tripId", isLoggedIn, (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .populate("event")
    .then((trip) => {
      console.log("trip found", trip);
      res.render("user/my-trips", trip);
    })
    .catch((err) => {
      console.log("Something went wrong while getting trip id: ", err);
      next(err);
    });
});

// create the document and make the form visible to used to add an event

// router.get('/add-event', (req, res) => {
//     res.render('events/create')
// })

// read one document using params

// router.get('/events/:eventId', (req, res) => {
//     Event.findById(req.params.eventId)
//         .then((singleEvent) => {
//             res.render('events/event-details', singleEvent)
//         })
//         .catch((err) => console.log(err));
// })

module.exports = router;
