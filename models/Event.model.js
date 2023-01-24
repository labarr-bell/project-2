const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            trim: true,
            required: true
        },
        //an object or nested subdocument that stores information about the event's location, such as the address, latitude and longitude, and a reference to a Place (if you have one in your models)
        location: {
            address: { type: Schema.Types.ObjectId, ref: 'City' },
            address: { type: Schema.Types.ObjectId, ref: 'City' },
            address: { type: Schema.Types.ObjectId, ref: 'City' }
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
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;
