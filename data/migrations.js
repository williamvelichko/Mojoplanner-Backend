// exports.up = (knex) => {
//   return knex.schema.createTable("users", function (table) {
//     table.string("id").notNullable().unique().primary();
//     table.string("email").notNullable().unique();
//     table.string("nickname");
//     table.string("password").notNullable();
//   });
// };

// exports.down = (knex) => {
//   return knex.schema.dropTableIfExists("users");
// };
