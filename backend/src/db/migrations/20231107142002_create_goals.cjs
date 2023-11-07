
exports.up = function(knex) {
  return knex.schema.createTable('metas', (table) => {
    table.increments('id');
    table.string('descricao').notNullable()
    table.decimal('valor_atual', 10, 2).notNullable()
    table.decimal('meta_valor', 10, 2).notNullable()
    table.date('data').notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('usuarios') 
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('metas')
};
