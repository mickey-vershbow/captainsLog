const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const { model } = require("mongoose");


//////////////////////
// ROUTES
/////////////////////
router.get("/", (req, res) => {
  res.render("home");
})


// Logs INDEX page
router.get("/logs/index", (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render("index", {
      logs: allLogs,
      time: req.time
    });
  });
});

// Logs DELETE route
router.delete("/logs/:id", (req, res) => {
  Log.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect("/logs/index");
  })
})

// Logs EDIT GET route
router.get("/logs/:id/edit", (req, res) => {
  Log.findById(req.params.id, (err, foundLog) => {
    res.render("edit.ejs",
    {
      log: foundLog // pass in found log
    }
    );
  });
});

// Logs UPDATE PUT route
router.put('/logs/:id', (req, res) => {
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
router.get("/logs/new", (req, res) => {
  res.render("new");
});
router.post("/logs/", (req, res) => {
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
router.get("/logs/:id", (req, res) => {
  Log.findById(req.params.id, (error, foundLog) => {
    res.render("show", {
      log: foundLog
    });
  });
});






module.exports = router;
