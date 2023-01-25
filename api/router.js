const express = require("express");
const model = require("./model");

const router = express.Router();

router.get("/user/:user_id", (req, res, next) => {
  model
    .projectByUser(req.params.user_id)
    .then((pr) => {
      res.json(pr);
    })
    .catch((err) => {
      next(err);
    });
});

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
  } catch (err) {
    next(err);
  }
});

router.get("/task/:task_id", async (req, res, next) => {
  model
    .getTaskById(req.params.task_id)
    .then((pr) => {
      res.json(pr);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.put("/task/:task_id", async (req, res, next) => {
  try {
    const result = await model.updateTask(req.params.task_id, req.body);
    const updated = await model.getTaskById(req.params.task_id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.post("/newProject/:user_id", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await model.createProject(req.body, req.params.user_id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:project_id", async (req, res, next) => {
  model
    .deleteProject(req.params.project_id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.delete("/deleteTask/:task_id", async (req, res, next) => {
  try {
    const result = await model.deleteTask(req.params.task_id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/newTask/:project_id", async (req, res, next) => {
  try {
    const result = await model.createTask(req.params.project_id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/taskComplete/:task_id", async (req, res, next) => {
  try {
    const result = await model.taskComplete(req.params.task_id, true);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/taskCompleteRedo/:task_id", async (req, res, next) => {
  try {
    const result = await model.taskComplete(req.params.task_id, false);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
