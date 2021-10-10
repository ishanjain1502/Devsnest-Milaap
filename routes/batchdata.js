const express = require('express');
const router = express.Router();
const {
    isSignedIn,
    isAuthenticated,
    isAdmin
} = require('../middleware/auth');
//roles
const {roles} = require('../utils/roles');

//Models
const User = require('../models/user');
const {
    BatchLeader,
    BatchData
} = require('../models/batchdata');

//extracting params and assigning role to BatchLeader
router.param('uid',async (req, res, next) => {
    try{
        const user = await User.findOne({where:{_id: req.params.uid}});
        if (user) {
            user.role = roles.BatchLeader;
            await user.save();
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

//batchleader will only be created by admin
router.post('/batchleader/create/:uid',...isSignedIn(), isAuthenticated, isAdmin, async (req, res) => {
    try {
        const batchleader = await BatchLeader.create({_uid: req.params.uid});
        return res.status(200).json({
            message: 'Batch leader entry added successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Problem while storing entry in db'
        });
    }
});

module.exports = router;