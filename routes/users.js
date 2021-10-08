const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {signin, signout, signup} = require('../controllers/user');

//TODO: adding middleware is remaining and bcrypting password too
//TODO: testing route
router.post("/user/signup", signup);

//TODO: will do via jwt
//TODO: testing needs to be done too
router.post("/user/singin", signin);

router.get("/signout", signout);

module.exports = router;
