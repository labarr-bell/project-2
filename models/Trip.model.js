const { Schema } = require("mongoose");

const tripSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref:"User"},
    event:[{type:Schema.Types.ObjectId,ref:"Event"}]
})

const User = model("Trip", tripSchema);

module.exports = Trip;