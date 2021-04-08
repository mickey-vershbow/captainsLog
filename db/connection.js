/// grab environment variables
require("dotenv").config();
/// IMPORT MONGOOSE
const mongoose = require("mongoose");
// IMPORT MERCED LOGGER FOR COLORFUL LOGS
const { log } = require("mercedlogger");
// Bring in our database string from .env or default string
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/defaultdb";

  ///////////////////////////////////
// Mongoose Configuration
///////////////////////////////////
//* config object to remove warnings
const mongoconfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};
//* connect to the database
mongoose.connect(MONGODB_URL, mongoconfig, () => {
    log.cyan('STATUS', 'the connection with mongodb is established');
    // console.log('the connection with mongod is established'.rainbow.bold);
});


///////////////////////////////////
// Handling Connection Events
///////////////////////////////////
mongoose.connection
// Event for When Connection Opens
// .on("open", () => log.green("STATUS", "Connected to Mongo"))
// Event for When Connection Closes
.on("close", () => log.red("STATUS", "Disconnected from Mongo"))
// Event for Connection Errors
.on("error", (error) => log.red("ERROR", error))

///////////////////////////////////
// Exporting Our Connection
///////////////////////////////////
module.exports = mongoose
