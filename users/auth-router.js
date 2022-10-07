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
  emailIsUnique,
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
  const { email, password } = req.body;
  console.log(password, req.user);
  try {
    if (bcrypt.compareSync(password, req.user.password) === true) {
      // req.session.user = req.user;
      const token = generateToken(req.user);
      res
        .status(200)
        .json({ message: `welcome back ${req.user.email}!`, token });
    } else {
      //next({ status: 401, message: "invalid credentials" });
      res.status(401).json("invalid credentials");
    }
  } catch (err) {
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

module.exports = router;
