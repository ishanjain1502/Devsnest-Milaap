const express = require('express');
const Team = require('../models/teams');
const router = express.Router();

const { teamInput } = require('../controllers/team');

router.post("api/teamInput", signup);

module.exports = router;