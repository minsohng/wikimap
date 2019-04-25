"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(knex) {
  return {

    getAllMaps: (callback) => {
      console.log("Getting all maps");
      // pass all map ids in an array
      const maps = [];

      callback(null, maps);
    },


    getMap: (mapId, callback) => {
      console.log("getting one map with map_id", mapId);
      // pass events associated with mapId in an array
      const events = [];
      callback(null, events);
    },

    setMap: (mapName, callback) => {
      console.log("creating map with", mapName);

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
    }

  };
}
