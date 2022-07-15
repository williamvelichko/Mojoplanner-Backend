const express = require("express");
const model = require("./model");

const router = express.Router();

router.get("/", (req, res, next) => {
  model
    .getProjects()
    .then((pr) => {
      res.json(pr);
    })
    .catch((err) => {
      res.json(err.message);
    });
});
router.get("/tasks", (req, res, next) => {
  model
    .getTasks()
    .then((pr) => {
      res.json(pr);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.get("/combined", (req, res, next) => {
  model
    .getCompbined()
    .then((pr) => {
      res.json(pr);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.get("/name", (req, res, next) => {
  console.log("william");
});

module.exports = router;
