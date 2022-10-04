const router = require("express").Router();
const User = require("./users-model");
const bcrypt = require("bcryptjs");

const { validateUser } = require("./auth-middleware");

router.post("/register", validateUser, async (req, res, next) => {
  try {
    const user = req.user;
    const hash = bcrypt.hashSync(user.password, 12);
    console.log(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
