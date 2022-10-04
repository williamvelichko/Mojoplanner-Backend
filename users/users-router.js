// const express = require("express");
// const router = express.Router();
const router = require("express").Router();
const User = require("./users-model");

router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
