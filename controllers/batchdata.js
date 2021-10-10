const BatchLeader = require('../models/batchdata');
exports.createBatchLeader =  async (req, res) => {
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
};