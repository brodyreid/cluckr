
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.bigIncrements('id')
      table.string('username')
      table.text('password')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
