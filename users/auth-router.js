const router = require("express").Router();
const User = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("./../config/index");

const {
  validateUser,
  emailIsUnique,
  emailExists,
} = require("./auth-middleware");

router.post(
  "/register",
  validateUser,
  //emailIsUnique,
  async (req, res, next) => {
    try {
      const user = req.body;
      const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
      user.password = hash;
      let result = await User.add(user);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", validateUser, emailExists, async (req, res, next) => {
  const password = req.body.password;
  console.log(password, req.user);
  if (bcrypt.compareSync(password, req.user.password) === true) {
    console.log(req.user);
    // req.session.user = req.user;
    res.json(`welcome back ${req.user.email}!`);
  } else {
    //next({ status: 401, message: "invalid credentials" });
    res.status(401).json("invalid credentials");
  }
});

module.exports = router;
