const db = require("../db-config");

function getProjects() {
  return db("projects");
}

function getCompbined() {
  return db("projects as p")
    .leftJoin("tasks as t", "t.task_id", "p.project_id")
    .select(
      "p.project_name",
      "p.project_leader",
      "t.task_name",
      "t.task_information"
    );
}

function getTasks() {
  return db("tasks");
}

module.exports = {
  getProjects,
  getCompbined,
  getTasks,
};
