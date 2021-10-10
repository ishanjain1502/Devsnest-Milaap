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