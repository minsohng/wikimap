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
      .join('events', {'maps.id': 'events.id'})
      .select('*')
      .whereNot( () => {
        this.where('maps.user_id', userId)
        .andWhere('events.user_id', userId)
      })
      .orWhere( () => {
        this.where('maps.user_id', userId)
        .andWhere('events.user_id', userId)
      })
      .then((maps) => {
        callback(null, maps);
      });

      // .join('contacts', {'users.id': 'contacts.id'})
    },

    setMap: (mapName, userId, callback) => {

      knex('maps').insert({id:9, name: mapName, user_id: userId}).asCallback((res) => {
        callback(null, mapName);
      })


    },

    updateMap: (mapId, mapName, callback) => {
      console.log("updating map with", mapId);

      //update row in mapName in db with mapId;
      // pass new name??
      callback(null, mapName);
    },

    deleteMap: (userId, mapId) => {
      console.log("deleting map with", mapId);

      //delete row in map table with mapId
      knex('maps')
      .where('id', mapId)
      .andWhere('user_id', userId)
      .del()
      .then(() => {
        console.log("deleted a row in maps");
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
