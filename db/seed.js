// import the database connection
const mongoose = require("./connection");

//////////////////////////////////
// Import Your Models Below
/////////////////////////////////

const Log = require("../models/Log");

/////////////////////////////////
// Do your Database Operations in Below Function
/////////////////////////////////

const seed = async () => {
    //--- CODE GOES HERE
    Log.collection.drop();
    // add some logs
    const logs = await Log.create([
      {
        title: "Stuck in The Suez Canal",
        entry: "Worst traffic jam ever",
        shipIsBroken: false,
      },
      {
        title: "Arriving At Bermuda Triangle",
        entry: "Why did I agree to this",
        shipIsBroken: false,
      },
      {
        title: "Clear Sailing After All",
        entry: "Everything is great until it isn't",
        shipIsBroken: false,
      },
      {
        title: "SOS",
        entry: "Leak in the ship",
        shipIsBroken: true,
      },
    ]);
    // log the created list
    console.log(logs);
};




// const seed = async () => {
//   //--- CODE GOES HERE
//   Log.collection.drop()
//   // await Log.deleteMany({}); // to clear accounts
//   // add some Logs
//     const Logs = await Log.create([
//         {
//             title: "It's Cold",
//             entry: "Want to go home",
//             shipIsBroken = true,
//         },
//         {
//             title: "Clear Sailing",
//             entry: "Everything is great until it isn't",
//             shipIsBroken = false,
//         },
//         {
//             title: "Stuck in The Suez Canal",
//             entry: "Worst traffic jam ever",
//             shipIsBroken: false,
//         },
//         {
//             title: "Approaching Bermuda Triangle",
//             entry: "Why did I agree to this",
//             shipIsBroken = false,
//         }
//     ]);
//     // log the created Log
//     console.log(Logs)
// };

// run seed function
mongoose.connection.on("open", () => {
  // Run Seed Function
  seed();
});
