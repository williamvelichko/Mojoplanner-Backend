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

router.get("/organized", (req, res, next) => {
  model
    .organizedProject()
    .then((pr) => {
      res.json(pr);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.get("/:project_id", async (req, res, next) => {
  model
    .projectById(req.params.project_id)
    .then((pr) => {
      res.json(pr);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.put("/updateProject/:project_id", async (req, res, next) => {
  try {
    const result = await model.updateProject(req.params.project_id, req.body);
    const updated = await model.projectById(req.params.project_id);
    res.json(updated);
  } catch {
    next(err);
  }
});

module.exports = router;
