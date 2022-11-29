const Broker = require("../models/Broker");
const StatusCodes = require("http-status-codes");
require("express-async-errors");

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

// @post
// @/broker
// @/Creates Broker in db
exports.createBroker = async (req, res) => {
  const { phoneNumber, lastName, firstName } = req.body;
  if (!phoneNumber || !lastName || !firstName) {
    throw new BadRequestError("Please provide all values");
  }
  await Broker.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userId: req.body.id,
    rating: req.body.rating,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Broker Created" });
};

// @GET
// @/broker
// @gets all brokers for that user
exports.getBrokers = async (req, res) => {
  const allBrokers = await Broker.find({ userId: "631bb8fbaee3dafac6fea6e1" });
  // const allBrokers = await Broker.find({ userId: req.query.userId });
  res.json({
    message: "this is all brokers for that user",
    brokers: allBrokers,
  });
};

// @GET
// @/viewone/id
// @gets one specific broker for that user
exports.getBroker = async (req, res) => {
  const broker = await Broker.findById(req.params.id);

  res.json({ broker });
};

// @post
// @/edit/id
// @posts updated info to the db
exports.updateBroker = async (req, res) => {
  await Broker.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: "631bb8fbaee3dafac6fea6e1",
        // userId: req.body.id,
        rating: req.body.rating,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        notes: req.body.notes,
      },
    }
  );
  const broker = await Broker.findById(req.params.id);
  res.json({ message: "broker updated" });
};

// @delete
// @/delete
// @gets all brokers for that user
exports.deleteBroker = async (req, res) => {
  await Broker.findOneAndDelete({ _id: req.body.brokerId });
  console.log("Deleted Todo");
  res.json({ message: "Deleted It" });
};
