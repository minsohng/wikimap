
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function (table) {
    table.increments();
    table.decimal('latitude');
    table.decimal('longitude');
    table.string('name');
    table.date('start_date');
    table.date('end_date');
    table.string('url');
    table.string('img_url');
    table.string('description', 500);
    table.integer('user_id').references('id').inTable('users');
    table.integer('map_id').references('id').inTable('maps');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
