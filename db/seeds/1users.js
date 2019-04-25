exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id:1, email: 'Alice@gmail.com', password: 'random'}),
        knex('users').insert({id:2, email: 'bob@gmail.com', password: 'ish'})
      ]);
    });
};
