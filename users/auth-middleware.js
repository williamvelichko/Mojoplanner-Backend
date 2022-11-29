const Users = require("./users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendEmail");
const crypto = require("crypto");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("./../config/index");

function validateUser(req, res, next) {
  if (
    !req.body.email ||
    typeof req.body.email != "string" ||
    !req.body.email.trim()
  ) {
    // next({ status: 400, message: "email is required and must be a string" });
    res.status(400).json("email is required and must be a string");
  } else if (
    !req.body.password ||
    typeof req.body.password != "string" ||
    !req.body.password.trim()
  ) {
    //next({ status: 400, message: "password is required and must be a string" });
    res.status(400).json("password is required and must be a string");
  } else {
    req.user = {
      email: req.body.email.trim(),
      password: req.body.password.trim(),
    };
    next();
  }
}

async function emailIsUnique(req, res, next) {
  const user = await Users.findBy({ email: req.user.email }).first();

  if (user != null) {
    res.status(400).json(`user with email ${req.user.email} already exist`);
  } else {
    req.user = user;
    next();
  }
}

async function emailExists(req, res, next) {
  const user = await Users.findBy({ email: req.user.email }).first();

  if (user == null) {
    res.status(400).json(`user with email ${req.user.email} does not exist`);
  } else {
    req.user = user;
    next();
  }
}

async function userIsVerified(req, res, next) {
  const user = await Users.findBy({ email: req.user.email }).first();
  if (!user.verified) {
    try {
      console.log(user);
      const token = await generateToken(user);
      const url = `${process.env.BASE_URL}/api/auth/${user.user_id}/verify/${token}`;
      console.log(url);
      await sendEmail(user.email, "VERIFY EMAIL", url);
      res
        .send(201)
        .send({ message: "An Email was sent to your account please verify" });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
}

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    email: user.email,
    token: crypto.randomBytes(32).toString("hex"),
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
module.exports = {
  validateUser,
  emailIsUnique,
  emailExists,
  userIsVerified,
};
