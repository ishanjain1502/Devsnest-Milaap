const expressJwt = require('express-jwt');

//TODO: need to check why unauthrized error is throw altough isSignedIn works with beare token
// exports.isSignedIn = expressJwt({
//     secret: process.env.JWT_SECRET,
//     userProperty: 'auth',
//     algorithms:['HS256']
// });

exports.isSignedIn = () => {
    return [
        expressJwt({
            secret: process.env.JWT_SECRET,
            userProperty: 'auth',
            algorithms:['HS256']
        })
        ,function(err, req, res, next) {
            if(err) {
                return res.status(402).send({
                    message: 'Unauthorized'               
                });
            }
            next();
        }
    ]
};

exports.isAuthenticated = () => {

};

exports.isAdmin = () => {

};

exports.isBatchLeader = () => {

};


exports.isTeamLeader = () => {

};

exports.isViceTeamLeader = () => {

};