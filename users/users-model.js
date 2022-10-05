const db = require("../db-config");

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const result = await db("users").insert(user);

  const users = await find();
  const lastUser = await users[users.length - 1];
  return lastUser;
  //   /console.log(id);
  //return findBy(result);
  //console.log(result);
}

module.exports = {
  find,
  findBy,
  add,
};
