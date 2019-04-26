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

    getMyMaps: (userId, callback) => {
      knex('maps')
      .select('*')
      .where('user_id', userId)
      .then((maps) => {
        callback(null, maps);
      });
    },

    setMap: (mapName, userId, callback) => {

      knex('maps')
      .then(() => {
      return Promise.all([
        knex('maps').insert({name: mapName, user_id: userId})
      ]);
      callback(null, mapName);
      });
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

    }
  };
}
