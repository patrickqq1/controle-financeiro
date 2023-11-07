
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary(); // id_usuario
    table.string('nome').notNullable();
    table.string('email').unique().notNullable();
    table.integer('senha').notNullable();
    table.string('status').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios')
};
