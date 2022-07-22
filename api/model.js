const db = require("../db-config");

function getProjects() {
  return db("projects");
}
function getTasks() {
  return db("tasks");
}

function getCompbined() {
  return db("projects as p")
    .leftJoin("tasks as t", "t.project_id", "p.project_id")
    .select(
      "p.project_name",
      "p.project_leader",
      "t.task_name",
      "t.task_information"
    );
}

async function organizedProject() {
  let data = await db("projects as p")
    .leftJoin("tasks as t", "t.project_id", "p.project_id")
    .select(
      "p.project_name",
      "p.project_leader",
      "p.project_id",
      "t.task_name",
      "t.task_information"
    );

  let pr = await getProjects();

  let tasks = await getTasks();
  let arr = [];
  const prData = pr.map((dt) => {
    let project_name = dt.project_name;
    let project_leader = dt.project_leader;
    let project_id = dt.project_id;
    let project_tasks = [];
    let prTasks = tasks.map((ts) => {
      let task_name = ts.task_name;
      let task_information = ts.task_information;
      if (ts.project_id === dt.project_id) {
        project_tasks.push({ task_name, task_information });
      }
    });
    const push = arr.push({
      project_leader,
      project_name,
      project_id,
      project_tasks,
    });
  });

  return arr;
}

module.exports = {
  getProjects,
  getCompbined,
  getTasks,
  organizedProject,
};
