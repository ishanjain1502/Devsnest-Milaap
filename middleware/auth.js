const expressJwt = require('express-jwt');

//TODO: need to check why unauthrized error is throw altough isSignedIn works with beare token
exports.isSignedIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

exports.isAuthenticated = () => {

};

exports.isAdmin = () => {

};

exports.BatchLeader = () => {

};


exports.isTeamLeader = () => {

};

exports.isViceTeamLeader = () => {

};