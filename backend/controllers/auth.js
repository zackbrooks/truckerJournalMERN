const User = require("../models/User");
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

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};

exports.postSignup = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!email || !userName || !password) {
    throw new BadRequestError("Please enter all values");
  }
  const user2 = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  const token = user2.createJWT();
  const user = await User.findOne({ email });
  console.log(user);
  res.status(StatusCodes.CREATED).json({ user, token });
};
