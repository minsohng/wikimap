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
  user_id: undefined,
  email: undefined,
  maps: undefined,
  events: undefined,
  mymaps: undefined,
  allmaps: undefined,
  myevents: undefined,
  eventId: undefined,
  eventInfo: undefined
}

// Home page
app.get("/", (req, res) => {

  dataHelpers.getAllMaps((err, maps) => {
    if (err) {
      console.error(err);
    } else {
      templateVar.allmaps =  maps;
      res.render("homepage", templateVar);
    }
  });
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
  templateVar.user_id = req.session.user_id;
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

  for (let key in templateVar) {
    templateVar[key] = undefined;
  }

  res.redirect('/');
});

//register page
app.get("/register", (req, res) => {
  res.send("register page");
});




//create new map
app.post("/maps", (req, res) => {

  if (!req.session.user_id) {
    throw new Error("You are not logged in");
  }

  const mapName = req.body.mapName;
  const userId = req.session.user_id;
  dataHelpers.setMap(mapName, userId, (err, mapName) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/events/new');
    }
  });

  // after creating new map redirect to the map created /map/:id
});

//render create new map page
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
  dataHelpers.getContributedMaps(req.session.user_id, (err, maps) => {
    if (err) {
      console.error(err);
    } else {
      templateVar.maps = maps;
      res.render("my_maps", templateVar);
    }
  })
  // show maps associated with userid and maps u contributed

});

//pass events associated with mapId
app.get("/maps/:id", (req, res) => {

  dataHelpers.getEvents(req.params.id, (err, events) => {
    if (err) {
      console.error(err);
    } else {
      res.json(events);
    }
  });

});

app.put("/maps/:id", (req, res) => {
  if (!req.session.user_id) {
    throw new Error("You are not logged in");
  }

  dataHelpers.updateMaps(req.params.id, req.body.mapName, (err, map) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/my_maps');

    }
  });
});

app.delete("/maps/:id", (req, res) => {
  if (!req.session.user_id) {
    throw new Error("You are not logged in");
  }
  // check isLoggedin && does map associate with userid who is logged in

  dataHelpers.deleteMaps(req.session.user_id, req.params.id, () => {
    res.redirect('/my_maps');
  });

});



// routes for events
app.get("/events/new", (req, res) => {
  if (!req.session.user_id) {
    throw new Error ("You are not logged in");
  }


  dataHelpers.getMyMaps(req.session.user_id, (err, maps) => {
    if (err) {
      console.error(err);
    } else {
      templateVar.mymaps = maps;
      res.render('create_event', templateVar);
    }
  });
});


app.get("/my_events", (req, res) => {
  if (!req.session.user_id) {
    throw new Error ("You are not logged in");
  }

  dataHelpers.getMyEvents(req.session.user_id, (err, events) => {
    if (err) {
      console.error(err);
    } else {
      templateVar.myevents = events;
      res.render("my_events", templateVar);
    }
  });
});

app.get('/events/:id', (req, res) => {
  if (!req.session.user_id) {
    throw new Error ("You are not logged in");
  }

  dataHelpers.getEventsInfo(req.params.id, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      templateVar.eventInfo = info;
      templateVar.eventId = req.params.id;
      console.log(info)

       res.render('edit_events', templateVar);
    }
  });

})

app.post("/events", (req, res) => {
  if (!req.session.user_id) {
    throw new Error ("You are not logged in");
  }
  const eventsInfo = {
    latitude: req.body.lat,
    longitude: req.body.lng,
    name: req.body.eventName,
    url: req.body.eventURL,
    img_url: req.body.imageURL,
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    description: req.body.eventDescription
  };

  console.log(eventsInfo)
  console.log("mapid",req.body.mapid)

  dataHelpers.setEvents(req.session.user_id, req.body.mapid, eventsInfo, (err, result ) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/profiles');
    }
  })

});


app.put("/events/:id", (req, res) => {
  if (!req.session.user_id) {
    throw new Error ("You are not logged in");
  }
  const eventsInfo = {
    // latitude: req.body.latitude,
    // longitude: req.body.longtitude,
    name: req.body.name,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    url: req.body.url,
    img_url: req.body.img_url
  }

  dataHelpers.updateEvents(req.params.id, req.session.user_id, eventsInfo, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/my_events');
    }
  });

});


app.delete("/events/:id", (req, res) => {
  if (!req.session.user_id) {
    throw new Error ("You are not logged in");
  }

  dataHelpers.deleteEvents(req.params.id, req.session.user_id, () => {
    res.redirect('/my_events');
  });

});





app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
