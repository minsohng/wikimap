exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        knex('maps').insert({id:1, name: 'TECH', user_id: 1}),
        knex('maps').insert({id:2, name: 'Marketing', user_id: 2})
      ]);
    });
};
