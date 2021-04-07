// Import dependencies
const express = require("express");
const app = express();

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
  res.send(req.body);
});





app.listen(3000, () => {
  console.log("listening");
});
