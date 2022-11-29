const router = require("express").Router();
const User = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");
const jwtDecode = require("jwt-decode");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("./../config/index");

const {
  validateUser,
  emailIsUnique,
  emailExists,
  userIsVerified,
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
      const token = await generateToken(result);
      const url = `${process.env.BASE_URL}api/auth/${result.user_id}/verify/${token}`;
      await sendEmail(result.email, "VERIFY EMAIL", url);
      res.status(201).json("An Email was sent to your account please verify");
    } catch (err) {
      res.status(500).json("Internal server error");
      next(err);
    }
  }
);

router.get("/:user_id/verify/:token", async (req, res, next) => {
  try {
    const user = await User.findBy({ user_id: req.params.user_id });
    if (!user) return res.status(400).send({ message: "invalid link" });

    if (!jwtDecode(req.params.token).user_id === req.params.user_id)
      return res.status(400).send({ message: "invalid link" });

    await User.updateUser({ user_id: req.params.user_id, verified: true });

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post(
  "/login",
  validateUser,
  emailExists,
  userIsVerified,
  async (req, res, next) => {
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
  }
);

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    email: user.email,
    token: crypto.randomBytes(32).toString("hex"),
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

module.exports = router;
