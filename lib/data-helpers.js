"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(knex) {
  return {

    getAllMaps: (callback) => {
      knex('maps')
      .select('*')
      .then((maps) => {
        callback(null, maps);
      });

    },

    // get maps user created
    getMyMaps: (userId, callback) => {
      knex('maps')
      .select('*')
      .where('user_id', userId)
      .then((maps) => {
        callback(null, maps);
      });
    },

    // get maps user created and contributed
    getContributedMaps: (userId, callback) => {
      knex('maps')
      .leftJoin('events', {'maps.id': 'events.map_id'})
      .distinct('maps.*')
      .where('events.user_id', userId)
      .orWhere('maps.user_id', userId)
      .then((maps) => {
        callback(null, maps);
      });

    },

    setMap: (mapName, userId, callback) => {

      knex('maps').insert({name: mapName, user_id: userId}).asCallback((res) => {
        callback(null, mapName);
      });


    },

    updateMaps: (mapId, mapName, callback) => {
      console.log(`updating map with ${mapId}, ${mapName}`);

      knex('maps')
      .where('id', mapId)
      .update({
        name: mapName
      })
      .then((res) => {
        callback(null, res);
      });

    },

    // deleteMaps: (userId, mapId, callback) => {

    //   knex.select('map_id').from('events').where('map_id', mapId)
    //   .then(function(result)){
    //     if(result.length>0){
    //       //the map_id is used in the events
    //       callback("")

    //     } else {
    //       //the map_id is not used in the events
    //       knex('maps')
    //       .where('id', mapId)
    //       .andWhere('user_id', userId)
    //       .del()
    //       .then(() => {
    //         console.log("deleted a row in maps");
    //         callback(null);
    //       });
    //     }
    //   }
    // },


    setEvents: (userId, mapId, eventsInfo, callback) => {

      knex('events').insert({
        latitude: eventsInfo.latitude,
        longitude: eventsInfo.longitude,
        name: eventsInfo.name,
        url: eventsInfo.url,
        img_url: eventsInfo.img_url,
        start_date: eventsInfo.start_date,
        end_date: eventsInfo.end_date,
        description: eventsInfo.description,
        user_id: userId,
        map_id: mapId
      })
      .then((res) => {
        callback(null, res);
      });
    },


    getEvents: (mapId, callback) => {
      // pass events associated with mapId in an array
      knex('events')
      .select('*')
      .where('map_id', mapId)
      .then((events) => {
        callback(null, events);
      });

    },

    getMyEvents: (userId, callback) => {
      knex('events')
      .select('*')
      .where('user_id', userId)
      .then((events) => {
        callback(null, events);
      });
    },

    updateEvents: (eventsId, userId, eventsInfo, callback) => {
      console.log(`updating event with ${eventsId}, ${eventsInfo}`);

      knex('events')
      .where('id', eventsId)
      .andWhere('user_id', userId)
      .update({
        latitude: eventsInfo.latitude,
        longitude: eventsInfo.longitude,
        name: eventsInfo.name,
        start_date: eventsInfo.start_date,
        end_date: eventsInfo.end_date,
        url: eventsInfo.url,
        img_url: eventsInfo.img_url,
        description: eventsInfo.description
      })
      .then((res) => {
        callback(null, res);
      })

    },

    deleteEvents: (eventsId, userId, callback) => {
      knex('events')
      .where('id', eventsId)
      .andWhere('user_id', userId)
      .del()
      .then(() => {
        console.log("deleted an event in events");
        callback();
      });
    },

    getEventsInfo: (eventsId, callback) => {
      knex('events')
      .select('*')
      .where('id', eventsId)
      .then((info) => {
        callback(null, info);
      });
    },

    getUserId: (email, callback) => {
      knex('users')
      .select('id')
      .where('email', email)
      .then((userId) => {
        callback(null, userId);
      });
    },

    getEmail: (user_id, callback) => {
      knex('users')
      .select('email')
      .where('id', user_id)
      .then((email) => {
        callback(null, email[0].email);
      });
    }
  };
}
