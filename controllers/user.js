const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { firstname, lastname, phonenumber, password, email } = req.body;
  try {
    const alreadyExists = await User.findOne({ where: { email } }).exec();
    if (alreadyExists) {
      res.status(401).send("Email Already Exists");
    } else {
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
    }
  } catch (err) {
    console.log(`Error while storing to db, ${err}`);
    return res.status(500).send({
      err,
    });
  }
};

//TODO: status message needs to be updated
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      return res.status(200).send({
        message: "User found successfully in db and password is also same",
      });
    } else {
      return res.status(402).send({
        message: "Un authorized",
      });
    }
  } catch (err) {
    console.log(`Error while finding in DB ${err}`);
  }
};

exports.signout = (req, res) => {
  return res.status(200).send({
    message: "User logged out successfully",
  });
};
