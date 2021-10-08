const express = require('express');
const User = require('../models/user');
const router = express.Router();

//TODO: adding middleware is remaining and bcrypting password too
//TODO: testing route
router.post('/user/register',async (req, res) => {
  const {
    firstname,
    lastname,
    phonenumber,
    password,
    email  
  } = req.body;
  try {
      const user = await User.create({
      firstname,
      lastname,
      phonenumber,
      password,
      email
    });
    return res.status(200).send({
      message: 'User stored successfully'
    });
  } catch (err) {
    console.log(`Error while storing to db, ${err}`);
  }
 
});

//TODO: will do via jwt
//TODO: testing needs to be done too
router.post('/user/login', async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    const user = await User.findOne({email});
    return res.status(200).send({
      message: 'User found successfully in db',
      user
    });
  } catch (err) {
    console.log(`Error while finding in DB ${err}`);
  }
});

router.get('/logout', (req, res) => {
  return res.status(200).send({
    message: 'User logged out successfully'
  })
});


module.exports = router;
