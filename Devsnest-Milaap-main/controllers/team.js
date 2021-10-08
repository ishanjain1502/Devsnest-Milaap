const User = require('../models/teams');

exports.teamInput = async (req, res) => {
    const { teamID, teamName, teamMates, batchLeader } = req.body;
    try {
        const user = await User.create({
            teamID, teamName, teamMates, batchLeader
        });
        return res.status(200).send({
            message: "Team stored successfully",
        });
    } catch (err) {
        console.log(`Error while storing to db, ${err}`);
        return res.status(500).send({
            err,
        });
    }
}