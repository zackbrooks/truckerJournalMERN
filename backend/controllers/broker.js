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
  const { phoneNumber, lastName, firstName } = req.body.brokerInfo;

  if (!phoneNumber || !lastName || !firstName) {
    throw new BadRequestError("Please provide all values");
  }
  await Broker.create({
    firstName: req.body.brokerInfo.firstName,
    lastName: req.body.brokerInfo.lastName,
    userId: req.body.brokerInfo.id,
    rating: req.body.brokerInfo.rating,
    email: req.body.brokerInfo.email,
    phoneNumber: req.body.brokerInfo.phoneNumber,
  });

  res.status(StatusCodes.CREATED).json({ msg: "Broker Created" });
};

// @GET
// @/broker
// @gets all brokers for that user
exports.getBrokers = async (req, res) => {
  const allBrokers = await Broker.find({ userId: req.query.userId });
  res.json({
    message: "this is all brokers for that user",
    brokers: allBrokers,
  });
};

// @GET
// @/viewone/id
// @gets one specific broker for that user
exports.getBroker = async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id);
    res.json(broker);
  } catch (error) {
    console.log("error", error);
  }
};

// @post
// @/edit/id
// @posts updated info to the db
exports.updateBroker = async (req, res) => {
  await Broker.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        firstName: req.body.data.brokerInfo.firstName,
        lastName: req.body.data.brokerInfo.lastName,
        userId: req.body.data.brokerInfo.id,
        rating: req.body.data.brokerInfo.rating,
        email: req.body.data.brokerInfo.email,
        phoneNumber: req.data.brokerInfo.body.phoneNumber,
        notes: req.body.data.brokerInfo.notes,
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
  res.status(201).json({ message: "Deleted Broker" });
};
