
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.varchar('email', 255).defaultTo('').notNullable()
    table.varchar('hashedPass', 255).defaultTo('').notNullable()
    table.timestamp('created_at', false).notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updated_at', false).notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
