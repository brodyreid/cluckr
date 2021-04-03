
exports.up = function(knex) {
  return knex.schema.createTable('current_clucks', table => {
      table.bigIncrements('id')
      table.string('username')
      table.string('imageURL')
      table.text('content')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('current_clucks')
};