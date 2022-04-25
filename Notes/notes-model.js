const db = require("../db-config");

const findNote = async () => {
  return db("notes");
};

module.exports = {
  findNote,
};
