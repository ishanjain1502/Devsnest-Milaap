const express = require("express");
const router = express.Router();

// const Scrum = require("../models/scrums");

const {fillScrum,update,markPresent,viewScrum} = require('../controllers/scrums');
const {isSignedIn ,isAuthenticated,isAdmin,isBatchLeader,isTeamLeader, isViceTeamLeader}= require('../middleware/auth');

//middlewares
router.use(isSignedIn,isAuthenticated);

router.post('/fill', fillScrum);
router.post('/att', isTeamLeader,isViceTeamLeader,markPresent);
router.put('/update',update);
router.get('/view',viewScrum);
module.exports = router;