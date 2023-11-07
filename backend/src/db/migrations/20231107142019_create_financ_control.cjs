exports.up = function (knex) {
  return knex.schema.createTable("controlefinanc", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.decimal("valor", 10, 2).notNullable();
    table.dateTime("data_vencimento").notNullable();
    table.enu("tipo", ["entry", "output"]).notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('usuarios') 
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("controlefinanc");
};
