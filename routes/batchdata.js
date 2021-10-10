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
    createBatchLeader
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
router.post('/batchleader/fill/group/progress/:uid', ...isSignedIn(), isAuthenticated, isBatchLeader,async (req, res) => {
    const {
        active,
        isPartiallyActive,
        inactive,
        teamcoordination,
        teamLeaderAvaliblity,
        viceTeamLeaderAvailiblity,
        doubtSessionTaken,
        teamRating,
        videoScrum,
        thaOfTL,
        thaOfVTL,
        remarks
    } = req.body;
    const _uid = req.params.uid;
    try {
        const batchData = await BatchData.create({
            _uid,
            active,
            isPartiallyActive,
            inactive,
            teamcoordination,
            teamLeaderAvaliblity,
            viceTeamLeaderAvailiblity,
            doubtSessionTaken,
            teamRating,
            videoScrum,
            thaOfTL,
            thaOfVTL,
            remarks

        });
        return res.status(200).json({
            message: 'Batch data stored successfully'
        });
    } catch (err) {
        console.log(`Error occured :${err}`);
        return res.status(500).json({
            message: 'Internal server error occured'
        });
    }
});

module.exports = router;