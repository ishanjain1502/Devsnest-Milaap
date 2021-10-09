const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { signin, signout, signup, getUserInfo, updateIsActive,deleteUser } = require("../controllers/user");

//params
router.param("emailId", async (req, res, next, emailId) => {
  if (emailId) {
    try {
      const user = await User.findOne({ where: { email: emailId } });
      if (user) {
        req.user = user;
        next();
      } else {
        throw Error("Invalid user");
      }
    } catch (err) {
      return res.status(404).send({
        message: "Email not found",
      });
    }
  }
});

router.param("isActive", async (req, res, next, isActive) => {
    const active = isActive === "true" ? true : false;
    req.body.isActive = active;
    next();
});

//middlewares
const { isSignedIn, isAuthenticated, isAdmin } = require("../middleware/auth");

//TODO: adding middleware is remaining and bcrypting password too
router.post("/user/signup", signup);

//TODO: testing needs to be done too
router.post("/user/signin", signin);

router.get("/user/signout", signout);

router.get("/user/profile/info/:emailId", getUserInfo);

router.put(
  "/user/profile/info/:emailId",
  ...isSignedIn(),
  isAuthenticated,
  (req, res) => {
    //TODO: should be updated by same user
  }
);

router.put(
  "/user/profile/active/:isActive/:emailId",
  ...isSignedIn(),
  isAuthenticated,
  isAdmin,
  updateIsActive
);

router.delete(
  "/user/profile/info/:emailId",
  ...isSignedIn(),
  isAuthenticated,
  isAdmin,
  deleteUser
);

router.get("/user/testRoute", ...isSignedIn(), isAuthenticated, (req, res) => {
  res.status(200).send({
    message: "Authorized",
    auth: req.auth,
  });
});

module.exports = router;
