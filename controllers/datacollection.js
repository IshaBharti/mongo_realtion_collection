const { Mongoose } = require("mongoose");
const router = require("../routes/user");
const User = require("../model/User");
const Event = require("../model/Event");
const { post } = require("../routes/user");

const getAddress = async (req, res) => {
  Event.find()
    .populate("userId")
    .then((p) => res.send(p))
    .catch((error) => console.log(error));

  console.log(data);
};

const addAddress = async (req, res) => {
  const event_data = req.body;
  const data = await new Event(event_data);
  data.save();

 return res.status(200).send({ status: 200, message: `Event is added` });
};

module.exports = { addAddress, getAddress };
