const router = require("express").Router();
const model = require("./notes-model");

router.get("/", (req, res) => {
  model
    .findNote()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

module.exports = router;
