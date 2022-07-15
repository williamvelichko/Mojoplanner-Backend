const db = require("../db-config");

function getProjects() {
  return db("projects");
}

module.exports = {
  getProjects,
};
