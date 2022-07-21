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
  const prData = pr.map((dt) => {
    return dt.project_name;
  });

  let projects = [
    {
      project_name: prData.project_name,
      project_leader: data.project_leader,
      project_id: data.project_id,
      project_tasks: [
        { task_name: data.task_name, task_information: data.task_information },
      ],
    },
  ];
  return projects;
}

module.exports = {
  getProjects,
  getCompbined,
  getTasks,
  organizedProject,
};
