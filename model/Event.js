const mongoose = require("mongoose");
const { Schema } = mongoose;
const eventSchema = new Schema(
  {
    Address: {
      type: String,
    },
    State: {
      type: String,
    },
    pin: {
      type: String,
    },
    
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { collection: "events" }
);

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;
