const mongoose = require("mongoose");

const Brokers = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Broker", Brokers);
