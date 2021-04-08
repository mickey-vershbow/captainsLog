// Import dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("./db/connection");
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
const PORT = process.env.PORT || "2021";
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");

const Log = require("./models/log");

// Set view engine to EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // serve public folder as static
app.use(cors()); // prevent cors errors
app.use(methodOverride("_method")); // swap methods for delete/put requests
app.use((req, res, next) => {
  req.time = new Date().toLocaleTimeString();
  console.log(req.time);
  next();
})

//////////////////////
// ROUTES
/////////////////////
// Logs INDEX page
app.get("/logs/index", (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render("index", {
      logs: allLogs,
      time: req.time
    });
  });
});

// Logs DELETE route
app.delete("/logs/:id", (req, res) => {
  Log.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/logs/index");
  })
})

// Logs EDIT GET route
app.get("/logs/:id/edit", (req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    res.render("edit.ejs",
    {
      log: foundLog // pass in found log
    }
    );
  });
});

// Logs UPDATE PUT route
app.put('/logs/:id', (req, res) => {
  if(req.body.shipIsBroken === "on") {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  Log.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect("/logs/index");
  });
});



// Create new log GET and POST routes
app.get("/logs/new", (req, res) => {
  res.render("new");
});
app.post("/logs/", (req, res) => {
  if (req.body.shipIsBroken === "on") {
    //if checked, req.body.shipIsBroken is set to 'on'
    req.body.shipIsBroken = true;
  } else {
    //if not checked, req.body.shipIsBroken is undefined
    req.body.shipIsBroken = false;
  }

  Log.create(req.body, (error, createdLog) => {
    res.redirect("/logs/index");
  });
});
// Logs SHOW page
app.get("/logs/:id", (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render("show", {
      log: foundLog
    });
  });
});


app.listen(PORT, () => {
  log.white("🚀 Server Launch 🚀", `Listening on Port ${PORT}`);
});
