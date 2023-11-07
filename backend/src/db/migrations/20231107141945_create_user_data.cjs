
exports.up = function(knex) {
  return knex.schema.createTable('dados_user', (table) => {
    table.increments('id');
    table.date('data').notNullable();
    table.decimal('saldo', 10,2);
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('usuarios') 
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('dados_user')
};
