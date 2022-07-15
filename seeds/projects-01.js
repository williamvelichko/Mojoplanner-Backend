/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("projects").del();
  await knex("projects").insert([
    {
      project_name: "CrossCountry",
      project_leader: "William velichko",
    },
    {
      project_name: "OceanCove",
      project_leader: "Mathey Yozhey",
    },
  ]);
};
