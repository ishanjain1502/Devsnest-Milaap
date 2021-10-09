const express = require("express");
const router = express.Router();

// const Scrum = require("../models/scrums");
const Scrum = require("../models/scrums");

const {
  fillScrum,
  update,
  markPresent,
  viewScrum,
} = require("../controllers/scrums");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isBatchLeader,
  isTeamLeader,
  isViceTeamLeader,
  isViceTeamLeaderOrLeader,
} = require("../middleware/auth");

router.param("uid", async (req, res, next, uid) => {
  try {
    //check date    
    const date = new Date();
    const scrum = await Scrum.findOne({
      where: {
        [Op.and]: [{ _uid: uid }, { Date: date.toDateString() }],
      },
    });
    if (scrum) {
      req.scrum = scrum;
      next();
    } else {
      return res.status(401).send("Unable to Find Scrum Data");
    }
  } catch (err) {
    console.log(err);
  }
});
router.param("isPresent", async (req, res, next, isPresent) => {
  const present = isPresent === "true" ? true : false;
  req.body.isPresent = present;
  next();
});

//middlewares
router.use(...isSignedIn(), isAuthenticated);

router.post("/scrum/fill", fillScrum);
router.put(
  "/scrum/attendence/:uid/:isPresent",
  isViceTeamLeaderOrLeader,
  markPresent
);
router.put(
  "/scrum/update/:uid?/:backlog?/:lastLecture?/:progress?/:link?/:topicsToCover?",
  update
);
router.get("/scrum/view", viewScrum);

module.exports = router;