exports.seed = function(knex, Promise) {
  return knex('events').del()
    .then(function () {
      return Promise.all([
        knex('events').insert({
          id:1,
          latitude:49.2827,
          longitude:123.1207,
          name: 'Vancouver X',
          start_date: '2019-01-01',
          end_date:'2019-01-02',
          url: 'www.vancouver.com',
          img_url:'http://res.cloudinary.com/simpleview/image/upload/v1486505969/clients/vancouverbc/Aerial_Sunset_Vancouver_d3_copy_1bb86ed0-1edc-4cda-841d-0b033ca0bb72.jpg',
          description: 'The best free tech event in Vancouver',
          user_id: 1,
          map_id:1
        }),

        knex('events').insert({
          id:2,
          latitude:43.6532,
          longitude:79.3832,
          name: 'Toronto X',
          start_date: '2019-02-01',
          end_date:'2019-03-02',
          url: 'www.toronto.com',
          img_url:'http://res.cloudinary.com/simpleview/image/upload/v1486505969/clients/vancouverbc/Aerial_Sunset_Vancouver_d3_copy_1bb86ed0-1edc-4cda-841d-0b033ca0bb72.jpg',
          description: 'The best free tech event in Toronto',
          user_id: 1,
          map_id:1
        }),

        knex('events').insert({
          id:3,
          latitude:49.2813295,
          longitude:123.114602,
          name: 'Lighthouse Labs',
          start_date: '2019-03-01',
          end_date:'2019-05-02',
          url: 'www.lighthouselabs.com',
          img_url:'http://res.cloudinary.com/simpleview/image/upload/v1486505969/clients/vancouverbc/Aerial_Sunset_Vancouver_d3_copy_1bb86ed0-1edc-4cda-841d-0b033ca0bb72.jpg',
          description: 'The best free tech event in lighthouse',
          user_id: 1,
          map_id:2
        }),

        knex('events').insert({
          id:4,
          latitude:49.527,
          longitude:123.107,
          name: 'Something',
          start_date: '2019-01-01',
          end_date:'2019-01-02',
          url: 'www.vancouver.com',
          img_url:'http://res.cloudinary.com/simpleview/image/upload/v1486505969/clients/vancouverbc/Aerial_Sunset_Vancouver_d3_copy_1bb86ed0-1edc-4cda-841d-0b033ca0bb72.jpg',
          description: 'whatever',
          user_id: 2,
          map_id:2
        })
      ]);
    });
};
