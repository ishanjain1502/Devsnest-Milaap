const {BatchLeader} = require('../models/batchdata');
exports.createBatchLeader =  async (req, res) => {
    try {
        const _uid =  req.params.uid;
        const teamname =  req.params.teamname;
        const batchleader = await BatchLeader.create({
            _uid,
            teamname
        });
        return res.status(200).json({
            message: 'Batch leader entry added successfully'
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Problem while storing entry in db'
        });
    }
};

exports.fillbatchdetails = async (req, res) => {
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
}

exports.getbatchdetails =  async (req, res) => {
    try {
        const batchprogress = await BatchData.findAll({where:{_uid: req.params.uid}});
        return res.status(200).json(
            batchprogress
        );
    } catch (err) {
        console.log(`Error name:${err}`);
        return res(500).json({
            message: 'Internal server error occured'
        });
    }
};