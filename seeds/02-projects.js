/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("projects").del();
  await knex("projects").insert([
    { project_name: "oceanCove", project_leader: "william", user_id: 1 },
    { project_name: "roadTrip", project_leader: "william", user_id: 1 },
    { project_name: "mexico", project_leader: "john", user_id: 2 },
  ]);
};
