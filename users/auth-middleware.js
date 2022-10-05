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

function usernameIsUnique(req, res, next) {
  console.log(req.user);
  if (Users.findBy({ email: req.user.email }).first() != null) {
    // next({
    //   status: 400,
    //   message: `email ${req.user.email} already exists`,
    // });
    res.status(400).json(`email ${req.user.email} already exists`);
  } else {
    next();
  }
}

module.exports = {
  validateUser,
  usernameIsUnique,
};
