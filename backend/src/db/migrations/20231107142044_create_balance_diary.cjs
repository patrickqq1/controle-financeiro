
exports.up = function(knex) {
  return knex.schema.createTable('saldo_diario', (table) => {
    table.increments('id')
    table.date('data')
    table.decimal('saldo', 10, 2)
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('usuarios') 
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('saldo_diario')
};
