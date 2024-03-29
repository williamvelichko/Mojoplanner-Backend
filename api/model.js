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
      "p.user_id",
      "t.task_name",
      "t.task_information",
      "t.task_id",
      "t.task_finished"
    );

  let pr = await getProjects();

  let tasks = await getTasks();
  let arr = [];
  const prData = pr.map((dt) => {
    let project_name = dt.project_name;
    let project_leader = dt.project_leader;
    let user_id = dt.user_id;
    let project_id = dt.project_id;

    let project_tasks = [];
    let prTasks = tasks.map((ts) => {
      let task_name = ts.task_name;
      let task_information = ts.task_information;
      let task_id = ts.task_id;
      let task_finished = ts.task_finished;
      if (ts.project_id === dt.project_id) {
        project_tasks.push({
          task_name,
          task_information,
          task_id,
          task_finished,
        });
      }
    });
    const push = arr.push({
      project_leader,
      project_name,
      user_id,
      project_id,
      project_tasks,
    });
  });

  return arr;
}
async function updateProject(project_id, { project_leader, project_name }) {
  await db("projects")
    .where({ project_id: project_id })
    .update({ project_leader, project_name });
  return {
    project_name,
    project_leader,
    project_id,
  };
}

async function projectById(project_id) {
  let data = await organizedProject();
  let id = project_id;
  let loop = data.filter((pr) => pr.project_id == id);
  return loop;
}

async function updateTask(task_id, { task_name, task_information }) {
  await db("tasks")
    .where({ task_id: task_id })
    .update({ task_name, task_information });
  return { task_id, task_name, task_information };
}
async function getTaskById(task_id) {
  return db("tasks").where({ task_id: task_id });
}
async function createProject(body, user_id) {
  const result = await db("projects").insert({
    project_name: body.project_name,
    project_leader: body.project_leader,
    user_id: user_id,
  });
  const array = await organizedProject();
  return array[array.length - 1];
}

async function deleteProject(project_id) {
  let result = await projectById(project_id);
  await db("projects").where({ project_id: project_id }).del();
  return result;
}

async function createTask(project_id, body) {
  const result = await db("tasks").insert({
    project_id: project_id,
    task_name: body.task_name,
    task_information: body.task_information,
  });
  const res = await db("tasks");
  //const res = await getTaskByProjectId(project_id);
  return res[res.length - 1];
}

async function getTaskByProjectId(project_id) {
  return db("tasks").where({ project_id: project_id });
}
async function deleteTask(task_id) {
  let result = await getTaskById(task_id);
  let res = await db("tasks").where({ task_id: task_id }).del();
  return result;
}

async function projectByUser(user_id) {
  let data = await organizedProject();
  const result = data.filter((dt) => dt.user_id == user_id);
  return result;
}

async function taskComplete(task_id, task_finished) {
  let res = await db("tasks")
    .where({ task_id: task_id })
    .update({ task_finished: task_finished });
  let result = await getTaskById(task_id);
  return result;
}
async function taskCompleteRedo(task_id, task_finished) {
  let res = await db("tasks")
    .where({ task_id: task_id })
    .update({ task_finished: task_finished });
  let result = await getTaskById(task_id);
  return result;
}

module.exports = {
  getProjects,
  getCompbined,
  getTasks,
  organizedProject,
  updateProject,
  projectById,
  updateTask,
  getTaskById,
  createProject,
  deleteProject,
  createTask,
  deleteTask,
  projectByUser,
  taskComplete,
  taskCompleteRedo,
};
