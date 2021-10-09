const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {roles} = require('../utils/roles');
const bcrypt = require("bcrypt");

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
      //creating a jwt token
      //expires in 30 min
      const token = jwt.sign({ _id: user._id, role: user.role ||  roles.TeamMember}, process.env.JWT_SECRET, {
        expiresIn: 30 * 60,
        algorithm: 'HS256',
      });
      res.cookie('token', token);

      return res.status(202).send({
        message: 'User signed in successfully',
        token,
      });
    } else {
      return res.status(401).send({
        message: 'unauthorized',
      });
    }
  } catch (err) {
    console.log(`Error while finding in DB ${err}`);
  }
};

//TODO: need to do more testing
exports.signout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).send({
    message: 'User logged out successfully',
  });
};
