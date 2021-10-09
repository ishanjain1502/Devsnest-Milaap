const expressJwt = require('express-jwt');
const User = require('../models/user');
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

//TODO: do modify if time if tiem perimts by profile way
exports.isAuthenticated = async (req, res, next) => {
    const _id = req.auth && req.auth._id;
    if(_id) {
        try{
            const user = await User.findOne({where: {_id}})
            if(user) {
                next();
            }
        } catch(err) {
            console.log(`Error occured ${err.name}`);
        }
    }
};

exports.isAdmin = () => {

};

exports.isBatchLeader = () => {

};


exports.isTeamLeader = () => {

};

exports.isViceTeamLeader = () => {

};