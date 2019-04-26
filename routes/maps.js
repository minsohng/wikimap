"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex, dataHelpers) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
    });
  });


  return router;
}
