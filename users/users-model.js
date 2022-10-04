const db = require("../db-config");

function find() {
  return db("users");
}

async function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findBy(id);
}

module.exports = {
  find,
  findBy,
  add,
};
