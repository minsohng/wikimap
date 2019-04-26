"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const eventsRoutes = require("./routes/events");


// import data-helper functions
const dataHelpers = require("./lib/data-helpers.js")(knex);


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(cookieSession({
  name: 'session',
  keys: ['hello']
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/maps", mapsRoutes(knex));
app.use("/api/events", eventsRoutes(knex));


var templateVar = {
  email: undefined,
  maps: undefined

}

// Home page
app.get("/", (req, res) => {

  if (req.session.user_id) {
    dataHelpers.getEmail(req.session.user_id, (err, email) => {
      if (err) {
        console.error(err);
      } else {
        templateVar.email = email;
        res.render("homepage", templateVar);
      }
    });
  } else {
    res.render("homepage", templateVar);
  }
});


app.get("/profiles", (req, res) => {

  if (!req.session.user_id) {
    throw new Error("You are not logged in");
  }
  // check isLoggedIn

  res.render("profile", templateVar);

});



//login page
app.get("/login", (req, res) => {
  req.session.user_id =  1;
  dataHelpers.getEmail(req.session.user_id, (err, email) => {
    if (err) {
      console.error(err);
    } else {
      templateVar.email = email;
      res.render("login", templateVar);
    }
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.redirect('/');
});

//register page
app.get("/register", (req, res) => {
  res.send("register page");
});

//view all maps
app.get("/maps", (req, res) => {
  //create template vars
  // show all maps in maps table
  dataHelpers.getAllMaps((err, maps) => {
    if (err) {
      console.error(err);
    } else {
      // res.json(maps);
      res.render("maps", templateVar);
    }
  });

});


//create new map
app.post("/maps", (req, res) => {
  //check isLoggedin
  // if (!req.session.user_id) {
  //   throw new Error("You are not logged in");
  // }

  //add a row in maps table with user id and map name
  // req.body.mapName
  dataHelpers.setMap('Toronto', 1, (err, mapName) => {
    if (err) {
      console.error(err);
    } else {
      console.log("map name:", mapName);
    }
  });

  // after creating new map redirect to the map created /map/:id
});

//create new map
app.get("/maps/new", (req, res) => {
  // check isLoggedin
  if (!req.session.user_id) {
    throw new Error("You are not logged in");
  }

  res.render("create_map", templateVar);
});

app.get("/my_maps", (req, res) => {
  // check isLoggedin
  if (!req.session.user_id) {
    throw new Error("You are not logged in");
  }
  //does MY maps ONLY at the moment
  dataHelpers.getMyMaps(req.session.user_id, (err, maps) => {
    if (err) {
      console.error(err);
    } else {
      templateVar.maps = maps;


      // data looks like this:
      //[ anonymous { id: 1, name: 'TECH', user_id: 1 },
      // anonymous { id: 3, name: 'Toronto', user_id: 1 } ]
      res.render("my_maps", templateVar);
    }
  })
  // show maps associated with userid and maps u contributed

});

//show map with id
app.get("/maps/:id", (req, res) => {

  //pass all events associated with mapid
  //redirect to maps/:id
  res.send("render map id");
});

app.put("/maps/:id", (req, res) => {
  // check isLoggedin && does map associate with userid who is logged in

  //edit or update map name

  //redirect to map with id
});

app.delete("/maps/:id", (req, res) => {
  // check isLoggedin && does map associate with userid who is logged in
  // if (!req.session.user_id) {
  //   throw new Error("You are not logged in");
  // }

  // if (dataHelpers.isOwner)
  dataHelpers.deleteMap(req.session.user_id, req.params.id);

  //redirect to my maps
});


app.get("/maps/:id/events", (req, res) => {
  console.log(req.params.id);
  dataHelpers.getEvents(req.params.id, (err, events) => {
    if (err) {
      console.error(err);
    } else {
      res.json(events);
    }
  });
});


// routes for events
app.get("/events/new", (req, res) => {
  res.render('create_event', templateVar);
});




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
