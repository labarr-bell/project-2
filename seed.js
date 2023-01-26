const mongoose = require('mongoose');
const Event = require('./models/Event.model');

//Two steps in the seed file
//1. open up the mongoose connection
//2. add all of these documents to my colection

let events = [
    {
        eventName: 'MAMI Film Festival',
        description: 'A big movie festival in Mumbai',
        category: 'Festival',
        price: 22,
        image: './images/MAMI.png',
        city: 'Mumbai'
    },
    {
        eventName: 'Little Flea Market',
        description: 'A local shopping event with curated hand-made goods.',
        category: 'Shopping',
        price: 0,
        image: './images/little-flea.jpeg',
        city: 'Mumbai'
    }
]

mongoose.connect('mongodb://127.0.0.1/project-2')
.then(()=> Event.insertMany(events))
.then((result)=> {
  console.log('Seed documents have been created')
  console.log('Seed Documents: ' + result)
})
