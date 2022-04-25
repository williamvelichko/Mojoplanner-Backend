/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("notes").del();
  await knex("notes").insert([{ notes_id: 1, notes: "This is one paragraph" }]);
};
