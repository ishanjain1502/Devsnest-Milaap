//models
const Scrum = require("../models/scrums");
const User = require("../models/user");
const Team = require("../models/teams");


exports.fillScrum = async (req, res) => {

  const { _uid, backlog, lastLecture, progress, link, topicsToCover } =
    req.body;

  const userName = await User.findOne({ where: { _id: _uid } });
  if (userName === null) {
    console.log("User Not found!");
    return res.status(401).send({
      message: "User Not Found",
    });
  } else {
    console.log("First NAme: ", userName.firstname);
    //TODO:get userTeam from uid
    const userTeam = await Team.findOne({ where: { teamMates :{[Op.contains]: _uid }} });
    
    try {
      const scrum = await Scrum.create({
        _uid,
        //_teamId=userTeam._teamId,
        backlog,
        lastLecture,
        progress,
        link,
        topicsToCover,
      });
      return res.status(200).send({
        message: "Scrum Sheet Filled successfully",
      });
    } catch (err) {
      console.log(`Error while storing to db, ${err}`);
      return res.status(500).send({
        err,
      });
    }
  }
};

exports.update = async (req, res) => {

  const { _uid, backlog, lastLecture, progress, link, topicsToCover } = req.body;


  if (userName === null) {
    console.log("User Not found!");
  } else {
  
  if(backlog!=undefined)
  {
    try {
      const result = await Scrum.update(
        { backlog: backlog },
        {
          where: {
            [Op.and]: [
              {_uid: _uid } , {date: Date.now() }
            ]
          }
        })
      res.json({
        success: true
      }, 200);
    } catch (err) {
      throw new Error(error)
    }
  }
  //TODO backlog *5 for lastlecture,link,progreess,...
  
  }

};

exports.markPresent = async (req, res) => {
  const { _uid, isPresent } = req.body;

  // middleware
  // {
  //     leader: "your uid",user.find(VL,VTL).role then update
  //
  //         temmember: "uid",
  //         present: "true/false"
  //
  //     }

};

exports.viewScrum= async (req, res) => {

};