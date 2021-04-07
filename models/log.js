const { Schema, model } = require("../db/connection");

const LogSchema = new Schema(
  {
    title: String,
    entry: String,
    shipIsBroken: Boolean
  },
  { timestamps: true }
);

const Log = model("Log", LogSchema);

module.exports = Log;
