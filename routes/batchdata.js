const express = require('express');
const router = express.Router();
const {
    isSignedIn,
    isAuthenticated,
    isAdmin,
    isBatchLeader
} = require('../middleware/auth');
//roles
const {roles} = require('../utils/roles');

//Models
const User = require('../models/user');
const {
    BatchLeader,
    BatchData
} = require('../models/batchdata');

//controllers
const {
    createBatchLeader,
    fillbatchdetails,
    getbatchdetails
} = require('../controllers/batchdata');

//extracting params and assigning role to BatchLeader
router.param('uid',async (req, res, next) => {
    try{
        const user = await User.findOne({where:{_id: req.params.uid}});
        if (user) {
            if (user.role != roles.BatchLeader) {
                user.role = roles.BatchLeader;
                await user.save();
            }
            return next();
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch(err) {
        return res.status(500).json({
            message: 'Problem while storing entry in db'
        });
    }
});

router.param('teamname', (req, res, next) => {
    if(!req.params.teamname) {
        return res.status(400).json({
            message: 'Please provide team name'
        });
    }
    next();
});

//batchleader will only be created by admin
router.post('/batchleader/create/:uid/:teamname',...isSignedIn(), isAuthenticated, isAdmin, createBatchLeader);

//batchleader will fill entry once per week
router.post('/batchleader/fill/group/progress/:uid', ...isSignedIn(), isAuthenticated, isBatchLeader,fillbatchdetails);

router.get('/batchleader/group/progress/:uid', ...isSignedIn(), isAuthenticated, isBatchLeader,getbatchdetails);

module.exports = router;