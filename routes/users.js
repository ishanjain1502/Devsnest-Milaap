const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/api/user/register',async (req, res) => {
  const {
    firstname,
    lastname,
    phonenumber,
    password,
    email  
  } = req.body;
  try{
    const user = await User.create({
      firstname,
      lastname,
      phonenumber,
      password,
      email
    });
  } catch(err) {
    console.log(`Error while storing to db`);
  }
});


module.exports = router;
