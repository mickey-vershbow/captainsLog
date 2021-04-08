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

const Log = require("./models/Log");
const LogController = require("./controllers/logs");

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

app.use("/", LogController);




app.listen(PORT, () => {
  log.white("🚀 Server Launch 🚀", `Listening on Port ${PORT}`);
});
