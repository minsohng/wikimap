exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({id:1, latitude:49.2827 , longitude:123.1207, name: 'Vancouver X', start_date: '2019-01-01', end_date:'2019-01-02', url: 'www.vancouver.com', img_url:'http://res.cloudinary.com/simpleview/image/upload/v1486505969/clients/vancouverbc/Aerial_Sunset_Vancouver_d3_copy_1bb86ed0-1edc-4cda-841d-0b033ca0bb72.jpg', description: 'The best free tech event in Vancouver', user_id: 1, map_id:1})
      ]);
    });
};
