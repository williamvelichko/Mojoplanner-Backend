const db = require("../db-config");

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function updateUser(user_id, verified) {
  console.log(user_id, verified);
  const result = await db("users")
    .where({ user_id: user_id })
    .update({ verified: verified });
  return result;
}

async function add(user) {
  const result = await db("users").insert(user);

  const users = await find();
  const lastUser = await users[users.length - 1];
  return lastUser;
}

module.exports = {
  find,
  findBy,
  add,
  updateUser,
};
