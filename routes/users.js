const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {signin, signout, signup} = require('../controllers/user');

//middlewares
const {isSignedIn} = require('../middleware/auth');

//TODO: adding middleware is remaining and bcrypting password too
//TODO: testing route
router.post('/user/signup', signup);

//TODO: will do via jwt
//TODO: testing needs to be done too
router.post('/user/signin', signin);

router.get('/user/signout', signout);

router.get('/user/testRoute', isSignedIn, (req, res) => {
    res.status(200).send({
        message: 'Success'
    })
});

module.exports = router;
