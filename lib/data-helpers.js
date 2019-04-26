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

    setMap: (mapName, userId, callback) => {
      console.log("creating map with", mapName);

    //   knex('maps')
    //   .then(() => {
    //   return Promise.all([
    //     knex('maps').insert({id: 3, name: mapName, user_id: userId})
    //   ]);
    //   callback(null, mapName);
    // });

      //create a row in maps table with mapName;
      //pass mapId from db
      const mapId = null;
      callback(null, mapId);
    },

    updateMap: (mapId, mapName, callback) => {
      console.log("updating map with", mapId);

      //update row in mapName in db with mapId;
      // pass new name??
      callback(null, mapName);
    },

    deleteMap: (mapId, callback) => {
      console.log("deleting map with", mapId);

      //delete row in map table with mapId
      //pass ?
      callback(null, undefined);
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
