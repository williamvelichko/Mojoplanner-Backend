const Users = require("./users-model");

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

module.exports = {
  validateUser,
  emailIsUnique,
  emailExists,
};
