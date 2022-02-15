const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    Name: {
      type: String,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { collection: "users" }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
