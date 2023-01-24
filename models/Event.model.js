const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
        },
        // a string field that stores the category of the event (e.g. music, sports, arts, etc.)
        category: {
            type: String,
            trim: true,
            required: true
        },
        // a number field that stores the price of the event
        price: {
            type: Number,
            trim: true
        },
        // a string field that stores the URL of an image associated with the event
        image: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;
