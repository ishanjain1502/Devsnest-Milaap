const User = require("../models/user");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = async (req, res) => {
  const { firstname, lastname, phonenumber, password, email } = req.body;
  try {
    const user = await User.create({
      firstname,
      lastname,
      phonenumber,
      password,
      email,
    });
    return res.status(200).send({
      message: "User stored successfully",
    });
  } catch (err) {
    console.log(`Error while storing to db, ${err}`);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    return res.status(200).send({
      message: "User found successfully in db",
      user,
    });
  } catch (err) {
    console.log(`Error while finding in DB ${err}`);
  }
};

exports.signout = (req, res) => {
  return res.status(200).send({
    message: "User logged out successfully",
  });
};
