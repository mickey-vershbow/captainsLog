// Import dependencies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("./db/connection");
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
const PORT = process.env.PORT || "2021";

const Log = require("./models/log");

// Set view engine to EJS
app.set("view engine", "ejs");

// Body parser
app.use(express.urlencoded({ extended: true }));

//////////////////////
// ROUTES
/////////////////////

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

// Logs INDEX page
app.get("/logs/index", (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render("index", {
      logs: allLogs
    });
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
