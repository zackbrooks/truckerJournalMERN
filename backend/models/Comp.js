const mongoose = require("mongoose");

const Comps = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: false,
  },
  routing: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Comp", Comps);
