/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();
  await knex("tasks").insert([
    {
      task_name: "buy Food",
      task_information: "go to walmart and buy all the needed items",
      project_id: 1,
    },
    {
      task_name: "buy Drinks",
      task_information: "go to walmart and buy all the drinks",
      project_id: 1,
    },
    {
      task_name: "find the dates",
      task_information: "figure out when is the dates the best",
      project_id: 2,
    },
    {
      task_name: "people",
      task_information: "figure out who is going",
      project_id: 2,
    },
  ]);
};
